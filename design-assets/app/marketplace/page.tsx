"use client"

import { Navigation } from "@/components/navigation"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Browse our complete collection of premium products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <MarketplaceFilters />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
