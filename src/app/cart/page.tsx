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

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Shopping Cart</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your selected premium items</p>
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
                        <div className="lg:col-span-8 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.productId || item.id} className="group bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6">
                                    {/* Image */}
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0 flex items-center justify-center p-4 relative overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-full">
                                                    {item.category || 'Product'}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug max-w-xs">{item.title}</h3>
                                            <p className="text-sm text-slate-400 hidden sm:block">Item ID: {item.productId || item.id}</p>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} className={item.quantity <= 1 ? "text-slate-300" : "text-slate-600 dark:text-slate-300"} />
                                                    </button>
                                                    <span className="font-bold text-sm w-8 text-center text-slate-900 dark:text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                                                    >
                                                        <Plus size={14} className="text-slate-600 dark:text-slate-300" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-xl text-slate-900 dark:text-white whitespace-nowrap min-w-[80px] text-right">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFromCart(item.productId)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 h-8"
                                            >
                                                <Trash2 size={14} className="mr-1" /> Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg sticky top-24">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Tax (Est. 8%)</span>
                                        <span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">Total</span>
                                        <span className="text-3xl font-black text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-lg transition-all hover:-translate-y-1">
                                    Checkout <ArrowRight size={20} className="ml-2" />
                                </Button>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                                    <ShieldCheck size={14} />
                                    <span>Secure checkout powered by Stripe</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
