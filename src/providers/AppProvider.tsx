"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type Theme = "light" | "dark";
type Role = "buyer" | "seller" | "delivery";

interface AppContextType {
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
        const initializeApp = async () => {
            try {
                // Get Session
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);

                if (session?.user) {
                    await fetchCartCount(session.user.id);
                }
            } catch (error) {
                console.error("Error initializing app:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeApp();

        // Listen for Auth Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);

            if (session?.user) {
                await fetchCartCount(session.user.id);

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
                setCartCount(0);
            }
        });

        return () => {
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

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const addToCart = async (item?: any) => {
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
                // Re-fetch to ensure sync? Or trust optimistic.
                // fetchCartCount(user.id); 
            } catch (error) {
                console.error("Error adding to DB cart:", error);
                // Revert if failed?
                // setCartCount((prev) => prev - 1);
            }
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setCartCount(0);
        // Maybe redirect home?
    };

    return (
        <AppContext.Provider value={{ theme, toggleTheme, role, setRole, cartCount, addToCart, user, isLoading, signOut }}>
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
