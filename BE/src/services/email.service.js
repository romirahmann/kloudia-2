const nodemailer = require("nodemailer");

const trasnporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtp = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "OTP for verification",
    html: `
        <p>Kode OTP: <b> ${otp} </b> </p>
        <p> Berlaku selama 1 menit </p>
    `,
  };

  await trasnporter.sendMail(mailOptions);
};

module.exports = { sendOtp };
