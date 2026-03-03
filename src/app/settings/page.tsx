"use client";

import { useApp } from "@/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Bell, Lock, User, Globe, ChevronRight, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SettingsPage() {
    const { theme, toggleTheme, user, role, supabase } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [profile, setProfile] = useState<any>({
        full_name: "",
        shop_name: "",
        shop_description: "",
        shop_location: "",
        shop_hours: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                if (data) {
                    setProfile({
                        full_name: data.full_name || "",
                        shop_name: data.shop_name || "",
                        shop_description: data.shop_description || "",
                        shop_location: data.shop_location || data.location || "",
                        shop_hours: data.shop_hours || ""
                    });
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [user, supabase]);

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const updates = {
                full_name: profile.full_name,
                ...(role === 'seller' && {
                    shop_name: profile.shop_name,
                    shop_description: profile.shop_description,
                    shop_location: profile.shop_location,
                    shop_hours: profile.shop_hours,
                    location: profile.shop_location // sync main location too
                })
            };

            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) {
                // If the error code corresponds to unique constraint violation
                if (error.code === '23505') {
                    throw new Error("This profile name is already taken. Please choose another one.");
                }
                throw error;
            }

            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (err: any) {
            console.error("Update error:", err);
            alert(`Failed to save: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your preferences and account settings</p>
                </header>

                {/* Account Section */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm relative">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-2xl shrink-0">
                                {profile.full_name?.[0]?.toUpperCase() || user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{profile.full_name || 'User'}</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</p>
                                <span className="inline-block mt-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {role} Account
                                </span>
                            </div>
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-full shrink-0">Edit Profile</Button>
                            ) : (
                                <div className="flex gap-2 shrink-0">
                                    <Button onClick={() => setIsEditing(false)} variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 rounded-full">
                                        <X size={20} />
                                    </Button>
                                    <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                                        {isSaving ? 'Saving...' : <><Save size={16} className="mr-2" /> Save</>}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Edit Form */}
                    {isEditing && (
                        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <User size={18} className="text-teal-500" /> General Info
                                </h3>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name / Display Name</label>
                                    <Input
                                        value={profile.full_name}
                                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                        className="bg-white dark:bg-slate-950"
                                    />
                                </div>
                            </div>

                            {role === 'seller' && (
                                <div className="space-y-4 pt-4">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <Globe size={18} className="text-blue-500" /> Shop Profile
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Shop Name</label>
                                            <Input
                                                value={profile.shop_name}
                                                onChange={(e) => setProfile({ ...profile, shop_name: e.target.value })}
                                                className="bg-white dark:bg-slate-950"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</label>
                                            <Input
                                                value={profile.shop_location}
                                                onChange={(e) => setProfile({ ...profile, shop_location: e.target.value })}
                                                className="bg-white dark:bg-slate-950"
                                            />
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Shop Description</label>
                                            <Input
                                                value={profile.shop_description}
                                                onChange={(e) => setProfile({ ...profile, shop_description: e.target.value })}
                                                className="bg-white dark:bg-slate-950"
                                                placeholder="Tell buyers what makes your products unique..."
                                            />
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Operating Hours</label>
                                            <Input
                                                value={profile.shop_hours}
                                                onChange={(e) => setProfile({ ...profile, shop_hours: e.target.value })}
                                                className="bg-white dark:bg-slate-950"
                                                placeholder="e.g. Mon-Fri, 9am - 5pm EST"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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
            </div>
        </div>
    );
}
