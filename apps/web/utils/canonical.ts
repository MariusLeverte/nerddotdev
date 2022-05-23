import { WEB_URL } from "../constants";

export const getCanoniical = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return process.env.NEXT_PUBLIC_VERCEL_URL;
  }

  return WEB_URL;
};
