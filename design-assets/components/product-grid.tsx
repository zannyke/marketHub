"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 324,
    badge: "Sale",
    image: 'url("/premium-wireless-headphones.png")',
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviews: 512,
    badge: "Hot",
    image: 'url("/smart-watch-minimalist.jpg")',
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 189,
    badge: null,
    image: 'url("/designer-sunglasses.png")',
  },
  {
    id: 4,
    name: "Luxury Leather Bag",
    price: 299.99,
    originalPrice: 449.99,
    rating: 5.0,
    reviews: 456,
    badge: "New",
    image: 'url("/luxury-leather-bag.png")',
  },
  {
    id: 5,
    name: "Classic Camera",
    price: 599.99,
    originalPrice: 799.99,
    rating: 4.6,
    reviews: 278,
    badge: "Sale",
    image: 'url("/vintage-camera.jpg")',
  },
  {
    id: 6,
    name: "Portable Speaker",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 412,
    badge: null,
    image: 'url("/portable-speaker.jpg")',
  },
  {
    id: 7,
    name: "Coffee Maker Deluxe",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 356,
    badge: "Hot",
    image: 'url("/coffee-maker.jpg")',
  },
  {
    id: 8,
    name: "Gaming Mouse Pro",
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 521,
    badge: "New",
    image: 'url("/gaming-mouse.jpg")',
  },
]

export function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      {/* Sort Bar */}
      <div className="flex items-center justify-between animate-slideDown">
        <p className="text-sm text-muted-foreground">Showing 8 products</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-input border border-primary/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary/60 cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div
              className="group h-full rounded-2xl border border-primary/20 overflow-hidden hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-400 bg-card flex flex-col animate-slideUp hover-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(product.id)
                  }}
                  className="absolute top-3 left-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 duration-300 hover:shadow-lg hover:shadow-red-200"
                >
                  <Heart
                    size={18}
                    className={`transition-all duration-300 ${favorites.includes(product.id) ? "fill-red-500 text-red-500 scale-110" : "text-foreground"}`}
                  />
                </button>
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 animate-slideUp">
        <Button variant="outline" disabled className="transition-all duration-300 bg-transparent">
          Previous
        </Button>
        {[1, 2, 3, 4].map((page) => (
          <Button
            key={page}
            variant={page === 1 ? "default" : "outline"}
            className="w-10 h-10 p-0 transition-all duration-300 hover:scale-110"
          >
            {page}
          </Button>
        ))}
        <Button variant="outline" className="transition-all duration-300 hover:scale-105 bg-transparent">
          Next
        </Button>
      </div>
    </div>
  )
}
