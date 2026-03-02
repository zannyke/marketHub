"use client";

import { Button } from "@/components/ui/button";
import { Package, MapPin, Navigation, Clock, CheckCircle, ChevronRight, DollarSign, Calendar } from "lucide-react";

export default function DeliveryDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Delivery Hub</h1>
                        <p className="text-slate-500">Find jobs, track deliveries, and view earnings.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Online & Available
                        </span>
                        <Button variant="outline" className="bg-white border-slate-200">
                            Go Offline
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Today's Earnings", val: "$0.00", icon: <DollarSign size={20} className="text-green-600" /> },
                        { label: "Completed", val: "0", icon: <CheckCircle size={20} className="text-blue-600" /> },
                        { label: "Hours Online", val: "0h", icon: <Clock size={20} className="text-orange-600" /> },
                        { label: "Rating", val: "N/A", icon: <CheckCircle size={20} className="text-purple-600" /> },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-slate-400 uppercase">{s.label}</span>
                                {s.icon}
                            </div>
                            <div className="text-2xl font-bold text-slate-900">{s.val}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Available Jobs */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="font-bold text-xl text-slate-900">Available Orders Near You</h2>

                        <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border-2 border-dashed border-slate-100 shadow-sm">
                            <Package size={48} className="mx-auto mb-4 opacity-10" />
                            <p className="font-bold text-slate-700">No active jobs found</p>
                            <p className="text-sm">New delivery requests will appear here when available.</p>
                        </div>
                    </div>

                    {/* Current/Map Placeholder */}
                    <div className="space-y-6">
                        <div className="bg-slate-800 rounded-2xl p-6 text-white overflow-hidden relative">
                            {/* Abstract Map Design */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="grid grid-cols-6 gap-4 transform -rotate-12 scale-150">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <div key={i} className="h-20 bg-white rounded-lg"></div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Navigation size={18} /> Live Map
                                </h3>
                                <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20 mb-4">
                                    <MapPin size={32} className="text-teal-400 opacity-20" />
                                </div>
                                <p className="text-sm text-slate-300 text-center italic">Waiting for connection to GPS...</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
                            <div className="py-8 text-center text-slate-400">
                                <p className="text-sm">No activity recorded for today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
