// src/services/user/userStatus.ts
import { users } from "../../models";

export const checkUserStatus = async (phone: string) => {
  try {
    const user = await users.findOne({ where: { phone } });

    if (user && user.full_name) {
      return {
        isRegistered: true,
        message: "کاربر قبلاً ثبت‌نام کرده است",
      };
    }

    return {
      isRegistered: false,
      message: "کاربر جدید است",
    };
  } catch (error) {
    throw new Error("خطا در بررسی وضعیت کاربر");
  }
};
