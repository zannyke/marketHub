"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Session, SupabaseClient } from "@supabase/supabase-js";

type Theme = "light" | "dark";
type Role = "buyer" | "seller" | "delivery";

interface AppContextType {
    supabase: SupabaseClient;
    theme: Theme;
    toggleTheme: () => void;
    role: Role;
    setRole: (role: Role) => void;
    cartItems: any[];
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    cartCount: number;
    addToCart: (item: any) => Promise<void>;
    user: User | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    // Determine the singleton Supabase client
    const [supabase] = useState(() => createClient());
    const [theme, setTheme] = useState<Theme>("light");
    const [role, _setRole] = useState<Role>("buyer");
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const cartCount = React.useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

    // Persist role changes to Supabase
    const setRole = React.useCallback(async (newRole: Role) => {
        _setRole(newRole);
        if (user) {
            try {
                await supabase.auth.updateUser({ data: { role: newRole } });
            } catch (err) {
                console.error("Failed to persist role:", err);
            }
        }
    }, [user, supabase]);

    // Initialize theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === "dark") document.documentElement.classList.add("dark");
        }
    }, []);

    // Initialize Auth & Cart - Robust Implementation
    useEffect(() => {
        let mounted = true;

        const checkUserSession = async () => {
            try {
                // 1. Check standard Supabase session
                const { data: { session }, error } = await supabase.auth.getSession();

                if (session?.user) {
                    console.log("AppProvider: Session found via getSession");
                    if (mounted) setUser(session.user);
                    return session.user;
                }

                // 2. Fallback: Check manual backup in LocalStorage
                console.log("AppProvider: No standard session, checking backup...");
                const backup = localStorage.getItem('market-hub-auth-backup');
                if (backup) {
                    try {
                        const tokenData = JSON.parse(backup);
                        // Validate token structure
                        if (tokenData.access_token && tokenData.refresh_token) {
                            const { data, error: restoreError } = await supabase.auth.setSession({
                                access_token: tokenData.access_token,
                                refresh_token: tokenData.refresh_token
                            });

                            if (!restoreError && data.session?.user) {
                                console.log("AppProvider: Session restored from backup");
                                if (mounted) setUser(data.session.user);
                                return data.session.user;
                            }
                        }
                    } catch (e) {
                        console.warn("AppProvider: Backup restore failed", e);
                    }
                }

                console.log("AppProvider: No session found.");
                return null;
            } catch (err) {
                console.error("AppProvider: Session check error", err);
                return null;
            }
        };

        const initializeFlow = async () => {
            // Race checkUserSession against a 4-second timeout to prevent indefinite loading screen
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 4000));

            const activeUser = await Promise.race([
                checkUserSession(),
                timeoutPromise
            ]) as User | null;

            if (mounted) {
                if (activeUser) {
                    // Restore Role
                    const metaRole = activeUser.user_metadata?.role as Role;
                    if (metaRole) _setRole(metaRole);

                    // Restore Cart
                    await fetchCart(activeUser.id);

                    // Track Login
                    try {
                        const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        supabase.rpc('track_user_login', { user_location: location });
                    } catch (e) { }
                }
                setIsLoading(false);
            }
        };

        // Listen for Auth Changes (Login, Logout, Auto-Refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(`AppProvider: Auth Event ${event}`);

            if (!mounted) return;

            // If we are already loading, let initializeFlow handle it to avoid race conditions
            // Unless it's an explicit SIGNED_OUT or SIGNED_IN event that we must react to

            const currentUser = session?.user ?? null;
            setUser(currentUser); // Always sync state

            if (currentUser) {
                const metaRole = currentUser.user_metadata?.role as Role;
                if (metaRole) _setRole(metaRole);
                fetchCart(currentUser.id);
            } else if (!isLoading) {
                // Only clear state if we are done loading and truly logged out
                // Prevents clearing during the split-second "loading" phase
                _setRole("buyer");
                setCartItems([]);
            }
        });

        // Kick off initialization
        initializeFlow();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const fetchCart = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', userId);

            if (!error && data) {
                // Deduplicate and aggregate
                const uniqueItemsMap = new Map();
                const duplicatesToDelete: string[] = [];
                const updatesToPerform: { id: string, quantity: number }[] = [];

                data.forEach(item => {
                    const pid = item.product_id;
                    if (uniqueItemsMap.has(pid)) {
                        // Found duplicate
                        const existing = uniqueItemsMap.get(pid);
                        existing.quantity += item.quantity; // Sum quantity
                        duplicatesToDelete.push(item.id); // Mark for deletion
                        // Mark existing for update to save new sum
                        const pendingUpdate = updatesToPerform.find(u => u.id === existing.dbId);
                        if (pendingUpdate) {
                            pendingUpdate.quantity = existing.quantity;
                        } else {
                            updatesToPerform.push({ id: existing.dbId, quantity: existing.quantity });
                        }
                    } else {
                        // New unique item
                        uniqueItemsMap.set(pid, {
                            ...item.product_metadata,
                            quantity: item.quantity,
                            dbId: item.id,
                            productId: item.product_id
                        });
                    }
                });

                // Set State with clean unique items
                setCartItems(Array.from(uniqueItemsMap.values()));

                // Self-Healing: Clean up DB in background
                if (duplicatesToDelete.length > 0 || updatesToPerform.length > 0) {
                    // 1. Update summed quantities
                    for (const update of updatesToPerform) {
                        await supabase.from('cart_items').update({ quantity: update.quantity }).eq('id', update.id);
                    }
                    // 2. Delete duplicates
                    if (duplicatesToDelete.length > 0) {
                        await supabase.from('cart_items').delete().in('id', duplicatesToDelete);
                    }
                }
            }
        } catch (e) {
            console.error("Failed to fetch cart", e);
        }
    };

    const toggleTheme = React.useCallback(() => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            if (newTheme === "dark") document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
            return newTheme;
        });
    }, []);

    const addToCart = React.useCallback(async (item: any) => {
        const productId = item.id.toString();

        // Optimistic Update
        setCartItems(prev => {
            const existing = prev.find(p => p.productId === productId);
            if (existing) {
                return prev.map(p => p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p);
            }
            return [...prev, { ...item, quantity: 1, productId }];
        });

        if (user) {
            try {
                // Check if exists using maybeSingle to handle potential duplicates safely
                const { data: existing } = await supabase
                    .from('cart_items')
                    .select('id, quantity')
                    .eq('user_id', user.id)
                    .eq('product_id', productId)
                    .maybeSingle();

                if (existing) {
                    await supabase.from('cart_items').update({ quantity: existing.quantity + 1 }).eq('id', existing.id);
                } else {
                    const { data: newItem } = await supabase.from('cart_items').insert({
                        user_id: user.id,
                        product_id: productId,
                        quantity: 1,
                        product_metadata: item
                    }).select().single();

                    if (newItem) fetchCart(user.id);
                }
            } catch (error) {
                console.error("Error adding to DB cart:", error);
            }
        }
    }, [user]);

    const removeFromCart = React.useCallback(async (productId: string) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));

        if (user) {
            try {
                // Delete ALL rows for this product to ensure deep clean
                await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', productId);
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    }, [user]);

    const updateQuantity = React.useCallback(async (productId: string, quantity: number) => {
        if (quantity < 1) return;

        setCartItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));

        if (user) {
            try {
                // Update specific product rows. If duplicates exist that fetchCart hasn't cleaned yet, this updates all of them.
                // Ideally, fetchCart cleans this up on load.
                await supabase.from('cart_items').update({ quantity }).eq('user_id', user.id).eq('product_id', productId);
            } catch (error) {
                console.error("Error updating cart quantity:", error);
            }
        }
    }, [user]);

    const signOut = React.useCallback(async () => {
        try {
            await supabase.auth.signOut();

            // Clear all auth persistence keys
            localStorage.removeItem('market-hub-auth');
            localStorage.removeItem('market-hub-auth-backup');

            const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1].split('.')[0];
            if (projectId) localStorage.removeItem(`sb-${projectId}-auth-token`);

        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setUser(null);
            setCartItems([]);
            // Force role reset
            _setRole('buyer');
            window.location.href = '/'; // Hard redirect to ensure clean state
        }
    }, [supabase]);

    const value = React.useMemo(() => ({
        supabase, theme, toggleTheme, role, setRole,
        cartCount, cartItems, addToCart, removeFromCart, updateQuantity,
        user, isLoading, signOut
    }), [supabase, theme, role, cartCount, cartItems, addToCart, removeFromCart, updateQuantity, user, isLoading, toggleTheme, signOut]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
