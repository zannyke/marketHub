"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SellerSettings() {
  const [formData, setFormData] = useState({
    storeName: "Premium Store",
    storeBio: "High-quality electronics and accessories",
    email: "seller@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    bankAccount: "****5678",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Shop Settings</h2>

      {/* Store Information */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Building2 size={24} className="text-primary" />
          <h3 className="text-xl font-bold text-foreground">Store Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Store Bio</label>
          <textarea
            name="storeBio"
            value={formData.storeBio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Store Info</Button>
      </div>

      {/* Contact Information */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail size={24} className="text-accent" />
          <h3 className="text-xl font-bold text-foreground">Contact Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Contact Info</Button>
      </div>

      {/* Address */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={24} className="text-secondary" />
          <h3 className="text-xl font-bold text-foreground">Business Address</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Address</Button>
      </div>

      {/* Payout Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground mb-6">Payout Settings</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bank Account</label>
          <div className="px-4 py-2 bg-input border border-border rounded-lg text-sm text-muted-foreground">
            {formData.bankAccount}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Last 4 digits shown for security</p>
        </div>

        <Button variant="outline" className="w-full border-border bg-transparent hover:bg-muted">
          Update Bank Account
        </Button>
      </div>
    </div>
  )
}
