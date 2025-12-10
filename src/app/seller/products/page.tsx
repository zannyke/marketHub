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
                            {[
                                { name: "Premium Wireless Headphones", status: "Active", price: "$199.99", stock: 45, img: "/products/headphones.png" },
                                { name: "Minimalist Smart Watch", status: "Active", price: "$249.99", stock: 12, img: "/products/watch.png" },
                                { name: "Luxury Leather Bag", status: "Low Stock", price: "$299.99", stock: 3, img: "/products/bag.png", alert: true },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{item.name}</p>
                                                <p className="text-xs text-slate-500">ID: #SKU-892{i}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.alert ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-slate-700">{item.price}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-700">{item.stock}</span>
                                            {item.alert && <AlertCircle size={14} className="text-amber-500" />}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                                            <MoreHorizontal size={18} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
