"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Headphones, CornerDownRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const LIB_QUESTIONS = [
    {
        id: 1,
        q: "How do I become a seller?",
        a: "To become a seller, simply log out and create a new account selecting the 'Seller' role during signup. You'll then be able to list products in the Dashboard!"
    },
    {
        id: 2,
        q: "What is Swifft Escrow?",
        a: "Swifft Escrow is our secure payment system. Funds are held safely until the buyer confirms receipt of the product, ensuring protection for both parties."
    },
    {
        id: 3,
        q: "How to track my order?",
        a: "You can track your orders in the 'Order History' section of your account. For real-time updates, you can use our secure Chat Center to talk to the delivery person."
    },
    {
        id: 4,
        q: "Is there a delivery fee?",
        a: "Delivery fees vary based on distance and urgency. You will see the exact fee during checkout before finalizing your purchase."
    }
];

const GREETINGS_LIB = [
    { keywords: ["hi", "hello", "hey", "hujambo", "mambo", "sasa"], response: "Hello! I am Nexus AI, your premium assistant. How can I help you navigate MarketHub today?" },
    { keywords: ["good morning", "asubuhi njema"], response: "Good morning! Wishing you a productive day. How can I assist you with your orders or store setup?" },
    { keywords: ["good afternoon", "mchana mwema"], response: "Good afternoon! I'm here to help. Are you looking for something specific on the marketplace?" },
    { keywords: ["good evening", "jioni njema"], response: "Good evening! Nexus AI is still online and ready to assist. How was your day?" },
    { keywords: ["how are you", "unakuaje", "mambo vipi"], response: "I'm functioning at peak efficiency and ready to help you! How are things on your end?" },
    { keywords: ["thank you", "asante", "thanks"], response: "You're very welcome! I'm always here if you need anything else. Happy shopping!" },
    { keywords: ["bye", "goodbye", "kwaheri"], response: "Goodbye! I'll be here whenever you need me. Stay safe and have a great time!" }
];

export const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I am Nexus AI. I can help with common questions or connect you with our support team. What can I do for you today?' }
    ]);
    const [input, setInput] = useState('');
    const [showContact, setShowContact] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleLibraryAction = (item: typeof LIB_QUESTIONS[0]) => {
        setMessages(prev => [
            ...prev,
            { role: 'user', text: item.q },
            { role: 'bot', text: item.a }
        ]);
    };

    const send = (overrideText?: string) => {
        const textToUse = overrideText || input;
        if (!textToUse.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: textToUse }]);
        if (!overrideText) setInput('');

        // Simulate AI response
        setTimeout(() => {
            const lowerText = textToUse.toLowerCase().trim();
            let response = "";
            let shouldShowContact = false;

            // Check Greeting Library first
            const matchingGreeting = GREETINGS_LIB.find(g =>
                g.keywords.some(k => lowerText === k || lowerText.startsWith(k + " ") || lowerText.endsWith(" " + k))
            );

            if (matchingGreeting) {
                response = matchingGreeting.response;
            } else if (lowerText.includes('help') || lowerText.includes('support') || lowerText.includes('human') || lowerText.includes('admin')) {
                response = "I understand you need specialized assistance. Would you like to alert our administration team or speak with customer care?";
                shouldShowContact = true;
            } else if (lowerText.includes('seller')) {
                response = LIB_QUESTIONS[0].a;
            } else if (lowerText.includes('escrow') || lowerText.includes('pay')) {
                response = LIB_QUESTIONS[1].a;
            } else if (lowerText.includes('track') || lowerText.includes('where is')) {
                response = LIB_QUESTIONS[2].a;
            } else if (lowerText.includes('delivery') || lowerText.includes('fee')) {
                response = LIB_QUESTIONS[3].a;
            } else {
                response = "I'm not quite sure about that specific request. I've noted it for our team, but you can also talk to an admin directly.";
                shouldShowContact = true;
            }

            setMessages(prev => [...prev, { role: 'bot', text: response }]);
            if (shouldShowContact) setShowContact(true);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="w-[380px] h-[600px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
                    {/* Header */}
                    <div className="bg-[#008B8B] p-5 flex items-center justify-between text-white shadow-lg">
                        <div className="flex items-center gap-3 font-bold">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm">Nexus AI</h3>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] text-teal-100 font-medium tracking-wider uppercase">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages & Library */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 custom-scrollbar">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2 max-w-[90%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                <div
                                    className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                        ? 'bg-[#008B8B] text-white rounded-br-none shadow-md shadow-teal-500/20'
                                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {m.role === 'bot' && (
                                        <div className="flex items-center gap-1 text-[#008B8B] dark:text-teal-400 font-black text-[10px] mb-2 uppercase tracking-tighter">
                                            <Sparkles size={12} /> System Intelligence
                                        </div>
                                    )}
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {/* Suggestion Chips */}
                        {messages.length < 10 && (
                            <div className="pt-2 space-y-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Suggested Questions</p>
                                <div className="flex flex-wrap gap-2">
                                    {LIB_QUESTIONS.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleLibraryAction(item)}
                                            className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-3 py-2 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all text-left flex items-center gap-2 group"
                                        >
                                            <CornerDownRight size={12} className="text-slate-300 group-hover:text-teal-500" />
                                            {item.q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Admin Alert Button */}
                        {showContact && (
                            <div className="pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-teal-100 dark:border-teal-900/30 p-4 shadow-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
                                            <Headphones size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Professional Support</h4>
                                            <p className="text-[10px] text-slate-500">Available 24/7 for critical issues</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button className="bg-[#008B8B] hover:bg-teal-700 text-white text-[10px] font-bold h-9">
                                            Alert Admin
                                        </Button>
                                        <Button variant="outline" className="text-[10px] font-bold h-9 border-slate-200 dark:border-slate-700">
                                            Live Chat
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-teal-500/50 transition-all">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && send()}
                                placeholder="Ask Nexus anything..."
                                className="border-none bg-transparent focus-visible:ring-0 text-xs h-9"
                            />
                            <Button
                                onClick={() => send()}
                                className="bg-[#008B8B] hover:bg-teal-700 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 shrink-0"
                            >
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Float Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-[#008B8B] text-white rounded-[2rem] shadow-2xl shadow-teal-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
                {isOpen ? <X size={28} /> : (
                    <div className="relative">
                        <MessageSquare size={28} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-teal-800 rounded-full"></span>
                    </div>
                )}
            </button>
        </div>
    );
};
