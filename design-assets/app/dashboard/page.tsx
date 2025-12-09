"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { UserSidebar } from "@/components/user-sidebar"
import { ProfileSection } from "@/components/profile-section"
import { OrderHistory } from "@/components/order-history"
import { Wishlist } from "@/components/wishlist"
import { AccountSettings } from "@/components/account-settings"
import { Footer } from "@/components/footer"

type DashboardTab = "profile" | "orders" | "wishlist" | "settings"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("profile")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "orders" && <OrderHistory />}
            {activeTab === "wishlist" && <Wishlist />}
            {activeTab === "settings" && <AccountSettings />}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
