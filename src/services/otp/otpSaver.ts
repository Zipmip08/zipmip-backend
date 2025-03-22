import { otps, users } from "../../models";
import moment from "moment-timezone";

export const saveOtp = async (
  phone: string,
  otp: string,
  expiresMinutes = 2
) => {
  try {
    const nowTehran = moment.tz("Asia/Tehran");
    const expiresAt = nowTehran.clone().add(expiresMinutes, "minutes").toDate();

    let user = await users.findOne({ where: { phone } });

    if (!user) {
      user = await users.create({
        phone,
        role: "user",
        is_verified: false,
        is_active: true,
      });
    }

    const existingOtp = await otps.findOne({
      where: { phone },
      order: [["created_at", "DESC"]],
    });

    if (existingOtp) {
      await existingOtp.update({
        code: otp,
        expires_at: expiresAt,
        is_used: false,
        attempts: 0,
      });

      return existingOtp;
    }

    const newOtp = await otps.create({
      phone,
      code: otp,
      expires_at: expiresAt,
      is_used: false,
      attempts: 0,
    });

    return newOtp;
  } catch (error) {
    console.error("❌ Error saving OTP:", error);
    throw new Error("خطا در ذخیره‌سازی کد تایید");
  }
};
