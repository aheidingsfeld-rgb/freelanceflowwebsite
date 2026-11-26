const fs = require("fs");
const path = require("path");

const ROOT = path.resolve("dist");
const SITE = "https://freelanceflow.eu";
if (!fs.existsSync(ROOT)) throw new Error("dist directory not found");

const industries = {
  dakwerker: {
    nl: ["Websitevoorbeeld voor dakwerkers | FreelanceFlow", "Bekijk een professioneel websiteconcept voor dakwerkers. Toon dakrenovatie, herstellingen, isolatie en realisaties en ontvang meer offerteaanvragen."],
    fr: ["Exemple de site web pour couvreur | FreelanceFlow", "Découvrez un concept de site web pour couvreur en Belgique. Présentez vos travaux de toiture, rénovations, réparations et demandes de devis."],
    en: ["Roofing website example | FreelanceFlow", "Explore a professional roofing website concept. Showcase roof repairs, renovations, insulation and completed projects to generate quote enquiries."]
  },
  elektricien: {
    nl: ["Websitevoorbeeld voor elektriciens | FreelanceFlow", "Ontdek een websiteconcept voor elektriciens. Presenteer elektrische installaties, verlichting, keuringen en laadpalen met een professionele website."],
    fr: ["Exemple de site web pour électricien | FreelanceFlow", "Découvrez un concept de site web pour électricien en Belgique. Présentez vos installations, éclairages, contrôles et bornes de recharge."],
    en: ["Electrician website example | FreelanceFlow", "Explore an electrician website concept. Present electrical installations, lighting, inspections and EV charging services in a clear, professional way."]
  },
  loodgieter: {
    nl: ["Websitevoorbeeld voor loodgieters | FreelanceFlow", "Bekijk een websiteconcept voor loodgieters en installateurs. Breng sanitair, verwarming, herstellingen en jouw werkgebied duidelijk in beeld."],
    fr: ["Exemple de site web pour plombier | FreelanceFlow", "Découvrez un concept de site web pour plombier en Belgique. Présentez vos dépannages, installations sanitaires, chauffage et rénovations."],
    en: ["Plumber website example | FreelanceFlow", "Explore a plumber website concept. Showcase plumbing repairs, bathroom installations, heating services and the areas you cover."]
  },
  schilder: {
    nl: ["Websitevoorbeeld voor schilders | FreelanceFlow", "Bekijk een websiteconcept voor schilders. Presenteer binnen- en buitenschilderwerk, afwerking en realisaties op een overzichtelijke website."],
    fr: ["Exemple de site web pour peintre | FreelanceFlow", "Découvrez un concept de site web pour peintre en bâtiment. Présentez vos travaux intérieurs, extérieurs et vos finitions."],
    en: ["Painter website example | FreelanceFlow", "Explore a painter website concept. Showcase interior and exterior painting, decorative finishes and completed projects."]
  },
  tandarts: {
    nl: ["Websitevoorbeeld voor tandartsen | FreelanceFlow", "Ontdek een professioneel websiteconcept voor tandartspraktijken. Presenteer behandelingen, praktische informatie en afspraken op een heldere manier."],
    fr: ["Exemple de site web pour dentiste | FreelanceFlow", "Découvrez un concept de site web pour cabinet dentaire. Présentez les soins, les informations pratiques et les demandes de rendez-vous."],
    en: ["Dental practice website example | FreelanceFlow", "Explore a dental practice website concept. Present treatments, patient information and appointment requests in a clear, welcoming way."]
  },
  tuinman: {
    nl: ["Websitevoorbeeld voor tuinmannen | FreelanceFlow", "Bekijk een websiteconcept voor tuinmannen en tuinarchitecten. Toon tuinonderhoud, snoeiwerk, tuinaanleg en eerdere realisaties."],
    fr: ["Exemple de site web pour jardinier | FreelanceFlow", "Découvrez un concept de site web pour jardinier et paysagiste. Présentez l’entretien, la taille, l’aménagement et vos réalisations."],
    en: ["Gardening website example | FreelanceFlow", "Explore a gardening and landscaping website concept. Showcase garden maintenance, pruning, landscaping and completed projects."]
  }
};

const home = {
  nl: ["Website laten maken in België | FreelanceFlow", "FreelanceFlow bouwt professionele websites voor zelfstandigen en kleine bedrijven in België. Ontdek webdesign op maat, SEO en gratis websiteconcepten."]
};

const localeInfo = {
  nl: { html: "nl-BE", og: "nl_BE" },
  fr: { html: "fr-BE", og: "fr_BE" },
  en: { html: "en", og: "en_GB" }
};

function walk(dir, out = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file, out);
    else if (item.isFile() && item.name.toLowerCase() === "index.html") out.push(file);
  }
  return out;
}
function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function localePath(lang, slug) {
  if (slug === "index") return "/";
  return lang === "nl" ? "/" + slug + "/" : "/" + lang + "/" + slug + "/";
}
function alternates(slug) {
  if (slug === "index") return [{ lang: "x-default", url: SITE + "/" }];
  if (!industries[slug]) return [];
  return [
    { lang: "nl-BE", url: SITE + localePath("nl", slug) },
    { lang: "fr-BE", url: SITE + localePath("fr", slug) },
    { lang: "en", url: SITE + localePath("en", slug) },
    { lang: "x-default", url: SITE + localePath("nl", slug) }
  ];
}

