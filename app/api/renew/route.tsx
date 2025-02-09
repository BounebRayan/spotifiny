// /pages/api/renew.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const key = searchParams.get('key');
  const usr = searchParams.get('usr');
  const pwd = searchParams.get('pwd');
  const newEmail = searchParams.get('newemail');
  const newPwd = searchParams.get('newpwd');
  const country = searchParams.get('country');

  if (!key || !usr || !pwd || !newEmail || !newPwd || !country) {
    return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://upgrader.cc/API/?renew=${key}&login=${encodeURIComponent(usr)}&pwd=${encodeURIComponent(pwd)}&newemail=${encodeURIComponent(newEmail)}&newpwd=${encodeURIComponent(newPwd)}&country=${country}`
    );
    const data = await response.json();

    return NextResponse.json({
      message: data.message || 'Renewal successful!'
    });
  } catch (error) {
    return NextResponse.json({ message: 'Renewal request failed' }, { status: 500 });
  }
}
