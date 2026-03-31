const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k) acc[k.trim()] = v.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkDB() {
    console.log("Fetching products...");
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
        console.error("Fetch error:", error);
    } else {
        console.log("Total products worldwide:", data.length);
        if (data.length > 0) {
            console.log("Latest product:", data[data.length - 1]);
        }
    }
}
checkDB();
