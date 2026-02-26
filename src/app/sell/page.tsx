"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/providers/AppProvider";
import { Upload, DollarSign, BarChart, Wallet, ShieldCheck, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function SellPage() {
    const { user, role } = useApp();
    const [withdrawing, setWithdrawing] = useState(false);
    const [balance, setBalance] = useState(2450.70); // Simulated 70% profit balance

    const handleWithdraw = () => {
        setWithdrawing(true);
        setTimeout(() => {
            setBalance(0);
            setWithdrawing(false);
            alert("Funds transferred to your verified M-Pesa account!");
        }, 2000);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Seller Header */}
            <div className="bg-slate-900 py-16 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center md:text-left max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-teal-500/30">
                            <ShieldCheck size={14} /> Seller Command Center
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[0.9]">
                            Market <span className="text-teal-500">Hub</span> <br />
                            Trade Intelligence.
                        </h1>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed">
                            Your products are automatically enrolled in the <span className="text-white">Swift 70/30</span> financial engine.
                            Secure escrow and unlimited M-Pesa withdrawals.
                        </p>
                    </div>

                    {/* Withdrawal Module (Phase 3) */}
                    <div className="w-full max-w-sm">
                        <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 shadow-2xl shadow-slate-900/50 border border-slate-700 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Wallet size={120} />
                            </div>

                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Internal Profit Wallet</h3>

                            <div className="space-y-1 mb-8">
                                <p className="text-sm font-bold text-slate-500">Withdrawable Balance (70%)</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">${balance.toFixed(2)}</span>
                                    <span className="text-teal-600 font-bold text-xs uppercase">Verified</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleWithdraw}
                                disabled={withdrawing || balance <= 0}
                                size="lg"
                                className="w-full h-16 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-500/30 text-lg transition-transform hover:-translate-y-1"
                            >
                                {withdrawing ? "Processing Swift Entry..." : "Withdraw to M-Pesa"}
                            </Button>

                            <p className="text-center text-[10px] font-bold text-slate-400 uppercase mt-4">Automated 30% Platform Fee Deducted</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Upload Section (Phase 2 & 3) */}
                    <div className="lg:col-span-12">
                        <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="md:w-1/3">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">New Inventory Entry</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                        All uploads are subject to <span className="text-teal-600 font-bold">Hardware Registry</span> validation.
                                        Ensure condition tags are accurate to prevent trade flags.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            <Tag size={14} className="text-teal-500" /> Condition Tags Required
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-2/3 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Product Name" placeholder="High-Performance GPU" />
                                        <Input label="Price ($)" type="number" placeholder="499.99" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Item Classification (Hardware Profile)</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['New', 'Refurbished'].map(condition => (
                                                <label key={condition} className="relative cursor-pointer group">
                                                    <input type="radio" name="condition" value={condition} className="peer hidden" defaultChecked={condition === 'New'} />
                                                    <div className="h-14 flex items-center justify-center rounded-2xl border-2 border-slate-100 peer-checked:border-teal-600 peer-checked:bg-teal-50 text-slate-400 peer-checked:text-teal-700 font-black transition-all group-hover:bg-slate-50">
                                                        {condition}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <Button size="lg" className="w-full md:w-auto px-12 h-14 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-lg">
                                        Activate Swift Entry <ArrowRight className="ml-2" size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {[
                        { icon: <Upload size={24} />, label: "Active Nodes", val: "14", color: "text-blue-500" },
                        { icon: <DollarSign size={24} />, label: "Gross Trade", val: "$45,210", color: "text-teal-500" },
                        { icon: <BarChart size={24} />, label: "Fulfillment Score", val: "99.2%", color: "text-indigo-500" }
                    ].map((stat, i) => (
                        <div key={i} className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                            </div>
                            <div className={`${stat.color} p-4 bg-slate-50 rounded-2xl`}>{stat.icon}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}
