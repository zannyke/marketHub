"use client"

import { Edit2, Trash2, Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    sku: "PWH-001",
    price: 199.99,
    stock: 45,
    status: "active",
    sales: 127,
  },
  {
    id: 2,
    name: "Luxury Leather Bag",
    sku: "LLB-002",
    price: 299.99,
    stock: 12,
    status: "active",
    sales: 84,
  },
  {
    id: 3,
    name: "Smart Watch",
    sku: "SW-003",
    price: 249.99,
    stock: 0,
    status: "out_of_stock",
    sales: 56,
  },
]

export function ProductManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus size={18} className="mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Product Name</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">SKU</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Price</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Stock</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Sales</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.sku}</td>
                  <td className="px-6 py-4 font-semibold text-primary">${product.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        product.stock > 20 ? "text-green-600" : product.stock > 0 ? "text-yellow-600" : "text-red-600"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        product.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-muted h-8 w-8">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-muted h-8 w-8">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600 h-8 w-8">
                        <Trash2 size={16} />
                      </Button>
                    </div>
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
