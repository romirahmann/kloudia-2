import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const transporter = nodemailer.createTransport({
  host: 'mail.prindo.co.id',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtp = async (to, otp) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: "OTP for verification",
    html: `
      <div style="background-color: #f2f4f6; padding: 40px 0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; background-color: white; margin: auto; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h1 style="color: #1a73e8; text-align: center;">Kloudia</h1>
          <h2 style="color: #333; text-align: center;">Kode OTP Anda</h2>
          <p style="font-size: 16px; color: #555;">Halo,</p>
          <p style="font-size: 16px; color: #555;">
            Kami menerima permintaan untuk reset password akun Anda. Gunakan kode di bawah ini untuk verifikasi:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #1a73e8;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #888;">
            Kode ini hanya berlaku selama <strong>1 menit</strong>. Jika Anda tidak meminta ini, abaikan saja email ini.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            © ${new Date().getFullYear()} Kloudia. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendOtp };
