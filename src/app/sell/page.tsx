"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from 'next-cloudinary';
import { useApp } from '@/providers/AppProvider';
import {
    Upload,
    Wallet,
    ShieldCheck,
    DollarSign,
    BarChart,
    Camera,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    PlusCircle
} from "lucide-react";

export default function SellPage() {
    const { user, supabase } = useApp();
    const [withdrawing, setWithdrawing] = useState(false);
    const [withdrawn, setWithdrawn] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Electronics",
        tag: "",
        image_url: ""
    });

    const handleWithdraw = () => {
        setWithdrawing(true);
        setTimeout(() => {
            setWithdrawing(false);
            setWithdrawn(true);
            setTimeout(() => setWithdrawn(false), 3000);
        }, 1500);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please sign in to list a product.");
            return;
        }

        if (!formData.image_url) {
            alert("Please upload a product image first.");
            return;
        }

        setIsUploading(true);
        try {
            const { error } = await supabase.from('products').insert({
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                tag: formData.tag || null,
                image_url: formData.image_url,
                seller_id: user.id
            }).select();

            if (error) throw error;

            alert("Product listed successfully!");
            setShowForm(false);
            setFormData({ title: "", description: "", price: "", category: "Electronics", tag: "", image_url: "" });
        } catch (err: any) {
            console.error(err);
            alert(`Error: ${err.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-[#F9FAFB] dark:bg-slate-950 min-h-[calc(100vh-73px)] transition-colors duration-300 pb-20">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Monetize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Premium Goods</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of verified sellers on MarketHub. Upload your products and reach global customers with Swifft Escrow protection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Button
                            size="lg"
                            onClick={() => setShowForm(!showForm)}
                            className={`w-full sm:w-auto font-black px-10 h-16 text-lg shadow-2xl hover:-translate-y-1 transition-all rounded-2xl flex items-center gap-2 ${showForm ? "bg-rose-500 hover:bg-rose-600" : "bg-teal-600 hover:bg-teal-700"} text-white`}
                        >
                            {showForm ? (
                                <><PlusCircle className="rotate-45" size={24} /> Cancel Listing</>
                            ) : (
                                <><PlusCircle size={24} /> List a New Product</>
                            )}
                        </Button>
                        <div className="w-full sm:w-auto bg-white dark:bg-slate-900 border text-left border-slate-200 dark:border-slate-800 px-8 h-16 rounded-2xl flex items-center justify-between min-w-[280px] shadow-xl">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Available Balance</span>
                                <span className="text-xl font-black text-teal-600">$2,450.32</span>
                            </div>
                            <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center text-teal-600">
                                <Wallet size={20} />
                            </div>
                        </div>
                    </div>

                    {!showForm && (
                        <div className="flex justify-center mb-12">
                            <Button
                                size="lg"
                                onClick={handleWithdraw}
                                disabled={withdrawing || withdrawn}
                                className={`w-full sm:w-auto font-bold px-8 h-12 rounded-xl transition-all flex items-center justify-center gap-2 ${withdrawn ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200' : 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20'}`}
                            >
                                {withdrawing ? (
                                    "Processing Swift Transfer..."
                                ) : withdrawn ? (
                                    <><CheckCircle2 size={18} /> Withdrawal Complete</>
                                ) : (
                                    <><Wallet size={18} /> Withdraw to Mobile Wallet</>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                {showForm && (
                    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-500 relative">
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl"></div>

                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 pb-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                <Upload size={24} />
                            </div>
                            Listing Details
                        </h2>

                        <form onSubmit={handleUpload} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Product Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Wireless Noise Cancelling Headphones"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white outline-none"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                    <select
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white outline-none appearance-none cursor-pointer"
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
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Price ($)</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0.00"
                                            step="0.01"
                                            className="w-full pl-10 pr-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white outline-none"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Condition Tag</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. New, Used - Excellent, Refurbished"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white outline-none"
                                        value={formData.tag}
                                        onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Detailed Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe your product's condition, features, and why it's special..."
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500/30 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white outline-none resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex justify-between items-center">
                                    Product Media
                                    <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded-full">Secure Upload Enabled</span>
                                </label>

                                <div className="relative p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] bg-slate-50 dark:bg-slate-900 overflow-hidden transition-all group hover:border-teal-500/50">
                                    {formData.image_url ? (
                                        <div className="relative group/img overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-xl bg-white flex items-center justify-center min-h-[250px]">
                                            <img src={formData.image_url} alt="Preview" className="max-h-64 object-contain" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-3 transition-opacity backdrop-blur-sm">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    className="rounded-xl font-bold px-6"
                                                    onClick={() => setFormData({ ...formData, image_url: "" })}
                                                >
                                                    Remove Media
                                                </Button>
                                                <p className="text-white text-xs font-medium">Click to delete and re-upload</p>
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
                                                    setFormData({ ...formData, image_url: result.info.secure_url });
                                                }
                                            }}
                                        >
                                            {({ open }) => (
                                                <div className="flex flex-col items-center justify-center gap-6 py-6 text-center">
                                                    <div className="flex gap-4">
                                                        <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-teal-600 scale-110">
                                                            <Upload size={32} />
                                                        </div>
                                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-400 mt-4">
                                                            <Camera size={24} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Upload or Capture Product Photo</h4>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs mx-auto">
                                                            Capture using your camera or browse your device storage for product images.
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            onClick={() => open()}
                                                            className="bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl font-black h-12 shadow-lg"
                                                        >
                                                            Select Media Content
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </CldUploadWidget>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isUploading || !formData.image_url}
                                className="w-full h-16 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-3 text-lg mt-10"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Syncing with Global Hub...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={24} />
                                        Authorize & Publish Listing
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
                    {[
                        {
                            icon: <Upload size={32} className="text-teal-500" />,
                            title: "Instant Verification",
                            desc: "Our AI checks metadata automatically. Your product goes live the moment you authorize the listing."
                        },
                        {
                            icon: <ShieldCheck size={32} className="text-indigo-500" />,
                            title: "Swifft Escrow System",
                            desc: "100% Secure. Funds are released automatically once the delivery agent confirms successful drop-off."
                        },
                        {
                            icon: <BarChart size={32} className="text-sky-500" />,
                            title: "Smart Analytics",
                            desc: "Track every view and transaction in real-time. Optimize listings for higher conversion with ease."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl inline-block shadow-inner">{item.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
