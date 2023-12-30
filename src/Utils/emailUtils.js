// const nodemailer = require("nodemailer");
import * as nodemailer from "nodemailer";
const path = require("path");
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      secure: Boolean(process.env.SECURE),
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: text,
      attachments: attach,
    });
    console.log("Email sent successfully");
  } catch (e) {
    console.log("Email not sent");
    console.log(e);
  }
};
