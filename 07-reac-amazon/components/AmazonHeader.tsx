'use client'
import { useState } from "react";
import { Search, ShoppingCart, MapPin, ChevronDown, Menu } from "lucide-react";

interface AmazonHeaderProps {
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function AmazonHeader({
  cartCount,
  searchQuery,
  setSearchQuery,
}: AmazonHeaderProps) {
  const [category, setCategory] = useState("All");

  return (
    <header className="w-full">
      {/* Main header bar */}
      <div className="bg-[#131921] text-white">
        <div className="flex items-center gap-2 px-2 py-2 max-w-[1500px] mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center px-2 py-1.5 rounded border border-transparent hover:border-white shrink-0"
          >
            <span className="text-2xl font-bold tracking-tight">amazon</span>
            <span className="text-2xl text-orange-400 leading-none">.</span>
            <span className="text-xs text-gray-300 ml-0.5 mt-3">com</span>
          </a>

          {/* Deliver to */}
          <a
            href="#"
            className="hidden lg:flex items-center px-2 py-1.5 rounded border border-transparent hover:border-white shrink-0"
          >
            <MapPin className="w-5 h-5 mr-1 text-white" />
            <div className="leading-tight">
              <div className="text-xs text-gray-300">Deliver to</div>
              <div className="text-sm font-bold">United States</div>
            </div>
          </a>

          {/* Search bar */}
          <div className="flex flex-1 items-stretch h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-400">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-full bg-gray-100 text-gray-700 text-xs pl-2 pr-7 border-r border-gray-300 appearance-none cursor-pointer hover:bg-gray-200 focus:outline-none"
              >
                <option>All</option>
                <option>Arts & Crafts</option>
                <option>Automotive</option>
                <option>Baby</option>
                <option>Beauty & Personal Care</option>
                <option>Books</option>
                <option>Computers</option>
                <option>Electronics</option>
                <option>Kindle Store</option>
                <option>Home & Kitchen</option>
                <option>Toys & Games</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon"
              className="flex-1 px-3 text-sm text-gray-900 bg-white focus:outline-none"
            />
            <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          {/* Language */}
          <a
            href="#"
            className="hidden md:flex items-center px-2 py-1.5 rounded border border-transparent hover:border-white shrink-0"
          >
            <span className="text-base font-bold">EN</span>
            <ChevronDown className="w-3 h-3 ml-1 text-gray-300" />
          </a>

          {/* Account */}
          <a
            href="#"
            className="hidden md:block px-2 py-1.5 rounded border border-transparent hover:border-white shrink-0"
          >
            <div className="text-xs text-gray-300">Hello, sign in</div>
            <div className="text-sm font-bold flex items-center">
              Account & Lists
              <ChevronDown className="w-3 h-3 ml-0.5 text-gray-300" />
            </div>
          </a>

          {/* Returns */}
          <a
            href="#"
            className="hidden lg:block px-2 py-1.5 rounded border border-transparent hover:border-white shrink-0"
          >
            <div className="text-xs text-gray-300">Returns</div>
            <div className="text-sm font-bold">& Orders</div>
          </a>

          {/* Cart */}
          <a
            href="#"
            className="flex items-end px-2 py-1.5 rounded border border-transparent hover:border-white shrink-0"
          >
            <div className="relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="absolute -top-1 left-4 text-orange-400 font-bold text-sm min-w-[20px] text-center">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-bold ml-1 mb-0.5 hidden sm:inline">
              Cart
            </span>
          </a>
        </div>
      </div>

      {/* Sub nav */}
      <div className="bg-[#232f3e] text-white">
        <div className="flex items-center gap-1 px-2 py-1.5 max-w-[1500px] mx-auto overflow-x-auto">
          <a
            href="#"
            className="flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:border-white text-sm font-bold shrink-0"
          >
            <Menu className="w-4 h-4" />
            All
          </a>
          {[
            "Today's Deals",
            "Customer Service",
            "Registry",
            "Gift Cards",
            "Sell",
            "AmazonBasics",
            "Prime",
            "New Releases",
            "Books",
            "Electronics",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="px-2 py-1 rounded border border-transparent hover:border-white text-sm shrink-0 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}