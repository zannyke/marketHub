"use client";

import { Button } from "@/components/ui/button";
import { Package, Truck, Clock, CheckCircle, MessageSquare, Star, ChevronRight, Users } from "lucide-react";
import Image from "next/image";

export default function CustomerOrdersPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-12 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
                    <p className="text-slate-500 dark:text-slate-400">Track and manage your recent purchases.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Active Order */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-teal-100 dark:border-teal-900/30 overflow-hidden ring-1 ring-teal-50 dark:ring-teal-900/20">
                            <div className="bg-gradient-to-r from-teal-50 to-white dark:from-teal-950/40 dark:to-slate-900 px-6 py-4 border-b border-teal-50 dark:border-teal-900/30 flex justify-between items-center bg-opacity-50">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                                    </span>
                                    <h3 className="font-bold text-teal-800 dark:text-teal-400">In Progress</h3>
                                </div>
                                <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">Arriving in 15 mins</span>
                            </div>
                            <div className="p-6">
                                <div className="flex gap-4 mb-6">
                                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 relative overflow-hidden">
                                        <img src="/products/headphones.png" alt="Headphones" className="object-contain w-full h-full p-2" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">Premium Wireless Headphones</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Sold by TechNova</p>
                                        <div className="mt-2 text-sm font-medium text-slate-900 dark:text-white">$199.99</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative pt-6 pb-2">
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 w-[75%] rounded-full relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wide">
                                        <span className="text-teal-600 dark:text-teal-400">Confirmed</span>
                                        <span className="text-teal-600 dark:text-teal-400">Shipped</span>
                                        <span className="text-teal-600 dark:text-teal-400">Out for Delivery</span>
                                        <span>Delivered</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <Button className="flex-1 bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 font-bold">
                                        Track Live Map
                                    </Button>
                                    <Button variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                                        Contact Support
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Past Orders */}
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white pt-4">Past Orders</h3>

                        {[
                            { id: "ORD-9982", date: "Dec 8, 2025", items: ["Smart Watch Gen 2", "Screen Protector"], total: "$245.50", status: "Delivered", img: "/products/watch.png" },
                            { id: "ORD-9221", date: "Nov 24, 2025", items: ["Ergonomic Mouse"], total: "$89.00", status: "Delivered", img: "/products/mouse.png" }
                        ].map((order, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row gap-6 md:items-center">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                                    <img src={order.img} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{order.items[0]} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</h4>
                                        <span className="font-bold text-slate-900 dark:text-white">{order.total}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Ordered on {order.date}</p>
                                    <span className="inline-flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full">
                                        <CheckCircle size={12} className="mr-1" /> {order.status}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[140px]">
                                    <Button variant="outline" size="sm" className="font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                        View Receipt
                                    </Button>
                                    <Button size="sm" className="bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 text-teal-700 dark:text-teal-400 font-bold border-0 shadow-none">
                                        <Star size={14} className="mr-1" />
                                        Rate Product
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Account Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                                <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800">JP</div>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">James Patterson</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Premium Member</p>
                            <div className="mt-6 flex justify-center gap-4 text-sm font-medium">
                                <div className="text-center px-4">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white">12</div>
                                    <div className="text-slate-400 dark:text-slate-500 text-xs">Orders</div>
                                </div>
                                <div className="text-center px-4 border-l border-slate-100 dark:border-slate-800">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white">4</div>
                                    <div className="text-slate-400 dark:text-slate-500 text-xs">Reviews</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Invite Friends</h3>
                                <p className="text-teal-100 text-sm mb-4">Get $10 for every friend you invite to MarketHub.</p>
                                <Button className="w-full bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 font-bold border-0">
                                    Copy Invite Link
                                </Button>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10">
                                <Users size={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
