"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Lock, MapPin, CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

type CheckoutStep = "shipping" | "billing" | "payment" | "review"

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })

  const steps: { id: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { id: "shipping", label: "Shipping", icon: <Truck size={20} /> },
    { id: "billing", label: "Billing", icon: <MapPin size={20} /> },
    { id: "payment", label: "Payment", icon: <CreditCard size={20} /> },
    { id: "review", label: "Review", icon: <Lock size={20} /> },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const canProceed = () => {
    if (currentStep === "shipping") {
      return formData.firstName && formData.lastName && formData.address && formData.city && formData.zipCode
    }
    if (currentStep === "payment") {
      return formData.cardName && formData.cardNumber && formData.cardExpiry && formData.cardCVC
    }
    return true
  }

  const orderSummary = {
    subtotal: 499.98,
    tax: 39.99,
    shipping: 0,
    discount: 49.99,
    total: 489.98,
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Steps */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => {
                      const stepIndex = steps.findIndex((s) => s.id === currentStep)
                      if (index <= stepIndex) {
                        setCurrentStep(step.id)
                      }
                    }}
                    className={`flex items-center gap-2 pb-4 transition-all ${
                      currentStep === step.id
                        ? "text-primary border-b-2 border-primary"
                        : index < steps.findIndex((s) => s.id === currentStep)
                          ? "text-green-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : index < steps.findIndex((s) => s.id === currentStep)
                            ? "bg-green-600 text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && <div className="flex-1 h-0.5 mx-2 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          {currentStep === "shipping" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Shipping Address</h2>

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

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep("billing")}
                disabled={!canProceed()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                Continue to Billing <ChevronRight size={20} className="ml-2" />
              </Button>
            </div>
          )}

          {/* Payment */}
          {currentStep === "payment" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVC</label>
                  <input
                    type="text"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep("review")}
                disabled={!canProceed()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                Review Order <ChevronRight size={20} className="ml-2" />
              </Button>
            </div>
          )}

          {/* Review */}
          {currentStep === "review" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Review Your Order</h2>

              <div className="space-y-4 border-t border-border pt-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.address}
                    <br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Method</h3>
                  <p className="text-muted-foreground text-sm">Visa ending in {formData.cardNumber.slice(-4)}</p>
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base" asChild>
                <Link href="/order-confirmation">Place Order</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-24">
            <h3 className="font-semibold text-foreground text-lg">Order Summary</h3>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between text-sm text-foreground">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Discount</span>
                <span>-${orderSummary.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm text-foreground">
                <span>Tax</span>
                <span>${orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg text-primary">${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 p-4 bg-muted rounded-lg">
              <p>✓ Secure checkout</p>
              <p>✓ 30-day returns</p>
              <p>✓ Free shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
