const fs = require('fs');
const path = process.argv[2] || 'node_modules/@tailwindcss/node/dist/index.mjs';
const text = fs.readFileSync(path, 'utf8');
let state = 'normal';
let line = 1, col = 0;
const hits = [];
for (let i = 0; i < text.length; i++) {
  const c = text[i];
  col++;
  if (c === '\n') { line++; col = 0; if (state === 'line_comment') state = 'normal'; continue; }
  if (state === 'normal') {
    if (c === '"' || c === "'" ) { state = c; continue; }
    if (c === '`') { state = 'template'; continue; }
    if (c === '/' && text[i+1] === '/') { state = 'line_comment'; i++; continue; }
    if (c === '/' && text[i+1] === '*') { state = 'block_comment'; i++; continue; }
    if (c === '#') {
      // capture token following #
      const m = text.slice(i+1).match(/^([A-Za-z_$][A-Za-z0-9_$-]*)/);
      const token = m ? m[1] : null;
      hits.push({line, col, token, context: text.slice(Math.max(0,i-40), Math.min(text.length, i+40))});
    }
  } else if (state === 'block_comment') {
    if (c === '*' && text[i+1] === '/') { state = 'normal'; i++; col++; }
  } else if (state === 'template') {
    if (c === '`') state = 'normal';
    else if (c === '\\') { i++; col++; }
    else if (c === '$' && text[i+1] === '{') { state = 'template_expr'; i++; col++; }
  } else if (state === 'template_expr') {
    if (c === '}') state = 'template';
    else if (c === '"' || c === "'" ) { state = c; }
    else if (c === '`') { state = 'template'; }
    else if (c === '/' && text[i+1] === '/') { state = 'line_comment'; i++; }
    else if (c === '/' && text[i+1] === '*') { state = 'block_comment'; i++; }
  } else if (state === '"' || state === "'") {
    if (c === '\\') { i++; col++; }
    else if (c === state) state = 'normal';
  }
}
console.log('Found', hits.length, 'hash tokens. Showing first 200:');
console.log(JSON.stringify(hits.slice(0,200), null, 2));
if (hits.length === 0) process.exit(0);
else process.exit(0);
