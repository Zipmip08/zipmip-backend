// src/routes/user.routes.ts
import express from "express";
import { authenticateUser } from "./../middlewares/otp/auth.middelwares";
import { getCurrentUser } from "./../controllers/user/user.controller";

const router = express.Router();

router.get("/me", authenticateUser, getCurrentUser);

export default router;
