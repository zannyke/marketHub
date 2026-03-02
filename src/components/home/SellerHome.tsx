"use client";
import { Button } from "@/components/ui/button";
import { useApp } from "@/providers/AppProvider";
import Link from "next/link";
import { Package, TrendingUp, ShoppingCart, Plus, ArrowRight, BarChart3, Box, AlertCircle } from "lucide-react";

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
                                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md text-sm font-bold">0 Active</span>
                                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-bold">0 Low Stock</span>
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
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-bold flex items-center gap-1">
                                    0 Pending
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
                    </div>

                    <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                        <ShoppingCart size={40} className="mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No recent orders found.</p>
                        <p className="text-xs">Your sales activity will appear here in real-time.</p>
                    </div>
                </div>
            </div>

        </main>
    );
}
