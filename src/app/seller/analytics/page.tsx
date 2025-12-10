"use client";

import { useApp } from "@/providers/AppProvider";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, AreaChart, Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign, TrendingUp, CreditCard, Calendar } from "lucide-react";
import Link from "next/link";

const REVENUE_DATA = [
    { name: 'Mon', revenue: 4000, orders: 24 },
    { name: 'Tue', revenue: 3000, orders: 13 },
    { name: 'Wed', revenue: 2000, orders: 9 },
    { name: 'Thu', revenue: 2780, orders: 39 },
    { name: 'Fri', revenue: 1890, orders: 48 },
    { name: 'Sat', revenue: 2390, orders: 38 },
    { name: 'Sun', revenue: 3490, orders: 43 },
];

const SALES_BREAKDOWN = [
    { name: 'Electronics', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Home', value: 300 },
    { name: 'Sports', value: 200 },
];

export default function AnalyticsPage() {
    const { user } = useApp();

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
                                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Analytics & Performance</h1>
                    <p className="text-slate-500">Financial Reports and Sales Insights</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-slate-500 font-medium">Total Revenue</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">$24,593.00</h3>
                        <p className="text-sm text-green-600 font-bold">+12.5% <span className="text-slate-400 font-normal">vs last month</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                <CreditCard size={20} />
                            </div>
                            <span className="text-slate-500 font-medium">Average Order Value</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">$142.50</h3>
                        <p className="text-sm text-green-600 font-bold">+2.1% <span className="text-slate-400 font-normal">vs last month</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-slate-500 font-medium">Conversion Rate</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">3.2%</h3>
                        <p className="text-sm text-red-500 font-bold">-0.4% <span className="text-slate-400 font-normal">vs last month</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-orange-100 text-orange-700 rounded-lg">
                                <Calendar size={20} />
                            </div>
                            <span className="text-slate-500 font-medium">Sales this week</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">214</h3>
                        <p className="text-sm text-green-600 font-bold">+18% <span className="text-slate-400 font-normal">vs last week</span></p>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Revenue Growth (Last 7 Days)</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} prefix="$" />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Orders Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Daily Orders</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                    <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                    <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
