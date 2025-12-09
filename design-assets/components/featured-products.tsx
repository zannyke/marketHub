"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image: 'url("/premium-wireless-headphones.png")',
    rating: 4.8,
    reviews: 324,
    badge: "Sale",
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    price: 249.99,
    originalPrice: 349.99,
    image: 'url("/smart-watch-minimalist.jpg")',
    rating: 4.9,
    reviews: 512,
    badge: "Hot",
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 179.99,
    originalPrice: 249.99,
    image: 'url("/designer-sunglasses.png")',
    rating: 4.7,
    reviews: 189,
    badge: null,
  },
  {
    id: 4,
    name: "Luxury Leather Bag",
    price: 299.99,
    originalPrice: 449.99,
    image: 'url("/luxury-leather-bag.png")',
    rating: 5.0,
    reviews: 456,
    badge: "New",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-slideDown">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 transition-all duration-500">
            Featured Products
          </h2>
          <p className="text-muted-foreground">Hand-picked items just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                className="group h-full rounded-2xl border border-primary/20 overflow-hidden hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-400 bg-card flex flex-col animate-slideUp hover-glow"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {/* Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: product.image }}
                  />
                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-accent to-secondary text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-slideDown">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          className="fill-secondary text-secondary transition-all duration-300 group-hover:scale-110"
                        />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm line-through text-muted-foreground">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm btn-animate shadow-md hover:shadow-lg hover:shadow-primary/40"
                      size="sm"
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
