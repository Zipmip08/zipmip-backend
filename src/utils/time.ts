// src/utils/time.ts
import moment from "moment-timezone";

export const getIranTime = () => {
  return moment().tz("Asia/Tehran");
};

export const toIranTime = (date: Date | string) => {
  return moment(date).tz("Asia/Tehran");
};

export const getFormattedIranTime = () => {
  return getIranTime().format("YYYY-MM-DD HH:mm:ss");
};
