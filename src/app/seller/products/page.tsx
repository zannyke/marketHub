"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Filter, MoreHorizontal, AlertCircle, ShoppingBag, Plus, Eye, Edit, Trash2, Box, TrendingUp, Package } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useApp } from "@/providers/AppProvider";

export default function ProductsPage() {
    const { supabase, user } = useApp();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('seller_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error("Error fetching seller products:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [supabase, user]);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
            {/* Header section with glassmorphism */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Link href="/">
                                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-teal-600 p-0 h-auto">
                                        <ArrowLeft size={16} className="mr-1" /> Dashboard
                                    </Button>
                                </Link>
                                <span className="text-slate-300 dark:text-slate-700">/</span>
                                <span className="text-xs font-black uppercase tracking-widest text-teal-600">Inventory Hub</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Product Catalog</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/seller/products/new">
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-black px-6 h-12 rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1">
                                    <Plus size={20} className="mr-2" />
                                    Add New Listing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 mb-4">
                            <Box size={24} />
                        </div>
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Products</div>
                        <div className="text-2xl font-black dark:text-white">{products.length}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 mb-4">
                            <TrendingUp size={24} />
                        </div>
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Listings</div>
                        <div className="text-2xl font-black dark:text-white">{products.length}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 mb-4">
                            <AlertCircle size={24} />
                        </div>
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending Approval</div>
                        <div className="text-2xl font-black dark:text-white">0</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 mb-4">
                            <ShoppingBag size={24} />
                        </div>
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Successful Sales</div>
                        <div className="text-2xl font-black dark:text-white">0</div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={20} />
                        <Input
                            className="h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-sm focus-visible:ring-2 focus-visible:ring-teal-500/30 transition-all font-medium"
                            placeholder="Search Inventory by title, SKU, or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm font-bold text-slate-600 hover:text-teal-600 flex gap-2">
                        <Filter size={18} />
                        Advanced Filter
                    </Button>
                </div>

                {/* Inventory Table/Grid */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Syncing Catalog Data...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Media</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Details</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Market Status</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Value</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Administrative</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-20 text-center">
                                                <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
                                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mb-2">
                                                        <Search size={40} />
                                                    </div>
                                                    <p className="font-black text-slate-700 dark:text-white text-xl">Catalog is Empty</p>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Start your premium seller journey by adding your first product to the Marketplace.</p>
                                                    <Link href="/seller/products/new" className="mt-4">
                                                        <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                                                            + Create Listing
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md">
                                                            <img
                                                                src={product.image_url || "/placeholder-product.jpg"}
                                                                alt={product.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div>
                                                        <h4 className="font-black text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 transition-colors">{product.title}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black uppercase tracking-widest text-slate-500">{product.category}</span>
                                                            <span className="text-[10px] text-slate-400 font-medium">SKU: {product.id.slice(0, 8)}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-center">
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/50">
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                                        Live on Hub
                                                    </div>
                                                </td>
                                                <td className="p-6 text-center">
                                                    <div className="text-lg font-black text-slate-900 dark:text-white">
                                                        ${parseFloat(product.price).toFixed(2)}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Unit Price</div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/20 transition-all">
                                                            <Edit size={18} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 transition-all">
                                                            <Trash2 size={18} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-xl transition-all">
                                                            <MoreHorizontal size={18} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Global Protection Footer */}
                <div className="mt-12 flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-slate-400 mb-6 group-hover:scale-110 transition-all">
                        <Package size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Escrow Protected Inventory</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                        Every listing in your inventory is automatically processed through our **Swifft Escrow Authentication Layer**. Your funds and products are 100% secure during the entire transaction lifecycle.
                    </p>
                </div>
            </div>
        </main>
    );
}
