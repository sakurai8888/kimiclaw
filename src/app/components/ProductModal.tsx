'use client';

import { useState, useEffect } from 'react';

interface Review {
  _id: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  isVerifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
}

interface ProductModalProps {
  productId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ productId, isOpen, onClose }: ProductModalProps) {
  const [product, setProduct] = useState<any>(null);
  const [inventory, setInventory] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    if (productId && isOpen) {
      fetchProductDetails();
    }
  }, [productId, isOpen]);

  const fetchProductDetails = async () => {
    if (!productId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      
      if (response.ok) {
        setProduct(data.product);
        setInventory(data.inventory);
        setReviews(data.reviews);
        // Set default variant
        const defaultVariant = data.product.variants?.find((v: any) => v.isDefault) || data.product.variants?.[0];
        setSelectedVariant(defaultVariant);
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const getStockStatus = () => {
    if (!inventory) return null;
    
    if (inventory.available <= 0) {
      return { text: '在庫切れ', color: 'text-red-400', bg: 'bg-red-500/20' };
    } else if (inventory.available <= inventory.lowStockThreshold) {
      return { text: `残り${inventory.available}個`, color: 'text-orange-400', bg: 'bg-orange-500/20' };
    } else {
      return { text: '在庫あり', color: 'text-green-400', bg: 'bg-green-500/20' };
    }
  };

  const stockStatus = getStockStatus();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : product ? (
          <div className="p-6 md:p-8">
            {/* Product Image */}
            <div className="relative aspect-square max-h-80 mb-6 rounded-xl overflow-hidden">
              <img
                src={product.images?.main || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-400">{product.category?.name}</span>
                <span className="text-gray-600">•</span>
                <span className="text-sm text-gray-500">{product.sku}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h2>
              {product.nameEn && (
                <p className="text-gray-400 mb-4">{product.nameEn}</p>
              )}
              
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Price & Stock */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <span className="text-sm text-gray-400">価格</span>
                <div className="text-3xl font-bold text-gradient">
                  {formatPrice(selectedVariant?.price?.amount || product.price?.amount || 0)}
                </div>
                {product.price?.compareAtPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price.compareAtPrice)}
                  </span>
                )}
              </div>
              
              <div className="ml-auto">
                <span className="text-sm text-gray-400">在庫状況</span>
                {stockStatus && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${stockStatus.bg}`}>
                    <span className={`font-medium ${stockStatus.color}`}>{stockStatus.text}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-6">
                <span className="text-sm text-gray-400 mb-3 block">オプション</span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.sku}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedVariant?.sku === variant.sku
                          ? 'border-indigo-500 bg-indigo-500/20 text-white'
                          : 'border-white/10 hover:border-white/30 text-gray-300'
                      }`}
                    >
                      {variant.name}
                      <span className="ml-2 text-sm">{formatPrice(variant.price?.amount)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rating */}
            {product.ratings && (
              <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-white/5">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{product.ratings.average}</div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.ratings.average))}
                    {'☆'.repeat(5 - Math.floor(product.ratings.average))}
                  </div>
                </div>
                <div className="text-gray-400">
                  {product.ratings.count}件のレビュー
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">カスタマーレビュー</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="p-4 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-white">{review.userName}</span>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(review.rating)}
                        </div>
                        {review.isVerifiedPurchase && (
                          <span className="text-xs text-green-400">✓ 購入済み</span>
                        )}
                      </div>
                      <h4 className="font-medium text-white mb-1">{review.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{review.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(review.createdAt)}</span>
                        <span>👍 {review.helpful}人が参考になった</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              disabled={!inventory || inventory.available <= 0}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                inventory?.available > 0
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {inventory?.available > 0 ? 'カートに追加' : '在庫切れ'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
