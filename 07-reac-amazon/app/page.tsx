'use client'
import { useState, useEffect } from "react";
import AmazonHeader from "@/components/AmazonHeader";
import AmazonHero from "@/components/AmazonHero";
import AmazonProductGrid from "@/components/AmazonProductGrid";
import AmazonFooter from "@/components/AmazonFooter";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Amazon.com. Spend less. Smile more.";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <AmazonHeader
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AmazonHero />
      <AmazonProductGrid onAddToCart={() => setCartCount((c) => c + 1)} />
      <AmazonFooter />
    </div>
  );
}