"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Github, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { supabase } = useApp(); // Use shared instance
    const [logs, setLogs] = useState<string[]>([]);
    const [isOtpLogin, setIsOtpLogin] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toISOString().split('T')[1].split('.')[0]}: ${msg}`]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setLogs([]);
        addLog("Starting login process...");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Helper to handle success
        const handleSuccess = () => {
            addLog("Login Success! Redirecting...");
            window.location.href = "/?welcome=true";
        };

        try {
            if (isOtpLogin) {
                if (!otpSent) {
                    addLog("Sending Identity Shield OTP...");
                    const { error } = await supabase.auth.signInWithOtp({ email });
                    if (error) throw error;
                    setOtpSent(true);
                    addLog("OTP sent successfully. Awaiting verification.");
                } else {
                    const otp = formData.get("otp") as string;
                    addLog("Verifying Identity Shield OTP...");
                    const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
                    if (error) throw error;
                    if (data?.session) handleSuccess();
                }
                setLoading(false);
                return;
            }

            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                throw error;
            }

            if (data?.session) {
                handleSuccess();
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Unable to log in. Please check your credentials.");
            setLoading(false);
        }
    }

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
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Discover the world's most premium marketplace.
                    </h2>
                    <p className="text-teal-100 text-lg leading-relaxed">
                        "MarketHub has completely transformed how I find unique, high-quality products. The curation is simply unmatched."
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-200" /> {/* Avatar Placeholder */}
                        <div>
                            <div className="font-bold">Elena R.</div>
                            <div className="text-sm text-teal-300">Product Designer</div>
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
                        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                        <p className="text-slate-500 mt-2">Enter your credentials to access your account.</p>
                    </div>

                    {error && (
                        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Ghost-Killer Fingerprint Check Note */}
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center gap-3 text-xs text-slate-500">
                        <Lock size={14} className="text-teal-600" />
                        Device fingerprint active. Connection secured by MarketHub.
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        {/* Identity Shield Toggle UI */}
                        {!isOtpLogin ? (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700">Password</label>
                                    <Link href="/auth/reset" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    icon={<Lock size={18} />}
                                    placeholder="••••••••"
                                    className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                />
                            </div>
                        ) : (
                            otpSent && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-sm font-medium text-slate-700">One-Time Password Setup</label>
                                    <Input
                                        name="otp"
                                        type="text"
                                        required
                                        icon={<Lock size={18} />}
                                        placeholder="123456"
                                        className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                    />
                                    <p className="text-xs text-slate-500">Enter the verification code sent to your email.</p>
                                </div>
                            )
                        )}

                        <Button type="submit" size="lg" disabled={loading} className="w-full btn-gradient shadow text-white font-bold h-11">
                            {loading ? "Authenticating..." : (isOtpLogin ? (otpSent ? "Verify Identity Shield" : "Send Shield Code") : "Sign In")}
                            {!loading && <ArrowRight size={18} className="ml-2" />}
                        </Button>
                    </form>

                    <button
                        type="button"
                        onClick={() => { setIsOtpLogin(!isOtpLogin); setOtpSent(false); setError(null); }}
                        className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase"
                    >
                        {isOtpLogin ? "Use Standard Password Login" : "Use Identity Shield (OTP) Login"}
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
                        Don't have an account?{" "}
                        <Link href="/auth/signup" className="font-bold text-teal-600 hover:text-teal-700">
                            Create account
                        </Link>
                    </p>

                    {/* Debug Logs */}
                    <div className="mt-8 border-t border-slate-200 pt-4">
                        <h3 className="text-xs font-bold text-slate-400 mb-2">Debug Logs</h3>
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono text-slate-600 max-h-32 overflow-y-auto">
                            {logs.length === 0 ? "Ready..." : logs.map((l, i) => <div key={i}>{l}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
