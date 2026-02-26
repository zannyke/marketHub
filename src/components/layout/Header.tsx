"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
    ShoppingCart, Search, Menu, User, Settings, LogOut,
    Moon, Sun, Briefcase, Truck, LayoutDashboard, ShoppingBag,
    HelpCircle, Shield, ChevronDown
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/providers/AppProvider';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const { role, setRole, theme, toggleTheme, cartCount, user, signOut } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = {
        buyer: [
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'My Orders', href: '/customer/orders' },
        ],
        seller: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Products', href: '/dashboard' },
            { label: 'Orders', href: '/dashboard' },
        ],
        delivery: [
            { label: 'Delivery Hub', href: '/delivery/dashboard' },
            { label: 'Earnings', href: '/delivery/dashboard' },
        ]
    };

    const handleSignOut = async () => {
        console.log("User clicked Log Out");
        await signOut();
        setIsMenuOpen(false);
        // AppProvider handles the redirect for a clean state
    };

    const getInitials = (user: any) => {
        if (user.user_metadata?.full_name) return user.user_metadata.full_name[0].toUpperCase();
        if (user.email) return user.email[0].toUpperCase();
        return 'U';
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-border dark:border-slate-800 h-[73px] flex items-center transition-colors duration-300">
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">
                {/* Logo & Role Badge */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 font-black text-2xl text-slate-900 dark:text-white hover:opacity-80 transition-opacity tracking-tighter">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-teal-600 flex items-center justify-center text-white font-black shadow-lg">
                            M
                        </div>
                        <span className="hidden sm:inline">Market<span className="text-teal-600">Hub</span></span>
                    </Link>

                    {/* Role Indicator - PROMINENT */}
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-slate-900 text-white uppercase tracking-widest shadow-xl shadow-slate-900/10">
                        <Shield size={10} className="text-teal-400" />
                        {role} Access
                    </div>
                </div>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex items-center gap-8 mx-6">
                    {navLinks[role].map((link, i) => (
                        <Link key={i} href={link.href} className="text-xs font-black text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors uppercase tracking-widest">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4 ml-auto">
                    {role === 'buyer' && (
                        <Link href="/cart" className="relative p-3 text-slate-900 dark:text-slate-300 hover:text-white hover:bg-teal-600 transition-all bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group">
                            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Auth / Account Menu */}
                    {!user ? (
                        <Link href="/auth/login">
                            <Button size="lg" className="rounded-2xl px-8 font-black bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 uppercase text-xs tracking-widest h-12">
                                Access Portal
                            </Button>
                        </Link>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all bg-white dark:bg-slate-900 shadow-sm pr-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 font-black text-sm shadow-inner group overflow-hidden">
                                    {getInitials(user)}
                                </div>
                                <div className="text-left hidden lg:block">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Session Active</p>
                                    <p className="text-xs font-black text-slate-900 dark:text-white leading-none whitespace-nowrap">Verified User</p>
                                </div>
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-4 w-80 bg-white dark:bg-slate-950 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 origin-top-right z-50 p-2">
                                    {/* User Info */}
                                    <div className="p-6 bg-slate-900 rounded-[1.5rem] text-white mb-2 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Shield size={60} />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">Authenticated via Identity Shield</p>
                                            <h4 className="font-black text-xl truncate tracking-tight">
                                                {user.user_metadata?.full_name || 'Anonymous Node'}
                                            </h4>
                                            <p className="text-xs text-slate-400 truncate font-medium">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Account Switcher */}
                                    <div className="p-4 space-y-3">
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Role-Isolation Switch</h5>
                                        <div className="grid grid-cols-1 gap-1">
                                            {[
                                                { id: 'buyer', label: 'Buyer Environment', icon: <ShoppingBag size={16} />, color: 'teal' },
                                                { id: 'seller', label: 'Seller Terminal', icon: <Briefcase size={16} />, color: 'blue' },
                                                { id: 'delivery', label: 'Swift Logistics', icon: <Truck size={16} />, color: 'orange' }
                                            ].map((r) => (
                                                <button
                                                    key={r.id}
                                                    onClick={() => { setRole(r.id as any); router.push('/'); setIsMenuOpen(false); }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${role === r.id ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600 font-bold'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {r.icon}
                                                        <span className="text-xs font-black uppercase tracking-widest">{r.label}</span>
                                                    </div>
                                                    {role === r.id && <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4"></div>

                                    {/* Settings Section */}
                                    <div className="p-2 space-y-1">
                                        <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 rounded-xl transition-colors group">
                                                <Settings size={16} className="text-slate-400 group-hover:rotate-45 transition-transform" /> Settings
                                            </button>
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-600 uppercase tracking-widest hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <LogOut size={16} /> Terminate Session
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
