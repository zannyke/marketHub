const fs = require('fs');
const { execSync } = require('child_process');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k) acc[k.trim()] = v.join('=').trim();
    return acc;
}, {});

try {
    const dbUrl = env.SUPABASE_DB_URL || env.DATABASE_URL;
    if (!dbUrl) {
        console.log('No database url found.');
    } else {
        console.log('Running SQL...');
        execSync('psql "' + dbUrl + '" -f supabase_storage_policies.sql', { stdio: 'inherit' });
    }
} catch (e) {
    console.error(e.message);
}
