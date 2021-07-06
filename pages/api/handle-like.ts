import { SanityDocument } from "@sanity/client";
import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../lib/sanity";

// This token is necessary so that Sanity know whether the server is allowed to edit or not
sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id }: { _id: string } = JSON.parse(req.body);
  console.log(process.env.HELLO_NAME);

  try {
    const data: SanityDocument<{ likes: number }> = await sanityClient
      .patch(_id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();

    res.status(200).json({ likes: data.likes });
  } catch (err) {
    console.error(err);
  }
};

export default handler;
