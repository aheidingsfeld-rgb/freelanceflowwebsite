const fs = require("fs");
const path = require("path");
const file = path.join("dist", "index.html");
let html = fs.readFileSync(file, "utf8");

const logo = '<a class="ff-brand-logo" href="/" aria-label="FreelanceFlow home"><span class="ff-brand-symbol" aria-hidden="true">F</span><span class="ff-brand-word">freelance<span>flow</span><i>.</i></span></a>';
const style = '<style id="freelanceflow-brand-logo">.ff-brand-logo{display:inline-flex!important;align-items:center!important;gap:8px!important;color:#fff!important;text-decoration:none!important;font:800 19px/1 system-ui,sans-serif!important;letter-spacing:-.7px!important;white-space:nowrap!important;position:relative!important;z-index:9999!important}.ff-brand-symbol{display:inline-flex;align-items:center;justify-content:center;width:27px;height:27px;border-radius:8px;background:#b7f51b;color:#101510;font-size:18px;font-weight:900;letter-spacing:-1px}.ff-brand-word>span,.ff-brand-word>i{color:#b7f51b;font-style:normal}.ff-brand-logo:hover{opacity:.88}@media(max-width:600px){.ff-brand-logo{font-size:17px!important;gap:7px!important}.ff-brand-symbol{width:24px;height:24px}}</style>';

if (!html.includes('class="ff-brand-logo"')) {
  const headerMatch = html.match(/<header\\b[^>]*>/i);
  const navMatch = html.match(/<nav\\b[^>]*>/i);
  const insertion = headerMatch || navMatch;
  if (insertion) {
    const pos = html.indexOf(insertion[0]) + insertion[0].length;
    html = html.slice(0, pos) + logo + html.slice(pos);
  } else {
    const bodyMatch = html.match(/<body\\b[^>]*>/i);
    if (!bodyMatch) throw new Error("Cannot locate header, navigation or body to insert FreelanceFlow logo");
    const pos = html.indexOf(bodyMatch[0]) + bodyMatch[0].length;
    html = html.slice(0, pos) + '<div class="ff-brand-fallback">' + logo + '</div>' + html.slice(pos);
    html = html.replace('</head>', '<style>.ff-brand-fallback{position:absolute;top:18px;left:24px;z-index:99999}</style>' + '</head>');
  }
  html = html.replace('</head>', style + '</head>');
}
if (!html.includes('class="ff-brand-logo"')) throw new Error("FreelanceFlow logo insertion failed");
fs.writeFileSync(file, html);
console.log("Verified: FreelanceFlow white/lime logo inserted into homepage.");
