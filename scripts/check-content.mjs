import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';

const root = path.resolve('dist');
const base = process.env.TEST_BASE || '/';
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('TEST_BASE must start and end with /');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const pages = walk(root).filter(p => p.endsWith('.html'));
const expected = walk('src/content/docs').filter(p => /\.mdx?$/.test(p)).length;
const parsed = new Map(), problems = [];
let references = 0;
for (const file of pages) {
  const ids = new Set(), links = []; let h1 = 0;
  function visit(n) {
    const a = Object.fromEntries((n.attrs || []).map(a => [a.name, a.value]));
    if (n.tagName === 'h1') h1++;
    if (a.id) { if (ids.has(a.id)) problems.push(`${file}: duplicate id ${a.id}`); ids.add(a.id); }
    if (a.href) links.push(a.href); if (a.src) links.push(a.src);
    for (const c of n.childNodes || []) visit(c);
  }
  visit(parse(fs.readFileSync(file, 'utf8')));
  if (h1 !== 1) problems.push(`${file}: expected one h1, got ${h1}`);
  parsed.set(file, { ids, links });
}
if (pages.length !== expected) problems.push(`Source pages ${expected}, built HTML ${pages.length}`);
for (const [file, { links }] of parsed) {
  const route = base + path.relative(root, file).replace(/index\.html$/, '');
  for (const link of links) {
    if (/^(mailto:|tel:|data:|javascript:)/.test(link)) continue;
    const u = new URL(link, 'https://content.test' + route);
    if (u.origin !== 'https://content.test') continue;
    references++;
    if (!u.pathname.startsWith(base)) { problems.push(`${file}: outside site base ${link}`); continue; }
    let target = path.join(root, decodeURIComponent(u.pathname.slice(base.length)));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) problems.push(`${file}: missing ${link}`);
    else if (u.hash && parsed.has(target) && !parsed.get(target).ids.has(decodeURIComponent(u.hash.slice(1)))) problems.push(`${file}: missing anchor ${link}`);
  }
}
console.log(JSON.stringify({ pages: pages.length, references, problems }, null, 2));
if (problems.length) process.exitCode = 1;
