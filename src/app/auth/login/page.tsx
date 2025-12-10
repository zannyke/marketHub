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

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toISOString().split('T')[1].split('.')[0]}: ${msg}`]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setLogs([]); // Clear previous logs
        addLog("Submit triggered");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        addLog(`Email provided: ${email}`);
        addLog(`Password provided (length): ${password.length}`);

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) addLog("WARNING: SUPABASE_URL missing");

        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
        addLog(`Config URL: ${sbUrl.substring(0, 40)}...`); // Show more to debug protocol

        // Connectivity Check
        try {
            addLog("Checking connectivity to Supabase...");
            // Simple fetch to the project URL to see if it resolves
            const res = await fetch(`${sbUrl}/rest/v1/`, {
                method: "HEAD",
                headers: { "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" }
            });
            addLog(`Connectivity Status: ${res.status} ${res.statusText}`);
        } catch (netErr: any) {
            addLog(`Connectivity FAILED: ${netErr.message || netErr}`);
            setError("Cannot reach server. Check Firewall/DNS.");
            setLoading(false);
            return;
        }

        // Safety timeout in case network hangs
        const timeoutId = setTimeout(() => {
            setLoading(false);
            const msg = "Login request timed out (8s). Check network.";
            setError(msg);
            addLog(msg);
        }, 8000);

        try {
            addLog("Attempting RAW NETWORK LOGIN (Bypassing SDK)...");

            // 1. Direct REST Call to Supabase Auth API
            const authUrl = `${sbUrl}/auth/v1/token?grant_type=password`;
            const res = await fetch(authUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                addLog(`Raw Auth Failed: ${res.status}`);
                addLog(`Message: ${data.error_description || data.msg || "Unknown error"}`);
                setError(data.error_description || "Login failed");
                setLoading(false);
                clearTimeout(timeoutId);
                return;
            }

            addLog("Raw Login Success! Got Token.");

            // 2. Hydrate the session into the SDK so the rest of the app knows
            addLog("Hydrating session...");
            const { error: sessionError } = await supabase.auth.setSession({
                access_token: data.access_token,
                refresh_token: data.refresh_token
            });

            if (sessionError) {
                addLog(`Session Hydration Failed: ${sessionError.message}`);
                // Even if hydration fails, we have the token. 
                // We could manually save to localStorage as a fallback, but let's see.
                throw sessionError;
            }

            clearTimeout(timeoutId);
            addLog("Session active. Redirecting...");
            window.location.assign("/?welcome=true");

        } catch (err: any) {
            clearTimeout(timeoutId);
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred");
            addLog(`Exception: ${err?.message || err}`);
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

                        <Button type="submit" size="lg" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-11">
                            {loading ? "Signing In..." : "Sign In"}
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
