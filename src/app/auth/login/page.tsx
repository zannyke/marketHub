"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Lock, Asterisk, ArrowRight, ShieldCheck } from "lucide-react";

export default function UnifiedAuthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { supabase } = useApp();

    const [step, setStep] = useState<'input' | 'verify'>('input');
    const [authIdentifier, setAuthIdentifier] = useState("");
    const [authType, setAuthType] = useState<'email' | 'phone'>('email');

    useEffect(() => {
        router.prefetch("/?welcome=true");
        router.prefetch("/dashboard");
        router.prefetch("/delivery/dashboard");
    }, [router]);

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setAuthIdentifier(val);
        // Phone number rough detection
        if (/^\+?[0-9\s\-]{7,15}$/.test(val)) {
            setAuthType('phone');
        } else {
            setAuthType('email');
        }
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (authType === 'email') {
                const { error } = await supabase.auth.signInWithOtp({ email: authIdentifier });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signInWithOtp({ phone: authIdentifier });
                if (error) throw error;
            }
            setStep('verify');
        } catch (err: any) {
            console.error("OTP send error:", err);
            setError(err.message || `Failed to send verification code to ${authIdentifier}.`);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const token = formData.get("otp") as string;

        try {
            let res;
            if (authType === 'email') {
                res = await supabase.auth.verifyOtp({ email: authIdentifier, token, type: 'email' });
            } else {
                res = await supabase.auth.verifyOtp({ phone: authIdentifier, token, type: 'sms' });
            }

            if (res.error) throw res.error;

            if (res.data?.session && res.data.user) {
                let redirectPath = "/?welcome=true";
                const role = res.data.user?.user_metadata?.role;

                if (role === 'seller') {
                    redirectPath = "/dashboard";
                } else if (role === 'delivery') {
                    redirectPath = "/delivery/dashboard";
                }

                router.push(redirectPath);
            }
        } catch (err: any) {
            console.error("OTP verify error:", err);
            setError(err.message || "Invalid verification code. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Branding/Visual */}
            <div className="hidden lg:flex flex-col justify-between bg-teal-900 p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-abstract.png')] opacity-20 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-slate-900/90" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 font-bold text-2xl mb-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">M</div>
                        MarketHub
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">
                        Unified Security Portal
                    </h2>
                    <p className="text-teal-100 text-lg leading-relaxed">
                        Secure, passwordless authentication. Enter your Email or Phone to receive a verification handshake.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-teal-400" />
                            <span>Unverified until complete handshake</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Lock className="text-teal-400" />
                            <span>RLS protected sessions</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-teal-400">
                    © 2024 MarketHub Inc. All rights reserved.
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center bg-white p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-slate-900">Sign In / Sign Up</h1>
                        <p className="text-slate-500 mt-2">Enter your email or phone number to continue.</p>
                    </div>

                    {error && (
                        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            {error}
                        </div>
                    )}

                    {step === 'input' ? (
                        <form onSubmit={handleSendOTP} className="space-y-5 animate-in fade-in">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email or Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {authType === 'email' ? <Mail size={18} className="text-slate-400" /> : <Phone size={18} className="text-slate-400" />}
                                    </div>
                                    <input
                                        type={authType === 'email' ? 'email' : 'tel'}
                                        required
                                        value={authIdentifier}
                                        onChange={handleIdentifierChange}
                                        placeholder="name@example.com or +1234567890"
                                        className="w-full h-11 pl-10 pr-3 rounded-md bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                                    />
                                </div>
                            </div>

                            <Button type="submit" size="lg" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-11 shadow-md">
                                {loading ? "Initiating Handshake..." : "Continue"}
                                {!loading && <ArrowRight size={18} className="ml-2" />}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-5 animate-in slide-in-from-right-4 fade-in">
                            <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg flex gap-3 text-sm text-teal-800 mb-6">
                                <ShieldCheck size={20} className="shrink-0 text-teal-600" />
                                <div>
                                    <p className="font-bold">Verification step required.</p>
                                    <p className="text-teal-600 mt-1">We sent a 6-digit code to {authIdentifier}.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Verification Code</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Asterisk size={18} className="text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="otp"
                                        required
                                        placeholder="123456"
                                        className="w-full h-11 pl-10 pr-3 rounded-md bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow font-mono tracking-widest text-lg"
                                    />
                                </div>
                            </div>

                            <Button type="submit" size="lg" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-11 shadow-md">
                                {loading ? "Verifying Identity..." : "Verify & Secure Session"}
                            </Button>

                            <button
                                type="button"
                                onClick={() => setStep('input')}
                                className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-700 pt-4 cursor-pointer"
                            >
                                Did not receive a code? Try again.
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
