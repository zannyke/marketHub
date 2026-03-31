const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k) acc[k.trim()] = v.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testFetch() {
    const email = 'zannykenya254+testing2@gmail.com';
    console.log('Sending OTP to', email);
    await supabase.auth.signInWithOtp({ email });
    console.log('Sent. Please check email DB/logs to see if it sent a Signup or Magiclink template.');
}
testFetch();
