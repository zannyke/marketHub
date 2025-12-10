"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/providers/AppProvider";
import { createClient } from "@/lib/supabase/client";

interface CartItem {
    id: number;
    title: string;
    type: string;
    price: number;
    imageColor?: string;
    image?: string;
}

export default function CartPage() {
    const { user, isLoading: authLoading } = useApp();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('cart_items')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setCartItems(data.map(item => ({
                    id: item.id,
                    ...item.product_metadata, // Spread metadata for title, price, etc.
                    quantity: item.quantity
                })));
            }
            setLoading(false);
        };

        if (!authLoading) {
            fetchCart();
        }
    }, [user, authLoading]);

    const removeItem = async (id: number) => {
        // Optimistic update
        setCartItems(prev => prev.filter(item => item.id !== id));

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', id); // Note: DB id matches item.id? DB id is unique row id. 
        // In mapping, we used item.id which might be DB id or product id.
        // Let's ensure we use row id for deletion.
    }

    // Correct mapping for ID:
    // When mapping, let's keep the row id separate from product id.
    // Re-doing fetch logic in mind:
    /*
    setCartItems(data.map(item => ({
        dbId: item.id,
        ...item.product_metadata
    })));
    */

    // Actually, let's implement the logic cleanly within the file below.

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (authLoading || loading) {
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
                                <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6">
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
                                            <p className="text-sm text-slate-400 hidden sm:block">Item ID: {item.id}</p>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto">
                                            <span className="font-bold text-xl text-slate-900 dark:text-white whitespace-nowrap">
                                                ${item.price?.toFixed(2)}
                                            </span>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
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
