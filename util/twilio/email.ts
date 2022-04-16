export async function sendEmail() {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: "alex.h.zheng@gmail.com", // Change to your recipient
    from: "billexchangetest@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then((data: any) => {
      console.log("Email sent");
      console.log(data);
      return data;
    })
    .catch((error: any) => {
      console.error(error);
      return { success: false };
    });
}
