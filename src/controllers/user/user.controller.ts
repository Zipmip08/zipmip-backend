// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { users } from "../../models";

// دریافت اطلاعات کاربر جاری
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    res.status(200).json({
      id: user.id,
      phone: user.phone,
      role: user.role,
      isRegistered: user.is_registered,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("❌ خطا در دریافت اطلاعات کاربر:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

// به‌روزرسانی پروفایل کاربر
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { fullName } = req.body;
    const user = req.user!;
    
    await user.update({ full_name: fullName });
    res.status(200).json({ message: "پروفایل با موفقیت به‌روز شد" });
  } catch (error) {
    console.error("❌ خطا در به‌روزرسانی پروفایل:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

// حذف حساب کاربری
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    await user.destroy();
    res.clearCookie("token"); // حذف کوکی توکن
    res.status(200).json({ message: "حساب کاربری با موفقیت حذف شد" });
  } catch (error) {
    console.error("❌ خطا در حذف حساب کاربری:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};