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
    cartCount: number;
    addToCart: (item?: any) => Promise<void>;
    user: User | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [role, setRole] = useState<Role>("buyer");
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createClient();

    // Initialize theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === "dark") {
                document.documentElement.classList.add("dark");
            }
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Initialize Auth & Cart
    useEffect(() => {
        let mounted = true;

        const initializeApp = async () => {
            try {
                // Get Session with a timeout race to prevent hanging
                const sessionPromise = supabase.auth.getSession();
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject("Timeout"), 5000));

                // @ts-ignore
                const { data } = await Promise.race([sessionPromise, timeoutPromise]).catch(() => ({ data: { session: null } }));
                const session = data?.session;

                let activeUser = session?.user ?? null;

                // Manual Recovery for "Hanging SDK" workwaround
                if (!activeUser) {
                    try {
                        const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1].split('.')[0];
                        if (projectId) {
                            const key = `sb-${projectId}-auth-token`;
                            const stored = localStorage.getItem(key);
                            if (stored) {
                                console.log("Attempting session recovery from storage...");
                                const tokenData = JSON.parse(stored);
                                const { data: recovered } = await supabase.auth.setSession({
                                    access_token: tokenData.access_token,
                                    refresh_token: tokenData.refresh_token
                                });
                                if (recovered.session) {
                                    activeUser = recovered.session.user;
                                    console.log("Session recovered successfully!");
                                }
                            }
                        }
                    } catch (recErr) {
                        console.error("Recovery failed:", recErr);
                    }
                }

                if (mounted) {
                    setUser(activeUser);

                    if (activeUser) {
                        const metaRole = activeUser.user_metadata?.role as Role;
                        if (metaRole) setRole(metaRole);

                        await fetchCartCount(activeUser.id);
                    }
                }
            } catch (error) {
                console.error("Error initializing app:", error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        initializeApp();

        // Fail-safe: Force stop loading after 3s if Supabase sdk completely hangs
        const maxWait = setTimeout(() => {
            if (mounted) setIsLoading(false);
        }, 3000);

        // Listen for Auth Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;

            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                const metaRole = currentUser.user_metadata?.role as Role;
                if (metaRole) setRole(metaRole);

                await fetchCartCount(currentUser.id);

                // Track Login Stats (Only on explicit sign-in or initial session load)
                if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                    try {
                        const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        await supabase.rpc('track_user_login', { user_location: location });
                    } catch (err) {
                        console.error("Failed to track login:", err);
                    }
                }
            } else {
                setRole("buyer"); // Reset role to default on logout
                setCartCount(0);
            }
        });

        return () => {
            mounted = false;
            clearTimeout(maxWait);
            subscription.unsubscribe();
        };
    }, []);

    const fetchCartCount = async (userId: string) => {
        try {
            const { count, error } = await supabase
                .from('cart_items')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            if (!error && count !== null) {
                setCartCount(count);
            }
        } catch (e) {
            console.error("Failed to fetch cart count", e);
        }
    };

    const toggleTheme = React.useCallback(() => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            if (newTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return newTheme;
        });
    }, []);

    const addToCart = React.useCallback(async (item?: any) => {
        // Optimistic update
        setCartCount((prev) => prev + 1);

        if (user && item) {
            try {
                await supabase.from('cart_items').insert({
                    user_id: user.id,
                    product_id: item.id.toString(), // ensuring string
                    quantity: 1,
                    product_metadata: item
                });
            } catch (error) {
                console.error("Error adding to DB cart:", error);
            }
        }
    }, [user]);

    const signOut = React.useCallback(async () => {
        try {
            await supabase.auth.signOut();

            // Clear Manual Recovery Key
            const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1].split('.')[0];
            if (projectId) {
                const key = `sb-${projectId}-auth-token`;
                localStorage.removeItem(key);
            }
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setUser(null);
            setCartCount(0);
        }
    }, [supabase]);

    const value = React.useMemo(() => ({
        supabase, // Expose shared client
        theme,
        toggleTheme,
        role,
        setRole,
        cartCount,
        addToCart,
        user,
        isLoading,
        signOut
    }), [supabase, theme, role, cartCount, addToCart, user, isLoading, toggleTheme, signOut]);

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
