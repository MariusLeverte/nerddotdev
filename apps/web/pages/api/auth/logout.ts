// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { removeCookies } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    removeCookies("nerdAuthToken", { req, res });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export default handler;
