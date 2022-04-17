import axios from "axios";
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
    const qr = await QRCode.toDataURL(metamaskURL, { errorCorrectionLevel: 'L' });
    // console.log("qr is:", qr);
    return { qr, metamaskURL };
  } catch (err) {
    console.error(err);
  }
};

// upload a base64 encoded image to freeimage.host api
const uploadImage = async (qr: string) => {
  const apiKey = "6d207e02198a847aa98d0a2a901485a5";
  const url = `https://freeimage.host/api/1/upload?key=${apiKey}&source=${qr}&format=json`;
  try {
    const res = await axios.post(url);
    console.log(res.data.image.url);
  } catch (err) {
    console.error(err);
  }
};

export { generateQR, uploadImage };
