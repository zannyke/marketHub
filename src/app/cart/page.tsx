"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowRight, Loader2, ShieldCheck, Plus, Minus } from "lucide-react";
import { useApp } from "@/providers/AppProvider";

export default function CartPage() {
    const { user, isLoading: authLoading, cartItems, removeFromCart, updateQuantity } = useApp();

    const subtotal = cartItems.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-teal-600" size={32} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
                <p className="text-slate-500 mb-6">You need to be logged in to view your cart.</p>
                <Link href="/auth/login">
                    <Button>Sign In</Button>
                </Link>
            </div>
        );
    }

    const MINIMUM_SERVICE_FEE = 15; // The "Revenue Floor"
    const platformFee = total * 0.30;
    const sellerProfit = total * 0.70;
    const isBelowFloor = platformFee < MINIMUM_SERVICE_FEE;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Financial Checkout</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Swift Engine: Automated 70/30 Revenue Split Activity</p>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-2xl border border-teal-100 dark:border-teal-800 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">Escrow Active</span>
                    </div>
                </header>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🛒</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                            Looks like you haven't added anything yet. Explore our marketplace to find premium goods.
                        </p>
                        <Link href="/marketplace">
                            <Button size="lg" className="rounded-full px-8 bg-teal-600 hover:bg-teal-700 text-white font-bold">
                                Browse Marketplace
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-7 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.productId || item.id} className="group bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6">
                                    {/* Image */}
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0 flex items-center justify-center p-4 relative overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug">{item.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-full">
                                                    70/30 Eligible
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-3">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} className={item.quantity <= 1 ? "text-slate-300" : "text-slate-600"} />
                                                    </button>
                                                    <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-black text-xl text-slate-900 dark:text-white">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.productId)}
                                                className="text-xs font-bold text-red-500 hover:underline px-2"
                                            >
                                                Remove Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Financial Split Sidebar */}
                        <div className="lg:col-span-5">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] sticky top-24 space-y-8">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Swift Split Protocol</h3>

                                    <div className="space-y-4">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex justify-between items-center border border-slate-100 dark:border-slate-700">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Allocation</p>
                                                <p className="text-xl font-black text-teal-600">30% ($ {platformFee.toFixed(2)})</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Min Floor</p>
                                                <p className={`text-sm font-bold ${isBelowFloor ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>$ {MINIMUM_SERVICE_FEE.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="bg-teal-600 p-4 rounded-2xl flex justify-between items-center text-white shadow-lg shadow-teal-500/20">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-black text-teal-200 uppercase tracking-widest text-opacity-80">Seller Net Profit</p>
                                                <p className="text-xl font-black">70% ($ {sellerProfit.toFixed(2)})</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-teal-200 uppercase">Status</p>
                                                <p className="text-sm font-bold uppercase">Locked</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Total Commitment</span>
                                        <span className="text-4xl font-black text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                                    </div>

                                    {isBelowFloor && (
                                        <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 flex gap-3 animate-pulse">
                                            <span className="text-lg">⚠</span>
                                            <div>
                                                <p className="text-xs font-black text-red-700 uppercase">Revenue Floor Error</p>
                                                <p className="text-[10px] text-red-600 leading-tight">Minimum platform fee of ${MINIMUM_SERVICE_FEE} not met. Transaction halted by system.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <Button
                                            size="lg"
                                            disabled={isBelowFloor}
                                            className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 text-xl uppercase tracking-tighter"
                                        >
                                            Pay via Internal Wallet
                                        </Button>
                                        <p className="text-center text-[10px] font-bold text-slate-400 uppercase">No PIN required for verified wallet sessions</p>

                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                                            <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 tracking-widest"><span className="bg-white px-4">OR</span></div>
                                        </div>

                                        <Button variant="outline" className="w-full h-12 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl uppercase text-xs tracking-widest hover:bg-slate-50">
                                            Deposit via M-Pesa STK Push
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <ShieldCheck size={16} className="text-teal-600" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Swift Financial Escrow Protocol Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
