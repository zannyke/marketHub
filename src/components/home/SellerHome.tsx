"use client";
import { Button } from "@/components/ui/button";
import { useApp } from "@/providers/AppProvider";
import Link from "next/link";
import { Package, TrendingUp, DollarSign, Plus } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export function SellerHome() {
    const { user } = useApp();

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Seller Dashboard</h1>
                            <p className="text-slate-500">Welcome back, {user?.email?.split('@')[0]}</p>
                        </div>
                        <Link href="/seller/products/new">
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                                <Plus size={18} className="mr-2" /> Add New Product
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                            <span className="text-slate-500 font-medium">Total Revenue</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">$12,450</h3>
                        <p className="text-sm text-green-600 mt-1">+15% from last month</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <Package size={24} />
                            </div>
                            <span className="text-slate-500 font-medium">Active Products</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">24</h3>
                        <p className="text-sm text-slate-400 mt-1">4 low stock</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                <TrendingUp size={24} />
                            </div>
                            <span className="text-slate-500 font-medium">Pending Orders</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">8</h3>
                        <p className="text-sm text-orange-500 mt-1">Needs attention</p>
                    </div>
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Orders</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-900">Order #100{i}</p>
                                    <p className="text-sm text-slate-500">Premium Wireless Headphones</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-teal-600">$199.99</p>
                                    <p className="text-xs text-slate-400">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Button variant="outline" className="w-full">View All Orders</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
