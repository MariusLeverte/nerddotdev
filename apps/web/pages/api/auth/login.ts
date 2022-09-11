// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie, removeCookies, getCookie } from "cookies-next";
import admin from "../../../libs/firebase/initFirebase.server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorization } = req.headers;
    const tokenArray = authorization?.split(" ");
    if (!tokenArray || !tokenArray[1]) {
      throw Error("Not authorized");
    }

    const validToken = await admin.auth().verifyIdToken(tokenArray[1]);

    const hasCookie = getCookie("nerdAuthToken", { req, res });

    if (!validToken.uid) {
      if (hasCookie) {
        removeCookies("nerdAuthToken", { req, res });
      }
      throw Error("No token valid");
    }

    setCookie("nerdAuthToken", tokenArray[1], {
      req,
      res,
      maxAge: 12 * 60 * 60 * 24 * 1000,
    });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export default handler;
