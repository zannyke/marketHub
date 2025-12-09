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
                        { label: "Today's Earnings", val: "$84.50", icon: <DollarSign size={20} className="text-green-600" /> },
                        { label: "Completed", val: "12", icon: <CheckCircle size={20} className="text-blue-600" /> },
                        { label: "Hours Online", val: "4.5h", icon: <Clock size={20} className="text-orange-600" /> },
                        { label: "Rating", val: "4.9", icon: <CheckCircle size={20} className="text-purple-600" /> },
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

                        <div className="space-y-4">
                            {[
                                { id: "#8821", pickup: "TechNova Store (0.5km)", drop: "123 Main St (2.1km)", fee: "$8.50", items: "2 items" },
                                { id: "#8825", pickup: "UrbanStyle (1.2km)", drop: "445 Park Ave (3.0km)", fee: "$12.00", items: "1 item" },
                                { id: "#8830", pickup: "GameZone (0.8km)", drop: "890 Elm St (1.5km)", fee: "$6.50", items: "3 items" },
                            ].map((job, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">Order {job.id}</h3>
                                                <span className="text-xs text-slate-500">{job.items} • Ready for pickup</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-teal-600">{job.fee}</div>
                                            <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded">Est. 20 mins</span>
                                        </div>
                                    </div>

                                    <div className="relative pl-4 space-y-6 mb-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                                        <div className="relative">
                                            <span className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white"></span>
                                            <div className="text-sm">
                                                <span className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Pickup</span>
                                                <span className="font-medium text-slate-800">{job.pickup}</span>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-teal-500 bg-teal-500"></span>
                                            <div className="text-sm">
                                                <span className="block text-xs font-bold text-teal-500 uppercase mb-0.5">Dropoff</span>
                                                <span className="font-medium text-slate-800">{job.drop}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl group-hover:scale-[1.01] transition-transform">
                                        Accept Delivery <ChevronRight size={18} className="ml-2" />
                                    </Button>
                                </div>
                            ))}
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
                                    <MapPin size={32} className="text-teal-400 animate-bounce" />
                                </div>
                                <p className="text-sm text-slate-300 text-center">High demand in Downtown area (+15% surge pricing)</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Delivery #8810", time: "1 hour ago", earn: "+$9.50" },
                                    { title: "Delivery #8802", time: "3 hours ago", earn: "+$14.20" },
                                    { title: "Weekly Bonus", time: "Yesterday", earn: "+$50.00", bonus: true },
                                ].map((act, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">{act.title}</div>
                                            <div className="text-xs text-slate-500">{act.time}</div>
                                        </div>
                                        <div className={`font-bold ${act.bonus ? 'text-green-600' : 'text-slate-900'}`}>{act.earn}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
