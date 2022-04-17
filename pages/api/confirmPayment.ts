// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

type Result = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sender = req.body.From;
  const message = req.body.Body;
  if (message.contains("sent") || message.contains("Sent")) {
    res.status(200).json({});
  }
  // confirm it's been verified via text again
}
