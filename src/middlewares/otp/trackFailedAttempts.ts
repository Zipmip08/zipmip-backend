import { Request, Response, NextFunction } from "express";

// کش ساده در حافظه برای دنبال کردن تلاش‌های ناموفق
const failedAttemptsMap = new Map<
  string,
  { count: number; firstTryAt: number }
>();

const BAN_DURATION = 30 * 60 * 1000; // 30 دقیقه
const ATTEMPT_WINDOW = 7 * 60 * 1000; // 7 دقیقه
const MAX_FAILED_ATTEMPTS = 3;

export const trackFailedOtpAttempts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const phone = req.body.phone;

  if (!phone) {
    return res.status(400).json({ message: "شماره تلفن نامعتبر است." });
  }

  const attemptInfo = failedAttemptsMap.get(phone);

  if (attemptInfo) {
    const now = Date.now();

    // اگه هنوز توی بازه ۳۰ دقیقه‌ای بن شده
    if (attemptInfo.count >= MAX_FAILED_ATTEMPTS) {
      const passedSinceFirstTry = now - attemptInfo.firstTryAt;

      if (passedSinceFirstTry < BAN_DURATION) {
        const minutesLeft = Math.ceil(
          (BAN_DURATION - passedSinceFirstTry) / 60000
        );
        return res.status(429).json({
          message: `به دلیل تلاش‌های زیاد ناموفق، تا ${minutesLeft} دقیقه نمی‌توانید مجدداً امتحان کنید.`,
        });
      } else {
        // بازنشانی بعد از بن
        failedAttemptsMap.delete(phone);
      }
    }
  }

  // ادامه بده به مرحله بعد (تأیید OTP)
  next();
};

// 📌 در صورت شکست تأیید، این تابع رو صدا بزن
export const recordFailedAttempt = (phone: string) => {
  const now = Date.now();
  const existing = failedAttemptsMap.get(phone);

  if (!existing) {
    failedAttemptsMap.set(phone, { count: 1, firstTryAt: now });
  } else {
    // اگر هنوز در بازه ۷ دقیقه‌ای هست
    if (now - existing.firstTryAt < ATTEMPT_WINDOW) {
      failedAttemptsMap.set(phone, {
        count: existing.count + 1,
        firstTryAt: existing.firstTryAt,
      });
    } else {
      // اگر ۷ دقیقه گذشته، بازنشانی کن
      failedAttemptsMap.set(phone, { count: 1, firstTryAt: now });
    }
  }
};
