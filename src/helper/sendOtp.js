const { generateOtpMessage } = require("../data/messageBody");
const { generateRandomString } = require("./rendomString");
const nodemailer = require('nodemailer');

const bcrypt = require("bcrypt");
require("dotenv").config();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

exports.sendOtp = async (email) => {
  try {
    const otpCode = generateRandomString();
    const messageBody = generateOtpMessage(otpCode);
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: "rajsharma0040@gmail.com",
        pass: "Raj@5212",
      },
    });

    const info = await transporter.sendMail({
      from: "rajsharma0040@gmail.com",
      to: email,
      subject: "Hello",
      text: "Hello world?",
      html: messageBody,
    });
    console.log({ info })
    const hashedOtp = await bcrypt.hash(otpCode.toString(), 10);
    return hashedOtp;
  } catch (error) {
    console.error("Error:", error);
  }
};



