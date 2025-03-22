import moment from "moment-timezone";
import { otps, users } from "../models";
import { phoneSchema } from "./phoneSchema";

export const validateOtp = async (phone: string, code: string) => {
  const normalizedPhone = phoneSchema.parse(phone);

  // Fetch latest unused OTP
  const otpRecord = await otps.findOne({
    where: {
      phone: normalizedPhone,
      is_used: false,
    },
    order: [["created_at", "DESC"]],
  });

  if (!otpRecord) {
    return { valid: false, message: "کدی یافت نشد یا قبلاً استفاده شده است." };
  }

  // Compare times in Tehran timezone
  const nowTehran = moment().tz("Asia/Tehran");
  const expiresAtTehran = moment(otpRecord.expires_at).tz("Asia/Tehran");



  if (nowTehran.isAfter(expiresAtTehran)) {
    return { valid: false, message: "کد منقضی شده است." };
  }

  // Check OTP code
  if (otpRecord.code !== code) {
    await otpRecord.increment("attempts");
    return { valid: false, message: "کد وارد شده نادرست است." };
  }

  // Mark as used
  otpRecord.is_used = true;
  otpRecord.attempts = 0;
  await otpRecord.save();

  // Verify user
  await users.update(
    { is_verified: true },
    { where: { phone: normalizedPhone } }
  );

  return { valid: true, message: "کد با موفقیت تأیید شد." };
};
