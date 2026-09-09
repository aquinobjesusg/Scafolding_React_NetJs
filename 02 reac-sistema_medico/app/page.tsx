import Image from "next/image";

import { Hero } from "@/app/components/Hero"
import { ProductsByService } from "@/app/components/ProductsByService"
import { Features } from "@/app/components/Features"
import { Testimonials } from "@/app/components/Testimonials"
import { CTA } from "@/app/components/CTA"
import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"
import { MedicalSpecialtiesSheet } from "@/app/components/MedicalSpecialtiesSheet"
import { ProductsSheet } from "@/app/components/ProductsSheet"
import { MarketplacesCatalogSheet } from "@/app/components/MarketplacesCatalogSheet"
import { AboutCompanySheet } from "@/app/components/AboutCompanySheet"

export default function Home() {
  return (

      <div className="min-h-screen bg-white font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <ProductsByService />
          <Features />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
        <MedicalSpecialtiesSheet />
        <ProductsSheet />
        <MarketplacesCatalogSheet />
        <AboutCompanySheet />
      </div>

  );
}
