const fs = require("fs");
const path = require("path");
const file = path.join("dist", "index.html");
let html = fs.readFileSync(file, "utf8");

// Remove the extra fixed logo on the far left. Keep the site's original
// navigation wordmark ("freelanceflow.") untouched.
html = html.replace(/<a class="ff-brand-logo"[^>]*>[\s\S]*?<\/a>/i, "");
html = html.replace(/<style id="freelanceflow-brand-logo">[\s\S]*?<\/style>/i, "");

fs.writeFileSync(file, html);
console.log("Removed the extra left-side logo; kept the original navigation branding.");
