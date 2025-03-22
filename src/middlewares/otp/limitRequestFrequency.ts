import { Request, Response, NextFunction } from "express";

const otpRequestCache = new Map<string, number>();

export const limitOtpRequestFrequency = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const phone = req.body.phone;
  if (!phone) {
    res.status(400).json({ message: "شماره موبایل الزامی است." });
    return;
  }

  const lastRequestTime = otpRequestCache.get(phone);
  const now = Date.now();

  if (lastRequestTime && now - lastRequestTime < 2 * 60 * 1000) {
    res
      .status(429)
      .json({ message: "کد قبلاً ارسال شده. لطفاً ۲ دقیقه صبر کنید." });
    return;
  }

  otpRequestCache.set(phone, now);

  next();
};
