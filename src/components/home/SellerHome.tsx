"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/providers/AppProvider";
import Link from "next/link";
import { Package, TrendingUp, ShoppingCart, Plus, ArrowRight, BarChart3, Box, AlertCircle, Globe, ShieldCheck } from "lucide-react";

export function SellerHome() {
    const { user, supabase } = useApp();
    const [productCount, setProductCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            try {
                const { count, error } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true })
                    .eq('seller_id', user.id);

                if (error) throw error;
                setProductCount(count || 0);
            } catch (err) {
                console.error("Error fetching seller stats:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [supabase, user]);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Welcome Section - Enhanced with Dark Mode Gradient */}
            <div className="bg-slate-900 dark:bg-slate-900 text-white relative overflow-hidden transition-colors">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-300 text-[10px] font-black uppercase tracking-widest mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                            Verified Seller Terminal
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                            Elevate Your Business, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                {user?.email?.split('@')[0]}
                            </span>.
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl font-medium leading-relaxed">
                            Your premium inventory is protected by Swifft Escrow.
                            Manage your global marketplace presence from a single, unified dashboard.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/seller/products/new">
                                <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-black rounded-2xl px-10 h-16 text-lg shadow-2xl shadow-teal-500/20 transition-all hover:-translate-y-1">
                                    <Plus size={24} className="mr-2" /> Add New Product
                                </Button>
                            </Link>
                            <Link href="/seller/orders">
                                <Button variant="outline" size="lg" className="border-slate-700 bg-white/5 backdrop-blur-md text-slate-300 hover:bg-white/10 hover:text-white rounded-2xl px-10 h-16 text-lg transition-all">
                                    Manage Orders
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
                {/* Navigation / Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <Link href="/seller/analytics" className="group">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:border-teal-500/50 transition-all duration-500 h-full group-hover:-translate-y-2">
                            <div className="p-5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-2xl w-fit mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                                <BarChart3 size={36} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Analytics Hub</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed italic">"Growth is a science of measurement."</p>
                            <div className="flex items-center text-purple-600 dark:text-purple-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                View Intelligence <ArrowRight size={18} className="ml-2" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/seller/products" className="group">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:border-teal-500/50 transition-all duration-500 h-full group-hover:-translate-y-2">
                            <div className="p-5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-2xl w-fit mb-8 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                                <Box size={36} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Active Inventory</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full text-xs font-black uppercase tracking-widest border border-teal-200 dark:border-teal-800">
                                    {isLoading ? "..." : productCount} Products
                                </span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full text-xs font-black uppercase tracking-widest">
                                    Online
                                </span>
                            </div>
                            <div className="flex items-center text-teal-600 dark:text-teal-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                Manage Catalog <ArrowRight size={18} className="ml-2" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/seller/orders" className="group">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:border-teal-500/50 transition-all duration-500 h-full group-hover:-translate-y-2">
                            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <ShoppingCart size={36} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Order Queue</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    Ready for Fulfillment
                                </span>
                            </div>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                Process Orders <ArrowRight size={18} className="ml-2" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Trust & Verification Banner */}
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"></div>
                    <div className="md:w-1/3 text-center">
                        <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/20 rounded-[2rem] flex items-center justify-center text-teal-600 mx-auto mb-6 shadow-inner">
                            <ShieldCheck size={48} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">100% Secure Hub</h4>
                        <div className="flex items-center justify-center gap-2 text-emerald-500">
                            <Globe size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Protection Online</span>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                            Your marketplace safety is our <span className="text-teal-600">Highest Priority.</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">
                            Every transaction on MarketHub is routed through our proprietary Swifft Escrow system. Funds are securely held in multi-signature environments until both the seller and the customer authorize the release, ensuring a 0% fraud rate for our partners.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 dark:border-slate-700">
                                PCI COMPLIANT
                            </div>
                            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 dark:border-slate-700">
                                256-BIT ENCRYPTION
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
