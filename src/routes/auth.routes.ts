import { verifyOTP } from "../controllers/verify/verify";
import { requestOTP } from "../controllers/send/send";
import { Router } from "express";
import { limitOtpRequestFrequency } from "../middlewares/otp/limitRequestFrequency";
import { trackFailedOtpAttempts } from "../middlewares/otp/trackFailedAttempts";

const router = Router();

// ارسال کد
router.post("/request-otp", limitOtpRequestFrequency, requestOTP);

// تایید کد
router.post("/verify-otp", trackFailedOtpAttempts, verifyOTP);

export default router;
