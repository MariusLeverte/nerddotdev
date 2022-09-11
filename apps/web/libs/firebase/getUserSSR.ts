import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "./initFirebase.server";

export const getUserSSR = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  try {
    const token = getCookie("nerdAuthToken", { res, req });

    if (!token) {
      throw Error("no token");
    }

    const user = await admin.auth().verifyIdToken(token);

    return user;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
