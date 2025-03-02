import { NextResponse } from "next/server";
import Key from '@/models/keys';
import Order from '@/models/order';
import connectToDB from '@/config/database';

export async function GET(req: Request) {
    try {
        await connectToDB();
        // console.log('Connecting to database...');

        // Count the number of sold keys
        const keysCount = await Key.countDocuments({ state: "sold" });

        // Count the number of unique email addresses in orders
        const uniqueEmailsCount = await Order.distinct("email").then(emails => emails.length);

        return NextResponse.json(
            { soldKeys: keysCount, uniqueEmails: uniqueEmailsCount }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { message: 'Failed to fetch data', error }, 
            { status: 500 }
        );
    }
}
