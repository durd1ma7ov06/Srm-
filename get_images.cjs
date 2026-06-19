const fs = require('fs');
const data = fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/ebf62446-644c-4ab1-a6f9-066b3dd4c8b9/.system_generated/steps/125/content.md', 'utf8');
const matches = data.match(/\/assets\/images\/[^"\'\\]+\.(png|jpg|webp)/g);
console.log([...new Set(matches)]);
