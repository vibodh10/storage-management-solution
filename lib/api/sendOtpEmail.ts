"use server";

import axios from "axios";

const BREVO_API_KEY = process.env.BREVO_API_KEY;

export const sendOtpEmail = async (toEmail: string, otpCode: number) => {
  const url = "https://api.brevo.com/v3/smtp/email";

  const data = {
    sender: { email: "ghimab@gmail.com", name: "Store It" },
    to: [{ email: toEmail }],
    subject: "Your OTP Code",
    htmlContent: `<html><body><h1>Your OTP Code</h1><p>Your OTP is: <strong>${otpCode}</strong></p></body></html>`,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("OTP email sent successfully");
    return true;
  } catch (error) {
    console.error(
      "Failed to send OTP email:",
      error.response?.data || error.message,
    );
    return false;
  }
};
