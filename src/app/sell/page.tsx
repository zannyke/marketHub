"use client";

import { Button } from "@/components/ui/button";
import { Upload, DollarSign, BarChart, Wallet, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/providers/AppProvider";

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

        setIsUploading(true);
        try {
            const { error } = await supabase.from('products').insert({
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                tag: formData.tag || null,
                image_url: formData.image_url || "/products/headphones.png",
                seller_id: user.id
            });

            if (error) throw error;

            alert("Product listed successfully!");
            setShowForm(false);
            setFormData({ title: "", description: "", price: "", category: "Electronics", tag: "", image_url: "" });
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-[#F9FAFB] dark:bg-slate-950 min-h-[calc(100vh-73px)] transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Monetize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Premium Goods</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of verified sellers on MarketHub. Upload your products and reach global customers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Button
                            size="lg"
                            onClick={() => setShowForm(!showForm)}
                            className="w-full sm:w-auto btn-gradient text-white font-bold px-8 h-14 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all rounded-full"
                        >
                            {showForm ? "Cancel Listing" : "List a Product"}
                        </Button>
                        <div className="w-full sm:w-auto bg-white dark:bg-slate-900 border text-left border-slate-200 dark:border-slate-800 px-6 h-14 rounded-full flex items-center justify-between min-w-[240px] shadow-sm">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 text-nowrap">Available Balance:</span>
                            <span className="text-lg font-black text-teal-600 ml-4">$2,450.00</span>
                        </div>
                    </div>

                    {!showForm && (
                        <div className="flex justify-center mb-12">
                            <Button
                                size="lg"
                                onClick={handleWithdraw}
                                disabled={withdrawing || withdrawn}
                                className={`w-full sm:w-auto font-bold px-8 h-12 rounded-full transition-all flex items-center justify-center gap-2 ${withdrawn ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20'}`}
                            >
                                {withdrawing ? (
                                    "Processing..."
                                ) : withdrawn ? (
                                    <><ShieldCheck size={18} /> Swift Withdrawal Complete</>
                                ) : (
                                    <><Wallet size={18} /> Withdraw to Mobile Wallet</>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                {showForm && (
                    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl mb-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-50 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Upload className="text-teal-500" /> Listing Details
                        </h2>
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Product Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Wireless Noise Cancelling Headphones"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Home</option>
                                        <option>Beauty</option>
                                        <option>Gaming</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Price ($)</label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Tag (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Sale, New, Hot"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white"
                                        value={formData.tag}
                                        onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe your product's condition, features, and why it's special..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Image URL (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Leave blank for default placeholder"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 transition-all dark:text-white"
                                    value={formData.image_url}
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isUploading}
                                className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {isUploading ? "Uploading to Server..." : <><Upload size={20} /> Publish Product</>}
                            </Button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
                    {[
                        { icon: <Upload size={32} className="text-teal-500" />, title: "Easy Listing & Tags", desc: "Upload product metadata including New/Refurbished tags. We handle the discovery." },
                        { icon: <DollarSign size={32} className="text-indigo-500" />, title: "Swift Escrow Splits", desc: "Take home 75% of proceeds. Immediate automated payment splitting upon delivery." },
                        { icon: <BarChart size={32} className="text-sky-500" />, title: "Detailed Analytics", desc: "Track views, gross merchandise value, and logistics routing across hubs." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl inline-block">{item.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
