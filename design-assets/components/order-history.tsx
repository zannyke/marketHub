"use client"

import { ChevronRight, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const orders = [
  {
    id: "ORD-2024-001",
    date: "Jan 15, 2024",
    status: "delivered",
    total: 299.99,
    items: 2,
    image: 'url("/premium-wireless-headphones.png")',
  },
  {
    id: "ORD-2024-002",
    date: "Jan 10, 2024",
    status: "processing",
    total: 149.99,
    items: 1,
    image: 'url("/luxury-leather-bag.png")',
  },
  {
    id: "ORD-2024-003",
    date: "Jan 5, 2024",
    status: "delivered",
    total: 89.99,
    items: 1,
    image: 'url("/portable-speaker.jpg")',
  },
]

export function OrderHistory() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-card border border-border rounded-xl hover:border-primary transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left Section */}
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: order.image }} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Order ID: {order.id}</p>
                  <p className="font-semibold text-foreground mb-2">
                    {order.items} item(s) • ${order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {order.status === "delivered" ? (
                    <>
                      <CheckCircle size={20} className="text-green-600" />
                      <span className="text-sm font-medium text-green-600">Delivered</span>
                    </>
                  ) : (
                    <>
                      <Clock size={20} className="text-accent" />
                      <span className="text-sm font-medium text-accent">Processing</span>
                    </>
                  )}
                </div>

                <Button variant="ghost" size="icon">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
