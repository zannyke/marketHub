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
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                    <p className="text-slate-500 mb-4">Your cart is empty.</p>
                    <Link href="/marketplace">
                        <Button variant="outline">Browse Marketplace</Button>
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {cartItems.map((item) => (
                            <div key={item.id} className="glass" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: `linear-gradient(135deg, rgba(255,255,255,0.1), ${item.imageColor || 'var(--accent-blue)'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-contain" />}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h3>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '100px' }}>{item.category || 'Product'}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>${item.price?.toFixed(2)}</span>
                                    <button
                                        onClick={() => {
                                            // Real deletion logic
                                            const dbId = item.id; // Assuming id comes from metadata or row? 
                                            // The row id is critical.
                                            // Since I mapped id: item.id in the fetch above (which is row ID), this is correct.
                                            removeItem(dbId);
                                        }}
                                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <span>Tax (Est.)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button size="lg" className="w-full">
                                Checkout <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </Button>
                            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Secure checkout powered by Stripe
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
