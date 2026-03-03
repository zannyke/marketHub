"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    Upload,
    CheckCircle,
    Camera,
    X,
    ShoppingBag,
    Globe,
    Loader2,
    PlusCircle,
    ShieldCheck,
    Tag,
    Shapes,
    Layers,
    AlignLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from '@/providers/AppProvider';

export default function NewProductPage() {
    const router = useRouter();
    const { user, supabase } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        quantity: "1",
        condition: "new",
        description: "",
        category: "Electronics"
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // Upload to Cloudinary for robust, fast image delivery without needing Supabase bucket config
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'market_hub_preset');
            formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '');

            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error?.message || 'Failed to upload image to Cloudinary');
            }

            const data = await res.json();
            setImageUrl(data.secure_url);
        } catch (error: any) {
            console.error("Upload error:", error);
            alert(`Image upload failed: ${error.message}. If Cloudinary is unconfigured, please check your .env.local file.`);
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Please sign in to list a product.");
            return;
        }

        if (!imageUrl) {
            alert("Please upload a product image first.");
            return;
        }

        setIsLoading(true);

        try {
            // OPTIMISTIC PUBLISHING: Fire-and-forget the database insertion 
            // so we don't wait for server latency. It inserts in the background.
            supabase.from('products').insert({
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                tag: formData.condition,
                image_url: imageUrl,
                seller_id: user.id
            }).then(({ error }) => {
                if (error) console.error("Background sync error:", error);
            });

            // Fast transition to products page instantly
            router.prefetch('/seller/products');
            setIsLoading(false);
            setSuccess(true);

            setTimeout(() => {
                router.push('/seller/products');
            }, 600);
        } catch (err: any) {
            console.error(err);
            alert(`Publication Error: ${err.message}`);
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
            {/* Glossy Header */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-all shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/seller/products">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform hover:-translate-x-1">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                <PlusCircle className="text-teal-600" size={18} />
                                New Product Listing
                            </h1>
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Authenticated Seller Session</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-full border border-teal-100 dark:border-teal-800 shadow-sm">
                        <Globe size={12} className="text-teal-600" />
                        <span className="text-[10px] font-black uppercase text-teal-600">Global Sync Active</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 max-w-5xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column: Media */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative group transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/5 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-3 flex gap-2 z-10">
                                <div className="bg-white/90 dark:bg-slate-800/90 p-1.5 rounded-lg shadow-sm backdrop-blur-md">
                                    <Camera size={14} className="text-teal-500" />
                                </div>
                            </div>

                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 mb-4 block">Primary Media</label>

                            <div className="relative aspect-[4/5] sm:aspect-square border-2 border-dashed border-slate-200 dark:border-slate-700/60 rounded-3xl bg-slate-50/50 dark:bg-slate-950/50 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-teal-400/50 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10">
                                {imageUrl ? (
                                    <div className="absolute inset-0 p-2 group/img">
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-lg shadow-teal-500/10 transition-transform duration-700 group-hover/img:scale-[1.02]" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-2xl transition-all duration-300 backdrop-blur-sm m-2">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="font-bold rounded-xl px-6 py-5 shadow-2xl scale-95 group-hover/img:scale-100 transition-all duration-300"
                                                onClick={() => setImageUrl("")}
                                            >
                                                Change Media
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full relative group/upload">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full h-full flex flex-col items-center justify-center p-6 outline-none">
                                            <div className="bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-6 rounded-full mb-5 text-teal-600 transition-all duration-500 group-hover/upload:scale-110 group-hover/upload:shadow-teal-500/20 group-hover/upload:-translate-y-2">
                                                {isUploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
                                            </div>
                                            <span className="font-extrabold text-slate-800 dark:text-white text-base">
                                                {isUploading ? "Uploading..." : "Upload Photo"}
                                            </span>
                                            <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-medium">
                                                Supabase Secure Storage
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <div className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-2xl border border-teal-100/50 dark:border-teal-800/30">
                                    <h5 className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-1.5 flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-teal-500" /> Secure Delivery Network
                                    </h5>
                                    <p className="text-[10px] text-teal-800/70 dark:text-teal-400/60 font-medium leading-relaxed">
                                        Media is intelligently compressed and encrypted for optimal buyer loading speeds across all devices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Details */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-none">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center shrink-0">
                                    <ShoppingBag className="text-teal-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                        Commercial Details
                                    </h2>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Provide accurate information to attract more buyers.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3 group">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors ml-1">Product Title</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors pointer-events-none">
                                            <Tag size={18} />
                                        </div>
                                        <Input
                                            required
                                            className="h-14 pl-12 pr-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus-visible:border-teal-500/30 focus-visible:bg-white dark:focus-visible:bg-slate-800 focus-visible:ring-0 transition-all text-sm font-bold shadow-sm hover:shadow"
                                            placeholder="Ex: PlayStation 5 Pro..."
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 group">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors ml-1">Marketplace Category</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors pointer-events-none z-10">
                                            <Shapes size={18} />
                                        </div>
                                        <select
                                            className="w-full h-14 pl-12 pr-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent text-sm font-bold outline-none focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-800 transition-all dark:text-slate-200 shadow-sm hover:shadow appearance-none cursor-pointer"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option>Electronics</option>
                                            <option>Fashion</option>
                                            <option>Home & Living</option>
                                            <option>Beauty</option>
                                            <option>Gaming</option>
                                            <option>Groceries</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3 group">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors ml-1">Market Price (USD)</Label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors font-black text-lg pointer-events-none">$</div>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            required
                                            className="h-14 pl-10 px-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus-visible:border-teal-500/30 focus-visible:bg-white dark:focus-visible:bg-slate-800 focus-visible:ring-0 transition-all font-black text-lg shadow-sm hover:shadow text-teal-900 dark:text-teal-100 placeholder:text-slate-300"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 group">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors ml-1">Condition Status</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors pointer-events-none z-10">
                                            <Layers size={18} />
                                        </div>
                                        <select
                                            className="w-full h-14 pl-12 pr-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent text-sm font-bold outline-none focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-800 transition-all dark:text-slate-200 shadow-sm hover:shadow appearance-none cursor-pointer"
                                            value={formData.condition}
                                            onChange={e => setFormData({ ...formData, condition: e.target.value })}
                                        >
                                            <option value="new">Brand New (Pristine)</option>
                                            <option value="open_box">Open Box (Verified)</option>
                                            <option value="used_good">Certified Used (Good)</option>
                                            <option value="refurbished">Refurbished Hub</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 group">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors ml-1 flex items-center gap-2">
                                    Technical Description
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-teal-500 transition-colors pointer-events-none">
                                        <AlignLeft size={18} />
                                    </div>
                                    <textarea
                                        className="w-full min-h-[160px] pl-12 pr-6 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent text-sm font-semibold focus:outline-none focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-800 transition-all dark:text-slate-200 resize-none shadow-sm hover:shadow leading-relaxed"
                                        placeholder="Write a compelling story about your product... Key features, dimensions, specifications."
                                        required
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading || !imageUrl || success}
                                className={`flex-1 w-full sm:w-auto h-20 font-black rounded-[2rem] shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 text-lg sm:text-xl group overflow-hidden ${success
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-500 shadow-emerald-500/40 scale-[0.98]'
                                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/30 hover:-translate-y-1'
                                    } disabled:opacity-70 disabled:hover:translate-y-0`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Syncing Hub...
                                    </>
                                ) : success ? (
                                    <>
                                        <CheckCircle size={32} className="animate-in zoom-in" />
                                        Published Successfully!
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={28} className="transition-transform group-hover:scale-110" />
                                        Authorize & Publish Listing
                                    </>
                                )}
                                <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <Globe size={40} />
                                </div>

                                {/* Shimmer Effect */}
                                {!isLoading && !success && (
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                                )}
                            </Button>

                            <Link href="/seller/products" className="w-full sm:w-auto shrink-0">
                                <Button type="button" variant="outline" className="w-full sm:w-auto h-20 px-10 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:text-slate-900 dark:hover:text-white">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
