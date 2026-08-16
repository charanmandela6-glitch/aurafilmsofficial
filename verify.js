const fs = require('fs');

console.log("--- STARTING WORKSPACE DIAGNOSTIC AUDIT ---");

// 1. Check index.html for duplicate IDs and malformed HTML tags
const html = fs.readFileSync('index.html', 'utf8');
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const duplicates = idMatches.filter((item, index) => idMatches.indexOf(item) !== index);
if (duplicates.length > 0) {
    console.warn("WARNING: Duplicate IDs found in index.html:", [...new Set(duplicates)]);
} else {
    console.log("✓ No duplicate IDs found in HTML.");
}

// 2. Check script.js for referenced IDs missing in index.html
const js = fs.readFileSync('script.js', 'utf8');
const idRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const missing = [];
const checked = new Set();
while ((match = idRegex.exec(js)) !== null) {
    const id = match[1];
    if (checked.has(id)) continue;
    checked.add(id);
    if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
        // Some IDs might be created dynamically or are special
        missing.push(id);
    }
}
if (missing.length > 0) {
    console.warn("WARNING: Script references IDs that are not explicitly hardcoded in index.html:", missing);
} else {
    console.log("✓ All script-referenced IDs are found in index.html.");
}

// 3. Compile check for JS syntax errors
try {
    require('child_process').execSync('node -c script.js');
    console.log("✓ script.js syntax is fully valid.");
} catch (e) {
    console.error("CRITICAL: script.js syntax error!", e.message);
}

try {
    require('child_process').execSync('node -c server.js');
    console.log("✓ server.js syntax is fully valid.");
} catch (e) {
    console.error("CRITICAL: server.js syntax error!", e.message);
}

console.log("--- AUDIT COMPLETE ---");
