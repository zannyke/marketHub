"use client"

import { Navigation } from "@/components/navigation"
import { ProductDetails } from "@/components/product-details"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { Footer } from "@/components/footer"

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetails />
        <ProductReviews />
        <RelatedProducts />
      </div>

      <Footer />
    </main>
  )
}
