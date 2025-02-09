import { NextResponse } from "next/server";
import Key from '@/models/keys';
import Order from '@/models/order';
import connectToDB from '@/config/database';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');
    const amount = searchParams.get('amount');
    const email = searchParams.get('email');

    if (!paymentId || !email || !amount) {
      return NextResponse.json(
        { message: 'Missing paymentId, email, or amount in query parameters' },
        { status: 400 }
      );
    }

    let order = await Order.findOne({ payment_id: paymentId }).populate({ path: 'keys', model: Key });
    
    if (order) {
      return NextResponse.json({ keys: order.keys }, { status: 200 });
    }

    // Determine order type and required keys
    let type, numberOfKeys;
    if (amount === "30000") { type = "Solo"; numberOfKeys = 1; }
    else if (amount === "50000") { type = "Duo"; numberOfKeys = 2; }
    else { type = "Family"; numberOfKeys = 4; }

    // Find available keys
    //const availableKeys = await Key.find({ state: "available" }).limit(numberOfKeys);
    const availableKeys = await Key.find({ state: "reserved" }).limit(numberOfKeys);
    
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
