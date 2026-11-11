const fs = require("fs");
const path = require("path");

const root = path.resolve("dist");
const pattern = /\/\* Subtle motion system \*\/[\s\S]*?@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{\s*html\s*\{\s*scroll-behavior\s*:\s*auto\s*!important\s*\}\s*\*\s*,\s*\*::before\s*,\s*\*::after\s*\{\s*animation\s*:\s*none\s*!important\s*;\s*transition\s*:\s*none\s*!important\s*;\s*\}\s*\}/g;

let changed = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      let html = fs.readFileSync(file, "utf8");
      const matches = [...html.matchAll(pattern)];
      if (!matches.length) continue;
      const styles = matches.map(match => match[0]);
      html = html.replace(pattern, "");
      const head = html.match(/<head\b[^>]*>/i);
      if (!head) throw new Error("No <head> found in " + file);
      const styleTags = styles.map(css => "<style>\n" + css + "\n</style>").join("\n");
      html = html.replace(head[0], head[0] + "\n" + styleTags);
      fs.writeFileSync(file, html);
      changed++;
    }
  }
}
walk(root);
if (!changed) throw new Error("The stray motion CSS block was not found; refusing to publish an unverified change.");
console.log("Moved the motion CSS into <head> on " + changed + " HTML pages.");
