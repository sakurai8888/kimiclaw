import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('store');
    
    // Get product details
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectId(params.id) });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Get inventory details
    const inventory = {
      quantity: product.inventory?.quantity || 0,
      available: product.inventory?.available || 0,
      lowStockThreshold: product.inventory?.lowStockThreshold || 10,
      allowBackorder: product.inventory?.allowBackorder || false
    };
    
    // Get reviews
    const reviews = await db
      .collection('reviews')
      .find({ 
        productId: new ObjectId(params.id),
        status: 'approved'
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    
    return NextResponse.json({
      product: {
        _id: product._id,
        sku: product.sku,
        name: product.name,
        nameEn: product.nameEn,
        description: product.description,
        descriptionEn: product.descriptionEn,
        price: product.price,
        variants: product.variants || [],
        images: product.images,
        seo: product.seo,
        ratings: product.ratings,
        shipping: product.shipping,
        musicDetails: product.musicDetails
      },
      inventory,
      reviews: reviews.map(r => ({
        _id: r._id,
        userName: r.userName,
        rating: r.rating,
        title: r.title,
        content: r.content,
        isVerifiedPurchase: r.isVerifiedPurchase,
        helpful: r.helpful,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
