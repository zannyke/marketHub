"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth");

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <div className="pt-20 min-h-[calc(100vh-100px)]">
                {children}
            </div>
        </>
    );
};
