const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k) acc[k.trim()] = v.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testAuth() {
    const email = 'zannykenya254+testing@gmail.com';
    // Send OTP
    const { error: err1 } = await supabase.auth.signInWithOtp({ email });
    console.log('Send OTP Error:', err1);

    // Attempt to verify with a wrong token just to see the error
    const { data, error: err2 } = await supabase.auth.verifyOtp({ email, token: '111111', type: 'email' });
    console.log('Verify Error (email):', err2);

    const { error: err3 } = await supabase.auth.verifyOtp({ email, token: '111111', type: 'signup' });
    console.log('Verify Error (signup):', err3);

    const { error: err4 } = await supabase.auth.verifyOtp({ email, token: '111111', type: 'magiclink' });
    console.log('Verify Error (magiclink):', err4);
}

testAuth().catch(console.error);
