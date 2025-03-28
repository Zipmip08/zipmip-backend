// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { requestOtp } from "../../services/otp";
import { phoneSchema } from "../../validation/phoneSchema";
import { checkUserStatus } from "../../services/user/userStatus";

export const requestOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phone: inputphone } = req.body;

  // اعتبارسنجی شماره تلفن
  const isValid = phoneSchema.safeParse(inputphone);
  if (!isValid.success) {
    res.status(400).json({
      message: "شماره تلفن نامعتبر است",
      errors: isValid.error.errors,
    });
    return;
  }

  const phone = phoneSchema.parse(inputphone);

  try {
    // بررسی وضعیت کاربر
    const { isRegistered, message } = await checkUserStatus(phone);

    // ارسال پاسخ بر اساس وضعیت
    const result = await requestOtp(phone);
    res.status(result.status).json({
      message: `${result.message}`,
      action: isRegistered ? "login" : "signin",
      data: result.data,
    });
  } catch (error) {
    console.error("❌ Error in requestOTP:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};
