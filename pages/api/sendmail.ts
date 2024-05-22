import type { NextApiRequest, NextApiResponse } from "next";
import Mailgun, { Interfaces } from "mailgun.js";
import formdata from "form-data";

const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAILGUN_FROM_EMAIL_ADDRESS,
  MAILGUN_CONTACT_TO_EMAIL_ADDRESS,
} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: string; error: boolean }>
) {
  const { mail, name, text } = req.body;
  if (
    typeof mail !== "string" ||
    typeof name !== "string" ||
    typeof text !== "string"
  ) {
    res
      .status(400)
      .json({ data: "Missing or incorrect parameters", error: true });
    return;
  }

  if (
    typeof MAILGUN_API_KEY !== "string" ||
    typeof MAILGUN_DOMAIN !== "string" ||
    typeof MAILGUN_FROM_EMAIL_ADDRESS !== "string" ||
    typeof MAILGUN_CONTACT_TO_EMAIL_ADDRESS !== "string"
  ) {
    res
      .status(400)
      .json({ data: "Missing or incorrect parameters", error: true });
    return;
  }

  const mailgun = new Mailgun(formdata);
  const mg: Interfaces.IMailgunClient = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY,
  });

  try{
    await mg.messages
    .create(MAILGUN_DOMAIN, {
      from: MAILGUN_FROM_EMAIL_ADDRESS,
      to: [MAILGUN_CONTACT_TO_EMAIL_ADDRESS],
      subject: `Mail from ${mail} name ${name}`,
      text,
    });

  }
  catch(e){
    res
      .status(400)
      .json({ data: "not ok", error: true });
    return;
  }

  res.status(200).json({ data: "ok", error: false });
}
