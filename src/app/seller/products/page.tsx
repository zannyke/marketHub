"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Filter, MoreHorizontal, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-2">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 -ml-2">
                                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                            </Button>
                        </Link>
                        <Link href="/seller/products/new">
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                + Add Product
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Inventory</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input className="pl-10" placeholder="Search by name, SKU, or category..." />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-slate-600"><Filter size={16} className="mr-2" /> Filter</Button>
                        <Button variant="outline" className="text-slate-600">Export</Button>
                    </div>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Product</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Price</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Stock</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {/* Empty state for fresh accounts */}
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                                            <Search size={24} />
                                        </div>
                                        <p className="font-bold text-slate-700">No products found</p>
                                        <p className="text-sm">You haven't listed any items for sale yet.</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
