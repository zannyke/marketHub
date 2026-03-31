const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k) acc[k.trim()] = v.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testAuth() {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: 'zannykenya254@gmail.com',
    });
    console.log('Result:', data, error);
}

testAuth().catch(console.error);
