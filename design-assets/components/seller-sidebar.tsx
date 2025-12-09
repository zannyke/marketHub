"use client"

import { BarChart3, Package, TrendingUp, ShoppingBag, Settings, LogOut, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SellerSidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

const menuItems = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "settings", label: "Settings", icon: Settings },
]

export function SellerSidebar({ activeTab, setActiveTab }: SellerSidebarProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden h-fit sticky top-24">
      {/* Store Info */}
      <div className="bg-gradient-to-r from-accent to-secondary p-6 text-accent-foreground">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-accent-foreground flex items-center justify-center">
            <Store size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Premium Store</h3>
            <p className="text-xs opacity-80">ID: STORE-12345</p>
          </div>
        </div>
        <div className="text-sm opacity-90">
          Status: <span className="font-semibold">Active</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-4">
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent justify-start text-sm"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
