const fs = require("fs");
const path = require("path");
const file = path.join("dist", "index.html");
let html = fs.readFileSync(file, "utf8");

const logo = '<a class="ff-brand-logo" href="/" aria-label="FreelanceFlow home"><span class="ff-brand-symbol" aria-hidden="true">F</span><span class="ff-brand-word">freelance<span>flow</span><i>.</i></span></a>';
const style = '<style id="freelanceflow-brand-logo">.ff-brand-logo{position:fixed!important;top:22px!important;left:clamp(18px,4vw,56px)!important;z-index:2147483000!important;display:inline-flex!important;align-items:center!important;gap:9px!important;padding:9px 13px 9px 9px!important;border-radius:12px!important;background:rgba(15,22,17,.94)!important;border:1px solid rgba(183,245,27,.22)!important;box-shadow:0 6px 24px rgba(0,0,0,.2)!important;color:#fff!important;text-decoration:none!important;font:800 19px/1 system-ui,sans-serif!important;letter-spacing:-.7px!important;white-space:nowrap!important}.ff-brand-symbol{display:inline-flex;align-items:center;justify-content:center;width:29px;height:29px;border-radius:8px;background:#b7f51b;color:#101510;font-size:19px;font-weight:900;letter-spacing:-1px}.ff-brand-word>span,.ff-brand-word>i{color:#b7f51b;font-style:normal}.ff-brand-logo:hover{transform:translateY(-1px);opacity:.92}@media(max-width:600px){.ff-brand-logo{top:12px!important;left:12px!important;font-size:17px!important;gap:7px!important;padding:7px 10px 7px 7px!important}.ff-brand-symbol{width:25px;height:25px}}</style>';

if (!html.includes('class="ff-brand-logo"')) {
  const insertionPoint = html.search(/<(?:main|header|nav|section)\\b/i);
  if (insertionPoint >= 0) html = html.slice(0, insertionPoint) + logo + html.slice(insertionPoint);
  else html = logo + html;
}
if (!html.includes('id="freelanceflow-brand-logo"')) {
  const headEnd = html.toLowerCase().indexOf("</head>");
  if (headEnd >= 0) html = html.slice(0, headEnd) + style + html.slice(headEnd);
  else html = style + html;
}
if (!html.includes('class="ff-brand-logo"') || !html.includes('id="freelanceflow-brand-logo"')) {
  throw new Error("FreelanceFlow logo insertion verification failed");
}
fs.writeFileSync(file, html);
console.log("Verified: FreelanceFlow logo added to the homepage.");
