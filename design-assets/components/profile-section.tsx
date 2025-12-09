"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Edit2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground">
                {formData.firstName[0]}
                {formData.lastName[0]}
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-muted-foreground">{formData.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Member since January 2024</p>
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}
          >
            {isEditing ? (
              <>
                <X size={16} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Orders</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">8</p>
            <p className="text-sm text-muted-foreground">Wishlist Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">$2,450</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-bold text-foreground">Personal Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1 border-border bg-transparent hover:bg-muted"
            >
              Discard
            </Button>
          </div>
        </div>
      )}

      {/* Addresses */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-foreground">Saved Addresses</h3>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Add Address
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg bg-muted">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-foreground">Home</p>
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Default</span>
            </div>
            <p className="text-sm text-muted-foreground">123 Main Street, New York, NY 10001</p>
          </div>

          <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
            <p className="font-semibold text-foreground mb-2">Work</p>
            <p className="text-sm text-muted-foreground">456 Business Ave, Manhattan, NY 10005</p>
          </div>
        </div>
      </div>
    </div>
  )
}
