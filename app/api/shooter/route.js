import getDb from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await getDb('shooter');
    const collection = db.collection('shooter_stats');
    const check = await collection.findOne(data);
    if(check === null){
        const result = await collection.insertOne(data);
    }
    return NextResponse.json({ success: true});
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ success: false, error: 'Failed to insert data' }, { status: 500 });
  }
}
