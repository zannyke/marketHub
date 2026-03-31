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
        console.log("Before insert...");
        const res = await supabase.from('products').insert({
            title: "Test Error",
            price: NaN,
            seller_id: "7cd1ae69-a78b-402a-9ca8-fcb652875b47"
        }).select();
        console.log("Result:", res);
    } catch (e) {
        console.log("Caught completely:", e);
    }
}
test();
