// /pages/api/renew.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { key, spotifyusername, pwd, country, newEmail } = await req.json();
  
  if (!key || !spotifyusername || !pwd) {
    return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://upgrader.cc/API/?renew=${key}&login=${encodeURIComponent(spotifyusername)}&pwd=${encodeURIComponent(pwd)}&newemail=${encodeURIComponent(newEmail)}&country=${country}`
    );
    console.log(`https://upgrader.cc/API/?renew=${key}&login=${encodeURIComponent(spotifyusername)}&pwd=${encodeURIComponent(pwd)}&newemail=${encodeURIComponent(newEmail)}&country=${country}`);
    const data = await response.json();

    return NextResponse.json({
      message: data.message || 'Renewal successful!'
    });
  } catch (error) {
    return NextResponse.json({ message: 'Renewal request failed' }, { status: 500 });
  }
}
