// Product Catalog Schema for MongoDB
// Designed for Mr.Children Store or general e-commerce

// ============================================
// COLLECTION: products
// ============================================
const productSchema = {
  // Basic Info
  _id: ObjectId(),
  sku: "MC-ALBUM-001",           // Unique product code
  name: "Mr.Children Album - 重力と呼吸",
  nameEn: "Gravity and Breathing",
  description: "2024年最新アルバム",
  descriptionEn: "Latest 2024 album",
  
  // Categorization
  category: {
    _id: ObjectId(),
    name: "アルバム",
    nameEn: "Album",
    slug: "albums",
    parentId: null              // For subcategories
  },
  tags: ["CD", "New Release", "Limited Edition"],
  
  // Pricing
  price: {
    amount: 3500,               // JPY
    currency: "JPY",
    compareAtPrice: 4000,       // Original price for discounts
    cost: 2000                  // Cost price (internal)
  },
  
  // Inventory
  inventory: {
    quantity: 150,
    reserved: 10,               // Reserved in carts
    available: 140,             // quantity - reserved
    lowStockThreshold: 20,
    trackInventory: true,
    allowBackorder: false
  },
  
  // Variants (for different sizes, colors, etc.)
  variants: [
    {
      _id: ObjectId(),
      sku: "MC-ALBUM-001-LTD",
      name: "限定版",
      nameEn: "Limited Edition",
      price: { amount: 5500, currency: "JPY" },
      inventory: { quantity: 50, available: 45 },
      attributes: {
        edition: "limited",
        includes: ["Photo Book", "DVD", "Poster"]
      },
      images: ["https://.../album-ltd-1.jpg"],
      isDefault: false
    },
    {
      _id: ObjectId(),
      sku: "MC-ALBUM-001-STD",
      name: "通常版",
      nameEn: "Standard Edition",
      price: { amount: 3500, currency: "JPY" },
      inventory: { quantity: 100, available: 95 },
      attributes: {
        edition: "standard"
      },
      images: ["https://.../album-std-1.jpg"],
      isDefault: true
    }
  ],
  
  // Media
  images: {
    main: "https://images.unsplash.com/photo-...",
    gallery: [
      "https://images.unsplash.com/photo-...",
      "https://images.unsplash.com/photo-..."
    ],
    thumbnail: "https://images.unsplash.com/photo-..."
  },
  
  // SEO & Marketing
  seo: {
    title: "Mr.Children 重力と呼吸 アルバム",
    description: "2024年最新アルバム、限定版・通常版発売中",
    keywords: ["Mr.Children", "アルバム", "CD", "J-POP"],
    slug: "mrchildren-gravity-and-breathing"
  },
  
  // Status
  status: "active",             // active, draft, archived
  visibility: "visible",        // visible, hidden
  featured: true,
  
  // Ratings & Reviews
  ratings: {
    average: 4.8,
    count: 256,
    distribution: {
      5: 200,
      4: 40,
      3: 10,
      2: 4,
      1: 2
    }
  },
  
  // Shipping
  shipping: {
    weight: 300,                // grams
    dimensions: {
      length: 14,
      width: 12.5,
      height: 1,
      unit: "cm"
    },
    requiresShipping: true,
    shippingClass: "standard"
  },
  
  // Metadata
  createdAt: ISODate("2024-01-15T10:00:00Z"),
  updatedAt: ISODate("2024-02-20T15:30:00Z"),
  publishedAt: ISODate("2024-02-01T00:00:00Z"),
  
  // Additional fields for music products
  musicDetails: {
    releaseDate: ISODate("2024-02-01"),
    label: "Toy's Factory",
    format: "CD",
    tracks: [
      { number: 1, title: "重力と呼吸", duration: "4:32" },
      { number: 2, title: "Documentary", duration: "5:15" },
      { number: 3, title: "光の射す方へ", duration: "4:08" }
    ],
    totalDuration: "52:30",
    genre: ["J-POP", "Rock"]
  }
};

