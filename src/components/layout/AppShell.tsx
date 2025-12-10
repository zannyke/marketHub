"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useApp } from "@/providers/AppProvider";
import { Loader2 } from "lucide-react";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth");
    const { isLoading } = useApp();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-teal-600 gap-4">
                <div className="relative">
                    <div className="h-16 w-16 rounded-xl bg-teal-100 dark:bg-teal-900/20 animate-pulse"></div>
                    <Loader2 className="h-8 w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </div>
                <p className="text-sm font-medium text-slate-400 animate-pulse">Initializing MarketHub...</p>
            </div>
        );
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
