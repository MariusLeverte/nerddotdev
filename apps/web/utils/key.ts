import crypto from "crypto";

export const generateKey = (length = 8) => {
  const bytes = crypto.randomBytes(length * 2);
  const base64 = bytes.toString("base64");
  const alphaNum = base64.replace(/[^a-z0-9]/gi, "");
  return alphaNum.slice(0, length);
};

export const userKey = (id: string) => id.slice(0, 10);
