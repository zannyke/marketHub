"use client"

import Link from "next/link"
import { Star, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const wishlistItems = [
  {
    id: 2,
    name: "Minimalist Smart Watch",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviews: 512,
    image: 'url("/smart-watch-minimalist.jpg")',
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 189,
    image: 'url("/designer-sunglasses.png")',
  },
  {
    id: 5,
    name: "Classic Camera",
    price: 599.99,
    originalPrice: 799.99,
    rating: 4.6,
    reviews: 278,
    image: 'url("/vintage-camera.jpg")',
  },
]

export function Wishlist() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/marketplace">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group h-full rounded-2xl border border-border overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 bg-card flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundImage: product.image }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-secondary text-secondary" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                      <span className="text-xs line-through text-muted-foreground">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                        size="sm"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent text-sm"
                        size="sm"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
