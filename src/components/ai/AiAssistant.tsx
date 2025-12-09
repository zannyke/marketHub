"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I am Nexus AI. How can I help you find the perfect product today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const send = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        const currentInput = input;
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            let response = "I'm searching our database for the best options.";
            if (currentInput.toLowerCase().includes('phone')) {
                response = "I found top-rated smartphones. The 'ProMax X' is trending with great camera specs.";
            } else if (currentInput.toLowerCase().includes('price') || currentInput.toLowerCase().includes('cost')) {
                response = "We have options for every budget. Would you like to filter by price range?";
            }
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slideUp origin-bottom-right">
                    {/* Header */}
                    <div className="bg-[#008B8B] p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2 font-semibold">
                            <Bot size={20} className="text-white" />
                            <span>Nexus AI</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                <div
                                    className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                        ? 'bg-[#008B8B] text-white rounded-br-none'
                                        : 'bg-white border border-gray-200 text-slate-700 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {m.role === 'bot' && (
                                        <div className="flex items-center gap-1 text-[#008B8B] font-bold text-xs mb-1">
                                            <Sparkles size={10} /> Assistant
                                        </div>
                                    )}
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask for recommendations..."
                            onKeyDown={e => e.key === 'Enter' && send()}
                            className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-[#008B8B]"
                        />
                        <Button
                            className="bg-[#008B8B] hover:bg-[#007070] text-white shrink-0 rounded-xl w-10 h-10 flex items-center justify-center"
                        >
                            <Send size={16} />
                        </Button>
                    </div>
                </div>
            )}

            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#008B8B] hover:bg-[#007070] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
                {isOpen ? (
                    <X size={28} className="transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                    <Bot size={28} className="transition-transform duration-300 group-hover:-translate-y-1" />
                )}
            </button>
        </div>
    );
};
