"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Github, ArrowRight, Briefcase, ShoppingBag, Truck } from "lucide-react";
import { useApp } from "@/providers/AppProvider";

export default function SignupPage() {
    const router = useRouter();
    const { user } = useApp(); // Access global user state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<'buyer' | 'seller' | 'delivery'>('buyer');
    const supabase = createClient();

    // Auto-redirect if user becomes authenticated
    useEffect(() => {
        if (user) {
            router.push("/?welcome=true");
        }
    }, [user, router]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const fullName = formData.get("fullName") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // Race against a timeout to prevent hanging
            const signUpPromise = supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                    },
                },
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out. If you aren't redirected soon, please check your email for a confirmation link.")), 30000)
            );

            // @ts-ignore
            const { data, error } = await Promise.race([signUpPromise, timeoutPromise]);

            if (error) {
                setError(error.message);
            } else if (data.session) {
                // Determine redirect based on role
                const redirectPath = role === 'seller' ? '/dashboard' : '/';
                router.push(redirectPath);
                router.refresh();
            } else {
                // Email confirmation required
                router.push("/auth/login?message=Account created successfully! Please check your email to confirm.");
                router.refresh();
            }
        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.message || "An unexpected error occurred");
        } finally {
            if (!user) setLoading(false); // Only stop loading if we haven't auto-redirected
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Branding/Visual */}
            <div className="hidden lg:flex flex-col justify-between bg-teal-900 p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-abstract.png')] opacity-20 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/90 to-slate-900/90" />

                {/* ... (keep branding consistent if you want, or just let valid unchanged lines be) ... */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 font-bold text-2xl mb-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">M</div>
                        MarketHub
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Join the community of innovators.
                    </h2>
                    {/* Updated text size here too for consistency if desired, otherwise standard */}
                    <ul className="space-y-4 text-teal-100 text-lg">
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">✓</div>
                            Access exclusive premium products
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">✓</div>
                            Personalized AI recommendations
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">✓</div>
                            Fast and secure checkout
                        </li>
                    </ul>
                </div>

                <div className="relative z-10 text-sm text-teal-400">
                    © 2024 MarketHub Inc. All rights reserved.
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center bg-white p-8 lg:p-12">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
                        <p className="text-slate-500 mt-2">Start your premium shopping journey today.</p>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">I am a:</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('buyer')}
                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${role === 'buyer' ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-200 hover:bg-slate-50'}`}
                            >
                                <ShoppingBag size={20} />
                                <span className="text-xs font-bold">Buyer</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('seller')}
                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${role === 'seller' ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-200 hover:bg-slate-50'}`}
                            >
                                <Briefcase size={20} />
                                <span className="text-xs font-bold">Seller</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('delivery')}
                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${role === 'delivery' ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-200 hover:bg-slate-50'}`}
                            >
                                <Truck size={20} />
                                <span className="text-xs font-bold">Delivery</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Input
                                label="Full Name"
                                name="fullName"
                                type="text"
                                required
                                icon={<User size={18} />}
                                placeholder="John Doe"
                                className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                required
                                icon={<Mail size={18} />}
                                placeholder="name@example.com"
                                className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    required
                                    icon={<Lock size={18} />}
                                    placeholder="••••••••"
                                    className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Confirm"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    icon={<Lock size={18} />}
                                    placeholder="••••••••"
                                    className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                />
                            </div>
                        </div>

                        <Button type="submit" size="lg" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-11">
                            {loading ? "Creating..." : "Create Account"}
                            {!loading && <ArrowRight size={18} className="ml-2" />}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">
                        <Github size={18} className="mr-2" /> GitHub
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-bold text-teal-600 hover:text-teal-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
