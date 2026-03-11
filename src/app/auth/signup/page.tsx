"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Github, ArrowRight, Briefcase, ShoppingBag, Truck, Phone } from "lucide-react";
import { useApp } from "@/providers/AppProvider";

export default function SignupPage() {
    const router = useRouter();
    const { user } = useApp(); // Access global user state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<'buyer' | 'seller' | 'delivery'>('buyer');

    // Phone auth state
    const [isPhoneSignup, setIsPhoneSignup] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [countryCode, setCountryCode] = useState("+1");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

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
        const fullName = formData.get("fullName") as string;

        // Form Data common to specific roles
        const plateNumber = formData.get("plateNumber") as string;
        const vehicleClass = formData.get("vehicleClass") as string;
        const energyProfile = formData.get("energyProfile") as string;
        const nationalId = formData.get("nationalId") as string;

        const metadata = {
            full_name: fullName,
            role: role,
            ...(role === 'delivery' && { plate_number: plateNumber, vehicle_class: vehicleClass, energy_profile: energyProfile }),
            ...(role === 'seller' && { national_id: nationalId })
        };

        try {
            if (isPhoneSignup) {
                const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;

                if (!otpSent) {
                    // 1. Send OTP to Phone
                    const { error } = await supabase.auth.signInWithOtp({
                        phone: fullPhone,
                        options: { data: metadata }
                    });
                    if (error) throw error;
                    setOtpSent(true);
                } else {
                    // 2. Verify OTP for Phone
                    if (otp.length !== 6) {
                        setError("Please enter a valid 6-digit code.");
                        setLoading(false);
                        return;
                    }

                    const { data, error } = await supabase.auth.verifyOtp({
                        phone: fullPhone,
                        token: otp,
                        type: 'sms'
                    });
                    if (error) throw error;
                    if (data?.session) {
                        router.push(role === 'seller' ? '/dashboard' : '/?welcome=true');
                    }
                }
            } else {
                // Email + Password Flow
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const confirmPassword = formData.get("confirmPassword") as string;

                if (password !== confirmPassword) {
                    setError("Passwords do not match");
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: metadata },
                });

                if (error) throw error;

                if (data.session) {
                    router.push(role === 'seller' ? '/dashboard' : '/?welcome=true');
                } else {
                    router.push("/auth/login?message=Account created! Please check your email to confirm.");
                }
            }
        } catch (err: any) {
            console.error("Signup error:", err);
            if (err.message?.includes("already registered") || err.message?.includes("already exists")) {
                router.push("/auth/login?message=Account already exists. Please sign in.");
                return;
            }
            setError(err.message || "An unexpected error occurred");
        } finally {
            if (!user) setLoading(false);
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
                                disabled={otpSent}
                                icon={<User size={18} />}
                                placeholder="John Doe"
                                className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                            />
                        </div>

                        {/* Dynamic Identity Inputs based on Mode */}
                        {!isPhoneSignup ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <label className="text-sm font-semibold text-slate-700">Phone Number (Global)</label>
                                <div className="flex gap-2 mb-4">
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        disabled={otpSent}
                                        className="h-11 w-24 rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-sm focus-visible:ring-teal-500"
                                    >
                                        <option value="+1">+1 (US/CA)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+61">+61 (AU)</option>
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+254">+254 (KE)</option>
                                        <option value="+234">+234 (NG)</option>
                                        <option value="+27">+27 (ZA)</option>
                                    </select>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        required
                                        disabled={otpSent}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        icon={<Phone size={18} />}
                                        placeholder="555-0123"
                                        className="h-11 flex-1 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                    />
                                </div>

                                {otpSent && (
                                    <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2 p-4 bg-teal-50 border border-teal-100 rounded-xl">
                                        <label className="text-sm font-bold text-teal-900">SMS Verification Code</label>
                                        <Input
                                            name="otp"
                                            type="text"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            icon={<Lock size={18} />}
                                            placeholder="000000"
                                            className="h-11 bg-white border-teal-200 focus-visible:ring-teal-500 text-center tracking-widest font-bold text-lg"
                                        />
                                        <p className="text-xs text-teal-700 font-medium">Please enter the 6-digit code sent to your phone.</p>
                                    </div>
                                )}
                            </>
                        )}

                        {role === 'delivery' && (
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-500 uppercase">Hardware Registry Details</h3>
                                <div className="space-y-2">
                                    <Input label="Vehicle Plate Number" name="plateNumber" required placeholder="KCD 123A" className="h-11 bg-slate-50" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-slate-700">Classification</label>
                                        <select name="vehicleClass" required className="flex h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:ring-teal-500">
                                            <option value="B1">Motorcycle (B1)</option>
                                            <option value="B2">Light Van (B2)</option>
                                            <option value="B3">Truck (B3)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-slate-700">Energy Profile</label>
                                        <select name="energyProfile" required className="flex h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:ring-teal-500">
                                            <option value="electric">100% Electric</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="petroleum">Petroleum</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === 'seller' && (
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-500 uppercase">Verification Registry</h3>
                                <div className="space-y-2">
                                    <Input label="National ID Number" name="nationalId" required placeholder="e.g. 12345678" className="h-11 bg-slate-50" />
                                </div>
                            </div>
                        )}

                        <Button type="submit" size="lg" disabled={loading} className="w-full btn-gradient shadow text-white font-bold h-11">
                            {loading ? "Processing..." : (isPhoneSignup ? (otpSent ? "Verify & Create Account" : "Send SMS Code") : "Create Account")}
                            {!loading && <ArrowRight size={18} className="ml-2" />}
                        </Button>
                    </form>

                    <button
                        type="button"
                        onClick={() => { setIsPhoneSignup(!isPhoneSignup); setOtpSent(false); setError(null); }}
                        className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase pt-2"
                    >
                        {isPhoneSignup ? "Use Standard Email Setup" : "Use Global Phone Number"}
                    </button>

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
        </div >
    );
}
