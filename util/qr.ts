import QRCode from "qrcode";

/**
 * Creates data url of a QR code for metamask link sending.
 * @param addr
 * @param amount
 * @returns
 */
const generateQR = async (addr: string, amount: string) => {
  const amt = amount ?? "1e16";
  const metamaskURL = `https://metamask.app.link/send/${addr}@4?value=${amt}`;
  try {
    const x = await QRCode.toDataURL(metamaskURL);
    return x;
  } catch (err) {
    console.error(err);
  }
};

export { generateQR };
