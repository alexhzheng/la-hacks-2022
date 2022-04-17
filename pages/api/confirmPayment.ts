// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addPayment } from "../../util/firebase";
import { checkTransaction, getProvider } from "../../util/rpc";
import { sendConfirmationText } from "../../util/twilio/sms";

type Data = {
  sender: any,
  message: any,
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
  sendConfirmationText(sender, `Your payment is being confirmed!`);
  const provider = await getProvider();
  const transaction = await checkTransaction(provider, message, sender);
  if (transaction) {
    await addPayment(
      {
        address: transaction.receiver || "",
        phoneNumber: transaction.senderPhone,
        hash: message,
        amount: transaction.amount
      });
  } else {
    sendConfirmationText(sender, `Your payment could not be confirmed, please try again.`);
  }
  res.status(200).json({ sender, message });
}
