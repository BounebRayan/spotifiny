import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // Extract data from form data
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const key = formData.get("key") as string;
    const message = formData.get("message") as string;
    const files = formData.getAll("attachments") as File[];

    // Validate the required fields
    if (!key || !message || !email) {
      return NextResponse.json(
        { message: "Key and message and email are required" },
        { status: 400 }
      );
    }

    // Create the email content
    let attachmentsList = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email (can be a service email)
      to: "support@upgrader.zendesk.com",    // Receiver email
      subject: `${key}`, // Email subject
      text: `Message: ${message}`, // Plain text content
      html: `${message}`, // HTML content
      attachments: attachmentsList, // Attachments
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
