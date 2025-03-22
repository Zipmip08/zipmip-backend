// src/validations/phoneSchema.ts
import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (val.startsWith("09")) return val.length === 11;
      if (val.startsWith("9")) return val.length === 10;
      return false;
    },
    {
      message: "شماره باید با 09 یا 9 شروع شود و طول آن معتبر باشد",
    }
  )
  .transform((val) => {
    if (val.startsWith("09")) {
      return "+98" + val.slice(1);
    }
    if (val.startsWith("9")) {
      return "+98" + val;
    }
    return val;
  });
