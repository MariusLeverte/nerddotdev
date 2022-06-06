// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../libs/firebase/initFirebase.server";
import { slugInUse } from "../../../libs/sanity/queries";
import { getClient } from "../../../libs/sanity/sanity.server";
import { generateKey } from "../../../utils/key";
import { slugify } from "../../../utils/slug";

type Data = {
  slug?: string;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { authorization } = req.headers;
    const { id, code, providerData } = JSON.parse(req.body);
    const tokenArray = authorization?.split(" ");
    if (!tokenArray || !tokenArray[1]) {
      throw Error("Not authorized");
    }

    const validToken = await admin.auth().verifyIdToken(tokenArray[1]);

    if (!validToken.uid) {
      throw Error("No token valid");
    }

    await admin.auth().setCustomUserClaims(validToken.sub, { code });
    await admin
      .firestore()
      .collection("metadata")
      .doc(validToken.uid)
      .set({ code });
    await admin
      .firestore()
      .collection("referral")
      .doc(id)
      .set({ claimed: true, user: validToken.uid }, { merge: true });

    let userSlug = slugify(validToken.name);

    const sameSlug: { _id: string } | null = await getClient(true).fetch(
      slugInUse,
      { slug: userSlug }
    );

    if (sameSlug) {
      if (sameSlug._id !== validToken.uid) {
        if (providerData.screenName) {
          userSlug = slugify(providerData.screenName);
        } else {
          userSlug = slugify(validToken.name + generateKey(4));
        }
      }
    }

    await getClient(true).createOrReplace({
      _id: validToken.uid,
      _type: "user",
      name: validToken.name,
      slug: {
        _type: "slug",
        current: userSlug,
      },
      photo: {
        photoURL: validToken.picture,
      },
      social: {
        github: providerData?.screenName,
      },
    });

    res.status(200).json({ slug: userSlug });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "failed to fetch data" });
  }
};

export default handler;
