"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const relatedProducts = [
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
    id: 4,
    name: "Luxury Leather Bag",
    price: 299.99,
    originalPrice: 449.99,
    rating: 5.0,
    reviews: 456,
    image: 'url("/luxury-leather-bag.png")',
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

export function RelatedProducts() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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
                  <div className="flex items-center gap-2">
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
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm" size="sm">
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
  )
}
