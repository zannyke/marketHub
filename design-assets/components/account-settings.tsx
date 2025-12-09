"use client"

import { useState } from "react"
import { Bell, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  })

  const handleSettingChange = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={24} className="text-primary" />
          <h3 className="text-xl font-bold text-foreground">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              description: "Receive important account updates",
            },
            { key: "orderUpdates", label: "Order Updates", description: "Get notified about your order status" },
            { key: "promotions", label: "Promotions & Offers", description: "Receive special deals and discounts" },
            { key: "newsletter", label: "Newsletter", description: "Subscribe to our weekly newsletter" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={settings[item.key as keyof typeof settings]}
                onChange={() => handleSettingChange(item.key)}
                className="w-5 h-5 cursor-pointer"
              />
            </label>
          ))}
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">Save Preferences</Button>
      </div>

      {/* Password */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={24} className="text-primary" />
          <h3 className="text-xl font-bold text-foreground">Change Password</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <button className="absolute right-3 top-2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
        <p className="text-sm text-red-600">These actions cannot be undone. Please be careful.</p>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Delete Account</Button>
      </div>
    </div>
  )
}
