"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Star, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Memoized Product Card
const ProductCard = React.memo(({
    item,
    onAdd,
    onRemove,
    onUpdateQty,
    cartItem
}: {
    item: any,
    onAdd: (item: any) => void,
    onRemove: (id: string) => void,
    onUpdateQty: (id: string, qty: number) => void,
    cartItem?: any
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative">

            {/* Clickable Area linking to Product Detail Page */}
            <Link href={`/product/${item.id}`} className="flex flex-col flex-1 cursor-pointer">
                {/* Image Area */}
                <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-800/50 relative p-6 flex items-center justify-center overflow-hidden">
                    {item.tag && (
                        <span className={`absolute top-4 left-4 ${item.tag_color || 'bg-teal-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 tracking-wide uppercase`} >
                            {item.tag}
                        </span>
                    )}

                    <img
                        src={item.image_url || "/products/headphones.png"}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="mb-1 flex justify-between items-start">
                        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{item.category}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 line-clamp-2 md:h-12 leading-snug group-hover:text-teal-600 transition-colors" title={item.title}>{item.title}</h3>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center text-amber-400">
                            <Star fill="currentColor" size={14} />
                            <span className="ml-1 text-sm font-medium text-slate-700 dark:text-slate-300">{item.rating || 0}</span>
                        </div>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.reviews_count || 0} reviews</span>
                    </div>
                </div>
            </Link>

            {/* Bottom Actions Area (Independent of the Link to prevent accidental navigation when adding to cart) */}
            <div className="px-5 pb-5 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                    {item.old_price && <span className="text-xs text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600">${parseFloat(item.old_price).toFixed(2)}</span>}
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${parseFloat(item.price).toFixed(2)}</span>
                </div>

                {cartItem ? (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full h-9 px-1">
                            <button
                                onClick={() => onUpdateQty(cartItem.productId, cartItem.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                                disabled={cartItem.quantity <= 1}
                            >
                                <Minus size={12} className="text-slate-600 dark:text-slate-300" />
                            </button>
                            <span className="text-xs font-bold w-6 text-center text-slate-900 dark:text-white">{cartItem.quantity}</span>
                            <button
                                onClick={() => onUpdateQty(cartItem.productId, cartItem.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors"
                            >
                                <Plus size={12} className="text-slate-600 dark:text-slate-300" />
                            </button>
                        </div>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onRemove(cartItem.productId)}
                            className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ) : (
                    <Button
                        size="sm"
                        onClick={() => onAdd(item)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full px-5 h-9 shadow-none transition-colors active:scale-95"
                    >
                        Add
                    </Button>
                )}
            </div>
        </div>
    );
});

ProductCard.displayName = "ProductCard";

function MarketplaceContent() {
    const { addToCart, cartItems, removeFromCart, updateQuantity, supabase } = useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('cat');
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            const cacheKey = `market-hub-products-${category || 'all'}`;
            const cachedData = sessionStorage.getItem(cacheKey);

            if (cachedData) {
                try {
                    setProducts(JSON.parse(cachedData));
                    setLoading(false); // Instantly remove loading screen for returning buyers
                } catch (e) {
                    // Invalid cache, continue as normal
                }
            } else {
                setLoading(true); // Only show loading spinner on the absolute first visit
            }

            try {
                // Only show products where stock is greater than 0
                let query = supabase.from('products').select('*').gt('stock_quantity', 0);

                if (category) {
                    const target = category.toLowerCase();
                    if (target === 'trending') {
                        query = query.eq('tag', 'Hot');
                    } else if (target === 'gadgets') {
                        query = query.ilike('category', 'electronics');
                    } else if (target === 'home') {
                        query = query.ilike('category', '%home%');
                    } else {
                        query = query.ilike('category', category);
                    }
                }

                const { data, error } = await query.order('created_at', { ascending: false });
                if (error) throw error;

                const freshProducts = data || [];
                setProducts(freshProducts);

                // Cache the fresh data in the background
                sessionStorage.setItem(cacheKey, JSON.stringify(freshProducts));
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen pt-40 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Browsing MarketHub...</p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-24">

            {/* Header / Filter Bar Placeholder */}
            <div className="sticky top-[73px] z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-3 mb-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                        <h1 className="font-bold text-lg text-slate-900 dark:text-white">
                            {category ? <span className="capitalize">{category} Collection</span> : 'Marketplace'}
                        </h1>
                        <span className="text-xs text-slate-500">{products.length} Items</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Filters</Button>
                        <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Sort: Popular</Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12">
                {/* Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((item) => {
                            const cartItem = cartItems.find(c => c.productId === item.id.toString());
                            return (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    onAdd={addToCart}
                                    cartItem={cartItem}
                                    onRemove={removeFromCart}
                                    onUpdateQty={updateQuantity}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <p>No products found in this category.</p>
                        <Button variant="link" onClick={() => router.push('/marketplace')}>View All</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Marketplace() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading marketplace...</div>}>
            <MarketplaceContent />
        </Suspense>
    );
}
