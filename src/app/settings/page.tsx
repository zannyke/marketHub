"use client";

import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Bell, Lock, User, Globe, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function SettingsPage() {
    const { theme, toggleTheme, user } = useApp();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your preferences and account settings</p>
                </header>

                {/* Account Section */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-2xl">
                                {user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.email?.split('@')[0] || 'User'}</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</p>
                            </div>
                            <Button variant="outline" className="ml-auto rounded-full">Edit Profile</Button>
                        </div>
                    </div>
                </section>

                {/* Appearance Section */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Monitor size={20} className="text-teal-500" />
                            Appearance
                        </h3>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                    {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                                    Dark Mode
                                </span>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Switch between light and dark themes
                                </p>
                            </div>
                            <Switch
                                checked={theme === 'dark'}
                                onCheckedChange={toggleTheme}
                                className="data-[state=checked]:bg-teal-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Other Settings (Mock) */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Globe size={20} className="text-blue-500" />
                            General
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500"><Bell size={18} /></div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">Notifications</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500"><Lock size={18} /></div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">Privacy & Security</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
