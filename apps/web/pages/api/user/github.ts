// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Repo } from "../../../types/sanity";

type Data = {
  repos?: Omit<Repo, "_type" | "_key">;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { user } = req.query;

    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const json: Data["repos"][] = await response.json();

    console.log(json);

    res.status(200).json({
      repos:
        json?.map((repo) => ({
          name: repo?.name,
          description: repo?.description,
          html_url: repo?.html_url,
          homepage: repo?.homepage,
          language: repo?.language,
        })) || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "failed to fetch data" });
  }
};

export default handler;
