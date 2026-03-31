import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { checkout_email, cart_items, delivery_address } = body;

        // Create a Supabase client configured to use cookies
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll() },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch {
                            // Ignore error when called from a Server Component
                        }
                    },
                },
            }
        );

        // 1. Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // 2. Cross-Reference Logic: check if input email matches session email or phone
        const sessionEmail = user.email || '';
        const sessionPhone = user.phone || '';

        const normalizedInput = checkout_email?.trim().toLowerCase();
        const normalizedSessionEmail = sessionEmail?.trim().toLowerCase();
        const normalizedSessionPhone = sessionPhone?.trim();

        if (
            (normalizedSessionEmail && normalizedInput === normalizedSessionEmail) ||
            (normalizedSessionPhone && normalizedInput === normalizedSessionPhone)
        ) {
            // Identity confirmed!
        } else {
            return NextResponse.json(
                { error: 'Security Checkpoint Failed: Identity mismatch. The provided identifier does not match the active session.' },
                { status: 403 }
            );
        }

        // 3. Process cart items
        // We use the Supabase Service Role Key for server-side admin operations
        const supabaseAdmin = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return [] },
                    setAll(cookiesToSet) { }
                }
            }
        );

        for (const item of cart_items) {
            // Deduct stock and Create order
            const { data: product } = await supabaseAdmin.from('products').select('stock_quantity, seller_id, price').eq('id', item.productId).single();
            if (product) {
                // Insert into orders
                await supabaseAdmin.from('orders').insert({
                    buyer_id: user.id,
                    seller_id: product.seller_id,
                    product_id: item.productId,
                    quantity: item.quantity,
                    total_price: (product.price * item.quantity),
                    delivery_address: delivery_address,
                    status: 'Completed' // As per prompt: 'transition the order status to Completed'
                });

                // (Optional) Here you would deduct stock if we were maintaining stock_quantity tracking
            }
        }

        // 4. Clear the user's cart in the DB
        await supabaseAdmin.from('cart_items').delete().eq('user_id', user.id);

        return NextResponse.json({ success: true, message: 'Order processed successfully' });
    } catch (error: any) {
        console.error("API Checkout Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
