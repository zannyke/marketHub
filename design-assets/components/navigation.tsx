"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline group-hover:text-primary transition-colors duration-300">
              MarketHub
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full group">
              <Search
                className="absolute left-3 top-3 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="transition-colors-smooth hover:text-primary">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-accent text-primary-foreground btn-animate transition-colors-smooth shadow-md hover:shadow-lg hover:shadow-primary/40"
              asChild
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="transition-colors-smooth hover:text-accent hover:bg-accent/10"
            >
              <Link href="/cart">
                <ShoppingCart size={20} />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-colors duration-300 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border animate-slideDown">
            <div className="relative mt-4 mb-4 group">
              <Search
                className="absolute left-3 top-3 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm transition-all duration-300 hover:border-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" asChild className="justify-start transition-colors-smooth hover:text-primary">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                className="bg-primary hover:bg-accent text-primary-foreground justify-start btn-animate transition-colors-smooth"
                asChild
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start transition-colors-smooth hover:text-accent">
                <Link href="/cart" className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Cart
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
