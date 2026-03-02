"use client";

import { Button } from "@/components/ui/button";
import { Package, Truck, Clock, CheckCircle, MessageSquare, Star, ChevronRight, Users, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/providers/AppProvider";

export default function CustomerOrdersPage() {
    const { user } = useApp();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-12 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Hub</h1>
                    <p className="text-slate-500 dark:text-slate-400">Track and manage your recent purchases and active deliveries.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders List / Empty State */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
                            <div className="relative mb-10">
                                <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
                                <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/20 rounded-[2rem] flex items-center justify-center text-teal-600 relative">
                                    <ShoppingBag size={48} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-teal-500 border border-slate-100 dark:border-slate-700">
                                    <Package size={20} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Your Order History is Clear</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                                You haven't made any purchases yet. Explore our premium marketplace to find high-quality products protected by Swifft Escrow.
                            </p>

                            <Link href="/marketplace">
                                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-black px-12 h-16 text-lg rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1">
                                    Explore Marketplace
                                </Button>
                            </Link>

                            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl border-t border-slate-50 dark:border-slate-800 pt-12">
                                <div className="flex flex-col items-center gap-2">
                                    <CheckCircle size={20} className="text-teal-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Sellers</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Clock size={20} className="text-indigo-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fast Shipping</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Truck size={20} className="text-sky-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Tracking</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full mx-auto mb-6 flex items-center justify-center font-black text-3xl text-slate-400 dark:text-slate-600 border-4 border-white dark:border-slate-800 shadow-lg">
                                {user?.user_metadata?.full_name?.split(' ').map((n: any) => n[0]).join('') || 'U'}
                            </div>
                            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-1">
                                {user?.user_metadata?.full_name || 'Valued Hub Member'}
                            </h3>
                            <p className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-8">Premium Account</p>

                            <div className="grid grid-cols-2 gap-4 text-sm font-medium pt-6 border-t border-slate-50 dark:border-slate-800">
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">0</div>
                                    <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Total Orders</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">0</div>
                                    <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Reviews</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-teal-600 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="font-black text-2xl mb-3 tracking-tight">Invite Friends</h3>
                                <p className="text-teal-100 text-sm font-medium mb-8 leading-relaxed">
                                    Expand the network. Get <span className="text-white font-black">$10.00</span> for every verified join via your link.
                                </p>
                                <Button className="w-full bg-white text-teal-600 hover:bg-teal-50 font-black h-14 rounded-2xl border-0 shadow-lg">
                                    Generate Invite Link
                                </Button>
                            </div>
                            <div className="absolute -right-8 -bottom-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
                                <Users size={160} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
