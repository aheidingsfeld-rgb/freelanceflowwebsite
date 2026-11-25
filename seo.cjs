const fs = require("fs");
const path = require("path");
const ROOT = path.resolve("dist");
const SITE = "https://freelanceflow.eu";
if (!fs.existsSync(ROOT)) throw new Error("dist directory not found");
const pages = {
  index: ["Website laten maken voor zelfstandigen in België | FreelanceFlow", "FreelanceFlow maakt professionele, snelle websites voor Belgische zelfstandigen en kleine ondernemingen. Ontdek webdesign op maat voor jouw zaak."],
  dakwerker: ["Website voor dakwerkers laten maken | FreelanceFlow", "Een professionele website voor dakwerkers met duidelijke diensten, realisaties en offerteaanvragen. Ontdek het websiteconcept van FreelanceFlow."],
  elektricien: ["Website voor elektriciens laten maken | FreelanceFlow", "Laat je elektrische diensten professioneel online zien. FreelanceFlow toont hoe een snelle website elektriciens helpt om vertrouwen en aanvragen op te bouwen."],
  loodgieter: ["Website voor loodgieters laten maken | FreelanceFlow", "Een duidelijke website voor loodgieters en installateurs, met diensten, werkgebied en contactmogelijkheden. Bekijk het concept van FreelanceFlow."],
  schilder: ["Website voor schilders laten maken | FreelanceFlow", "Toon je schilderwerken professioneel online met een overzichtelijke website. Ontdek het websiteconcept voor schilders van FreelanceFlow."],
  tandarts: ["Website voor tandartsen laten maken | FreelanceFlow", "Een professionele website voor tandartspraktijken met behandelingen, praktische informatie en contactmogelijkheden. Ontdek FreelanceFlow."],
  tuinman: ["Website voor tuinmannen laten maken | FreelanceFlow", "Presenteer je tuinonderhoud, tuinaanleg en realisaties met een professionele website. Bekijk het websiteconcept van FreelanceFlow."]
};
function walk(dir, out = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file, out);
    else if (item.isFile() && item.name.toLowerCase() === "index.html") out.push(file);
  }
  return out;
}
function esc(s) { return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
const urls = [];
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, path.dirname(file)).split(path.sep).join("/");
  const slug = rel === "." ? "index" : rel.split("/").pop().toLowerCase();
  const fallback = [slug.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase()) + " | FreelanceFlow", "Ontdek professionele websites op maat voor zelfstandigen en kleine ondernemingen in België. FreelanceFlow helpt je zaak online sterker presenteren."];
  const currentHtml = fs.readFileSync(file, "utf8");
  const isLocalePage = /^(fr|en)\//.test(rel);
  const localeTitle = currentHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const localeDescription = currentHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const info = isLocalePage && localeTitle ? [localeTitle[1], localeDescription ? localeDescription[1] : "FreelanceFlow website concept"] : (pages[slug] || fallback);
  const url = rel === "." ? SITE + "/" : SITE + "/" + rel + "/";
  const title = esc(info[0]), desc = esc(info[1]);
  const head = /<head\b[^>]*>/i.exec(fs.readFileSync(file, "utf8"));
  if (!head) { console.warn("Skipped HTML without head:", file); continue; }
  let html = fs.readFileSync(file, "utf8");
  const tags = [
    "<title>" + title + "</title>",
    '<meta name="description" content="' + desc + '">',
    '<link rel="canonical" href="' + url + '">',
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="FreelanceFlow">',
    '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + desc + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:locale" content="nl_BE">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + title + '">',
    '<meta name="twitter:description" content="' + desc + '">',
    '<script type="application/ld+json">' + JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"FreelanceFlow","url":SITE+"/","description":"Webdesign en professionele websites voor zelfstandigen en kleine ondernemingen in België."}) + "</script>"
  ].join("\n");
  html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, "");
  html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*>/i, "");
  html = html.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/i, "");
  html = html.replace(/<meta\b[^>]*name=["']robots["'][^>]*>/i, "");
  html = html.replace(head[0], head[0] + "\n" + tags);
  fs.writeFileSync(file, html);
  urls.push(url);
}
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => "  <url><loc>" + u + "</loc></url>").join("\n") + "\n</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(ROOT, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: " + SITE + "/sitemap.xml\n");
console.log("SEO metadata added to " + urls.length + " pages; sitemap.xml and robots.txt generated.");
