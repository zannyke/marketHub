"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, Truck } from "lucide-react";
import Link from "next/link";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const ORDER_STATUS_DATA = [
    { name: 'Pending', value: 8, color: '#f59e0b' }, // Amber
    { name: 'Processing', value: 12, color: '#3b82f6' }, // Blue
    { name: 'Shipped', value: 24, color: '#6366f1' }, // Indigo
    { name: 'Delivered', value: 45, color: '#10b981' }, // Green
];

export default function OrdersPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
                                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Orders</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats / Charts */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Order Status Distribution</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={ORDER_STATUS_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {ORDER_STATUS_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {ORDER_STATUS_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
                                        <span className="text-sm text-slate-600">{item.name} ({item.value})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Lists */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Pending Orders */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Clock size={20} className="text-amber-500" /> Pending Orders
                                </h3>
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">8 New</span>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {[1, 2].map(i => (
                                    <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between gap-4">
                                        <div>
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <h4 className="font-bold text-slate-900">Order #102{i}</h4>
                                                <span className="text-xs text-slate-400">Placed 2 hours ago</span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Customer: <span className="font-medium">John Doe</span></p>
                                            <div className="flex gap-2">
                                                <img src="/products/headphones.png" className="w-10 h-10 border border-slate-200 rounded-md object-contain bg-slate-50" />
                                                <img src="/products/watch.png" className="w-10 h-10 border border-slate-200 rounded-md object-contain bg-slate-50" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-center gap-2">
                                            <p className="font-bold text-slate-900 text-lg">$449.98</p>
                                            <Button size="sm" className="bg-teal-600 text-white">Accept & Ship</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cleared / Sold Orders */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden opacity-80">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-green-500" /> Recently Cleared
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="p-4 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-50 text-green-600 p-2 rounded-full"><Truck size={16} /></div>
                                            <div>
                                                <p className="font-medium text-slate-900">Order #88{i}9</p>
                                                <p className="text-slate-500">Shipped on Dec 9</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-600">$120.00</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
