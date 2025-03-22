// otpSender.ts
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const IPPANEL_API_KEY = process.env.IPPANEL_API_KEY!;
const IPPANEL_API_URL = process.env.IPPANEL_API_URL!;

if (!IPPANEL_API_KEY || !IPPANEL_API_URL) {
  throw new Error('❌ IPPANEL_API_KEY یا IPPANEL_API_URL در فایل .env تنظیم نشده است.');
}

export const sendOtpSms = async (phone: string, otpCode: string) => {
  const body = {
    code: "uzr3vahwb5jzrto",
    recipient: phone,
    sender: "+9850004150042673",
    variable: { "verification-code": otpCode },
  };

  const response = await fetch(IPPANEL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: IPPANEL_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`SMS Service Error: ${errText}`);
  }

  return await response.json();
};