const urls = [];
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, path.dirname(file)).split(path.sep).join("/");
  const parts = rel === "" || rel === "." ? [] : rel.split("/");
  const lang = ["fr", "en"].includes(parts[0]) ? parts[0] : "nl";
  const slug = parts.length === 0 ? "index" : (["fr", "en"].includes(parts[0]) ? parts[1] : parts[0]);
  const url = SITE + localePath(lang, slug);
  let html = fs.readFileSync(file, "utf8");
  const existingTitle = html.match(/<title\\b[^>]*>([\\s\\S]*?)<\\/title>/i);
  const existingDescription = html.match(/<meta\\b[^>]*name=["\x27]description["\x27][^>]*content=["\x27]([^"\x27]*)["\x27][^>]*>/i);
  const fallbackTitle = existingTitle ? existingTitle[1].replace(/<[^>]+>/g, "").trim() : (slug.replace(/[-_]/g, " ") + " | FreelanceFlow");
  const fallbackDescription = existingDescription ? existingDescription[1] : "Ontdek professionele websites en webdesign op maat voor zelfstandigen en kleine ondernemingen. FreelanceFlow helpt bedrijven online sterker zichtbaar te worden.";
  const info = slug === "index" ? home.nl : ((industries[slug] && industries[slug][lang]) || [fallbackTitle, fallbackDescription]);
  const head = /<head\b[^>]*>/i.exec(html);
  if (!head) throw new Error("No <head> found in " + file);

  const title = esc(info[0]);
  const description = esc(info[1]);
  const locale = localeInfo[lang];
  const alternateTags = alternates(slug).map(item =>
    '<link rel="alternate" hreflang="' + item.lang + '" href="' + item.url + '">'
  ).join("\n");
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE + "/#organization",
    "name": "FreelanceFlow",
    "url": SITE + "/",
    "description": "Webdesign en professionele websites voor zelfstandigen en kleine ondernemingen in België.",
    "areaServed": { "@type": "Country", "name": "Belgium" },
    "knowsLanguage": ["Dutch", "French", "English"]
  };
  const pageSchema = slug === "index" ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE + "/#website",
    "name": "FreelanceFlow",
    "url": SITE + "/",
    "inLanguage": "nl-BE",
    "publisher": { "@id": SITE + "/#organization" }
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    "url": url,
    "name": info[0],
    "description": info[1],
    "inLanguage": locale.html,
    "isPartOf": { "@id": SITE + "/#website" },
    "publisher": { "@id": SITE + "/#organization" }
  };

  const tags = [
    "<title>" + title + "</title>",
    '<meta name="description" content="' + description + '">',
    '<meta name="robots" content="index,follow,max-image-preview:large">',
    '<meta name="googlebot" content="index,follow">',
    '<meta name="author" content="FreelanceFlow">',
    '<meta name="theme-color" content="#17251d">',
    '<link rel="canonical" href="' + url + '">',
    alternateTags,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="FreelanceFlow">',
    '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:locale" content="' + locale.og + '">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="' + title + '">',
    '<meta name="twitter:description" content="' + description + '">',
    '<script type="application/ld+json">' + JSON.stringify(organization) + '</script>',
    '<script type="application/ld+json">' + JSON.stringify(pageSchema) + '</script>'
  ].join("\n");

  html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/ig, "");
  html = html.replace(/<meta\b[^>]*name=["'](?:description|robots|googlebot|author|theme-color)["'][^>]*>/ig, "");
  html = html.replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*>/ig, "");
  html = html.replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*>/ig, "");
  html = html.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/ig, "");
  html = html.replace(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>/ig, "");
  html = html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/ig, "");
  html = html.replace(head[0], head[0] + "\n" + tags);
  html = html.replace(/<html\b(?![^>]*\blang=)/i, '<html lang="' + locale.html + '"');
  html = html.replace(/<html\b([^>]*\blang=["'])[^"']+(["'][^>]*)>/i, '<html$1' + locale.html + '$2>');
  fs.writeFileSync(file, html);
  urls.push({ url, slug, lang });
}

const sitemapEntries = urls.map(entry => {
  const alternatesForPage = alternates(entry.slug).filter(item => item.lang !== "x-default")
    .map(item => '    <xhtml:link rel="alternate" hreflang="' + item.lang + '" href="' + item.url + '"/>').join("\n");
  return "  <url>\n    <loc>" + entry.url + "</loc>\n" + alternatesForPage + "\n  </url>";
});
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  sitemapEntries.join("\n") + "\n</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(ROOT, "robots.txt"),
  "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "/sitemap.xml\n");
console.log("SEO metadata, canonical URLs, language alternates, structured data and sitemap generated for " + urls.length + " pages.");
