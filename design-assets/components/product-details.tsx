"use client"

import { useState } from "react"
import { Heart, Share2, Check, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductDetails() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const images = ["/premium-wireless-headphones.png", "/designer-sunglasses.png", "/luxury-leather-bag.png"]

  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 324,
    sold: 1250,
    description:
      "Experience premium sound quality with our state-of-the-art wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
    specs: [
      { label: "Driver Size", value: "40mm" },
      { label: "Frequency Response", value: "20Hz - 20kHz" },
      { label: "Impedance", value: "32 Ohm" },
      { label: "Battery Life", value: "30 hours" },
      { label: "Charging Time", value: "2 hours" },
      { label: "Warranty", value: "2 years" },
    ],
    features: [
      "Active Noise Cancellation (ANC)",
      "Premium Sound Quality",
      "30-Hour Battery Life",
      "Comfortable Over-Ear Design",
      "Built-in Microphone",
      "Foldable Design",
      "Wireless Bluetooth 5.0",
      "Includes Carrying Case",
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 border-b border-border">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative h-96 sm:h-full bg-muted rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-300"
            style={{ backgroundImage: `url(${images[selectedImage]})` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-24 rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === index ? "border-primary" : "border-border"
              }`}
            >
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          Home / Electronics / Audio / <span className="text-primary">Headphones</span>
        </div>

        {/* Title & Rating */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < 4 ? "text-secondary text-lg" : "text-muted text-lg"}>
                  ★
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-semibold text-foreground">{product.rating} out of 5</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
              <span className="text-muted-foreground">{product.sold} sold</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3 p-6 bg-card rounded-xl border border-border">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">${product.price}</span>
            <span className="text-lg line-through text-muted-foreground">${product.originalPrice}</span>
            <span className="text-lg font-semibold text-accent">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
          <p className="text-sm text-accent font-medium">Limited time offer - Price may increase soon!</p>
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {product.features.slice(0, 6).map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-foreground font-medium">Quantity:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
            >
              −
            </button>
            <span className="px-6 py-2 text-foreground font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6">
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border bg-transparent hover:bg-muted"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"} />
          </Button>
          <Button variant="outline" size="lg" className="border-border bg-transparent hover:bg-muted">
            <Share2 size={20} />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-muted rounded-xl">
          <div className="flex flex-col items-center text-center gap-2">
            <Truck size={24} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Free Shipping</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Shield size={24} className="text-primary" />
            <span className="text-xs font-medium text-foreground">2-Year Warranty</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <RotateCcw size={24} className="text-primary" />
            <span className="text-xs font-medium text-foreground">30-Day Returns</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="p-4 bg-card border border-border rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">Sold by</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Premium Electronics Co.</span>
            <Button variant="outline" size="sm" className="border-border bg-transparent hover:bg-muted">
              Contact Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
