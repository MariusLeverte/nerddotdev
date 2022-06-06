// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../libs/firebase/initFirebase.server";

export type Document = {
  id: string;
  claimed: false;
  code: string;
  referrer: string;
  user: string;
};

type Data = {
  result?: Document | { claimed: true } | null;
  error?: unknown;
};

export const getReferralCodeInformation = async (
  code: string
): Promise<Data> => {
  try {
    const db = admin.firestore();
    const collection = await db.collection("referral");
    const snapshot = await collection.where("code", "==", code).get();

    if (snapshot.empty) {
      throw Error("No matching documents.");
    }

    let result = null;

    for await (const doc of snapshot.docs) {
      const data = doc.data() as Document;
      if (data.code !== code) continue;
      if (data.claimed) {
        result = { claimed: true };
      }

      result = { ...data, id: doc.id };
      break;
    }

    return { result };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const db = admin.firestore();
    const collection = await db.collection("referral");
    const snapshot = await collection.where("code", "==", req.query.code).get();

    if (snapshot.empty) {
      res.status(500).send({ error: "No matching documents." });
      return;
    }

    snapshot.forEach((doc) => {
      res.status(200).json(doc.data());
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "failed to fetch data" });
  }
};

export default handler;
