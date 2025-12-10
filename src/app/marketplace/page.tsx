"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import { generateProducts } from "@/lib/products";

// ... ProductCard ...

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
