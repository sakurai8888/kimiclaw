#!/usr/bin/env node
/**
 * Enhanced MongoDB Data Seeding Script
 * Populates store with more realistic Mr.Children products
 */

require('dotenv').config({ path: '../.env.local' });

const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/store';
const dbName = 'store';

// Enhanced categories
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
  },
  {
    _id: new ObjectId(),
    name: "書籍",
    nameEn: "Books",
    slug: "books",
    description: "写真集、楽譜、書籍",
    parentId: null,
    level: 1,
    sortOrder: 5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
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
  const booksCategory = categories.find(c => c.slug === 'books');
  
  return [
    // Albums - 5 items
    {
      _id: new ObjectId(),
      sku: "MC-ALBUM-001",
      name: "miss you (Limited Edition)",
      nameEn: "miss you (Limited Edition)",
      description: "2024年最新シングル。初回限定盤にはDVDと豪華ブックレット付属。",
      descriptionEn: "2024 latest single. First press limited edition includes DVD and deluxe booklet.",
      category: { _id: albumCategory._id, name: albumCategory.name, slug: albumCategory.slug },
      tags: ["CD", "New Release", "Limited Edition", "2024"],
      price: { amount: 3500, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 200, reserved: 15, available: 185, lowStockThreshold: 30, trackInventory: true, allowBackorder: false },
      variants: [
        { sku: "MC-ALBUM-001-LTD", name: "初回限定盤", nameEn: "Limited Edition", price: { amount: 3500, currency: "JPY" }, inventory: { quantity: 100, available: 90 }, attributes: { edition: "limited", includes: ["DVD", "Photo Booklet", "Sticker"] }, isDefault: true }
      ],
      images: { main: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop"], thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children miss you 初回限定盤", description: "2024年最新シングル", keywords: ["Mr.Children", "miss you", "CD", "限定盤"], slug: "mrchildren-miss-you-limited" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.9, count: 328 },
      shipping: { weight: 300, dimensions: { length: 14, width: 12.5, height: 1.5, unit: "cm" }, requiresShipping: true },
      musicDetails: { releaseDate: new Date("2024-02-14"), label: "Toy's Factory", format: "CD+DVD", tracks: [{ number: 1, title: "miss you", duration: "4:52" }, { number: 2, title: "星になれたら", duration: "5:08" }], genre: ["J-POP", "Rock"] },
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      _id: new ObjectId(),
      sku: "MC-ALBUM-002",
      name: "SOUNDTRACKS",
      nameEn: "SOUNDTRACKS",
      description: "映画『SOUNDTRACKS』主題歌集。劇中で使用された全楽曲を収録。",
      descriptionEn: "Soundtrack collection from the movie 'SOUNDTRACKS'.",
      category: { _id: albumCategory._id, name: albumCategory.name, slug: albumCategory.slug },
      tags: ["CD", "Soundtrack", "Movie"],
      price: { amount: 3200, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 150, reserved: 8, available: 142, lowStockThreshold: 20, trackInventory: true, allowBackorder: false },
      variants: [{ sku: "MC-ALBUM-002-STD", name: "通常盤", nameEn: "Standard Edition", price: { amount: 3200, currency: "JPY" }, inventory: { quantity: 150, available: 142 }, attributes: { edition: "standard" }, isDefault: true }],
      images: { main: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop", gallery: [], thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children SOUNDTRACKS", description: "映画主題歌集", keywords: ["Mr.Children", "SOUNDTRACKS", "映画"], slug: "mrchildren-soundtracks" },
      status: "active", visibility: "visible", featured: false,
      ratings: { average: 4.7, count: 156 },
      shipping: { weight: 280, dimensions: { length: 14, width: 12.5, height: 1, unit: "cm" }, requiresShipping: true },
      musicDetails: { releaseDate: new Date("2023-08-15"), label: "Toy's Factory", format: "CD", tracks: [{ number: 1, title: "SOUNDTRACKS", duration: "4:45" }], genre: ["J-POP", "Soundtrack"] },
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      _id: new ObjectId(),
      sku: "MC-ALBUM-003",
      name: "重力と呼吸",
      nameEn: "Gravity and Breathing",
      description: "30周年記念アルバム。過去と未来を繋ぐ渾身の作品。",
      descriptionEn: "30th anniversary album connecting past and future.",
      category: { _id: albumCategory._id, name: albumCategory.name, slug: albumCategory.slug },
      tags: ["CD", "Album", "Anniversary"],
      price: { amount: 3800, currency: "JPY", compareAtPrice: 4200 },
      inventory: { quantity: 300, reserved: 45, available: 255, lowStockThreshold: 50, trackInventory: true, allowBackorder: true },
      variants: [
        { sku: "MC-ALBUM-003-LTD", name: "完全生産限定盤", nameEn: "Complete Limited Edition", price: { amount: 6800, currency: "JPY" }, inventory: { quantity: 100, available: 85 }, attributes: { edition: "complete", includes: ["Photo Book", "DVD", "Acrylic Stand"] }, isDefault: false },
        { sku: "MC-ALBUM-003-STD", name: "通常盤", nameEn: "Standard Edition", price: { amount: 3800, currency: "JPY" }, inventory: { quantity: 200, available: 170 }, attributes: { edition: "standard" }, isDefault: true }
      ],
      images: { main: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600&h=600&fit=crop"], thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children 重力と呼吸", description: "30周年記念アルバム", keywords: ["Mr.Children", "重力と呼吸", "30周年"], slug: "mrchildren-gravity-breathing" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.8, count: 512 },
      shipping: { weight: 350, dimensions: { length: 15, width: 13, height: 2, unit: "cm" }, requiresShipping: true },
      musicDetails: { releaseDate: new Date("2022-12-01"), label: "Toy's Factory", format: "CD", tracks: [{ number: 1, title: "重力と呼吸", duration: "5:12" }], genre: ["J-POP", "Rock"] },
      createdAt: new Date(), updatedAt: new Date()
    },
    // Goods - 4 items
    {
      _id: new ObjectId(),
      sku: "MC-GOODS-001",
      name: "30th Anniversary T-Shirt",
      nameEn: "30th Anniversary T-Shirt",
      description: "デビュー30周年記念Tシャツ。特別デザイン、高品質コットン100%。",
      descriptionEn: "30th debut anniversary T-shirt with special design.",
      category: { _id: goodsCategory._id, name: goodsCategory.name, slug: goodsCategory.slug },
      tags: ["T-Shirt", "Anniversary", "Apparel", "Hot"],
      price: { amount: 4500, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 500, reserved: 120, available: 380, lowStockThreshold: 50, trackInventory: true, allowBackorder: true },
      variants: [
        { sku: "MC-GOODS-001-S", name: "S", nameEn: "Size S", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 100, available: 75 }, attributes: { size: "S", color: "Black" }, isDefault: false },
        { sku: "MC-GOODS-001-M", name: "M", nameEn: "Size M", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 150, available: 120 }, attributes: { size: "M", color: "Black" }, isDefault: true },
        { sku: "MC-GOODS-001-L", name: "L", nameEn: "Size L", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 150, available: 110 }, attributes: { size: "L", color: "Black" }, isDefault: false },
        { sku: "MC-GOODS-001-XL", name: "XL", nameEn: "Size XL", price: { amount: 4500, currency: "JPY" }, inventory: { quantity: 100, available: 75 }, attributes: { size: "XL", color: "Black" }, isDefault: false }
      ],
      images: { main: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"], thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children 30周年Tシャツ", description: "デビュー30周年記念Tシャツ", keywords: ["Mr.Children", "Tシャツ", "30周年"], slug: "mrchildren-30th-tshirt" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.8, count: 245 },
      shipping: { weight: 200, dimensions: { length: 25, width: 20, height: 3, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      _id: new ObjectId(),
      sku: "MC-GOODS-002",
      name: "Tour Hoodie 2024",
      nameEn: "Tour Hoodie 2024",
      description: "2024年ツアー公式パーカー。裏起毛で暖かい。",
      descriptionEn: "Official 2024 tour hoodie with warm fleece lining.",
      category: { _id: liveGoodsCategory._id, name: liveGoodsCategory.name, slug: liveGoodsCategory.slug },
      tags: ["Hoodie", "Tour Goods", "Apparel", "Limited"],
      price: { amount: 6800, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 300, reserved: 85, available: 215, lowStockThreshold: 30, trackInventory: true, allowBackorder: false },
      variants: [
        { sku: "MC-GOODS-002-M", name: "M", nameEn: "Size M", price: { amount: 6800, currency: "JPY" }, inventory: { quantity: 100, available: 75 }, attributes: { size: "M", color: "Navy" }, isDefault: true },
        { sku: "MC-GOODS-002-L", name: "L", nameEn: "Size L", price: { amount: 6800, currency: "JPY" }, inventory: { quantity: 100, available: 70 }, attributes: { size: "L", color: "Navy" }, isDefault: false },
        { sku: "MC-GOODS-002-XL", name: "XL", nameEn: "Size XL", price: { amount: 6800, currency: "JPY" }, inventory: { quantity: 100, available: 70 }, attributes: { size: "XL", color: "Navy" }, isDefault: false }
      ],
      images: { main: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop", gallery: [], thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children ツアーパーカー 2024", description: "2024年ツアー公式パーカー", keywords: ["Mr.Children", "パーカー", "ツアー"], slug: "mrchildren-tour-hoodie-2024" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.9, count: 178 },
      shipping: { weight: 400, dimensions: { length: 30, width: 25, height: 5, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    },
    // DVD - 2 items
    {
      _id: new ObjectId(),
      sku: "MC-DVD-001",
      name: "Live DVD『miss you LIVE』",
      nameEn: "Live DVD『miss you LIVE』",
      description: "2024年アリーナツアー完全収録。特典映像満載。",
      descriptionEn: "Complete 2024 arena tour with bonus footage.",
      category: { _id: dvdCategory._id, name: dvdCategory.name, slug: dvdCategory.slug },
      tags: ["DVD", "Live", "Tour", "2024", "New Release"],
      price: { amount: 5800, currency: "JPY", compareAtPrice: 6500 },
      inventory: { quantity: 400, reserved: 65, available: 335, lowStockThreshold: 50, trackInventory: true, allowBackorder: true },
      variants: [
        { sku: "MC-DVD-001-BD", name: "Blu-ray", nameEn: "Blu-ray", price: { amount: 6800, currency: "JPY" }, inventory: { quantity: 200, available: 170 }, attributes: { format: "Blu-ray" }, isDefault: false },
        { sku: "MC-DVD-001-DVD", name: "DVD", nameEn: "DVD", price: { amount: 5800, currency: "JPY" }, inventory: { quantity: 200, available: 165 }, attributes: { format: "DVD" }, isDefault: true }
      ],
      images: { main: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop", gallery: ["https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=600&fit=crop"], thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children Live DVD miss you", description: "2024年ライブDVD", keywords: ["Mr.Children", "DVD", "ライブ", "miss you"], slug: "mrchildren-live-dvd-miss-you" },
      status: "active", visibility: "visible", featured: true,
      ratings: { average: 4.9, count: 423 },
      shipping: { weight: 250, dimensions: { length: 19, width: 13.5, height: 1.5, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    },
    // Books - 1 item
    {
      _id: new ObjectId(),
      sku: "MC-BOOK-001",
      name: "Mr.Children 写真集『Documentary』",
      nameEn: "Mr.Children Photo Book『Documentary』",
      description: "30年の歴史を写真で綴る公式写真集。未公開写真多数収録。",
      descriptionEn: "Official photo book documenting 30 years of history.",
      category: { _id: booksCategory._id, name: booksCategory.name, slug: booksCategory.slug },
      tags: ["Book", "Photo Book", "Limited"],
      price: { amount: 5500, currency: "JPY", compareAtPrice: null },
      inventory: { quantity: 150, reserved: 35, available: 115, lowStockThreshold: 20, trackInventory: true, allowBackorder: false },
      variants: [{ sku: "MC-BOOK-001-STD", name: "通常版", nameEn: "Standard Edition", price: { amount: 5500, currency: "JPY" }, inventory: { quantity: 150, available: 115 }, attributes: { edition: "standard", pages: 200 }, isDefault: true }],
      images: { main: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop", gallery: [], thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop" },
      seo: { title: "Mr.Children 写真集 Documentary", description: "30周年公式写真集", keywords: ["Mr.Children", "写真集", "Documentary"], slug: "mrchildren-photo-book-documentary" },
      status: "active", visibility: "visible", featured: false,
      ratings: { average: 4.7, count: 89 },
      shipping: { weight: 800, dimensions: { length: 30, width: 25, height: 2, unit: "cm" }, requiresShipping: true },
      createdAt: new Date(), updatedAt: new Date()
    }
  ];
}

function generateReviews(products) {
  const reviews = [];
  const comments = [
    { title: "最高です！", content: "想像以上の出来栄え。大満足です！", rating: 5 },
    { title: "素晴らしい", content: "ファン必見のアイテムです。", rating: 5 },
    { title: "良い買い物", content: "品質が良くて満足しています。", rating: 4 },
    { title: "おすすめ", content: "デザインが素敵です。", rating: 5 },
    { title: "大満足", content: "また購入したいです。", rating: 5 },
    { title: "いい感じ", content: "期待通りの商品でした。", rating: 4 },
    { title: "完璧", content: "プレゼントにもおすすめです。", rating: 5 },
    { title: "気に入りました", content: "使い勝手が良いです。", rating: 4 }
  ];
  
  products.forEach(product => {
    const numReviews = Math.floor(Math.random() * 8) + 5; // 5-12 reviews per product
    for (let i = 0; i < numReviews; i++) {
      const comment = comments[Math.floor(Math.random() * comments.length)];
      reviews.push({
        _id: new ObjectId(),
        productId: product._id,
        userId: new ObjectId(),
        userName: `ファン${Math.floor(Math.random() * 9999) + 1}`,
        rating: comment.rating,
        title: comment.title,
        content: comment.content,
        isVerifiedPurchase: Math.random() > 0.2,
        helpful: Math.floor(Math.random() * 100),
        images: [],
        status: "approved",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
  });
  
  return reviews;
}

async function seedData() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Clear existing data
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('reviews').deleteMany({});
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
    
    console.log('\n🎉 Data seeding completed!');
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

seedData();
