// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../libs/firebase/initFirebase.server";
import { getClient } from "../../../libs/sanity/sanity.server";

type Data = {
  status?: "ok";
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { authorization } = req.headers;
    const { intro, social, about, skills, repos } = JSON.parse(req.body);
    const tokenArray = authorization?.split(" ");
    if (!tokenArray || !tokenArray[1]) {
      throw Error("Not authorized");
    }

    const validToken = await admin.auth().verifyIdToken(tokenArray[1]);

    if (!validToken.uid) {
      throw Error("No token valid");
    }

    await getClient(true)
      .patch(validToken.uid)
      .set({ intro, social, about, skills, repos })
      .commit();

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "failed to fetch data" });
  }
};

export default handler;
