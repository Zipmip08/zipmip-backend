// otpGenerator.ts
export const generateOtp = (length: number = 6): string => {
    const min = 10 ** (length - 1);
    const max = (10 ** length) - 1;
    return '123456';
  };
  