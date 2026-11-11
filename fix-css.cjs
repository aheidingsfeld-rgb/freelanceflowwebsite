const fs = require("fs");
const path = require("path");
const root = path.resolve("dist");
let changed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".html")) continue;

    let html = fs.readFileSync(file, "utf8");
    const markerRe = /\/\*\s*Subtle motion system\s*\*\//g;
    const starts = [...html.matchAll(markerRe)];
    if (!starts.length) continue;

    const blocks = [];
    for (const match of starts) {
      const start = match.index;
      const mediaRe = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/ig;
      mediaRe.lastIndex = start;
      const media = mediaRe.exec(html);
      if (!media) throw new Error("Could not find reduced-motion closing rule in " + file);
      const close = html.indexOf("}}", media.index);
      if (close < 0) throw new Error("Could not find end of motion CSS in " + file);
      blocks.push({ start, end: close + 2, css: html.slice(start, close + 2) });
    }

    for (const block of blocks.slice().reverse()) {
      html = html.slice(0, block.start) + html.slice(block.end);
    }

    const head = html.match(/<head\b[^>]*>/i);
    if (!head) throw new Error("No <head> found in " + file);
    const styles = blocks.map(block => "<style>\n" + block.css + "\n</style>").join("\n");
    html = html.replace(head[0], head[0] + "\n" + styles);
    fs.writeFileSync(file, html);
    changed++;
  }
}

walk(root);
console.log("Moved the motion CSS into <head> on " + changed + " HTML pages.");
if (!changed) {
  const htmlFiles = [];
  (function scan(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) scan(f);
      else if (e.isFile() && e.name.toLowerCase().endsWith(".html")) htmlFiles.push(f);
    }
  })(root);
  throw new Error("Motion CSS marker not found in HTML files: " + htmlFiles.length);
}
