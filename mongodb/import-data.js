#!/usr/bin/env node
/**
 * MongoDB Data Import Script
 * Generates and imports sample data
 * 
 * Usage: node import-data.js
 */

const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/store';
const dbName = 'store';

// Sample data generators
const categoriesData = [
  {
    _id: new ObjectId(),
    name: "アルバム",
    nameEn: "Albums",
    slug: "albums",
    description: "CD・レコード・デジタルアルバム",
    parentId: null,
    level: 1,
    sortOrder: 1,
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=300&fit=crop",
    isActive: true,
    productCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "グッズ",
    nameEn: "Goods",
    slug: "goods",
    description: "Tシャツ、タオル、アクセサリー",
    parentId: null,
    level: 1,
    sortOrder: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    isActive: true,
    productCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "ライブグッズ",
    nameEn: "Live Goods",
    slug: "live-goods",
    description: "ライブ限定グッズ",
    parentId: null,
    level: 1,
    sortOrder: 3,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop",
    isActive: true,
    productCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "DVD/Blu-ray",
    nameEn: "DVD/Blu-ray",
    slug: "dvd-blu-ray",
    description: "ライブDVD、ドキュメンタリー",
    parentId: null,
    level: 1,
    sortOrder: 4,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
    isActive: true,
    productCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

function generateProducts(categories) {
  const albumCategory = categories.find(c => c.slug === 'albums');
  const goodsCategory = categories.find(c => c.slug === 'goods');
  const liveGoodsCategory = categories.find(c => c.slug === 'live-goods');
  const dvdCategory = categories.find(c => c.slug === 'dvd-blu-ray');
  
  return [
    // Albums
    {
      _id: new ObjectId(),
      sku: "MC-ALBUM-001",
      name: "Mr.Children Album - 重力と呼吸",
      nameEn: "Gravity and Breathing",
      description: "2024年最新アルバム。桜井和寿の詩的な歌詞とバンドの圧倒的なサウンドが融合した作品。",
      descriptionEn: "Latest 2024 album featuring poetic lyrics and powerful band sound.",
      category: { _id: albumCategory._id, name: albumCategory.name, slug: albumCategory.slug },
      tags: ["CD", "New Release", "Limited Edition", "2024"],
      price: { amount: 3500, currency: "JPY", compareAtPrice: 4000 },
      inventory: { quantity: 150, reserved: 10, available: 140, lowStockThreshold: 20, trackInventory: true, allowBackorder: false },
      variants: [
        { sku: "MC-ALBUM-001-LTD", name: "限定版", nameEn: "Limited Edition", price: { amount: 5500, currency: "JPY" }, inventory: { quantity: 50, available: 45 }, attributes: { edition: "limited", includes: ["Photo Book", "DVD", "Poster"] }, isDefault: false },
        { sku: "MC-ALBUM-001-STD", name: "通常版", nameEn: "Standard Edition", price: { amount: 3500, currency: "JPY" }, inventory: { quantity: 100, available: 95 }, attributes: { edition: "standard" }, isDefault: true }
      ],
      images: { main: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop"], thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children 重力と呼吸 アルバム", description: "2024年最新アルバム、限定版・通常版発売中", keywords: ["Mr.Children", "アルバム", "CD", "J-POP"], slug: "mrchildren-gravity-and-breathing" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.8, count: 256 },
      shipping: { weight: 300, dimensions: { length: 14, width: 12.5, height: 1, unit: "cm" }, requiresShipping: true },
      musicDetails: { releaseDate: new Date("2024-02-01"), label: "Toy's Factory", format: "CD", tracks: [{ number: 1, title: "重力と呼吸", duration: "4:32" }, { number: 2, title: "Documentary", duration: "5:15" }, { number: 3, title: "光の射す方へ", duration: "4:08" }], genre: ["J-POP", "Rock"] },
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      _id: new ObjectId(),
      sku: "MC-ALBUM-002",
      name: "Mr.Children - SOUNDTRACKS",
      nameEn: "SOUNDTRACKS",
      description: "映画『SOUNDTRACKS』主題歌集。劇中で使用された全楽曲を収録。",
      descriptionEn: "Soundtrack collection from the movie 'SOUNDTRACKS'.",
      category: { _id: albumCategory._id, name: albumCategory.name, slug: albumCategory.slug },
      tags: ["CD", "Soundtrack", "Movie", "Limited"],
      price: { amount: 3200, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 80, reserved: 5, available: 75, lowStockThreshold: 15, trackInventory: true, allowBackorder: false },
      variants: [{ sku: "MC-ALBUM-002-STD", name: "通常版", nameEn: "Standard Edition", price: { amount: 3200, currency: "JPY" }, inventory: { quantity: 80, available: 75 }, attributes: { edition: "standard" }, isDefault: true }],
      images: { main: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop", gallery: [], thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children SOUNDTRACKS", description: "映画主題歌集", keywords: ["Mr.Children", "サウンドトラック", "映画"], slug: "mrchildren-soundtracks" },
      status: "active", visibility: "visible", featured: false,
      ratings: { average: 4.6, count: 128 },
      shipping: { weight: 280, dimensions: { length: 14, width: 12.5, height: 1, unit: "cm" }, requiresShipping: true },
      musicDetails: { releaseDate: new Date("2023-08-15"), label: "Toy's Factory", format: "CD", tracks: [{ number: 1, title: "SOUNDTRACKS", duration: "4:45" }], genre: ["J-POP", "Soundtrack"] },
      createdAt: new Date(), updatedAt: new Date()
    },
    // Goods
    {
      _id: new ObjectId(),
      sku: "MC-GOODS-001",
      name: "Mr.Children ツアーTシャツ 2024",
      nameEn: "Mr.Children Tour T-Shirt 2024",
      description: "2024年ツアー公式Tシャツ。高品質コットン100%、オリジナルデザイン。",
      descriptionEn: "Official 2024 tour T-shirt. 100% premium cotton.",
      category: { _id: goodsCategory._id, name: goodsCategory.name, slug: goodsCategory.slug },
      tags: ["T-Shirt", "Tour Goods", "Apparel", "2024"],
      price: { amount: 4500, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 200, reserved: 25, available: 175, lowStockThreshold: 30, trackInventory: true, allowBackorder: true },
      variants: [
        { sku: "MC-GOODS-001-S", name: "Sサイズ", nameEn: "Size S", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 50, available: 40 }, attributes: { size: "S", color: "Black" }, isDefault: false },
        { sku: "MC-GOODS-001-M", name: "Mサイズ", nameEn: "Size M", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 60, available: 55 }, attributes: { size: "M", color: "Black" }, isDefault: true },
        { sku: "MC-GOODS-001-L", name: "Lサイズ", nameEn: "Size L", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 50, available: 45 }, attributes: { size: "L", color: "Black" }, isDefault: false },
        { sku: "MC-GOODS-001-XL", name: "XLサイズ", nameEn: "Size XL", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 40, available: 35 }, attributes: { size: "XL", color: "Black" }, isDefault: false }
      ],
      images: { main: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"], thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children ツアーTシャツ 2024", description: "2024年ツアー公式Tシャツ", keywords: ["Mr.Children", "Tシャツ", "グッズ"], slug: "mrchildren-tour-tshirt-2024" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.9, count: 128 },
      shipping: { weight: 200, dimensions: { length: 25, width: 20, height: 3, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      _id: new ObjectId(),
      sku: "MC-GOODS-002",
      name: "Mr.Children タオル",
      nameEn: "Mr.Children Towel",
      description: "ライブで大活躍！大判サイズの公式タオル。",
      descriptionEn: "Large official towel for live concerts.",
      category: { _id: liveGoodsCategory._id, name: liveGoodsCategory.name, slug: liveGoodsCategory.slug },
      tags: ["Towel", "Live Goods", "Concert"],
      price: { amount: 2500, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 300, reserved: 50, available: 250, lowStockThreshold: 50, trackInventory: true, allowBackorder: true },
      variants: [{ sku: "MC-GOODS-002-STD", name: "フリーサイズ", nameEn: "Free Size", price: { amount: 2500, currency: "JPY" }, inventory: { quantity: 300, available: 250 }, attributes: { size: "Free", color: "White/Purple" }, isDefault: true }],
      images: { main: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&h=600&fit=crop", gallery: [], thumbnail: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children タオル", description: "公式ライブタオル", keywords: ["Mr.Children", "タオル", "ライブ"], slug: "mrchildren-towel" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.7, count: 89 },
      shipping: { weight: 150, dimensions: { length: 30, width: 20, height: 2, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    },
    // DVD
    {
      _id: new ObjectId(),
      sku: "MC-DVD-001",
      name: "Mr.Children Tour 2023 -  Live DVD",
      nameEn: "Mr.Children Tour 2023 Live DVD",
      description: "2023年ツアーの模様を完全収録。特典映像付き。",
      descriptionEn: "Complete 2023 tour footage with bonus content.",
      category: { _id: dvdCategory._id, name: dvdCategory.name, slug: dvdCategory.slug },
      tags: ["DVD", "Live", "Tour", "2023"],
      price: { amount: 5800, currency: "JPY", compareAtPrice: 6500 },
      inventory: { quantity: 100, reserved: 15, available: 85, lowStockThreshold: 20, trackInventory: true, allowBackorder: false },
      variants: [
        { sku: "MC-DVD-001-BD", name: "Blu-ray", nameEn: "Blu-ray", price: { amount: 6800, currency: "JPY" }, inventory: { quantity: 50, available: 40 }, attributes: { format: "Blu-ray" }, isDefault: false },
        { sku: "MC-DVD-001-DVD", name: "DVD", nameEn: "DVD", price: { amount: 5800, currency: "JPY" }, inventory: { quantity: 50, available: 45 }, attributes: { format: "DVD" }, isDefault: true }
      ],
      images: { main: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop", gallery: [], thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children Tour 2023 DVD", description: "ライブDVD", keywords: ["Mr.Children", "DVD", "ライブ"], slug: "mrchildren-tour-2023-dvd" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.9, count: 312 },
      shipping: { weight: 200, dimensions: { length: 19, width: 13.5, height: 1.5, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    }
  ];
}

function generateReviews(products) {
  const reviews = [];
  const comments = [
    { title: "最高のアルバム！", content: "桜井さんの歌声が心に響きます。", rating: 5 },
    { title: "素晴らしい", content: "期待以上の出来栄えでした。", rating: 5 },
    { title: "良い買い物", content: "デザインも品質も満足です。", rating: 4 },
    { title: "大満足", content: "また購入したいです。", rating: 5 },
    { title: "おすすめ", content: "ファン必見のアイテムです。", rating: 5 }
  ];
  
  products.forEach(product => {
    const numReviews = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numReviews; i++) {
      const comment = comments[Math.floor(Math.random() * comments.length)];
      reviews.push({
        _id: new ObjectId(),
        productId: product._id,
        userId: new ObjectId(),
        userName: `ファン${Math.floor(Math.random() * 1000) + 1}`,
        rating: comment.rating,
        title: comment.title,
        content: comment.content,
        isVerifiedPurchase: Math.random() > 0.3,
        helpful: Math.floor(Math.random() * 50),
        images: [],
        status: "approved",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
  });
  
  return reviews;
}

async function importData() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Clear existing data
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('reviews').deleteMany({});
    await db.collection('inventory_logs').deleteMany({});
    console.log('🗑️  Cleared existing data');
    
    // Insert categories
    await db.collection('categories').insertMany(categoriesData);
    console.log(`✅ Inserted ${categoriesData.length} categories`);
    
    // Generate and insert products
    const productsData = generateProducts(categoriesData);
    await db.collection('products').insertMany(productsData);
    console.log(`✅ Inserted ${productsData.length} products`);
    
    // Generate and insert reviews
    const reviewsData = generateReviews(productsData);
    await db.collection('reviews').insertMany(reviewsData);
    console.log(`✅ Inserted ${reviewsData.length} reviews`);
    
    // Update category product counts
    for (const category of categoriesData) {
      const count = await db.collection('products').countDocuments({ "category.slug": category.slug });
      await db.collection('categories').updateOne(
        { _id: category._id },
        { $set: { productCount: count } }
      );
    }
    console.log('✅ Updated category product counts');
    
    console.log('\n🎉 Data imported successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${categoriesData.length}`);
    console.log(`   - Products: ${productsData.length}`);
    console.log(`   - Reviews: ${reviewsData.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

importData();
