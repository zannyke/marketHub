"use client"

import { TrendingUp, Package, DollarSign, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SellerOverview() {
  const stats = [
    { label: "Total Revenue", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "from-primary to-blue-600" },
    {
      label: "Orders This Month",
      value: "156",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "from-accent to-purple-600",
    },
    { label: "Products", value: "24", change: "+2", icon: Package, color: "from-secondary to-orange-600" },
    { label: "Growth Rate", value: "23.5%", change: "+4.1%", icon: TrendingUp, color: "from-green-400 to-green-600" },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-foreground">Recent Orders</h3>
          <Button variant="outline" className="border-border bg-transparent hover:bg-muted text-sm" size="sm">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {[
            { id: "ORD-001", customer: "John Doe", amount: "$299.99", status: "Pending" },
            { id: "ORD-002", customer: "Jane Smith", amount: "$149.99", status: "Shipped" },
            { id: "ORD-003", customer: "Mike Johnson", amount: "$499.99", status: "Delivered" },
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-semibold text-foreground">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{order.amount}</p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Products */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Top Performing Products</h3>

        <div className="space-y-4">
          {[
            { name: "Premium Wireless Headphones", sales: 127, revenue: "$25,398" },
            { name: "Luxury Leather Bag", sales: 84, revenue: "$25,199" },
            { name: "Smart Watch", sales: 56, revenue: "$13,994" },
          ].map((product, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-semibold text-foreground">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sales this month</p>
              </div>
              <p className="text-lg font-bold text-primary">{product.revenue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
