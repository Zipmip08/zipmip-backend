import { RequestHandler } from "express";

const failedAttemptsMap = new Map<
  string,
  { count: number; firstTryAt: number }
>();

const BAN_DURATION = 30 * 60 * 1000;
const ATTEMPT_WINDOW = 7 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 3;

export const trackFailedOtpAttempts: RequestHandler = (req, res, next) => {
  const phone = req.body.phone;

  if (!phone) {
    res.status(400).json({ message: "شماره تلفن نامعتبر است." });
    return;
  }

  const attemptInfo = failedAttemptsMap.get(phone);

  if (attemptInfo) {
    const now = Date.now();

    if (attemptInfo.count >= MAX_FAILED_ATTEMPTS) {
      const passedSinceFirstTry = now - attemptInfo.firstTryAt;

      if (passedSinceFirstTry < BAN_DURATION) {
        const minutesLeft = Math.ceil((BAN_DURATION - passedSinceFirstTry) / 60000);
        res.status(429).json({
          message: `به دلیل تلاش‌های زیاد ناموفق، تا ${minutesLeft} دقیقه نمی‌توانید مجدداً امتحان کنید.`,
        });
        return;
      } else {
        failedAttemptsMap.delete(phone);
      }
    }
  }

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
