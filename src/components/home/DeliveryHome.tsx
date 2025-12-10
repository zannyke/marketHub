"use client";
import { Button } from "@/components/ui/button";
import { useApp } from "@/providers/AppProvider";
import Link from "next/link";
import { MapPin, Navigation, Clock, CheckCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export function DeliveryHome() {
    const { user } = useApp();

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Delivery Dashboard</h1>
                            <p className="text-slate-500">Ready to roll, {user?.email?.split('@')[0]}?</p>
                        </div>
                        <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-bold text-sm">
                            Status: Online
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Delivery */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Current Job</h2>
                        <div className="bg-white rounded-xl border-2 border-teal-500 shadow-lg p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-teal-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">Active</div>

                            <div className="flex items-start gap-4 mb-8">
                                <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                                    <Navigation size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Order #8821</h3>
                                    <p className="text-slate-500">Estimated Earnings: <span className="text-slate-900 font-bold">$12.50</span></p>
                                </div>
                            </div>

                            <div className="space-y-6 relative">
                                {/* Line connecting dots */}
                                <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-200 -z-10"></div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Pickup</p>
                                        <p className="font-bold text-slate-900">TechNova Warehouse</p>
                                        <p className="text-sm text-slate-500">123 Industrial Blvd, Sector 4</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full border-2 border-teal-500 bg-white flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-600 uppercase font-bold tracking-wider">Dropoff</p>
                                        <p className="font-bold text-slate-900">John Doe</p>
                                        <p className="text-sm text-slate-500">45 Maple Street, Apt 2B</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                                <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg">Mark Delivered</Button>
                                <Button variant="outline" className="h-12 w-12 p-0"><MapPin /></Button>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Today's Stats</h2>
                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl mb-6">
                            <div className="mb-4">
                                <p className="text-slate-400 text-sm">Total Earnings</p>
                                <h3 className="text-4xl font-bold">$84.50</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                                <div>
                                    <p className="text-slate-400 text-xs">Deliveries</p>
                                    <p className="text-xl font-bold">7</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">Hours Online</p>
                                    <p className="text-xl font-bold">4.2h</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">History</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={14} className="text-green-500" />
                                            <span className="text-slate-600">Order #881{i}</span>
                                        </div>
                                        <span className="font-bold">$11.20</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
