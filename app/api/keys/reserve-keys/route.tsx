import { NextResponse } from "next/server";
import Key from '@/models/keys';
import connectToDB from '@/config/database';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const number = parseInt(searchParams.get('number') || "1");

    if (isNaN(number) || number <= 0) {
      return NextResponse.json(
        { message: "Invalid number parameter" },
        { status: 400 }
      );
    }

    // Fetch available keys
    const availableKeys = await Key.find({ state: "available" })
      .limit(number)
      .lean(); // Convert to plain JavaScript objects

    if (availableKeys.length < number) {
      return NextResponse.json(
        { message: "Not enough keys available" },
        { status: 404 }
      );
    }

    // Get key IDs
    const keyIds = availableKeys.map(key => key._id);

    // Set expiration time for reservation (e.g., 10 minutes from now)
    const reservationExpiration = new Date();
    reservationExpiration.setMinutes(reservationExpiration.getMinutes() + 12); // 10 minutes expiration

    // Mark keys as reserved
    await Key.updateMany(
      { _id: { $in: keyIds } },
      { $set: { state: "reserved", reservedUntil: reservationExpiration  } }
    );
    return NextResponse.json({ status: 200 });

  } catch (error) {
    console.error("Error fetching keys:", error);
    return NextResponse.json(
      { message: "Failed to fetch keys", error },
      { status: 500 }
    );
  }
}
