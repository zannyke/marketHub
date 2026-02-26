"use client";

import { Button } from "@/components/ui/button";
import { CircleDollarSign, Package, ShoppingBag, TrendingUp, Truck, Users, Clock, CheckCircle, MessageSquare, Lock } from "lucide-react";
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
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <h3 className="font-black text-xl text-slate-900 flex items-center gap-2 tracking-tight">
                                        <MessageSquare size={20} className="text-teal-600" />
                                        Negotiation Center
                                    </h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Role-Isolated Trade Agreements</p>
                                </div>
                                <span className="text-[10px] font-black bg-teal-600 text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-teal-500/20">3 Live Sessions</span>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {[
                                    { id: "#NEG-882", user: "Buyer_Alpha", item: "DataWizard Node 04", price: "$49.99", status: "Negotiating", locked: false },
                                    { id: "#NEG-881", user: "Buyer_Gamma", item: "Shield Protocol v2", price: "$120.00", status: "LOCKED", locked: true },
                                    { id: "#NEG-880", user: "Buyer_Sigma", item: "Hardware Registry Key", price: "$85.00", status: "Negotiating", locked: false },
                                ].map((neg, i) => (
                                    <div key={i} className="p-6 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-teal-500 shadow-inner group-hover:scale-105 transition-transform">
                                                <Package size={22} />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-lg tracking-tight">{neg.item}</div>
                                                <div className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                                    <span>{neg.id}</span>
                                                    <span>•</span>
                                                    <span className="text-teal-600">With {neg.user}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 md:gap-8">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agreed Value</p>
                                                <p className="text-xl font-black text-slate-900">{neg.price}</p>
                                            </div>

                                            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${neg.locked ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                {neg.locked ? <Lock size={14} className="animate-pulse" /> : <Clock size={14} />}
                                                <span className="text-xs font-black uppercase tracking-tighter">{neg.status}</span>
                                            </div>

                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Button size="sm" className="bg-slate-900 text-white font-black rounded-lg h-10 px-6 uppercase text-[10px] tracking-widest">Enter Chat</Button>
                                                <Button
                                                    size="sm"
                                                    disabled={!neg.locked}
                                                    className={`font-black rounded-lg h-10 px-6 uppercase text-[10px] tracking-widest shadow-lg ${neg.locked ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/20' : 'bg-slate-100 text-slate-300 border border-slate-200 shadow-none'}`}
                                                >
                                                    Find Rider
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Logistics Registry (Phase 4) */}
                        <div className="bg-white rounded-[2rem] shadow-lg border-2 border-slate-900 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Truck size={120} />
                            </div>

                            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-black text-xl text-slate-900 flex items-center gap-2 tracking-tight">
                                    <Truck size={22} className="text-orange-500" />
                                    Swift Fleet Logistics
                                </h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Agreement Required for Dispatch</p>
                            </div>

                            <div className="p-8 space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="bg-slate-900 text-white p-6 rounded-[2rem] space-y-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Pickup Origin</p>
                                                <div className="w-2 h-2 rounded-full bg-teal-500" />
                                            </div>
                                            <div className="font-bold text-sm">Market Hub Vault - HQ1</div>
                                            <div className="text-[10px] text-slate-400 uppercase">Wait for rider biometric matching</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-[2rem] space-y-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drop-off Destination</p>
                                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                            </div>
                                            <div className="font-bold text-xs text-slate-400 italic italic">Awaiting Locked Agreement...</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-teal-50 border border-teal-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-teal-700 uppercase tracking-tighter">Agreement Lock Protocol</p>
                                            <p className="text-[10px] text-teal-600/70 font-medium">Automatic dispatch enabled upon mutual price lock.</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="h-10 border-2 border-teal-600 text-teal-700 font-black rounded-xl uppercase text-[10px] tracking-widest hover:bg-teal-100">View Active Riders</Button>
                                </div>
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
