import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { users } from "../../models";

const JWT_SECRET = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      user?: users;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    res.status(401).json({ message: "توکن احراز هویت یافت نشد" });
    return;
  }

  try {
    // ✅ دریافت phone از توکن
    const decoded = jwt.verify(token, JWT_SECRET) as { phone: string };

    console.log(decoded);

    // ✅ جستجوی کاربر بر اساس شماره تلفن
    const user = await users.findOne({
      where: { phone: decoded.phone },
      attributes: { exclude: ["password"] },
    });


    

    if (!user) {
      res.status(404).json({ message: "کاربر یافت نشد" });
      return;
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "توکن منقضی شده است" });
      return;
    }
    res.status(401).json({ message: "توکن نامعتبر است" });
  }
};
