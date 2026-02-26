"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MessageSquare, Lock, Send, ShieldCheck, User } from "lucide-react";
import { useState } from "react";

export default function ProductPage({ params }: { params: { id: string } }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [price, setPrice] = useState(49.99);
    const [isLocked, setIsLocked] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'seller', text: 'Hello! This DataWizard node is fully verified and ready for deployment.' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'buyer', text: input }]);
        setInput('');

        // Simulate seller response
        if (input.toLowerCase().includes('discount') || input.toLowerCase().includes('price')) {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'seller', text: 'I can offer a 10% discount if you lock the agreement now.' }]);
            }, 1000);
        }
    };

    const handleLock = () => {
        setIsLocked(true);
        setPrice(44.99); // Automated discount on lock
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/marketplace" className="inline-flex items-center text-slate-500 hover:text-teal-600 font-bold mb-8 transition-colors group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Trade Terminal
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Visual & Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="aspect-video bg-slate-900 rounded-[2.5rem] border border-slate-700 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-slate-500 font-black uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity">Node Deployment Visualizer</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-teal-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Hardware Node</span>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">ID: {params.id}</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                                DataWizard <span className="text-teal-600">Pro</span>
                            </h1>
                            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-2xl">
                                Enterprise-grade automated data synthesis. This node connects to your infrastructure via secure Swift protocols and provides real-time pattern recognition.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Deployment Matrix</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {['Pattern Recognition', 'NLP v4 Engine', 'Real-time Streaming', 'Secure API Sync', 'Scale Infra', 'Shield Protocol'].map(feat => (
                                    <div key={feat} className="flex items-center gap-3 text-slate-700 font-bold">
                                        <CheckCircle size={16} className="text-teal-500" /> {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Panel */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="p-8 rounded-[3rem] border-2 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] space-y-8 sticky top-12">
                            <div className="space-y-1">
                                <div className="flex justify-between items-end">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Negotiated Price</p>
                                    {isLocked && <span className="text-[10px] font-black text-teal-600 uppercase bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1"><Lock size={8} /> Agreement Locked</span>}
                                </div>
                                <p className="text-6xl font-black text-slate-900 tracking-tighter">
                                    ${price.toFixed(2)}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    className="w-full h-16 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 text-xl uppercase tracking-tighter transition-transform active:scale-[0.98]"
                                >
                                    Add to Swift Cart
                                </Button>

                                <Button
                                    onClick={() => setIsChatOpen(!isChatOpen)}
                                    variant="outline"
                                    className="w-full h-14 border-2 border-slate-900 text-slate-900 font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-slate-50 flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={18} /> {isChatOpen ? "Close Negotiation" : "Negotiate Price"}
                                </Button>
                            </div>

                            {/* Negotiation/Chat Interface (Phase 4) */}
                            {isChatOpen && (
                                <div className="space-y-4 pt-6 border-t border-slate-100 animate-in slide-in-from-top-4 duration-300">
                                    <div className="bg-slate-50 rounded-2xl p-4 h-48 overflow-y-auto space-y-3 border border-slate-200 font-medium text-sm">
                                        {messages.map((m, i) => (
                                            <div key={i} className={`flex gap-2 ${m.role === 'buyer' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${m.role === 'buyer' ? 'bg-slate-900 text-white' : 'bg-teal-500 text-white'}`}>
                                                    {m.role === 'buyer' ? 'B' : 'S'}
                                                </div>
                                                <div className={`p-3 rounded-2xl max-w-[80%] ${m.role === 'buyer' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'}`}>
                                                    {m.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                            placeholder="Ask for a discount..."
                                            className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                                        />
                                        <Button onClick={sendMessage} className="h-12 w-12 bg-slate-900 p-0 rounded-xl">
                                            <Send size={18} />
                                        </Button>
                                    </div>

                                    {!isLocked && (
                                        <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl space-y-2">
                                            <p className="text-[10px] font-black text-teal-700 uppercase leading-tight">Agreement Protocol</p>
                                            <p className="text-[10px] text-teal-600/70 font-medium leading-tight mb-2">Locking an agreement confirms the final price for both parties and prevents further changes during this session.</p>
                                            <Button
                                                onClick={handleLock}
                                                size="sm"
                                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black text-[10px] uppercase tracking-widest h-8 rounded-lg"
                                            >
                                                Lock Agreement @ $44.99
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-3 py-2 bg-slate-50 rounded-xl">
                                <ShieldCheck size={16} className="text-teal-600" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Market Hub Escrow Protected</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
