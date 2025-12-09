"use client"

import { Navigation } from "@/components/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { Footer } from "@/components/footer"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutForm />
      </div>
      <Footer />
    </main>
  )
}
