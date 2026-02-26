"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MessageSquare, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/providers/AppProvider";

export default function ProductPage({ params }: { params: { id: string } }) {
    const { addToCart, user } = useApp();
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
    const [input, setInput] = useState("");
    const [locked, setLocked] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'You', text: input }]);
        setInput("");
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'Seller', text: 'I am available to negotiate. If we agree, use the Agreement Lock.' }]);
        }, 1000);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                <ArrowLeft size={16} className="mr-2" style={{ marginRight: '8px' }} /> Back to Marketplace
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
                <div>
                    <div style={{
                        height: '400px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                        borderRadius: '24px',
                        marginBottom: '2rem',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Interactive Demo Placeholder</span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ background: 'rgba(0, 243, 255, 0.1)', color: 'var(--accent-blue)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>PREMIUM GOODS</span>
                    </div>

                    <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>MarketHub Item {params.id}</h1>
                    <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '3rem' }}>
                        Top quality product verified by Identity Shield. Escrow payments supported via Swift Financial Engine. Ships immediately through certified Logistics hub.
                    </p>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Capabilities</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {['Authenticity Verified', 'Identity Shield Covered', 'Swift 70/30 Engine', 'Insured Logistics Routing', 'Buyer Protection', 'New In Box'].map(feat => (
                                <li key={feat} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                    <CheckCircle size={16} color="var(--accent-blue)" style={{ marginRight: '10px' }} /> {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$49.99</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Fixed price. Negotiable via chat.</p>

                        <Button
                            size="lg"
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                            style={{ width: '100%', marginBottom: '1rem' }}
                            onClick={() => addToCart({
                                id: params.id,
                                productId: params.id,
                                title: `MarketHub Item ${params.id}`,
                                price: 49.99,
                                quantity: 1,
                                category: 'Premium'
                            })}
                        >
                            Add to Cart
                        </Button>
                        <Button variant="outline" className="w-full" style={{ width: '100%' }}>View Live Demo</Button>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Condition</span>
                                <strong>Brand New</strong>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Protection</span>
                                <span className="font-bold text-teal-600 flex items-center gap-1">
                                    <ShieldCheck size={14} /> Identity Shield
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Negotiation Protocol Module */}
                    <Card style={{ padding: '1.5rem', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare size={18} className="text-slate-600" />
                            <h3 className="font-bold text-slate-800">Negotiaton Center</h3>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-lg p-3 h-48 overflow-y-auto mb-4 flex flex-col gap-2">
                            {messages.length === 0 ? (
                                <p className="text-xs text-slate-400 text-center mt-10">Send a message to start negotiating</p>
                            ) : (
                                messages.map((m, i) => (
                                    <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${m.sender === 'You' ? 'bg-teal-50 ml-auto text-teal-900 border border-teal-100' : 'bg-slate-50 mr-auto text-slate-800 border border-slate-100'}`}>
                                        <div className="text-[10px] font-bold opacity-50 mb-1">{m.sender}</div>
                                        <div>{m.text}</div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex gap-2 mb-4">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Offer a price..."
                                className="bg-white h-9 text-sm"
                            />
                            <Button size="sm" onClick={handleSend} className="bg-slate-800 hover:bg-slate-900 text-white h-9">Send</Button>
                        </div>

                        <div className="border-t border-slate-200 pt-4 mt-2">
                            <Button
                                onClick={() => setLocked(!locked)}
                                className={`w-full h-10 font-bold transition-all shadow border flex items-center gap-2 justify-center ${locked ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                            >
                                <Lock size={16} className={locked ? "text-teal-600" : "text-slate-400"} />
                                {locked ? "Agreement Locked" : "Lock Agreement"}
                            </Button>
                            <p className="text-[10px] text-slate-500 mt-2 text-center leading-tight">
                                Locking the agreement initiates the Swift Escrow Engine contract binding both parties.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
