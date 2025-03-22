// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { requestOtp } from "../../services/otp";
import { phoneSchema } from "../../validation/phoneSchema";

export const requestOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phone: inputphone } = req.body;

  const isValid = phoneSchema.safeParse(inputphone);
  if (!isValid.success) {
    res
      .status(400)
      .json({ message: "Invalid phone number", errors: isValid.error.errors });
    return;
  }

  const phone = phoneSchema.parse(inputphone);

  try {
    const result = await requestOtp(phone);
    res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("❌ Error in requestOTP:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};
