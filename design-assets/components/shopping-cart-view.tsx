"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, Gift, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: 'url("/premium-wireless-headphones.png")',
  },
  {
    id: 4,
    name: "Luxury Leather Bag",
    price: 299.99,
    quantity: 1,
    image: 'url("/luxury-leather-bag.png")',
  },
]

export function ShoppingCartView() {
  const [cart, setCart] = useState<CartItem[]>(initialCart)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(false)

  const updateQuantity = (id: number, quantity: number) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  return (
    <div className="space-y-8">
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/marketplace">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="p-6 bg-card border border-border rounded-xl flex gap-6">
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: item.image }} />
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 text-foreground font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-xl font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Promo Code */}
            <div className="p-6 bg-card border border-border rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                <Percent size={20} />
                Promo Code
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setAppliedPromo(!appliedPromo)}
                >
                  Apply
                </Button>
              </div>
              {appliedPromo && <p className="text-xs text-green-600 font-medium">10% discount applied!</p>}
            </div>

            {/* Gift Message */}
            <div className="p-6 bg-card border border-border rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Gift size={20} />
                Gift Message
              </div>
              <textarea
                placeholder="Add a gift message..."
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
              />
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-card border border-border rounded-xl space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Order Summary</h3>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm text-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm text-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm text-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full border-border bg-transparent hover:bg-muted" asChild>
                <Link href="/marketplace">Continue Shopping</Link>
              </Button>
            </div>

            {/* Guarantees */}
            <div className="p-4 bg-muted rounded-xl space-y-2 text-sm text-muted-foreground">
              <p>✓ Secure checkout</p>
              <p>✓ 30-day returns</p>
              <p>✓ 2-year warranty</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
