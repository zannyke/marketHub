"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Mock submit for now
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push('/seller/products');
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold text-slate-900">Add New Product</h1>
                    </div>
                    <Button variant="ghost" disabled={isLoading}>Cancel</Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Basic Information</h2>

                        <div className="space-y-2">
                            <Label htmlFor="title">Product Title</Label>
                            <Input id="title" placeholder="e.g. Premium Leather Backpack" required />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="price">Amount ($)</Label>
                                <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity (Stock)</Label>
                                <Input id="quantity" type="number" placeholder="0" min="0" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quality">Quality / Condition</Label>
                            <select className="w-full h-10 px-3 rounded-md border border-slate-300 bg-transparent text-sm" required>
                                <option value="new">Brand New (Sealed)</option>
                                <option value="open_box">Open Box (Like New)</option>
                                <option value="used_good">Used - Good Condition</option>
                                <option value="refurbished">Refurbished</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                className="w-full min-h-[120px] p-3 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Describe your product features, material, and benefits..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Product Images</h2>

                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-teal-400 transition-all cursor-pointer">
                            <div className="bg-teal-50 p-4 rounded-full mb-4 text-teal-600">
                                <Upload size={32} />
                            </div>
                            <span className="font-bold text-slate-700">Click to upload image</span>
                            <span className="text-sm mt-1">or drag and drop here</span>
                            <span className="text-xs text-slate-400 mt-4">JPG, PNG up to 5MB</span>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" className="bg-teal-600 hover:bg-teal-700 text-white min-w-[200px]" disabled={isLoading}>
                            {isLoading ? 'Publishing...' : 'Publish Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}
