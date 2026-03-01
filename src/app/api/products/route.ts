import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('store');
    
    const products = await db
      .collection('products')
      .find({ status: 'active', visibility: 'visible' })
      .project({
        _id: 1,
        sku: 1,
        name: 1,
        nameEn: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        images: 1,
        seo: 1,
        featured: 1,
        ratings: 1
      })
      .toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
