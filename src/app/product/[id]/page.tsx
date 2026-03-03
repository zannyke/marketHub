"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MessageSquare, Lock, ShieldCheck, Store, MapPin, Clock } from "lucide-react";
import { useState, useEffect, use } from "react";
import { useApp } from "@/providers/AppProvider";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: productId } = use(params);
    const { addToCart, cartItems, user, supabase } = useApp();
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [locked, setLocked] = useState(false);
    const [product, setProduct] = useState<any>(null);
    const [sellerProfile, setSellerProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let subscription: any;

        const fetchProductAndMessages = async () => {
            setLoading(true);
            try {
                // 1. Fetch Product
                const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', productId)
                    .single();

                if (productError) throw productError;
                setProduct(productData);

                // Fetch Seller Profile
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', productData.seller_id)
                    .single();

                if (profileData) {
                    setSellerProfile(profileData);
                }

                // 2. Realtime Chat Setup (if logged in)
                if (user && productData) {
                    // Get conversation history
                    const { data: msgData, error: msgError } = await supabase
                        .from('messages')
                        .select('*')
                        .eq('product_id', productId)
                        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${productData.seller_id}),and(sender_id.eq.${productData.seller_id},receiver_id.eq.${user.id})`)
                        .order('created_at', { ascending: true });

                    if (!msgError && msgData) {
                        setMessages(msgData);
                    }

                    // Listen for new incoming messages live
                    subscription = supabase
                        .channel(`chat_${productId}`)
                        .on('postgres_changes', {
                            event: 'INSERT',
                            schema: 'public',
                            table: 'messages',
                            filter: `product_id=eq.${productId}`
                        }, (payload) => {
                            const newMsg = payload.new;
                            // Only append if it belongs to this conversation
                            if (
                                (newMsg.sender_id === user.id && newMsg.receiver_id === productData.seller_id) ||
                                (newMsg.sender_id === productData.seller_id && newMsg.receiver_id === user.id)
                            ) {
                                setMessages(prev => {
                                    // Prevent duplicate pushes
                                    if (prev.some(m => m.id === newMsg.id)) return prev;
                                    return [...prev, newMsg];
                                });
                            }
                        })
                        .subscribe();
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) fetchProductAndMessages();

        return () => {
            if (subscription) supabase.removeChannel(subscription);
        };
    }, [productId, supabase, user]);

    const handleSend = async () => {
        if (!input.trim() || !user || !product) return;

        if (user.id === product.seller_id) {
            alert("You are the seller! Buyers must message you first.");
            return;
        }

        const msgText = input.trim();
        setInput(""); // Optimistically clear input

        // Send to Supabase Database
        const { error } = await supabase.from('messages').insert({
            product_id: product.id,
            sender_id: user.id,
            receiver_id: product.seller_id,
            text: msgText
        });

        if (error) {
            console.error("Message send failed:", error);
            alert("Failed to connect to chat server.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Product Not Found</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
                <Link href="/marketplace">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8">Return to Marketplace</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <Link href="/marketplace" className="inline-flex items-center text-slate-500 hover:text-teal-600 mb-8 transition-colors group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left Column: Image & Details */}
                    <div className="lg:col-span-7">
                        <div className="aspect-[4/3] w-full bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center p-8 mb-10 relative group">
                            {product.tag && (
                                <span className="absolute top-6 left-6 bg-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-lg uppercase tracking-wider">
                                    {product.tag}
                                </span>
                            )}
                            <img
                                src={product.image_url || "/products/headphones.png"}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="mb-4">
                            <span className="inline-block bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-100 dark:border-teal-800">
                                {product.category || 'PREMIUM GOODS'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            {product.title}
                        </h1>

                        <div
                            className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl"
                            dangerouslySetInnerHTML={{ __html: product.description || "No description provided for this premium item. Verified by Identity Shield and protected by Swift Escrow engine." }}
                        />

                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm mb-12">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <ShieldCheck className="text-teal-500" /> Key Capabilities
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    'Authenticity Verified',
                                    'Identity Shield Covered',
                                    'Swift 70/30 Engine',
                                    'Insured Logistics Routing',
                                    'Buyer Protection',
                                    'New In Box'
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                                        <CheckCircle size={16} className="text-teal-500 mr-3 shrink-0" /> {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Chat */}
                    <div className="lg:col-span-5 space-y-8">
                        <Card className="p-8 sm:p-10 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-xl rounded-[32px] overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>

                            <div className="relative mb-8">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <h2 className="text-5xl font-black text-slate-900 dark:text-white">
                                        ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                                    </h2>
                                    {product.old_price && (
                                        <span className="text-xl text-slate-400 line-through">
                                            ${parseFloat(product.old_price).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">Fixed price. Negotiable via chat below.</p>

                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold border border-emerald-200 dark:border-emerald-800">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    Item available
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    size="lg"
                                    className="w-full h-16 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-teal-500/20 transform active:scale-95 transition-all"
                                    onClick={() => addToCart({
                                        id: product.id,
                                        productId: product.id,
                                        title: product.title,
                                        price: product.price,
                                        image_url: product.image_url,
                                        category: product.category,
                                        quantity: 1
                                    })}
                                >
                                    Add to Cart
                                </Button>
                                <Button variant="outline" className="w-full h-14 border-2 border-slate-100 dark:border-slate-800 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    View Live Demo
                                </Button>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Condition</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Brand New</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Protection</span>
                                    <span className="text-sm font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                                        <ShieldCheck size={16} /> Identity Shield Enabled
                                    </span>
                                </div>
                            </div>
                        </Card>


                    </div>
                </div>
            </div>
        </div>
    );
}
