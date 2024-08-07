import getDb from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const {searchParams} = new URL(request.url);
    const user1 = searchParams.get('user')
    const db = await getDb('shooter');
    const collection = db.collection('shooter_stats');
    const data = await collection.find({user:user1}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
