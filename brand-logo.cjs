const fs = require("fs");
const path = require("path");
const file = path.join("dist", "index.html");
let html = fs.readFileSync(file, "utf8");
const logo = '<a class="ff-brand-logo" href="/" aria-label="FreelanceFlow home"><svg viewBox="0 0 36 36" aria-hidden="true"><path d="M5 17C7 8 13 3 24 3h7c-2 7-7 11-15 11H5Z" fill="#b7f51b"/><path d="M5 20h24c-2 7-7 10-15 10H5Z" fill="#b7f51b" opacity=".82"/></svg><span>freelance<span>flow</span><i>.</i></span></a>';
const style = '<style id="freelanceflow-brand-logo">.ff-brand-logo{display:inline-flex!important;align-items:center;gap:9px;color:#f7f8f5!important;text-decoration:none!important;font-weight:800!important;letter-spacing:-.055em;font-size:20px;line-height:1;white-space:nowrap}.ff-brand-logo svg{width:29px;height:29px;flex:none}.ff-brand-logo>span>span,.ff-brand-logo i{color:#b7f51b;font-style:normal}.ff-brand-logo:hover{opacity:.88}.ff-brand-logo:focus-visible{outline:2px solid #b7f51b;outline-offset:5px}@media(max-width:600px){.ff-brand-logo{font-size:18px;gap:7px}.ff-brand-logo svg{width:25px;height:25px}}</style>';
if (!html.includes('class="ff-brand-logo"')) {
  const navStart = html.indexOf("<nav");
  const navEnd = navStart < 0 ? -1 : html.indexOf("</nav>", navStart);
  if (navStart >= 0 && navEnd > navStart) {
    const nav = html.slice(navStart, navEnd);
    const match = nav.match(/<a\b[^>]*>[\s\S]*?(?:FreelanceFlow|freelanceflow)[\s\S]*?<\/a>/i);
    if (match) html = html.slice(0, navStart) + nav.replace(match[0], logo) + html.slice(navEnd);
    else html = html.slice(0, navEnd) + logo + html.slice(navEnd);
  }
  html = html.replace("</head>", style + "</head>");
}
fs.writeFileSync(file, html);
console.log("FreelanceFlow logo added to the homepage navigation.");
