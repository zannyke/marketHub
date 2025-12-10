"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import { generateProducts } from "@/lib/products";

// Memoized Product Card to prevent re-renders of the entire grid
const ProductCard = React.memo(({ item, onAdd }: { item: any, onAdd: (item: any) => void }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
            {/* Image Area */}
            <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-800/50 relative p-6 flex items-center justify-center overflow-hidden">
                {item.tag && (
                    <span className={`absolute top-4 left-4 ${item.tagColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 tracking-wide uppercase`} >
                        {item.tag}
                    </span>
                )}
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-400 hover:text-red-500 transition-colors z-10 shadow-sm backdrop-blur-sm">
                    <Star size={16} />
                </button>

                <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-1">
                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 line-clamp-2 md:h-12 leading-snug" title={item.title}>{item.title}</h3>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-amber-400">
                        <Star fill="currentColor" size={14} />
                        <span className="ml-1 text-sm font-medium text-slate-700 dark:text-slate-300">{item.rating}</span>
                    </div>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.reviews} reviews</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[80px]">{item.seller}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600">${item.oldPrice.toFixed(2)}</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">${item.price.toFixed(2)}</span>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => onAdd(item)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full px-5 h-9 shadow-none transition-colors active:scale-95"
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
});

ProductCard.displayName = "ProductCard";

function MarketplaceContent() {
    const { addToCart } = useApp();
    const searchParams = useSearchParams();
    const category = searchParams.get('cat');
    // ... rest of the component logic ...(use existing)
    // Generate and Filter Products
    const products = useMemo(() => {
        const allProducts = generateProducts(1001);
        if (!category) return allProducts;

        const target = category.toLowerCase();

        return allProducts.filter(item => {
            const itemCat = item.category.toLowerCase();

            // Debug log to console to verify filtering
            // console.log(`Checking ${item.title} (${itemCat}) against ${target}`);

            if (target === 'trending') return item.tag === 'Hot';
            if (target === 'gadgets') return itemCat === 'electronics';
            if (target === 'home') return itemCat.includes('home'); // matches "Home"

            return itemCat === target || itemCat.includes(target);
        });
    }, [category]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-6 pb-24">

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
                        {products.map((item) => (
                            <ProductCard key={item.id} item={item} onAdd={addToCart} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <p>No products found in this category.</p>
                        <Button variant="link" onClick={() => window.location.href = '/marketplace'}>View All</Button>
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
