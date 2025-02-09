// /pages/api/upgrade.ts
import { NextResponse } from 'next/server';

interface UpgradeRequestBody {
  key: string;
  usr: string;
  pwd: string;
  country: string;
}

export async function GET(req: Request) {
  const { key, usr, pwd, country }: UpgradeRequestBody = await req.json();

  try {
    const response = await fetch(
      `https://upgrader.cc/API/?upgrade=${key}&login=${encodeURIComponent(usr)}&pwd=${encodeURIComponent(pwd)}&country=${country}`
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Upgrade request failed" }, { status: 500 });
  }
}
