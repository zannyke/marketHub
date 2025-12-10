"use client";

import { Button } from "@/components/ui/button";
import { CircleDollarSign, Package, ShoppingBag, TrendingUp, Truck, Users, Clock, CheckCircle } from "lucide-react";
import { useApp } from "@/providers/AppProvider";
import { useEffect, useState } from "react";

interface ProfileStats {
    login_count: number;
    cart_count: number;
    bought_count: number;
    sold_count: number;
    delivered_count: number;
}

export default function SellerDashboard() {
    const { user, supabase } = useApp();
    const [stats, setStats] = useState<ProfileStats | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('login_count, cart_count, bought_count, sold_count, delivered_count')
                    .eq('id', user.id)
                    .single();

                if (data) setStats(data);
            } catch (e) {
                console.error("Error fetching stats:", e);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchStats();
    }, [user, supabase]);

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Seller Dashboard</h1>
                        <p className="text-slate-500">Manage your products, orders, and earnings.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="bg-white border-slate-200">
                            Export Reports
                        </Button>
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md">
                            <TrendingUp size={18} className="mr-2" />
                            List New Product
                        </Button>
                    </div>
                </div>

                {/* Stats Grid - LIVE DATA */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Items in Cart", value: stats?.cart_count ?? 0, change: "Live", icon: <ShoppingBag size={24} className="text-teal-600" />, bg: "bg-teal-50" },
                        { label: "Items Sold", value: stats?.sold_count ?? 0, change: "Lifetime", icon: <CircleDollarSign size={24} className="text-blue-600" />, bg: "bg-blue-50" },
                        { label: "Items Bought", value: stats?.bought_count ?? 0, change: "Lifetime", icon: <Package size={24} className="text-purple-600" />, bg: "bg-purple-50" },
                        { label: "Logins", value: stats?.login_count ?? 0, change: "Total", icon: <Users size={24} className="text-orange-600" />, bg: "bg-orange-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">
                                    {isLoadingStats ? "..." : stat.value}
                                </h3>
                                <p className="text-xs font-semibold text-teal-600 mt-1 flex items-center">
                                    <TrendingUp size={12} className="mr-1" /> {stat.change}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} shadow-sm`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders Section (Left - Wider) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Orders Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Clock size={20} className="text-blue-500" />
                                    Orders to Prepare
                                </h3>
                                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">5 Pending</span>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {[
                                    { id: "#ORD-7782", item: "Premium Wireless Headphones", time: "10 mins ago", status: "New", price: "$199.99" },
                                    { id: "#ORD-7781", item: "Organic Green Tea Set", time: "25 mins ago", status: "New", price: "$45.00" },
                                    { id: "#ORD-7780", item: "Smart Home Hub", time: "1 hour ago", status: "Processing", price: "$129.50" },
                                ].map((order, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{order.item}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                                    <span>{order.id}</span>
                                                    <span>•</span>
                                                    <span>{order.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <div className="font-bold text-slate-900">{order.price}</div>
                                                <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">{order.status}</div>
                                            </div>
                                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold">
                                                Ready
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 text-center border-t border-slate-50">
                                <Button variant="ghost" className="text-teal-600 font-bold hover:text-teal-700 hover:bg-teal-50">
                                    View All Orders
                                </Button>
                            </div>
                        </div>

                        {/* Pickup Status */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Truck size={20} className="text-orange-500" />
                                    Awaiting Pickup
                                </h3>
                            </div>
                            <div className="p-6 text-center text-slate-500 py-12">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                    <CheckCircle size={32} />
                                </div>
                                <p>No orders currently waiting for pickup.</p>
                            </div>
                        </div>
                    </div>

                    {/* Performance Section (Right) */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h3 className="font-bold text-lg text-slate-900 mb-6">Top Products</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "Wireless Headphones", sales: "124 sold", rev: "$24k", width: "80%" },
                                    { name: "Smart Watch Gen 2", sales: "98 sold", rev: "$18k", width: "65%" },
                                    { name: "Laptop Stand", sales: "65 sold", rev: "$3.2k", width: "45%" },
                                ].map((prod, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-slate-700 text-sm">{prod.name}</span>
                                            <span className="font-bold text-slate-900 text-sm">{prod.rev}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div
                                                className="bg-teal-500 h-2 rounded-full"
                                                style={{ width: prod.width }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{prod.sales}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Seller Pro Tips</h3>
                            <p className="text-teal-50 text-sm mb-4">Adding high-quality images can increase sales by up to 40%.</p>
                            <Button variant="secondary" size="sm" className="w-full bg-white text-teal-600 hover:bg-teal-50 font-bold border-0">
                                Read Guide
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
