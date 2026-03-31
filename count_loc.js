const fs = require('fs');
const path = require('path');

let totalLines = 0;
let fileCount = 0;

function countLines(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'public' || file.startsWith('.')) continue; // ignore dotted dirs
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            countLines(fullPath);
        } else {
            const ext = path.extname(file);
            if (['.ts', '.tsx', '.js', '.jsx', '.css', '.sql', '.html', '.json'].includes(ext)) {
                // Ignore generated packages
                if (file === 'package-lock.json') continue;

                const content = fs.readFileSync(fullPath, 'utf8');
                totalLines += content.split('\n').length;
                fileCount++;
            }
        }
    }
}

countLines(process.cwd());
console.log(`Total Files: ${fileCount}`);
console.log(`Total Lines of Code: ${totalLines}`);
