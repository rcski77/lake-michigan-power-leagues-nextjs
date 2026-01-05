import { client } from '@/src/sanity/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `*[_type == "powerLeague"] | order(startDate desc){
      title,
      registrationLink
    }`;
    
    const data = await client.fetch(query);
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching leagues from Sanity:", error);
    return NextResponse.json([], { status: 500 });
  }
}
