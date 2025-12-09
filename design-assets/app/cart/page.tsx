"use client"

import { Navigation } from "@/components/navigation"
import { ShoppingCartView } from "@/components/shopping-cart-view"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>
        <ShoppingCartView />
      </div>
      <Footer />
    </main>
  )
}
