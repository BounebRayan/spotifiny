import { NextResponse } from "next/server";
import Key from '@/models/keys';
import Order from '@/models/order';
import connectToDB from '@/config/database';

export async function POST(req: Request) {
  try {

    const { paymentId, type, email, password } = await req.json();

    if (!paymentId || !email || !type || !password) {
      return NextResponse.json(
        { message: 'Missing paymentId, email, type, or password in query parameters' },
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
    await connectToDB();
    let order = await Order.findOne({ payment_id: paymentId }).populate({ path: 'keys', model: Key });
    
    if (order) {
      return NextResponse.json({ keys: order.keys }, { status: 200 });
    }

    // Determine order type and required keys
    let numberOfKeys;
    if (type == "Solo") { numberOfKeys = 1; }
    else if (type === "Duo") {numberOfKeys = 2; }
    else { numberOfKeys = 4; }

    // Find available keys
    const availableKeys = await Key.find({ state: "available" }).limit(numberOfKeys);

    
    if (availableKeys.length < numberOfKeys) {
      return NextResponse.json({ message: 'Not enough available keys' }, { status: 404 });
    }

    // Create new order
    order = await Order.create({
      type,
      payment_id: paymentId,
      email,
      orderDate: new Date(),
      keys: availableKeys.map(key => key._id),
    });

    // Update keys to mark them as sold
    await Key.updateMany(
      { _id: { $in: availableKeys.map(key => key._id) } },
      { $set: { state: "sold", orderId: order._id } }
    );

    return NextResponse.json({ keys: availableKeys }, { status: 200 });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { message: 'Failed to process order', error },
      { status: 500 }
    );
  }
}
