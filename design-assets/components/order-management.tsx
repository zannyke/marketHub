"use client"

import { ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

const orders = [
  {
    id: "ORD-2024-001",
    customer: "John Doe",
    amount: "$299.99",
    items: 2,
    status: "pending",
    date: "2024-01-20",
  },
  {
    id: "ORD-2024-002",
    customer: "Jane Smith",
    amount: "$149.99",
    items: 1,
    status: "shipped",
    date: "2024-01-19",
  },
  {
    id: "ORD-2024-003",
    customer: "Mike Johnson",
    amount: "$499.99",
    items: 3,
    status: "delivered",
    date: "2024-01-18",
  },
]

export function OrderManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Order Management</h2>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Items</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.customer}</td>
                  <td className="px-6 py-4 font-semibold text-primary">{order.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Package size={16} />
                      {order.items}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon" className="hover:bg-muted h-8 w-8">
                      <ChevronRight size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
