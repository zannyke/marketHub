"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useApp } from "@/providers/AppProvider";
import { Loader2, Shield, Bot, Zap, ShoppingBag, Store, Users, Truck, Package } from "lucide-react";
import React, { useEffect, useState } from "react";

const ICONS = [
    { icon: Shield, color: "text-white", bg: "from-teal-600 to-teal-900" },
    { icon: ShoppingBag, color: "text-white", bg: "from-rose-500 to-rose-700" },
    { icon: Store, color: "text-white", bg: "from-amber-500 to-amber-700" },
    { icon: Users, color: "text-white", bg: "from-blue-600 to-blue-800" },
    { icon: Truck, color: "text-white", bg: "from-indigo-600 to-indigo-800" },
    { icon: Package, color: "text-white", bg: "from-emerald-600 to-emerald-800" },
    { icon: Zap, color: "text-white", bg: "from-purple-600 to-purple-800" },
];

const PremiumLoader = () => {
    const [iconIndex, setIconIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % ICONS.length);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden">
            {/* Glossy Background Effects */}
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-teal-500/[0.07] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-500/[0.07] rounded-full blur-[120px]"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Animation */}
                <div className="relative mb-14 drop-shadow-2xl h-28 w-28">
                    <div className="absolute inset-0 bg-teal-500/20 rounded-[2.5rem] blur-3xl animate-pulse"></div>

                    {ICONS.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={idx}
                                className={`absolute inset-0 bg-gradient-to-br ${item.bg} rounded-[2.5rem] shadow-2xl flex items-center justify-center transition-all duration-700 transform ${idx === iconIndex ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
                                    }`}
                            >
                                <IconComp size={42} className="text-white drop-shadow-md" />
                            </div>
                        );
                    })}
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
