// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../libs/firebase/initFirebase.server";
import { generateKey } from "../../../utils/key";

type Data = {
  code?: string;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { authorization } = req.headers;
    const tokenArray = authorization?.split(" ");
    if (!tokenArray || !tokenArray[1]) {
      throw Error("Not authorized");
    }

    const validToken = await admin.auth().verifyIdToken(tokenArray[1]);

    if (!validToken.uid) {
      throw Error("No token valid");
    }

    const db = admin.firestore();
    const collection = await db.collection("referral");
    const code = generateKey(6);

    await collection.add({
      claimed: false,
      code: code,
      referrer: validToken.uid,
      user: "",
      generated: admin.firestore.Timestamp.now(),
    });

    res.status(200).json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "failed to fetch data" });
  }
};

export default handler;
