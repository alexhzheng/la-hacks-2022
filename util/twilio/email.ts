type People = {
  name: string;
  email: string;
};

export async function sendEmail(req: any) {
  const sender = req.body.shift();
  const recipients: People[] = req.body;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    "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"
  );
  const error = false;
  recipients.map((recipient: People, idx) => {
    const msg = {
      to: recipient.email, // Change to your recipient
      from: "billexchangetest@gmail.com", // Change to your verified sender
      subject: `You owe ${sender.name} money!`,
      html: `Here is the link to pay him!`,
    };
    sgMail
      .send(msg)
      .then((response: any) => {
        console.log("success!");
      })
      .catch((error: any) => {
        console.error(error);
        error = true;
      });
  });
  if (error) {
    return { success: false };
  } else {
    return { success: true };
  }
}
