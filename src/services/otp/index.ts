// src/services/otp/index.ts
import { generateOtp } from "./otpGenerator";
import { sendOtpSms } from "./otpSender";
import { saveOtp } from './otpSaver';

export const requestOtp = async (phone: string) => {
  try {
    const code = generateOtp();
    await sendOtpSms(phone, code);
    const saved = await saveOtp(phone, code);

    return {
      status: 200,
      message: "کد با موفقیت ارسال شد",
      data: [{ id: saved.id, expires_at: saved.expires_at }],
    };
  } catch (error: any) {
    console.error("❌ Error in requestOtp:", error);
    return {
      status: 500,
      message: "ارسال کد با خطا مواجه شد",
      data: [error.message || error],
    };
  }
};
