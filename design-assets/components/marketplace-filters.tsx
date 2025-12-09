"use client"

import { useState } from "react"
import { ChevronDown, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Electronics", count: 2345 },
  { name: "Fashion", count: 1892 },
  { name: "Home & Living", count: 1654 },
  { name: "Beauty", count: 987 },
  { name: "Sports", count: 756 },
  { name: "Books", count: 543 },
]

const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "LG"]

export function MarketplaceFilters() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Category")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  return (
    <div className="space-y-6">
      {/* Mobile Filter Button */}
      <Button variant="outline" className="w-full lg:hidden flex items-center justify-center gap-2 bg-transparent">
        <Sliders size={18} />
        Show Filters
      </Button>

      {/* Category Filter */}
      <div className="bg-card rounded-xl border border-border p-4">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "Category" ? null : "Category")}
          className="w-full flex justify-between items-center text-foreground font-semibold mb-4 hover:text-primary transition-colors"
        >
          Category
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedCategory === "Category" ? "rotate-180" : ""}`}
          />
        </button>

        {expandedCategory === "Category" && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category.name} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-border w-4 h-4" />
                <span className="text-sm text-foreground flex-1">{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="bg-card rounded-xl border border-border p-4">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "Price" ? null : "Price")}
          className="w-full flex justify-between items-center text-foreground font-semibold mb-4 hover:text-primary transition-colors"
        >
          Price Range
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedCategory === "Price" ? "rotate-180" : ""}`}
          />
        </button>

        {expandedCategory === "Price" && (
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">${priceRange[0]}</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-sm text-foreground">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="bg-card rounded-xl border border-border p-4">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "Brand" ? null : "Brand")}
          className="w-full flex justify-between items-center text-foreground font-semibold mb-4 hover:text-primary transition-colors"
        >
          Brand
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedCategory === "Brand" ? "rotate-180" : ""}`}
          />
        </button>

        {expandedCategory === "Brand" && (
          <div className="space-y-3">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded border-border w-4 h-4"
                />
                <span className="text-sm text-foreground">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="bg-card rounded-xl border border-border p-4">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "Rating" ? null : "Rating")}
          className="w-full flex justify-between items-center text-foreground font-semibold mb-4 hover:text-primary transition-colors"
        >
          Rating
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedCategory === "Rating" ? "rotate-180" : ""}`}
          />
        </button>

        {expandedCategory === "Rating" && (
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  className="rounded border-border w-4 h-4"
                />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-secondary">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <span key={i} className="text-muted">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({rating}.0+)</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
        Reset Filters
      </Button>
    </div>
  )
}
