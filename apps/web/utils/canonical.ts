import { URL } from "../contants";

export const getCanoniical = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return process.env.NEXT_PUBLIC_VERCEL_URL;
  }

  return URL;
};
