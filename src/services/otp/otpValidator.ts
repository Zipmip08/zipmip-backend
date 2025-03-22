import { otps } from './../../models/otps';

export const validateOtp = async (phone: string, code: string) => {
  const otpRecord = await otps.findOne({
    where: { phone, code, is_used: false },
  });

  if (!otpRecord) return { valid: false, message: "کد نامعتبر است." };

  if (new Date(otpRecord.expires_at) < new Date()) return { valid: false, message: "کد منقضی شده است." };

  await otpRecord.update({ is_used: true });

  return { valid: true, message: "کد تأیید معتبر است." };
};
