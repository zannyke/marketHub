"use client"

import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserSidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

const menuItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "Order History", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
]

export function UserSidebar({ activeTab, setActiveTab }: UserSidebarProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* User Info */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
        <div className="w-16 h-16 rounded-full bg-primary-foreground flex items-center justify-center mb-4">
          <User size={32} className="text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-1">John Doe</h3>
        <p className="text-sm opacity-90">john@example.com</p>
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
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-4">
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent justify-start"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
