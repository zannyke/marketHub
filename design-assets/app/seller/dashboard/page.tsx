"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SellerSidebar } from "@/components/seller-sidebar"
import { SellerOverview } from "@/components/seller-overview"
import { ProductManagement } from "@/components/product-management"
import { SalesAnalytics } from "@/components/sales-analytics"
import { OrderManagement } from "@/components/order-management"
import { SellerSettings } from "@/components/seller-settings"
import { Footer } from "@/components/footer"

type SellerTab = "overview" | "products" | "analytics" | "orders" | "settings"

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState<SellerTab>("overview")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Seller Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SellerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            {activeTab === "overview" && <SellerOverview />}
            {activeTab === "products" && <ProductManagement />}
            {activeTab === "analytics" && <SalesAnalytics />}
            {activeTab === "orders" && <OrderManagement />}
            {activeTab === "settings" && <SellerSettings />}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
