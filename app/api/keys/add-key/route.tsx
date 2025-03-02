import { NextResponse } from "next/server";
import Key from "@/models/keys";

export async function POST(req: Request) {
  try {
    const { key,password } = await req.json();

    if (!key || !password) {
      return NextResponse.json(
        { message: "Key and password are required" },
        { status: 400 }
      );
    }

  const PASSWORD = process.env.PASSWORD;

    if (password !== PASSWORD) {
      return NextResponse.json(
        { message: "Wrong password" },
        { status: 403 }
      );
    }

    const newKey = new Key({
      key,
      state: "available", // New key will have 'available' state by default
    });

    await newKey.save();
    return NextResponse.json(
      { success: true, message: "Key added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding key:", error);
    return NextResponse.json(
      { success: false, message: "Error adding key" },
      { status: 500 }
    );
  }
}
