import { Request, Response } from "express";

import { validateOtp } from "../../validation/otpValidator";
import { generateToken } from "../../utils/jwt";

export const verifyOTP = async (req: Request, res: Response) => {
  const { phone, code } = req.body;

  try {
    const result = await validateOtp(phone, code);

    if (!result.valid) {
      res.status(400).json({ message: result.message });
      return;
    }

    // ✅ ایجاد توکن
    const token = generateToken({ phone });

    // ✅ ست کردن توکن در کوکی HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // فقط روی https در حالت پروداکشن
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 روز
    });

    res.status(200).json({
      message: result.message,
      token, // فقط برای تست نمایش بدیم (در حالت واقعی ممکنه حذف بشه)
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ message: "خطای سرور هنگام تایید کد" });
  }
};


