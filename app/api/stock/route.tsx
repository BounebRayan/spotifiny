// /pages/api/stock.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://upgrader.cc/API/?stock");
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch country stock" }, { status: 500 });
  }
}
