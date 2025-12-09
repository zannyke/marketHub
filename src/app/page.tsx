"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Truck, CheckCircle, Zap, Star, Heart, Flame, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/providers/AppProvider";

export default function Home() {
  const { user, isLoading } = useApp();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-32 md:pb-40 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="container mx-auto px-4 flex flex-col items-center relative z-10 text-center">
          {user ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
              Welcome back, {user.email?.split('@')[0]}!
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
              Welcome to the future of shopping
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tight max-w-4xl">
            Curated Excellence for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Modern Living</span>
          </h1>

          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore a world of premium products, where quality meets innovation.
            Join over 100,000 satisfied aesthetic seekers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto mb-20">
            <Link href="/marketplace" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                {user ? "Continue Shopping" : "Start Exploring"} <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>

            {!user ? (
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg border-2 border-slate-200 text-slate-700 hover:bg-white hover:text-teal-600 hover:border-teal-200 transition-all font-bold">
                  Join for Free
                </Button>
              </Link>
            ) : (
              <Link href="/customer/orders" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg border-2 border-slate-200 text-slate-700 hover:bg-white hover:text-teal-600 hover:border-teal-200 transition-all font-bold">
                  My Orders
                </Button>
              </Link>
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 text-center border-t border-slate-100 pt-12">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl mb-2"><ShieldCheck size={24} /></div>
              <span className="font-bold text-slate-900">Verified Sellers</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl mb-2"><Truck size={24} /></div>
              <span className="font-bold text-slate-900">Global Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl mb-2"><Heart size={24} /></div>
              <span className="font-bold text-slate-900">Curated Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Review */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trending Categories</h2>
              <p className="text-slate-500 text-lg">Browse our most popular collections</p>
            </div>
            <Link href="/marketplace" className="hidden md:flex items-center text-teal-600 font-bold hover:underline">
              View all categories <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Electronics", icon: <Zap size={28} className="text-white" />, color: "bg-teal-500", href: "/marketplace?cat=electronics", count: "1.2k Products" },
              { label: "Fashion", icon: <ShoppingBag size={28} className="text-white" />, color: "bg-rose-500", href: "/marketplace?cat=fashion", count: "850 Products" },
              { label: "Home & Living", icon: <Heart size={28} className="text-white" />, color: "bg-amber-500", href: "/marketplace?cat=home", count: "2.4k Products" },
              { label: "Gadgets", icon: <Flame size={28} className="text-white" />, color: "bg-indigo-500", href: "/marketplace?cat=trending", count: "500+ Drops" },
            ].map((cat, i) => (
              <Link key={i} href={cat.href}>
                <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{cat.label}</h3>
                  <p className="text-slate-400 font-medium">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Drops</h2>
            <p className="text-slate-500 text-lg">Fresh arrivals selected by our experts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Premium Wireless Headphones", price: 199.99, oldPrice: 299.99, rating: 4.8, reviews: 324, image: "/products/headphones.png", tag: "Sale", tagColor: "bg-rose-500" },
              { title: "Minimalist Smart Watch", price: 249.99, oldPrice: 349.99, rating: 4.9, reviews: 512, image: "/products/watch.png", tag: "Hot", tagColor: "bg-amber-500" },
              { title: "Designer Sunglasses", price: 179.99, oldPrice: 249.99, rating: 4.7, reviews: 189, image: "/products/sunglasses.png" },
              { title: "Luxury Leather Bag", price: 299.99, oldPrice: 449.99, rating: 5.0, reviews: 456, image: "/products/bag.png", tag: "New", tagColor: "bg-teal-500" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <div className="h-[300px] bg-slate-50 relative p-8 flex items-center justify-center overflow-hidden">
                  {item.tag && (
                    <span className={`absolute top-5 right-5 ${item.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg`}>
                      {item.tag}
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                  />

                  {/* Quick Action */}
                  <div className="absolute bottom-5 left-0 right-0 px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button className="w-full bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-bold shadow-xl">
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star fill="#FBBF24" color="#FBBF24" size={14} />
                    <span className="text-sm font-bold text-slate-900">{item.rating}</span>
                    <span className="text-xs text-slate-400">({item.reviews} reviews)</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 truncate">{item.title}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-teal-600">${item.price}</span>
                    <span className="text-sm text-slate-400 line-through">${item.oldPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-bold border-2 hover:bg-slate-50">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
