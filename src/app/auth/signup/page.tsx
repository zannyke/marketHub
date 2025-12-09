import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Github, ArrowRight } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Branding/Visual */}
            <div className="hidden lg:flex flex-col justify-between bg-teal-900 p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-abstract.png')] opacity-20 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/90 to-slate-900/90" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 font-bold text-2xl mb-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">M</div>
                        MarketHub
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Join the community of innovators and creators.
                    </h2>
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
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
                        <p className="text-slate-500 mt-2">Start your premium shopping journey today.</p>
                    </div>

                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Confirm</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-11">
                            Create Account <ArrowRight size={18} className="ml-2" />
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
