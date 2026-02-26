"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload, DollarSign, BarChart, Wallet, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function SellPage() {
    const [withdrawing, setWithdrawing] = useState(false);
    const [withdrawn, setWithdrawn] = useState(false);

    const handleWithdraw = () => {
        setWithdrawing(true);
        setTimeout(() => {
            setWithdrawing(false);
            setWithdrawn(true);
            setTimeout(() => setWithdrawn(false), 3000);
        }, 1500);
    };

    return (
        <div className="bg-[#F9FAFB] min-h-[calc(100vh-73px)]">
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Monetize Your <span className="text-teal-600">Premium Goods</span>
                </h1>
                <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of verified sellers on MarketHub. Upload your new or refurbished products today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button size="lg" className="btn-gradient text-white font-bold px-8 h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full">
                        List a Product
                    </Button>
                    <div className="bg-white border text-left border-slate-200 px-6 h-14 rounded-full flex items-center justify-between min-w-[200px] shadow-sm">
                        <span className="text-sm font-semibold text-slate-500">Available Balance:</span>
                        <span className="text-lg font-black text-teal-600 ml-4">$2,450.00</span>
                    </div>
                </div>

                <div className="flex justify-center mb-24">
                    <Button
                        size="lg"
                        onClick={handleWithdraw}
                        disabled={withdrawing || withdrawn}
                        className={`font-bold px-8 h-12 rounded-full transition-all flex items-center gap-2 ${withdrawn ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20'}`}
                    >
                        {withdrawing ? (
                            "Processing..."
                        ) : withdrawn ? (
                            <><ShieldCheck size={18} /> Swift Withdrawal Complete</>
                        ) : (
                            <><Wallet size={18} /> Withdraw to Mobile Wallet</>
                        )}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
                    {[
                        { icon: <Upload size={32} className="text-teal-500" />, title: "Easy Listing & Tags", desc: "Upload product metadata including New/Refurbished tags. We handle the discovery." },
                        { icon: <DollarSign size={32} className="text-indigo-500" />, title: "Swift Escrow Splits", desc: "Take home 70% of product proceeds. Immediate automated payment splitting upon delivery." },
                        { icon: <BarChart size={32} className="text-sky-500" />, title: "Detailed Analytics", desc: "Track views, gross merchandise value, and logistics routing across hubs." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="mb-6 p-3 bg-slate-50 rounded-xl inline-block">{item.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
