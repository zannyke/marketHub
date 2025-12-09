"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">M</span>
              </div>
              <span className="font-bold text-lg">MarketHub</span>
            </div>
            <p className="text-sm opacity-80">Premium marketplace for curated products and trusted sellers.</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Electronics
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Fashion
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Home & Living
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Trending
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Help Center
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Contact Us
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Shipping Info
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                Returns
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2025 MarketHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-100">
              Terms of Service
            </Link>
            <Link href="#" className="hover:opacity-100">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
