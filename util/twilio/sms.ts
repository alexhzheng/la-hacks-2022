import { generateQR, uploadImage } from "../qr";
import { getEthPriceInUSD } from "../../util/rpc";

const sendText = async (req: any) => {
  const to = req.body.to;
  const address = req.body.address;
  const amount = req.body.amount;
  const accountSid = "ACa5ceefdcc9a786513fde8a91e243f44c";
  const authToken = "ea28bd97067cfbbf22d0737590a090e2";
  const client = require("twilio")(accountSid, authToken);
  const qrResult = await generateQR(address, amount);
  const usdEquivalent = amount / 1e18 * await getEthPriceInUSD(); // wei / (wei/eth) * (usd/eth)
  // if (qrResult) {
  //   uploadImage(qrResult?.qr);
  // }

  await client.messages.create({
    body:  `${address} requests $${usdEquivalent.toFixed(2)}. Pay at ${qrResult?.metamaskURL}`,
    from: "9034146426",
    to: to
  });
}

export default sendText;