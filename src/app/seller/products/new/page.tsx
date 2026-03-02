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
    AlertCircle,
    X,
    ShoppingBag,
    Globe,
    Loader2,
    PlusCircle,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from 'next-cloudinary';
import { useApp } from '@/providers/AppProvider';

export default function NewProductPage() {
    const router = useRouter();
    const { user, supabase } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        quantity: "1",
        condition: "new",
        description: "",
        category: "Electronics"
    });

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
            const { error } = await supabase.from('products').insert({
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                tag: formData.condition,
                image_url: imageUrl,
                seller_id: user.id
            });

            if (error) throw error;

            alert("Product published successfully to MarketHub!");
            router.push('/seller/products');
        } catch (err: any) {
            console.error(err);
            alert(`Publication Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
            {/* Glossy Header */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-all">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/seller/products">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
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
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-900/20 rounded-full border border-teal-100 dark:border-teal-800">
                        <Globe size={12} className="text-teal-600" />
                        <span className="text-[10px] font-black uppercase text-teal-600">Global Sync Active</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 max-w-4xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Media */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-3 flex gap-2 z-10">
                                <div className="bg-white/90 dark:bg-slate-800/90 p-1.5 rounded-lg shadow-sm backdrop-blur-md">
                                    <Camera size={14} className="text-teal-500" />
                                </div>
                            </div>

                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 mb-4 block">Primary Media</label>

                            <div className="relative aspect-square border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center transition-all group-hover:border-teal-400">
                                {imageUrl ? (
                                    <div className="absolute inset-0 p-2 group/img">
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-lg shadow-teal-500/10" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-2xl transition-all backdrop-blur-sm">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="font-bold rounded-xl px-4"
                                                onClick={() => setImageUrl("")}
                                            >
                                                Change Photo
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <CldUploadWidget
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                        options={{
                                            sources: ['local', 'camera', 'url'],
                                            multiple: false,
                                            cropping: true,
                                            showAdvancedOptions: false,
                                            defaultSource: 'local',
                                            styles: {
                                                palette: {
                                                    window: "#FFFFFF",
                                                    windowBorder: "#90A0B3",
                                                    tabIcon: "#008B8B",
                                                    menuIcons: "#5A616A",
                                                    textDark: "#000000",
                                                    textLight: "#FFFFFF",
                                                    link: "#008B8B",
                                                    action: "#008B8B",
                                                    inactiveTabIcon: "#0E2F5A",
                                                    error: "#F44235",
                                                    inProgress: "#008B8B",
                                                    complete: "#20B832",
                                                    sourceBg: "#E4EBF1"
                                                }
                                            }
                                        }}
                                        onSuccess={(result: any) => {
                                            if (result.info?.secure_url) {
                                                setImageUrl(result.info.secure_url);
                                            }
                                        }}
                                    >
                                        {({ open }) => (
                                            <button
                                                type="button"
                                                onClick={() => open()}
                                                className="w-full h-full flex flex-col items-center justify-center p-6"
                                            >
                                                <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-full mb-4 text-teal-600 shadow-inner group-hover:scale-110 transition-transform">
                                                    <Upload size={32} />
                                                </div>
                                                <span className="font-black text-slate-800 dark:text-white text-sm">Tap to Upload</span>
                                                <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">Local or Camera</span>
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                )}
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <div className="p-4 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-800/50">
                                    <h5 className="text-[10px] font-black uppercase text-teal-600 mb-1 flex items-center gap-2">
                                        <ShieldCheck size={12} /> Secure Storage
                                    </h5>
                                    <p className="text-[10px] text-teal-800/60 dark:text-teal-400/60 font-medium leading-relaxed">
                                        All images are routed through our encrypted content delivery network for maximum privacy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-6 flex items-center gap-3">
                                <ShoppingBag className="text-teal-600" size={24} />
                                Commercial Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Product Title</Label>
                                    <Input
                                        required
                                        className="h-14 px-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-teal-500/30 transition-all text-sm font-semibold"
                                        placeholder="Headline for your listing..."
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Marketplace Category</Label>
                                    <select
                                        className="w-full h-14 px-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm font-semibold outline-none focus:ring-2 focus:ring-teal-500/30 transition-all dark:text-slate-200"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Home</option>
                                        <option>Beauty</option>
                                        <option>Gaming</option>
                                        <option>Groceries</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Market Price ($)</Label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 font-bold">$</div>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            required
                                            className="h-14 pl-10 px-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-teal-500/30 font-bold text-lg"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Condition Status</Label>
                                    <select
                                        className="w-full h-14 px-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm font-semibold outline-none focus:ring-2 focus:ring-teal-500/30 transition-all dark:text-slate-200"
                                        value={formData.condition}
                                        onChange={e => setFormData({ ...formData, condition: e.target.value })}
                                    >
                                        <option value="new">Brand New (Pristine)</option>
                                        <option value="open_box">Open Box (Verifed)</option>
                                        <option value="used_good">Certified Used (Good)</option>
                                        <option value="refurbished">Refurbished Hub</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Technical Description</Label>
                                <textarea
                                    className="w-full min-h-[160px] p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-all dark:text-slate-200 resize-none"
                                    placeholder="Write a compelling story about your product..."
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading || !imageUrl}
                                className="flex-1 w-full sm:w-auto h-20 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-[2rem] shadow-2xl shadow-teal-500/30 transition-all flex items-center justify-center gap-3 text-xl disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 group overflow-hidden"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Syncing Hub...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={28} className="transition-transform group-hover:scale-110" />
                                        Authorize & Publish Listing
                                    </>
                                )}
                                <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Globe size={40} />
                                </div>
                            </Button>

                            <Link href="/seller/products" className="w-full sm:w-auto">
                                <Button type="button" variant="outline" className="w-full sm:w-auto h-20 px-10 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-500 hover:bg-slate-50 transition-all">
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
