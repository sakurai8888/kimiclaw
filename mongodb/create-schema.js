#!/usr/bin/env node
/**
 * MongoDB Schema Setup Script
 * Creates collections and indexes only (no data)
 * 
 * Usage: node create-schema.js
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/store';
const dbName = 'store';

async function createSchema() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // ============================================
    // DROP EXISTING COLLECTIONS (optional - remove if you want to keep data)
    // ============================================
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).drop();
      console.log(`🗑️  Dropped collection: ${col.name}`);
    }
    
    // ============================================
    // CREATE PRODUCTS COLLECTION
    // ============================================
    await db.createCollection('products', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['sku', 'name', 'price', 'status'],
          properties: {
            sku: { bsonType: 'string' },
            name: { bsonType: 'string' },
            nameEn: { bsonType: 'string' },
            description: { bsonType: 'string' },
            descriptionEn: { bsonType: 'string' },
            category: {
              bsonType: 'object',
              properties: {
                _id: { bsonType: 'objectId' },
                name: { bsonType: 'string' },
                slug: { bsonType: 'string' }
              }
            },
            tags: { bsonType: 'array', items: { bsonType: 'string' } },
            price: {
              bsonType: 'object',
              properties: {
                amount: { bsonType: 'int' },
                currency: { bsonType: 'string' },
                compareAtPrice: { bsonType: 'int' },
                cost: { bsonType: 'int' }
              }
            },
            inventory: {
              bsonType: 'object',
              properties: {
                quantity: { bsonType: 'int' },
                reserved: { bsonType: 'int' },
                available: { bsonType: 'int' },
                lowStockThreshold: { bsonType: 'int' },
                trackInventory: { bsonType: 'bool' },
                allowBackorder: { bsonType: 'bool' }
              }
            },
            variants: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  sku: { bsonType: 'string' },
                  name: { bsonType: 'string' },
                  price: { bsonType: 'object' },
                  inventory: { bsonType: 'object' },
                  attributes: { bsonType: 'object' },
                  isDefault: { bsonType: 'bool' }
                }
              }
            },
            images: {
              bsonType: 'object',
              properties: {
                main: { bsonType: 'string' },
                gallery: { bsonType: 'array', items: { bsonType: 'string' } },
                thumbnail: { bsonType: 'string' }
              }
            },
            seo: {
              bsonType: 'object',
              properties: {
                title: { bsonType: 'string' },
                description: { bsonType: 'string' },
                keywords: { bsonType: 'array', items: { bsonType: 'string' } },
                slug: { bsonType: 'string' }
              }
            },
            status: { 
              bsonType: 'string',
              enum: ['active', 'draft', 'archived']
            },
            visibility: { 
              bsonType: 'string',
              enum: ['visible', 'hidden']
            },
            featured: { bsonType: 'bool' },
            ratings: {
              bsonType: 'object',
              properties: {
                average: { bsonType: 'double' },
                count: { bsonType: 'int' }
              }
            },
            shipping: {
              bsonType: 'object',
              properties: {
                weight: { bsonType: 'int' },
                dimensions: { bsonType: 'object' },
                requiresShipping: { bsonType: 'bool' }
              }
            },
            musicDetails: {
              bsonType: 'object',
              properties: {
                releaseDate: { bsonType: 'date' },
                label: { bsonType: 'string' },
                format: { bsonType: 'string' },
                tracks: { bsonType: 'array' },
                genre: { bsonType: 'array', items: { bsonType: 'string' } }
              }
            },
            createdAt: { bsonType: 'date' },
            updatedAt: { bsonType: 'date' }
          }
        }
      }
    });
    console.log('✅ Created collection: products');
    
    // ============================================
    // CREATE CATEGORIES COLLECTION
    // ============================================
    await db.createCollection('categories', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'slug'],
          properties: {
            name: { bsonType: 'string' },
            nameEn: { bsonType: 'string' },
            slug: { bsonType: 'string' },
            description: { bsonType: 'string' },
            parentId: { bsonType: ['objectId', 'null'] },
            level: { bsonType: 'int' },
            sortOrder: { bsonType: 'int' },
            image: { bsonType: 'string' },
            isActive: { bsonType: 'bool' },
            productCount: { bsonType: 'int' },
            createdAt: { bsonType: 'date' },
            updatedAt: { bsonType: 'date' }
          }
        }
      }
    });
    console.log('✅ Created collection: categories');
    
    // ============================================
    // CREATE REVIEWS COLLECTION
    // ============================================
    await db.createCollection('reviews', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['productId', 'rating'],
          properties: {
            productId: { bsonType: 'objectId' },
            userId: { bsonType: 'objectId' },
            userName: { bsonType: 'string' },
            rating: { bsonType: 'int', minimum: 1, maximum: 5 },
            title: { bsonType: 'string' },
            content: { bsonType: 'string' },
            isVerifiedPurchase: { bsonType: 'bool' },
            helpful: { bsonType: 'int' },
            images: { bsonType: 'array', items: { bsonType: 'string' } },
            status: { 
              bsonType: 'string',
              enum: ['pending', 'approved', 'rejected']
            },
            createdAt: { bsonType: 'date' },
            updatedAt: { bsonType: 'date' }
          }
        }
      }
    });
    console.log('✅ Created collection: reviews');
    
    // ============================================
    // CREATE INVENTORY LOGS COLLECTION
    // ============================================
    await db.createCollection('inventory_logs', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['productId', 'type', 'quantity'],
          properties: {
            productId: { bsonType: 'objectId' },
            variantId: { bsonType: 'objectId' },
            type: { 
              bsonType: 'string',
              enum: ['sale', 'restock', 'adjustment', 'return']
            },
            quantity: { bsonType: 'int' },
            previousQuantity: { bsonType: 'int' },
            newQuantity: { bsonType: 'int' },
            reason: { bsonType: 'string' },
            userId: { bsonType: 'objectId' },
            createdAt: { bsonType: 'date' }
          }
        }
      }
    });
    console.log('✅ Created collection: inventory_logs');
    
    // ============================================
    // CREATE INDEXES
    // ============================================
    
    // Products indexes
    await db.collection('products').createIndex({ "sku": 1 }, { unique: true });
    await db.collection('products').createIndex({ "seo.slug": 1 }, { unique: true });
    await db.collection('products').createIndex({ "category.slug": 1 });
    await db.collection('products').createIndex({ "status": 1, "visibility": 1 });
    await db.collection('products').createIndex({ "price.amount": 1 });
    await db.collection('products').createIndex({ "ratings.average": -1 });
    await db.collection('products').createIndex({ "createdAt": -1 });
    await db.collection('products').createIndex({ "name": "text", "description": "text" });
    console.log('✅ Created indexes for products');
    
    // Categories indexes
    await db.collection('categories').createIndex({ "slug": 1 }, { unique: true });
    await db.collection('categories').createIndex({ "parentId": 1 });
    console.log('✅ Created indexes for categories');
    
    // Reviews indexes
    await db.collection('reviews').createIndex({ "productId": 1, "status": 1 });
    await db.collection('reviews').createIndex({ "userId": 1 });
    console.log('✅ Created indexes for reviews');
    
    // Inventory logs indexes
    await db.collection('inventory_logs').createIndex({ "productId": 1, "createdAt": -1 });
    console.log('✅ Created indexes for inventory_logs');
    
    console.log('\n🎉 Schema created successfully!');
    console.log(`📁 Database: ${dbName}`);
    console.log('📋 Collections: products, categories, reviews, inventory_logs');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

createSchema();
