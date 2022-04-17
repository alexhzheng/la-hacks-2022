import { generateQR } from "../qr";

const sendText = async (req: any) => {
  const to = req.body.to;
  const address = req.body.address;
  const accountSid = "ACa5ceefdcc9a786513fde8a91e243f44c";
  const authToken = "ea28bd97067cfbbf22d0737590a090e2";
  const client = require("twilio")(accountSid, authToken);
  const { qr, metamaskURL } = await generateQR(address, "1e16");

  await client.messages.create({
    body:  `Brandon Wang requests $30. Pay at ${metamaskURL}`,
    from: "9034146426",
    to: to
  });
}

export default sendText;