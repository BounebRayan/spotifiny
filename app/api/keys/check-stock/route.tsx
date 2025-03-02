import { NextResponse } from "next/server";
import Key from '@/models/keys';
import connectToDB from '@/config/database';

export async function GET(req: Request) {
    try {
      await connectToDB();
    //console.log('Connecting to database...');
      const Query = Key.find({state:"available"});
      const keys = await Query.countDocuments();
  
      return NextResponse.json(keys, { status: 200 });
    } catch (error) {
      console.error('Error fetching keys:', error);
      return NextResponse.json(
        { message: 'Failed to fetch keys', error},
        { status: 500 }
      );
    }
  }
