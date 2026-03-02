"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useApp } from "@/providers/AppProvider";
import { Loader2, Shield, Bot, Zap, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";

const PremiumLoader = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".");
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden">
            {/* Glossy Background Effects */}
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-teal-500/[0.07] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-500/[0.07] rounded-full blur-[120px]"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Animation */}
                <div className="relative mb-14 drop-shadow-2xl">
                    <div className="absolute inset-0 bg-teal-500/20 rounded-[2.5rem] blur-3xl animate-pulse"></div>
                    <div className="w-28 h-28 bg-gradient-to-br from-teal-600 to-teal-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center relative rotate-3 animate-bounce shadow-teal-500/20">
                        <Shield size={42} className="text-white drop-shadow-md" />
                    </div>
                    {/* Floating Brand Icons */}
                    <div className="absolute -top-4 -right-4 p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce delay-150 transition-all hover:scale-110">
                        <Zap size={22} className="text-amber-500" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce delay-300 transition-all hover:scale-110">
                        <ShoppingBag size={22} className="text-rose-500" />
                    </div>
                </div>

                <div className="text-center group">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-3 flex items-baseline gap-2 group-hover:scale-105 transition-transform">
                        Market<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-400">Hub</span>
                    </h2>
                </div>
            </div>

            <div className="fixed bottom-12 flex flex-col items-center gap-6 animate-pulse opacity-60">
                <div className="flex items-center gap-3 px-6 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-full border border-slate-100 dark:border-slate-800">
                    <Bot size={14} className="text-teal-600" />
                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-[0.4em]">Swifft Escrow System Online</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    from { transform: translateX(-150%); }
                    to { transform: translateX(150%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.8s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    width: 70%;
                    box-shadow: 0 0 20px rgba(0, 139, 139, 0.5);
                }
            `}</style>
        </div>
    );
};

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth");
    const { isLoading } = useApp();

    if (isLoading) {
        return <PremiumLoader />;
    }

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-73px)]">
                {children}
            </div>
        </>
    );
};
