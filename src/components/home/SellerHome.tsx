"use client";
import { Button } from "@/components/ui/button";
import { useApp } from "@/providers/AppProvider";
import Link from "next/link";
import { Package, TrendingUp, ShoppingCart, Plus, ArrowRight, BarChart3, Box, AlertCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export function SellerHome() {
    const { user } = useApp();

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Welcome Section */}
            <div className="bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-300 text-sm font-medium mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                            Seller Dashboard
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Welcome back, <span className="text-teal-400">{user?.email?.split('@')[0]}</span>. <br />
                            Ready to scale your business?
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-2xl">
                            Your products are being viewed by thousands. Here is what is happening in your store right now.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/seller/products/new">
                                <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-full px-8 h-12">
                                    <Plus size={18} className="mr-2" /> Add New Product
                                </Button>
                            </Link>
                            <Link href="/seller/orders">
                                <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full px-8 h-12">
                                    View Pending Orders
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
                {/* Navigation / Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Link href="/seller/analytics" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-teal-500 transition-all duration-300 h-full group-hover:-translate-y-1">
                            <div className="p-4 bg-purple-50 text-purple-600 rounded-xl w-fit mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Analytics Hub</h3>
                            <p className="text-slate-500 mb-4">Deep dive into your revenue, sales trends, and financial growth charts.</p>
                            <div className="flex items-center text-purple-600 font-bold group-hover:translate-x-2 transition-transform">
                                View Performance <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/seller/products" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-teal-500 transition-all duration-300 h-full group-hover:-translate-y-1">
                            <div className="p-4 bg-teal-50 text-teal-600 rounded-xl w-fit mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                <Box size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Inventory</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md text-sm font-bold">24 Active</span>
                                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-sm font-bold">4 Low Stock</span>
                            </div>
                            <p className="text-slate-500 mb-4">Manage your products, update stock, and add new listings.</p>
                            <div className="flex items-center text-teal-600 font-bold group-hover:translate-x-2 transition-transform">
                                Manage Products <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/seller/orders" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-teal-500 transition-all duration-300 h-full group-hover:-translate-y-1">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl w-fit mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ShoppingCart size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Orders</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-bold flex items-center gap-1">
                                    <AlertCircle size={12} /> 8 Pending
                                </span>
                            </div>
                            <p className="text-slate-500 mb-4">Process new orders, print labels, and track delivery status.</p>
                            <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                                Process Orders <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Activity / Overview */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
                            <p className="text-slate-500">Latest activity from your customers</p>
                        </div>
                        <Link href="/seller/orders">
                            <Button variant="outline">View All</Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="h-12 w-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                                        #{i}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Order #100{i}</p>
                                        <p className="text-sm text-slate-500">Premium Wireless Headphones • 1 Item</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-700">Customer</p>
                                        <p className="text-sm text-slate-500">Alice Smith</p>
                                    </div>
                                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                                        Pending Ship...
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
