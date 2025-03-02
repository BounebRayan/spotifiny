import { NextResponse } from "next/server";
import Key from '@/models/keys';
import Order from '@/models/order';
import connectToDB from '@/config/database';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    if (!password || !email) {
      return NextResponse.json(
        { message: 'Missing email or password in query parameters' },
        { status: 400 }
      );
    }

    const PASSWORD = process.env.PASSWORD;

    if (password !== PASSWORD) {
      return NextResponse.json(
        { message: 'Wrong password' },
        { status: 403 }
      );
    }

    let orders = await Order.find({ email }).populate({ path: 'keys', model: Key });

    if (!orders.length) {
      return NextResponse.json({ message: 'No orders found', keys: [] }, { status: 200 });
    }

    // Extract keys from all orders
    const keys = orders.flatMap(order => order.keys); 

    return NextResponse.json({ keys }, { status: 200 });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { message: 'Failed to process order', error },
      { status: 500 }
    );
  }
}
