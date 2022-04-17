// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { checkTransaction, getProvider } from "../../util/rpc";
import { sendConfirmationText } from "../../util/twilio/sms";

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
  const provider = await getProvider();
  sendConfirmationText(sender, `${sender} ${message} Your transaction is being confirmed!`);
  checkTransaction(provider, message, sender);
  // console.log("checking!!");
  res.status(200);
}
