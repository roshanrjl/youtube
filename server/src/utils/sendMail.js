import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transpoter.sendMail({
    from: process.env.Email_USER,
    to,
    subject,
    text,
  });
};
