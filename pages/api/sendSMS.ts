// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sendSMS from "../../util/twilio/sms";

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
  try {
    const result: any = await sendSMS(req);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ name: "Failed to send SMS" });
  }
}
