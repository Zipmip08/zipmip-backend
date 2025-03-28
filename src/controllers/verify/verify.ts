import { Request, Response } from "express";
import { validateOtp } from "../../validation/otpValidator";
import { generateToken } from "../../utils/jwt";
import { users } from "../../models";
import { phoneSchema } from "../../validation/phoneSchema";

export const verifyOTP = async (req: Request, res: Response) => {
  const { phone, code } = req.body;

  // اعتبارسنجی شماره تلفن
  const isValid = phoneSchema.safeParse(phone);
  if (!isValid.success) {
    res.status(400).json({
      // ✅ افزودن return
      message: "شماره تلفن نامعتبر است",
      errors: isValid.error.errors,
    });
    return;
  }

  try {
    // اعتبارسنجی کد OTP
    const result = await validateOtp(phone, code);
    if (!result.valid) {
      res.status(400).json({ message: result.message });
      return;
    }

    // یافتن یا ایجاد کاربر
    const [user] = await users.findOrCreate({
      where: { phone: isValid.data },
    });

    // ایجاد توکن
    const token = generateToken({ phone: user.phone.toString() });

    // تنظیم کوکی
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    // ارسال پاسخ موفقیتآمیز
    res.status(200).json({
      accessToken: token,
      message: result.message,
      user: { id: user.id, phone: user.phone },
    });
  } catch (error) {
    console.error("❌ خطا در تایید کد:", error);
    res.status(500).json({ message: "خطای سرور هنگام تایید کد" }); // ✅ افزودن return
  }
};
