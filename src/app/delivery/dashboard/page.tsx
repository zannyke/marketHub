"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Navigation, Clock, CheckCircle, ChevronRight, DollarSign, Calendar, Truck } from "lucide-react";
import { LiveMap } from "@/components/delivery/LiveMap";
import { useApp } from "@/providers/AppProvider";

export default function DeliveryDashboard() {
    const { user, supabase } = useApp();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        let subscription: any;

        const fetchOrders = async () => {
            try {
                // Fetch pending orders AND orders assigned to this driver
                const { data, error } = await supabase
                    .from('orders')
                    .select('*, products(title, image_url)')
                    .or(`status.eq.pending,delivery_person_id.eq.${user.id}`)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setOrders(data);

                // Listen for new orders or updates live
                subscription = supabase
                    .channel('public:orders')
                    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, async (payload) => {
                        // Re-fetch everything to get joined product data easily, 
                        // or just simple manual array manipulation if performance is a concern
                        const { data: refreshedData } = await supabase
                            .from('orders')
                            .select('*, products(title, image_url)')
                            .or(`status.eq.pending,delivery_person_id.eq.${user.id}`)
                            .order('created_at', { ascending: false });

                        if (refreshedData) setOrders(refreshedData);
                    })
                    .subscribe();

            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

        return () => {
            if (subscription) supabase.removeChannel(subscription);
        };
    }, [user, supabase]);

    const claimOrder = async (orderId: string) => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'assigned', delivery_person_id: user.id })
                .eq('id', orderId)
                .eq('status', 'pending'); // Ensure it's still pending

            if (error) throw error;
            alert("Order claimed successfully!");
        } catch (err: any) {
            console.error("Claim error:", err);
            alert("Failed to claim order. Someone else might have taken it!");
        }
    };

    const completeOrder = async (orderId: string) => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'delivered' })
                .eq('id', orderId)
                .eq('delivery_person_id', user.id);

            if (error) throw error;
            alert("Order marked as delivered!");

            // Remove from active view
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (err: any) {
            console.error("Complete error:", err);
            alert("Failed to update status.");
        }
    };

    const myActiveDeliveries = orders.filter(o => o.delivery_person_id === user?.id && o.status !== 'delivered');
    const availableJobs = orders.filter(o => o.status === 'pending');

    // Calculate simple stats
    const todayEarnings = orders.filter(o => o.delivery_person_id === user?.id && o.status === 'delivered').length * 15; // Mock $15 per delivery
    const completedCount = orders.filter(o => o.delivery_person_id === user?.id && o.status === 'delivered').length;
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
                        { label: "Today's Earnings", val: `$${todayEarnings.toFixed(2)}`, icon: <DollarSign size={20} className="text-green-600" /> },
                        { label: "Completed", val: completedCount.toString(), icon: <CheckCircle size={20} className="text-blue-600" /> },
                        { label: "Hours Online", val: "2h", icon: <Clock size={20} className="text-orange-600" /> },
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
                    {/* Available & Active Jobs */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* MY ACTIVE DELIVERIES */}
                        {myActiveDeliveries.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="font-bold text-xl text-teal-800 flex items-center gap-2">
                                    <Truck size={24} className="text-teal-600" /> My Current Route
                                </h2>

                                {myActiveDeliveries.map(order => (
                                    <div key={order.id} className="bg-teal-50 border border-teal-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6">
                                        <div className="w-20 h-20 bg-white rounded-xl shadow-sm shrink-0 flex items-center justify-center p-2 hidden sm:flex">
                                            {order.products?.image_url ?
                                                <img src={order.products.image_url} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                : <Package size={32} className="text-teal-200" />
                                            }
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="bg-teal-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">IN TRANSIT</span>
                                                    <h3 className="font-bold text-slate-900 text-lg mt-1">{order.products?.title || 'Premium Item'} (x{order.quantity})</h3>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block font-bold text-lg text-teal-800">${(order.total_price * 0.1).toFixed(2)}</span>
                                                    <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">Est. Payout</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white p-3 rounded-lg border border-teal-100">
                                                <MapPin size={16} className="text-red-500 shrink-0" />
                                                <span className="font-medium">{order.delivery_address}</span>
                                            </div>

                                            <Button
                                                onClick={() => completeOrder(order.id)}
                                                className="w-full sm:w-auto mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold"
                                            >
                                                Confirm Delivery Complete <CheckCircle size={16} className="ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* OPEN JOBS */}
                        <div className="space-y-4">
                            <h2 className="font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">Available Orders Near You</h2>

                            {loading ? (
                                <div className="py-12 text-center text-slate-400">Loading active sonar ping...</div>
                            ) : availableJobs.length === 0 ? (
                                <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border-2 border-dashed border-slate-100 shadow-sm">
                                    <Package size={48} className="mx-auto mb-4 opacity-10" />
                                    <p className="font-bold text-slate-700">No active jobs found</p>
                                    <p className="text-sm">New delivery requests will appear here when available.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {availableJobs.map(order => (
                                        <div key={order.id} className="bg-white border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                <div className="flex-1 space-y-3">
                                                    <span className="bg-orange-100 text-orange-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">WAITING FOR DRIVER</span>
                                                    <h3 className="font-bold text-slate-900 text-lg">{order.products?.title || 'Premium Item'} (x{order.quantity})</h3>

                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <MapPin size={16} className="text-slate-400" />
                                                        <span>{order.delivery_address}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end justify-between border-l border-slate-100 pl-6 shrink-0">
                                                    <div className="text-right mb-4 mt-1">
                                                        <span className="block font-black text-2xl text-slate-900">${(order.total_price * 0.1).toFixed(2)}</span>
                                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Est. Payout</span>
                                                    </div>
                                                    <Button
                                                        onClick={() => claimOrder(order.id)}
                                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold"
                                                    >
                                                        Claim Job
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                    <Navigation size={18} /> Live Map Terminal
                                </h3>
                                <div className="aspect-square rounded-xl overflow-hidden border border-white/10 mb-4 bg-slate-900 border-dashed">
                                    <LiveMap className="w-full h-full" zoom={13} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                                    MapTiler Vector Sync Active
                                </p>
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
