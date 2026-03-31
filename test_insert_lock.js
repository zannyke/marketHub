const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k) acc[k.trim()] = v.join('=').trim();
    return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
    try {
        console.log("Before dummy valid insert...");
        // Use a random UUID for seller_id that is NOT authorized, just to see if it responds FAST with RLS error or hangs!
        const t1 = Date.now();
        const res = await supabase.from('products').insert({
            title: "Test Insert Protocol",
            description: "If this finishes fast, the table is not locked.",
            price: 19.99,
            category: "Electronics",
            seller_id: "00000000-0000-0000-0000-000000000000"
        }).select();
        const t2 = Date.now();
        console.log(`Insert completed in ${t2 - t1}ms`);
        console.log("Result:", res);
    } catch (e) {
        console.log("Caught:", e);
    }
}
test();
