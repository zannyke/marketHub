"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/providers/AppProvider';
import {
    Search,
    Send,
    Shield,
    Lock,
    MoreVertical,
    Phone,
    Video,
    Image as ImageIcon,
    Paperclip,
    Circle,
    ArrowLeft,
    CheckCheck,
    Truck,
    ShoppingBag,
    DollarSign,
    MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
}

interface Chat {
    id: string; // this will act as the conversation/product ID
    name: string;
    role: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    avatar: string;
    type: 'order' | 'payment' | 'delivery';
    productId: string;
    otherUserId: string;
}

export default function ChatCenter() {
    const { user, role, supabase } = useApp();
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [allRawMessages, setAllRawMessages] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        let subscription: any;

        const fetchUserChats = async () => {
            try {
                // Fetch all messages involving the user
                const { data, error } = await supabase
                    .from('messages')
                    .select('*, products(id, title, image_url)')
                    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) {
                    setAllRawMessages(data);

                    // Group by product
                    const uniqueMap = new Map();
                    data.forEach(msg => {
                        if (msg.product_id && msg.products && !uniqueMap.has(msg.product_id)) {
                            const otherUserId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
                            uniqueMap.set(msg.product_id, {
                                id: msg.product_id,
                                productId: msg.product_id,
                                name: msg.products.title || 'Product Inquiry',
                                role: 'Negotiation',
                                lastMessage: msg.text,
                                time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                unread: 0,
                                online: true,
                                avatar: msg.products.title?.[0]?.toUpperCase() || 'P',
                                type: 'order',
                                otherUserId: otherUserId
                            });
                        }
                    });
                    setChats(Array.from(uniqueMap.values()));
                }
            } catch (err) {
                console.error("Error fetching chats:", err);
            }
        };

        fetchUserChats();

        // Listen for new incoming messages live
        subscription = supabase
            .channel('chat_inbox')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
            }, (payload) => {
                const newMsg = payload.new;
                if (newMsg.sender_id === user.id || newMsg.receiver_id === user.id) {
                    fetchUserChats(); // Refresh the list
                }
            })
            .subscribe();

        return () => {
            if (subscription) supabase.removeChannel(subscription);
        }
    }, [user, supabase]);

    useEffect(() => {
        if (selectedChat && allRawMessages.length > 0) {
            // Filter messages for this specific product conversation and reverse to chronological order
            const filteredMsgs = allRawMessages
                .filter(m => m.product_id === selectedChat.productId)
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map(m => ({
                    id: m.id,
                    senderId: m.sender_id === user?.id ? 'me' : m.sender_id,
                    text: m.text,
                    timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: 'read' as const
                }));
            setMessages(filteredMsgs);
        }
    }, [selectedChat, allRawMessages, user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !user || !selectedChat) return;

        const msgText = messageInput.trim();
        setMessageInput(''); // optimistic clear

        try {
            const { error } = await supabase.from('messages').insert({
                product_id: selectedChat.productId,
                sender_id: user.id,
                receiver_id: selectedChat.otherUserId,
                text: msgText
            });

            if (error) throw error;
        } catch (err) {
            console.error("Message send failed:", err);
            alert("Failed to send message.");
        }
    };

    return (
        <main className="h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 flex overflow-hidden">
            {/* Sidebar */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Shield className="text-teal-600" size={24} />
                            Secure Chat
                        </h1>
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-transparent rounded-xl" placeholder="Search conversations..." />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 ${selectedChat?.id === chat.id ? 'bg-teal-50/50 dark:bg-teal-900/20' : ''}`}
                            >
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-bold text-xl text-slate-500 dark:text-slate-300 shadow-sm">
                                        {chat.avatar}
                                    </div>
                                    {chat.online && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white truncate">{chat.name}</h3>
                                        <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate pr-4">{chat.lastMessage}</p>
                                        {chat.unread > 0 && (
                                            <span className="bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-40">
                            <MessageSquare size={48} className="mb-4 text-slate-300" />
                            <p className="text-sm font-bold text-slate-500">No Conversations Found</p>
                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Connect with buyers or sellers to start chatting</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-white dark:bg-slate-950 ${!selectedChat ? 'hidden md:flex items-center justify-center p-12' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/50 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedChat(null)}
                                    className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-900"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                                    {selectedChat.avatar}
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        {selectedChat.name}
                                        <Circle size={8} className={selectedChat.online ? 'fill-emerald-500 text-emerald-500' : 'text-slate-300'} />
                                    </h2>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {selectedChat.role} • {selectedChat.online ? 'Active Now' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-3">
                                <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-teal-600">
                                    <Phone size={20} />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-teal-600">
                                    <Video size={20} />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
                                    <MoreVertical size={20} />
                                </Button>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 px-6 py-2 border-b border-emerald-100/50 dark:border-emerald-800/30 flex items-center justify-center gap-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest">
                            <Lock size={10} /> End-to-end Encrypted by MarketHub Security
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950">
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-4 rounded-2xl text-sm shadow-sm transition-all hover:shadow-md ${msg.senderId === 'me'
                                                ? 'bg-teal-600 text-white rounded-br-none'
                                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 px-1">
                                                <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                                                {msg.senderId === 'me' && <CheckCheck size={12} className={msg.status === 'read' ? 'text-teal-500' : 'text-slate-300'} />}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full opacity-20 text-center">
                                    <Shield size={64} className="mb-4 text-slate-400" />
                                    <p className="text-lg font-bold">Secure Session Established</p>
                                    <p className="text-sm">Your messages are encrypted. Send a message to start.</p>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 focus-within:border-teal-500/50 transition-colors">
                                <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-teal-600">
                                    <ImageIcon size={20} />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-teal-600 pr-2">
                                    <Paperclip size={20} />
                                </Button>
                                <Input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 border-none focus-visible:ring-0 bg-transparent text-sm h-10"
                                    placeholder="Type your message securely..."
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl w-10 h-10 flex items-center justify-center shadow-lg shadow-teal-500/20"
                                >
                                    <Send size={18} />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield size={48} className="text-teal-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Secure Communications Center</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-12">
                            Select a transaction or delivery partner to start a secure conversation.
                            All communications are encrypted and monitored for your safety.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                            <div className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm">
                                    <DollarSign className="text-teal-500" size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Payments</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm">
                                    <Truck className="text-indigo-500" size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tracking</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm">
                                    <ShoppingBag className="text-rose-500" size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Escrow</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
