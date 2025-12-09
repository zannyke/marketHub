"use client"

import Link from "next/link"
import { ShoppingBag, Zap, Heart, Sparkles } from "lucide-react"

const categories = [
  { name: "Electronics", icon: Zap, color: "from-blue-400 to-blue-600" },
  { name: "Fashion", icon: ShoppingBag, color: "from-pink-400 to-pink-600" },
  { name: "Home & Living", icon: Heart, color: "from-purple-400 to-purple-600" },
  { name: "Trending", icon: Sparkles, color: "from-orange-400 to-orange-600" },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Browse our curated collection of premium products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={`/marketplace?category=${category.name.toLowerCase()}`}>
                <div className="group h-32 rounded-2xl bg-gradient-to-br from-background to-muted border border-border hover:border-primary transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg hover:scale-105">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">Explore collection</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
