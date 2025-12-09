"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4 animate-slideUp">
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fadeIn">
                Discover Premium Products
              </h1>
              <p className="text-xl text-muted-foreground animate-slideUp" style={{ animationDelay: "0.1s" }}>
                Shop the finest curated collection of products from trusted sellers. Quality, variety, and great prices
                in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground btn-animate shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/marketplace" className="flex items-center gap-2">
                  Start Shopping
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 btn-animate hover:text-primary bg-transparent"
              >
                Become a Seller
              </Button>
            </div>

            {/* Stats with color animations */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <div className="group hover-glow p-4 rounded-lg bg-primary/5 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:to-secondary transition-all duration-500">
                  10K+
                </div>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="group hover-glow p-4 rounded-lg bg-accent/5 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent group-hover:from-primary transition-all duration-500">
                  5K+
                </div>
                <p className="text-sm text-muted-foreground">Sellers</p>
              </div>
              <div className="group hover-glow p-4 rounded-lg bg-secondary/5 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent group-hover:from-accent transition-all duration-500">
                  100K+
                </div>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
            </div>
          </div>

          {/* Right - Animated Image Placeholder */}
          <div className="relative h-96 sm:h-full min-h-96 rounded-2xl overflow-hidden animate-scaleIn">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/10 rounded-2xl hover:from-primary/30 hover:via-accent/20 hover:to-secondary/20 transition-all duration-500" />
            <svg className="absolute inset-0 w-full h-full animate-pulse" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.1" className="animate-pulse" />
              <path
                d="M 100 200 Q 200 100 300 200 Q 200 300 100 200"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.2"
                className="transition-all duration-500 hover:opacity-40"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#52c1dc" />
                  <stop offset="100%" stopColor="#9e6dfd" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
