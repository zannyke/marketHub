"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, Truck, ShoppingCart, Search, Ban, Package, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/providers/AppProvider";

export default function OrdersPage() {
    const { supabase, user } = useApp();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                // In a real implementation, we'd fetch actual orders for this seller
                // For now, mirroring the "no orders yet" state until real transactions occur
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('seller_id', user.id)
                    .order('created_at', { ascending: false });

                if (error && error.code !== 'PGRST116') {
                    // Table might not exist yet or no rows found
                } else {
                    setOrders(data || []);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [supabase, user]);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
            {/* Glossy Header */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-all">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-teal-600 p-0 h-auto">
                                    <ArrowLeft size={16} className="mr-1" /> Dashboard
                                </Button>
                            </Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Finance & Logistics</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Order Management</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Live Status</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">Active Terminal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-32 gap-6">
                        <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Transaction Records...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Empty Hero State */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-16 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>

                            <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/20 rounded-[2rem] flex items-center justify-center text-teal-600 mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <ShoppingCart size={48} />
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">Your Order Queue is Quiet.</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed font-medium text-lg mb-10">
                                Once customers start purchasing your premium products, their orders will appear here for processing and shipment.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/seller/products/new">
                                    <Button className="bg-teal-600 hover:bg-teal-700 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1">
                                        Add More Products
                                    </Button>
                                </Link>
                                <Link href="/seller/analytics">
                                    <Button variant="outline" className="border-2 border-slate-100 dark:border-slate-800 font-bold px-8 h-14 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        View Market Trends
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Informational Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                    <Truck size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Smart Logistics Routing</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1">
                                    Every order includes pre-integrated shipping labels and global tracking powered by the **Universal Delivery Protocol**.
                                </p>
                                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Advanced Shipping</span>
                                    <span className="text-blue-600">Active</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full">
                                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                                    <DollarSign size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Swifft Escrow Release</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1">
                                    Funds are automatically secured via multi-signature escrow upon customer checkout. Secure & instant release.
                                </p>
                                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Financial Protection</span>
                                    <span className="text-emerald-600">Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* List orders here if they exist */}
                        {orders.map(order => (
                            <div key={order.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                {/* Simple order row for now */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Order #{order.id.slice(0, 8)}</h4>
                                        <p className="text-xs text-slate-500">Status: {order.status}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-xl text-slate-900 dark:text-white">${order.total_amount}</div>
                                        <Link href={`/seller/orders/${order.id}`}>
                                            <Button variant="ghost" size="sm" className="text-teal-600 font-bold p-0">View Details <ArrowRight size={14} className="ml-1" /></Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
