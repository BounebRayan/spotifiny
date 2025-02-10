import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // Extract data from form data
    const {  email, key } = await req.json();

    // Validate the required fields
    if (!key || !email) {
      return NextResponse.json(
        { message: "Keys and email are required" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email (can be a service email)
      to: email,    // Receiver email
      subject: "your spotifiny keys", // Email subject
      text: `keys: ${key}`, // Plain text content
      html: `${key}`, // HTML content
    };

    // Create a transporter to send the email
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Send the email
    transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
