"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
    ShoppingCart, Search, Menu, X, User, Settings, LogOut,
    Moon, Sun, Briefcase, Truck, LayoutDashboard, ShoppingBag,
    HelpCircle, Shield, ChevronDown, Zap
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/providers/AppProvider';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const { role, setRole, theme, toggleTheme, cartCount, user, signOut } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
                const target = event.target as HTMLElement;
                if (!target.closest('.mobile-menu-trigger')) {
                    setIsMobileMenuOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

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
        setIsMobileMenuOpen(false);
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
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg mobile-menu-trigger"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                            M
                        </div>
                        <span className="hidden xs:inline">MarketHub</span>
                    </Link>

                    {/* Role Indicator (Demo) */}
                    <div className="hidden lg:flex items-center text-[10px] md:text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {role} Mode
                    </div>
                </div>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex items-center gap-6 mx-6">
                    <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        Home
                    </Link>
                    {navLinks[role].map((link, i) => (
                        <Link key={i} href={link.href} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-3 ml-auto">
                    {/* Search (Desktop) */}
                    <div className="hidden lg:flex max-w-xs relative group mr-2">
                        <Input
                            icon={<Search className="w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />}
                            placeholder="Search..."
                            className="bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-teal-200 dark:focus:border-teal-700 focus:ring-1 focus:ring-teal-100 dark:focus:ring-teal-900 text-sm h-9 rounded-full w-[160px] xl:w-[200px] transition-all"
                        />
                    </div>

                    {/* Search (Mobile Toggle) */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                        <Search size={20} />
                    </button>

                    {role === 'buyer' && (
                        <Link href="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 rounded-full">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Auth / Account Menu */}
                    {!user ? (
                        <Link href="/auth/signup">
                            <Button size="sm" className="rounded-full px-4 md:px-5 font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20 text-xs md:text-sm">Sign In</Button>
                        </Link>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-1 md:gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 md:p-1.5 md:pr-3 rounded-full border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs md:text-sm overflow-hidden shadow-md">
                                    {getInitials(user)}
                                </div>
                                <ChevronDown size={14} className="text-slate-400 hidden xs:block" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-950 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50 ring-1 ring-black/5">
                                    {/* User Info */}
                                    <div className="p-4 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                        <h4 className="font-bold text-slate-900 dark:text-white truncate">
                                            {user.user_metadata?.full_name || 'Valued Customer'}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                            {user.email}
                                        </p>
                                    </div>

                                    {/* Account Switcher */}
                                    <div className="p-2">
                                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Switch Account</h5>
                                        <div className="grid grid-cols-3 gap-1">
                                            <button
                                                onClick={() => { setRole('buyer'); router.push('/'); setIsMenuOpen(false); }}
                                                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors ${role === 'buyer' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 ring-1 ring-teal-200 dark:ring-teal-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                                            >
                                                <ShoppingBag size={16} /> Buyer
                                            </button>
                                            <button
                                                onClick={() => { setRole('seller'); router.push('/'); setIsMenuOpen(false); }}
                                                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors ${role === 'seller' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                                            >
                                                <Briefcase size={16} /> Seller
                                            </button>
                                            <button
                                                onClick={() => { setRole('delivery'); router.push('/'); setIsMenuOpen(false); }}
                                                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors ${role === 'delivery' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                                            >
                                                <Truck size={16} /> Delivery
                                            </button>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-50 dark:bg-slate-800 my-1 mx-2"></div>

                                    {/* Settings Section */}
                                    <div className="p-1">
                                        <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group text-left">
                                                <Settings size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" /> Settings
                                            </button>
                                        </Link>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group text-left">
                                            <HelpCircle size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" /> Support
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group text-left">
                                            <Shield size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" /> Privacy
                                        </button>
                                    </div>

                                    <div className="h-px bg-slate-50 dark:bg-slate-800 my-1 mx-2"></div>

                                    {/* Logout */}
                                    <div className="p-1 mb-1">
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut size={16} /> Log Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="absolute top-[73px] left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 animate-in slide-in-from-top lg:hidden z-40 shadow-lg">
                    <div className="relative group">
                        <Input
                            autoFocus
                            icon={<Search className="w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />}
                            placeholder="Search everything..."
                            className="bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-teal-200 dark:focus:border-teal-700 focus:ring-1 focus:ring-teal-100 dark:focus:ring-teal-900 h-11 rounded-xl w-full transition-all"
                        />
                    </div>
                </div>
            )}

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div
                    ref={mobileMenuRef}
                    className={`absolute left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold shadow-sm">M</div>
                                <span>MarketHub</span>
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">Main Navigation</h5>
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <LayoutDashboard size={18} className="text-teal-500" /> Home
                            </Link>
                            {navLinks[role].map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    {link.label === 'Marketplace' && <ShoppingBag size={18} className="text-teal-500" />}
                                    {link.label === 'My Orders' && <Truck size={18} className="text-teal-500" />}
                                    {link.label === 'Dashboard' && <LayoutDashboard size={18} className="text-teal-500" />}
                                    {link.label === 'Products' && <Briefcase size={18} className="text-teal-500" />}
                                    {link.label === 'Orders' && <ShoppingCart size={18} className="text-teal-500" />}
                                    {link.label === 'Delivery Hub' && <Truck size={18} className="text-teal-500" />}
                                    {link.label === 'Earnings' && <Zap size={18} className="text-teal-500" />}
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">Support & Settings</h5>
                            <div className="flex flex-col gap-1">
                                <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-300">
                                    <Settings size={18} /> Settings
                                </Link>
                                <Link href="/help" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-300">
                                    <HelpCircle size={18} /> Support
                                </Link>
                            </div>
                        </div>

                        <div className="mt-auto pb-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                <span className="text-sm font-medium dark:text-slate-200">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                                <button
                                    onClick={toggleTheme}
                                    className="w-10 h-6 bg-slate-200 dark:bg-teal-600 rounded-full relative transition-colors"
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-5' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
