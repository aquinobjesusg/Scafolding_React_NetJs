import { Star } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  prime?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    title: "Echo Dot (5th Gen, 2022 release) | Smart speaker with bigger vibrant sound",
    price: "$22.99",
    originalPrice: "$49.99",
    rating: 5,
    reviews: 142390,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80",
    badge: "Best Seller",
    prime: true,
  },
  {
    id: 2,
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds, USB-C",
    price: "$199.00",
    originalPrice: "$249.00",
    rating: 5,
    reviews: 89234,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80",
    badge: "Deal",
    prime: true,
  },
  {
    id: 3,
    title: "Kindle Paperwhite (16 GB) – Now with a 6.8\" display and adjustable warm light",
    price: "$139.99",
    rating: 5,
    reviews: 56712,
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=400&q=80",
    prime: true,
  },
  {
    id: 4,
    title: "Fire TV Stick 4K Max streaming device, Wi-Fi 6, Alexa Voice Remote",
    price: "$29.99",
    originalPrice: "$59.99",
    rating: 4,
    reviews: 98421,
    image: "https://images.unsplash.com/photo-1593784991095-a2053d006a22?w=400&q=80",
    badge: "Deal",
    prime: true,
  },
  {
    id: 5,
    title: "Bose QuietComfort Wireless Earbuds with Active Noise Cancellation",
    price: "$179.00",
    originalPrice: "$279.00",
    rating: 4,
    reviews: 12340,
    image: "https://images.unsplash.com/photo-1606220925250-945a6c23d8b4?w=400&q=80",
    prime: true,
  },
  {
    id: 6,
    title: "Samsung Galaxy S23 Ultra Cell Phone, 256GB Unlocked Android Smartphone",
    price: "$899.99",
    originalPrice: "$1199.99",
    rating: 5,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1610945265494-9e8c2b8f8f0e?w=400&q=80",
    badge: "Deal",
    prime: true,
  },
  {
    id: 7,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker",
    price: "$79.95",
    originalPrice: "$99.95",
    rating: 5,
    reviews: 167890,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8070?w=400&q=80",
    badge: "Best Seller",
    prime: true,
  },
  {
    id: 8,
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
    price: "$329.99",
    originalPrice: "$399.99",
    rating: 5,
    reviews: 23145,
    image: "https://images.unsplash.com/photo-1583394838335-acd97703d9b4?w=400&q=80",
    prime: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? "text-orange-400 fill-orange-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function AmazonProductGrid({
  onAddToCart,
}: {
  onAddToCart: () => void;
}) {
  return (
    <section className="max-w-[1500px] mx-auto px-4 py-6">
      {/* Deals banner */}
      <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white p-6 rounded-lg mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Today's Deals</h2>
          <p className="text-sm text-gray-300">
            Limited-time offers, updated daily
          </p>
        </div>
        <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-sm font-bold py-2 px-6 rounded-full transition-colors">
          Shop all deals
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Badge */}
            {product.badge && (
              <div className="mb-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    product.badge === "Best Seller"
                      ? "bg-orange-500 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Image */}
            <div className="bg-gray-50 aspect-square rounded-md overflow-hidden mb-3 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <h3 className="text-sm text-[#0F1111] mb-1 line-clamp-2 hover:text-[#007185] hover:underline cursor-pointer">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              <StarRating rating={product.rating} />
              <span className="text-xs text-[#007185] hover:text-orange-600 hover:underline cursor-pointer">
                {product.reviews.toLocaleString()}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-[#0F1111]">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Prime badge */}
            {product.prime && (
              <div className="text-xs font-bold text-[#007185] mb-2">
                <span className="text-[#00A8E1]">✓ prime</span> FREE Delivery
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={onAddToCart}
              className="mt-auto bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium py-2 px-4 rounded-full transition-colors shadow-sm"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}