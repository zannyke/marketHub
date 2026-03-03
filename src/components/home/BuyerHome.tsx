"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Truck, CheckCircle, Zap, Star, Heart, Flame, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/providers/AppProvider";

export function BuyerHome() {
    const [showWelcome, setShowWelcome] = useState(false);
    const { user, supabase, addToCart } = useApp();
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .limit(4)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setFeaturedProducts(data || []);
            } catch (err) {
                console.error("Error fetching featured products:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeatured();
    }, [supabase]);

    useEffect(() => {
        // Check if we just logged in
        const params = new URLSearchParams(window.location.search);
        if (params.get('welcome') === 'true') {
            setShowWelcome(true);
            // Clean URL without refresh
            window.history.replaceState({}, document.title, "/");
            // Auto hide after 5 seconds
            setTimeout(() => setShowWelcome(false), 5000);
        }
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
            {/* Welcome Toast */}
            {showWelcome && (
                <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right-full fade-in duration-500">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-l-4 border-teal-500 shadow-2xl rounded-xl p-4 flex items-start gap-4 max-w-sm">
                        <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full text-teal-600 shrink-0">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Successfully Signed In!</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back to MarketHub. We missed you!</p>
                        </div>
                        <button onClick={() => setShowWelcome(false)} className="text-slate-400 hover:text-slate-600">
                            <ArrowRight size={14} className="rotate-45" />
                        </button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-24 md:pt-32 md:pb-40 bg-white dark:bg-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

                <div className="container mx-auto px-4 flex flex-col items-center relative z-10 text-center">
                    {user ? (
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 text-teal-800 dark:text-teal-400 text-lg font-medium mb-8 animate-fade-in-up">
                            <span className="flex h-3 w-3 rounded-full bg-teal-500"></span>
                            Welcome back, {user.email?.split('@')[0]}!
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 text-teal-800 dark:text-teal-400 text-lg font-medium mb-8 animate-fade-in-up">
                            <span className="flex h-3 w-3 rounded-full bg-teal-500"></span>
                            Welcome to the future of shopping
                        </div>
                    )}

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight max-w-4xl">
                        Curated Excellence for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Modern Living</span>
                    </h1>

                    <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Explore a world of premium products, where quality meets innovation.
                        Join over 100,000 satisfied aesthetic seekers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto mb-20">
                        <Link href="/marketplace" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                {user ? "Continue Shopping" : "Start Exploring"} <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>

                        {!user ? (
                            <Link href="/auth/signup" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-teal-600 transition-all font-bold">
                                    Join for Free
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/customer/orders" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-teal-600 transition-all font-bold">
                                    My Orders
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-8 md:gap-16 text-center border-t border-slate-100 dark:border-slate-800 pt-12">
                        <div className="flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-4 rounded-xl transition-all group">
                            <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl mb-2 group-hover:scale-110 transition-transform"><ShieldCheck size={24} /></div>
                            <span className="font-bold text-slate-900 dark:text-white">Verified Sellers</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-4 rounded-xl transition-all group">
                            <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl mb-2 group-hover:scale-110 transition-transform"><Truck size={24} /></div>
                            <span className="font-bold text-slate-900 dark:text-white">Global Shipping</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-4 rounded-xl transition-all group">
                            <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl mb-2 group-hover:scale-110 transition-transform"><Heart size={24} /></div>
                            <span className="font-bold text-slate-900 dark:text-white">Curated Quality</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Trending Categories</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Browse our most popular collections</p>
                        </div>
                        <Link href="/marketplace" className="hidden md:flex items-center text-teal-600 font-bold hover:underline">
                            View all categories <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Electronics", icon: <Zap size={28} className="text-white" />, color: "bg-teal-500", href: "/marketplace?cat=electronics" },
                            { label: "Fashion", icon: <ShoppingBag size={28} className="text-white" />, color: "bg-rose-500", href: "/marketplace?cat=fashion" },
                            { label: "Home & Living", icon: <Heart size={28} className="text-white" />, color: "bg-amber-500", href: "/marketplace?cat=home" },
                            { label: "Gadgets", icon: <Flame size={28} className="text-white" />, color: "bg-indigo-500", href: "/marketplace?cat=trending" },
                        ].map((cat, i) => (
                            <Link key={i} href={cat.href}>
                                <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                                    <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{cat.label}</h3>
                                    <p className="text-slate-400 dark:text-slate-500 font-medium">Browse Collection</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Drops</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">Fresh arrivals selected by our experts</p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-800 h-[400px] animate-pulse rounded-3xl" />
                            ))}
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((item, i) => (
                                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 group">
                                    <div className="h-[300px] bg-slate-50 dark:bg-slate-800/50 relative p-8 flex items-center justify-center overflow-hidden">
                                        {item.tag && (
                                            <span className={`absolute top-5 right-5 ${item.tag_color || 'bg-teal-500'} text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10 shadow-lg uppercase`}>
                                                {item.tag}
                                            </span>
                                        )}
                                        <img
                                            src={item.image_url || "/products/headphones.png"}
                                            alt={item.title}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                                        />

                                        <div className="absolute bottom-5 left-0 right-0 px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                            <Button
                                                onClick={() => addToCart({ ...item, id: item.id })}
                                                className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl rounded-full"
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star fill="#FBBF24" color="#FBBF24" size={14} />
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{item.rating || 0}</span>
                                            <span className="text-xs text-slate-400">({item.reviews_count || 0})</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 truncate" title={item.title}>{item.title}</h3>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-xl font-bold text-teal-600 dark:text-teal-400">${parseFloat(item.price).toFixed(2)}</span>
                                            {item.old_price && <span className="text-sm text-slate-400 line-through">${parseFloat(item.old_price).toFixed(2)}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-slate-500 dark:text-slate-400 mb-4">The marketplace is currently waiting for new drops.</p>
                            <Link href="/sell">
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full">List a Product Early</Button>
                            </Link>
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <Link href="/marketplace">
                            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-bold border-2 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