// ============================================
// COLLECTION: categories
// ============================================
const categorySchema = {
  _id: ObjectId(),
  name: "アルバム",
  nameEn: "Albums",
  slug: "albums",
  description: "CD・レコード・デジタルアルバム",
  parentId: null,               // null for top-level
  level: 1,
  sortOrder: 1,
  image: "https://.../category-albums.jpg",
  isActive: true,
  productCount: 45,
  children: [
    {
      _id: ObjectId(),
      name: "CD",
      slug: "cds",
      parentId: ObjectId(),
      level: 2
    },
    {
      _id: ObjectId(),
      name: "レコード",
      slug: "vinyl",
      parentId: ObjectId(),
      level: 2
    }
  ],
  createdAt: ISODate("2024-01-01"),
  updatedAt: ISODate("2024-02-01")
};

// ============================================
// COLLECTION: reviews
// ============================================
const reviewSchema = {
  _id: ObjectId(),
  productId: ObjectId(),        // Reference to product
  userId: ObjectId(),           // Reference to user
  userName: "桜井ファン",
  rating: 5,                    // 1-5
  title: "最高のアルバム！",
  content: "桜井さんの歌声が心に響きます...",
  isVerifiedPurchase: true,
  helpful: 24,                  // Number of people who found this helpful
  images: ["https://.../review-1.jpg"],
  status: "approved",           // pending, approved, rejected
  createdAt: ISODate("2024-02-15"),
  updatedAt: ISODate("2024-02-15")
};

// ============================================
// COLLECTION: inventory_logs
// ============================================
const inventoryLogSchema = {
  _id: ObjectId(),
  productId: ObjectId(),
  variantId: ObjectId(),        // Optional
  type: "sale",                 // sale, restock, adjustment, return
  quantity: -1,
  previousQuantity: 100,
  newQuantity: 99,
  reason: "Order #12345",
  userId: ObjectId(),           // Who made the change
  createdAt: ISODate("2024-02-20T10:00:00Z")
};

// ============================================
// INDEXES (for performance)
// ============================================

// Products collection indexes
db.products.createIndex({ "sku": 1 }, { unique: true });
db.products.createIndex({ "slug": 1 }, { unique: true });
db.products.createIndex({ "category.slug": 1 });
db.products.createIndex({ "status": 1, "visibility": 1 });
db.products.createIndex({ "price.amount": 1 });
db.products.createIndex({ "ratings.average": -1 });
db.products.createIndex({ "createdAt": -1 });
db.products.createIndex({ "name": "text", "description": "text" }); // Text search

// Categories collection indexes
db.categories.createIndex({ "slug": 1 }, { unique: true });
db.categories.createIndex({ "parentId": 1 });

// Reviews collection indexes
db.reviews.createIndex({ "productId": 1, "status": 1 });
db.reviews.createIndex({ "userId": 1 });

// ============================================
// SAMPLE QUERIES
// ============================================

// Get all active products in a category
db.products.find({
  "category.slug": "albums",
  "status": "active",
  "visibility": "visible"
}).sort({ "createdAt": -1 });

// Search products
db.products.find({
  $text: { $search: "Mr.Children album" },
  "status": "active"
});

// Get low stock products
db.products.find({
  $expr: { $lte: ["$inventory.available", "$inventory.lowStockThreshold"] }
});

// Get featured products
db.products.find({
  "featured": true,
  "status": "active"
}).limit(10);

// Update inventory (with transaction)
const session = db.getMongo().startSession();
session.startTransaction();
try {
  db.products.updateOne(
    { _id: productId },
    { 
      $inc: { "inventory.quantity": -1, "inventory.available": -1 },
      $set: { "inventory.reserved": 1 }
    }
  );
  db.inventory_logs.insertOne({
    productId: productId,
    type: "sale",
    quantity: -1,
    createdAt: new Date()
  });
  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
}
session.endSession();
