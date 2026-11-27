const fs=require("fs"),vm=require("vm");
const file="dist/index.html";
let h=fs.readFileSync(file,"utf8");
const a=h.indexOf("const translations="),b=h.indexOf(";\n",a);
if(a<0||b<0)throw new Error("Homepage translations not found");
const c={};vm.runInNewContext(h.slice(a,b+1).replace("const translations=","globalThis.translations="),c);
const t=c.translations;
Object.assign(t.nl,{heroEyebrow:"Webdesign dat klanten oplevert · België",heroTitle:"Wij bouwen websites die jouw bedrijf<br><em>nieuwe klanten opleveren.</em>",heroText:"Een website laten maken in België? FreelanceFlow bouwt voor tandartspraktijken, loodgieters, elektriciens en andere zelfstandigen snelle, professionele websites die je diensten helder tonen, vertrouwen opbouwen en bezoekers omzetten in aanvragen.",heroCta:"Vraag een gratis websiteconcept aan ↗",heroWork:"Bekijk onze realisaties",proof2:"Op maat voor jouw sector",proof3:"Mobielvriendelijk ontwerp",workTitle:"Ontdek wat we<br>voor jouw zaak kunnen bouwen.",workIntro:"Bekijk zes uitgewerkte concepten voor verschillende sectoren. Elk ontwerp toont hoe een professionele website jouw diensten en bedrijf sterker kan presenteren.",freeTypeLabel:"Welk soort website zoek je?",freeType1:"Bedrijfswebsite",freeType2:"Website met afspraken of reservaties",freeType3:"Webshop",freeType4:"Ik weet het nog niet",formSuccess:"Bedankt! Je aanvraag is verzonden. We nemen zo snel mogelijk contact met je op."});
Object.assign(t.fr,{heroEyebrow:"Création de sites web qui attirent des clients · Belgique",heroTitle:"Nous créons des sites web qui<br><em>attirent de nouveaux clients.</em>",heroText:"Vous souhaitez créer un site web en Belgique ? FreelanceFlow conçoit pour les cabinets dentaires, plombiers, électriciens et indépendants des sites rapides et professionnels qui présentent clairement vos services, inspirent confiance et génèrent des demandes.",heroCta:"Demandez votre concept de site gratuit ↗",heroWork:"Voir nos réalisations",proof2:"Adapté à votre secteur",proof3:"Design adapté au mobile",workTitle:"Découvrez ce que nous<br>pouvons créer pour votre activité.",workIntro:"Découvrez six concepts détaillés pour différents secteurs. Chaque design montre comment un site professionnel peut mieux présenter vos services et votre entreprise.",freeTypeLabel:"Quel type de site recherchez-vous ?",freeType1:"Site vitrine professionnel",freeType2:"Site avec rendez-vous ou réservations",freeType3:"Boutique en ligne",freeType4:"Je ne sais pas encore",formSuccess:"Merci ! Votre demande a bien été envoyée. Nous vous contacterons dès que possible."});
Object.assign(t.en,{heroEyebrow:"Web design that brings in customers · Belgium",heroTitle:"We build websites that help<br><em>your business win new clients.</em>",heroText:"Looking to have a website built in Belgium? FreelanceFlow creates fast, professional websites for dental practices, plumbers, electricians and independent businesses, helping them showcase services, build trust and generate enquiries.",heroCta:"Request a free website concept ↗",heroWork:"Explore our work",proof2:"Designed for your industry",proof3:"Mobile-friendly design",workTitle:"See what we can<br>build for your business.",workIntro:"Explore six detailed concepts for different industries. Each design shows how a professional website can present your services and business more effectively.",freeTypeLabel:"What type of website do you need?",freeType1:"Business website",freeType2:"Website with appointments or bookings",freeType3:"Online shop",freeType4:"I am not sure yet",formSuccess:"Thank you! Your request has been sent. We will get back to you as soon as possible."});
const visualCopy = {"nl":{"visualNav":"DIENSTEN　 OVER ONS　 CONTACT","visualKicker":"JOUW PARTNER IN DE REGIO","visualHeadline":"Een sterke eerste indruk.","visualDescription":"Een website die vertrouwen opbouwt en klanten activeert.","visualAction":"Plan een gesprek ↗","visualFeature1":"HELDER VERHAAL","visualFeature2":"OP MAAT GEMAAKT","visualFeature3":"MEER AANVRAGEN","visualPhoneHeadline":"Goed werk begint met vertrouwen.","visualPhoneButton":"CONTACT","visualCaption":"ÉÉN ONTWERP, ELK SCHERM"},"fr":{"visualNav":"SERVICES　 À PROPOS　 CONTACT","visualKicker":"VOTRE PARTENAIRE LOCAL","visualHeadline":"Une première impression réussie.","visualDescription":"Un site qui inspire confiance et attire de nouveaux clients.","visualAction":"Planifier un échange ↗","visualFeature1":"MESSAGE CLAIR","visualFeature2":"SUR MESURE","visualFeature3":"PLUS DE DEMANDES","visualPhoneHeadline":"Le travail bien fait inspire confiance.","visualPhoneButton":"CONTACT","visualCaption":"UN DESIGN, TOUS LES ÉCRANS"},"en":{"visualNav":"SERVICES　 ABOUT　 CONTACT","visualKicker":"YOUR LOCAL PARTNER","visualHeadline":"A strong first impression.","visualDescription":"A website that builds trust and turns visitors into customers.","visualAction":"Book a call ↗","visualFeature1":"CLEAR MESSAGE","visualFeature2":"MADE FOR YOU","visualFeature3":"MORE ENQUIRIES","visualPhoneHeadline":"Great work starts with trust.","visualPhoneButton":"CONTACT","visualCaption":"ONE DESIGN, EVERY SCREEN"}};
for (const lang of Object.keys(visualCopy)) Object.assign(t[lang], visualCopy[lang]);
h=h.slice(0,a)+"const translations="+JSON.stringify(t)+h.slice(b+1);
h=h.replace('<div class="hero-actions"><a class="btn" href="#contact"','<div class="hero-actions"><a class="btn" href="#gratis-concept"');
const visual='<div class="hero-visual" aria-label="Websitevoorbeeld op laptop en smartphone"><div class="visual-laptop"><div class="visual-screen"><div class="visual-browser"><i></i><i></i><i></i><b>jouwbedrijf.be</b></div><div class="visual-site"><div class="visual-site-nav"><strong>STUDIO<span>.</span></strong><small data-i="visualNav">DIENSTEN　 OVER ONS　 CONTACT</small></div><div class="visual-site-body"><small data-i="visualKicker">JOUW PARTNER IN DE REGIO</small><b data-i="visualHeadline">Een sterke eerste indruk.</b><p data-i="visualDescription">Een website die vertrouwen opbouwt en klanten activeert.</p><em data-i="visualAction">Plan een gesprek ↗</em></div><div class="visual-site-footer"><span data-i="visualFeature1">HELDER VERHAAL</span>　 ·　 <span data-i="visualFeature2">OP MAAT GEMAAKT</span>　 ·　 <span data-i="visualFeature3">MEER AANVRAGEN</span></div></div></div><div class="visual-laptop-base"></div></div><div class="visual-phone"><strong>STUDIO<span>.</span></strong><div></div><b data-i="visualPhoneHeadline">Goed werk begint met vertrouwen.</b><i></i><i></i><em data-i="visualPhoneButton">CONTACT</em></div><small class="visual-caption">● <span data-i="visualCaption">ÉÉN ONTWERP, ELK SCHERM</span></small></div>';
if(!h.includes('<div class="hero-note">'))throw new Error("Hero note missing");
h=h.replace('<div class="hero-note">',visual+'<div class="hero-note">');
const old='</select><label for="freeWebsite"';
const field='</select><label for="freeType" data-i="freeTypeLabel">Welk soort website zoek je?</label><select id="freeType" name="Gewenst type website"><option value="Bedrijfswebsite" data-i="freeType1">Bedrijfswebsite</option><option value="Website met afspraken" data-i="freeType2">Website met afspraken of reservaties</option><option value="Webshop" data-i="freeType3">Webshop</option><option value="Nog niet zeker" data-i="freeType4">Ik weet het nog niet</option></select><label for="freeWebsite"';
if(!h.includes(old))throw new Error("Sector field missing");
h=h.replace(old,field);
h=h.replaceAll('<input type="hidden" name="_template" value="table">','<input type="hidden" name="_template" value="table"><input type="hidden" name="_next" value="https://freelanceflow-agency-aheidingsfeld-8767.vercel.app/?verzonden=1#contact">');
h=h.replace("<main>","<main><div class=\"form-success\" id=\"formSuccess\" role=\"status\" hidden data-i=\"formSuccess\">Bedankt! Je aanvraag is verzonden. We nemen zo snel mogelijk contact met je op.</div>");
h=h.replace("</body>","<script>if(new URLSearchParams(location.search).get('verzonden')==='1'){const n=document.getElementById('formSuccess');if(n){n.hidden=false;n.scrollIntoView({behavior:'smooth',block:'center'});}}</script></body>");
const css=[
'<style id="freelanceflow-polish">',
'.hero{position:relative;min-height:680px;padding:112px 0 82px}',
'.hero>.eyebrow,.hero>h1,.hero>p,.hero>.hero-actions{position:relative;z-index:2;max-width:56%}',
'.hero h1{font-size:clamp(3rem,5.2vw,5.2rem);line-height:1.02;letter-spacing:-.065em;max-width:710px}',
'.hero p{max-width:535px;line-height:1.8}',
'.hero-note{position:relative;z-index:2;width:55%;gap:20px;margin-top:48px}',
'.hero-visual{position:absolute;z-index:1;right:-1%;top:115px;width:47%;height:440px;perspective:1100px}',
'.visual-laptop{position:absolute;top:42px;left:2%;width:94%;transform:rotateY(-8deg) rotateX(3deg);filter:drop-shadow(0 22px 28px #0008)}',
'.visual-screen{padding:9px;border:1px solid #65736b;border-radius:14px 14px 6px 6px;background:#18211c}',
'.visual-browser{height:22px;display:flex;align-items:center;gap:5px;color:#87948a;font-size:8px}.visual-browser i{width:6px;height:6px;border-radius:50%;background:#8a988d}.visual-browser b{margin-left:10px;font-weight:500}',
'.visual-site{background:#f4f5ee;color:#1b2922;min-height:255px;overflow:hidden}.visual-site-nav{height:38px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dce2d9}.visual-site-nav strong{font-size:13px;letter-spacing:.08em}.visual-site-nav strong span,.visual-phone span{color:#789c4b}.visual-site-nav small{font-size:7px;color:#59675d}',
'.visual-site-body{padding:27px 28px;max-width:330px}.visual-site-body small{display:block;color:#718f4d;font-size:7px;letter-spacing:.15em;font-weight:800;margin-bottom:11px}.visual-site-body b{display:block;font-size:clamp(22px,2.3vw,32px);line-height:1.05;letter-spacing:-.05em}.visual-site-body p{font-size:9px;line-height:1.5;color:#657168;margin:10px 0}.visual-site-body em{display:inline-block;padding:8px 11px;background:#2d4034;color:#fff;font-size:8px;font-style:normal;border-radius:4px}.visual-site-footer{padding:12px 18px;background:#e7ebe1;color:#677366;font-size:6px;letter-spacing:.08em}',
'.visual-laptop-base{height:12px;margin:0 -4%;background:linear-gradient(#aab3ad,#65716a 55%,#313b35);border-radius:2px 2px 13px 13px;clip-path:polygon(3% 0,97% 0,100% 70%,91% 100%,9% 100%,0 70%)}',
'.visual-phone{position:absolute;right:0;bottom:20px;width:108px;height:210px;padding:19px 9px 10px;border:3px solid #89958b;border-radius:22px;background:#f5f6ef;color:#1c2922;box-shadow:0 20px 32px #0009;transform:rotate(5deg);z-index:3}.visual-phone>strong{font-size:8px;letter-spacing:.08em}.visual-phone>div{height:62px;margin:10px 0;background:linear-gradient(135deg,#cad8b8 0 35%,#718b61 35% 60%,#d9e1ce 60%);border-radius:5px}.visual-phone>b{display:block;font-size:11px;line-height:1.15}.visual-phone>i{display:block;width:75%;height:4px;margin-top:7px;background:#d7ddd3;border-radius:4px}.visual-phone>em{display:block;margin-top:10px;padding:6px;text-align:center;background:#2e4034;color:white;font-size:6px;font-style:normal}',
'.visual-caption{position:absolute;right:12px;bottom:0;color:#a9d85b;font-size:7px;letter-spacing:.13em;font-weight:700}',
'.portfolio-preview{overflow:hidden}.portfolio-photo{transition:transform .65s cubic-bezier(.2,.75,.25,1),filter .45s}.portfolio-item:hover .portfolio-photo{transform:scale(1.07);filter:saturate(1.08)}',
'.portfolio-link:focus-visible,.btn:focus-visible{outline:2px solid #a9d85b;outline-offset:4px}.navlinks a:not(.btn){transition:color .2s ease}.navlinks a:not(.btn):hover{color:var(--accent)}',
'.form-success{margin:18px auto;padding:18px 22px;max-width:1180px;border:1px solid #789d4d;border-radius:12px;background:#1b281d;color:#e8f0e3;font-weight:650}.form-success[hidden]{display:none}',
'.free-form select{width:100%;min-height:48px;padding:12px 14px;border:1px solid var(--line);border-radius:8px;background:#111a16;color:var(--text);font:inherit}',
'@media(max-width:980px){.hero{min-height:0;padding:82px 0 62px}.hero>.eyebrow,.hero>h1,.hero>p,.hero>.hero-actions{max-width:100%}.hero h1{font-size:clamp(3rem,8vw,5rem)}.hero-visual{position:relative;top:auto;right:auto;width:min(100%,650px);height:390px;margin:35px auto 0}.hero-note{width:100%;margin-top:28px}}',
'@media(max-width:560px){.hero{padding-top:65px}.hero h1{font-size:clamp(2.7rem,11.5vw,3.8rem)}.hero-visual{height:280px;margin-top:24px}.visual-laptop{top:30px;width:94%;left:0}.visual-screen{padding:6px}.visual-site{min-height:175px}.visual-site-nav{height:28px;padding:0 10px}.visual-site-nav strong{font-size:9px}.visual-site-nav small{font-size:5px}.visual-site-body{padding:18px 15px}.visual-site-body b{font-size:20px}.visual-site-body p{font-size:7px;margin:6px 0}.visual-site-body em{font-size:6px;padding:5px 7px}.visual-site-footer{padding:8px 10px;font-size:4px}.visual-phone{width:76px;height:150px;right:0;bottom:12px;padding:14px 6px 7px;border-radius:16px}.visual-phone>div{height:40px;margin:7px 0}.visual-phone>b{font-size:8px}.visual-phone>i{height:3px;margin-top:5px}.visual-phone>em{font-size:5px;margin-top:7px;padding:4px}.visual-caption{font-size:5px;right:2px}.hero-note{gap:12px;font-size:.78rem}}',
'@media(prefers-reduced-motion:reduce){.visual-laptop,.visual-phone{transform:none!important}.portfolio-photo,.portfolio-item{transition:none!important}}',
'</style>'
].join('\n');
h=h.replace("</head>",css+"</head>");

// Apply pricing updates directly to the homepage HTML. These labels and amounts
// are unique to the homepage pricing cards, so this avoids brittle card markup matching.
h = h.replace(/STARTER/g, "BASIC").replace(/BUSINESS/g, "PROFESSIONAL");
h = h.replace(/€\s*299/g, "€39").replace(/€\s*499/g, "€199").replace(/€\s*799/g, "€299");
h = h.replace(/Basis SEO/g, "SEO inbegrepen");
h = h.replace(/SEO-basis &amp; optimalisatie/g, "SEO inbegrepen");
h = h.replace(/<ul\b([^>]*)>([\s\S]*?)<\/ul>/g, (whole, attrs, items) => {
  if (items.includes("Klaar in minder dan 24 uur")) return whole;
  return '<ul' + attrs + '>' + items + '<li>Klaar in minder dan 24 uur</li></ul>';
});



// Keep the industry dropdown translated when visitors switch the site language.
const industryLanguageScript = `<script id="industry-dropdown-translations">
(function(){
  const copy = {
    nl: { label:"In welke sector ben je actief?", options:["Tandarts","Bouw / vakman","Installateur / elektricien","Andere zelfstandige","Andere"] },
    fr: { label:"Dans quel secteur travaillez-vous ?", options:["Dentiste","Construction / artisan","Installateur / électricien","Autre indépendant","Autre"] },
    en: { label:"Which industry are you in?", options:["Dentist","Construction / tradesperson","Installer / electrician","Other self-employed professional","Other"] }
  };
  function updateIndustryOptions(){
    const lang = (document.documentElement.lang || "nl").slice(0,2);
    const chosen = copy[lang] || copy.nl;
    document.querySelectorAll("select").forEach(select => {
      const options = Array.from(select.options);
      const isIndustry = options.some(option => /^(Tandarts|Dentist|Dentiste)$/.test(option.textContent.trim()));
      if (!isIndustry) return;
      const label = select.labels && select.labels[0] || select.previousElementSibling;
      if (label) label.textContent = chosen.label;
      options.forEach((option,index) => {
        if (chosen.options[index]) option.textContent = chosen.options[index];
      });
    });
  }
  document.addEventListener("DOMContentLoaded", updateIndustryOptions);
  document.addEventListener("click", () => setTimeout(updateIndustryOptions, 0));
  new MutationObserver(updateIndustryOptions).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  updateIndustryOptions();
})();
</script>`;
if (!h.includes('id="industry-dropdown-translations"')) h = h.replace("</body>", industryLanguageScript + "</body>");

// Translate the remaining Dutch form placeholders when the visitor selects French or English.
const formPlaceholderTranslations = `<script id="form-placeholder-translations">
(function(){
  const translations = {
    nl: {
      "Voornaam en naam":"Voornaam en naam",
      "Naam van je zaak":"Naam van je zaak",
      "Bijvoorbeeld: meer afspraken, offerteaanvragen of informatie over mijn diensten.":"Bijvoorbeeld: meer afspraken, offerteaanvragen of informatie over mijn diensten."
    },
    fr: {
      "Voornaam en naam":"Prénom et nom",
      "Naam van je zaak":"Nom de votre entreprise",
      "Bijvoorbeeld: meer afspraken, offerteaanvragen of informatie over mijn diensten.":"Par exemple : obtenir plus de rendez-vous, recevoir des demandes de devis ou informer les clients sur mes services."
    },
    en: {
      "Voornaam en naam":"First and last name",
      "Naam van je zaak":"Business name",
      "Bijvoorbeeld: meer afspraken, offerteaanvragen of informatie over mijn diensten.":"For example: more appointments, quote requests or information about my services."
    }
  };
  const original = new WeakMap();
  function update(){
    const lang=(document.documentElement.lang||"nl").slice(0,2);
    const dict=translations[lang]||translations.nl;
    document.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(el=>{
      if(!original.has(el)) original.set(el,el.getAttribute("placeholder"));
      const value=original.get(el);
      if(dict[value]) el.setAttribute("placeholder",dict[value]);
    });
  }
  document.addEventListener("DOMContentLoaded",update);
  new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  document.addEventListener("click",()=>setTimeout(update,0));
  update();
})();
</script>`;
if (!h.includes('id="form-placeholder-translations"')) h = h.replace("</body>", formPlaceholderTranslations + "</body>");


const deliveryTimeTranslations = `<script id="delivery-time-translations">
(function(){
  const copy = {
    nl: "Klaar in minder dan 24 uur",
    fr: "Prêt en moins de 24 heures",
    en: "Ready in less than 24 hours"
  };
  function updateDeliveryTime(){
    const lang = (document.documentElement.lang || "nl").slice(0,2);
    const value = copy[lang] || copy.nl;
    document.querySelectorAll("li").forEach(item => {
      const current = item.textContent.trim();
      if (Object.values(copy).includes(current)) item.textContent = value;
    });
  }
  document.addEventListener("DOMContentLoaded", updateDeliveryTime);
  new MutationObserver(updateDeliveryTime).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  document.addEventListener("click", () => setTimeout(updateDeliveryTime, 0));
  updateDeliveryTime();
})();
</script>`;
if (!h.includes('id="delivery-time-translations"')) h = h.replace("</body>", deliveryTimeTranslations + "</body>");


// Replace every contact form with a robust Web3Forms integration.
// The hidden access_key also supports a normal HTML form POST if JavaScript fails.
const web3formsIntegration = `<script id="freelanceflow-web3forms">
(function(){
  const ACCESS_KEY = "fb7fd23f-be30-46a5-81c7-f39c04368766";
  const messages = {
    nl: "Bedankt! Je aanvraag is verzonden. We nemen zo snel mogelijk contact met je op.",
    fr: "Merci ! Votre demande a bien été envoyée. Nous vous contacterons dès que possible.",
    en: "Thank you! Your request has been sent. We will get back to you soon."
  };
  function prepareForms(){
    document.querySelectorAll("form").forEach(function(form){
      form.action = "https://api.web3forms.com/submit";
      form.method = "POST";
      let key = form.querySelector('input[name="access_key"]');
      if(!key){ key=document.createElement("input"); key.type="hidden"; key.name="access_key"; form.appendChild(key); }
      key.value = ACCESS_KEY;
      if(form.dataset.web3formsReady) return;
      form.dataset.web3formsReady = "1";
      form.addEventListener("submit", async function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        const submit = form.querySelector('button[type="submit"],input[type="submit"],button:not([type])');
        const oldText = submit ? (submit.tagName === "INPUT" ? submit.value : submit.textContent) : "";
        if(submit){ submit.disabled=true; if(submit.tagName==="INPUT") submit.value="Verzenden..."; else submit.textContent="Verzenden..."; }
        try{
          const data = new FormData(form);
          data.set("access_key", ACCESS_KEY);
          data.set("subject", "Nieuwe aanvraag via FreelanceFlow");
          data.set("from_name", "FreelanceFlow website");
          data.delete("_next"); data.delete("_template"); data.delete("_captcha");
          const response = await fetch("https://api.web3forms.com/submit", {method:"POST", body:data});
          const result = await response.json();
          if(!response.ok || !result.success) throw new Error(result.message || "Web3Forms submission failed");
          let notice = document.getElementById("web3formsSuccess");
          if(!notice){
            notice=document.createElement("p"); notice.id="web3formsSuccess";
            notice.setAttribute("role","status");
            notice.style.cssText="margin:16px 0;padding:16px;border:1px solid #789d4d;border-radius:10px;color:#e8f0e3;background:#1b281d";
            form.parentNode.insertBefore(notice,form);
          }
          const lang=(document.documentElement.lang||"nl").slice(0,2);
          notice.textContent=messages[lang]||messages.nl;
          notice.scrollIntoView({behavior:"smooth",block:"center"});
          form.reset();
          const restored=form.querySelector('input[name="access_key"]'); if(restored) restored.value=ACCESS_KEY;
        }catch(error){
          console.error("FreelanceFlow form error:",error);
          let notice=document.getElementById("web3formsError");
          if(!notice){notice=document.createElement("p");notice.id="web3formsError";notice.setAttribute("role","alert");form.parentNode.insertBefore(notice,form);}
          notice.textContent="Verzenden is niet gelukt. Probeer opnieuw of neem rechtstreeks contact op.";
        }finally{
          if(submit){submit.disabled=false;if(submit.tagName==="INPUT")submit.value=oldText;else submit.textContent=oldText;}
        }
      }, true);
    });
  }
  prepareForms();
  new MutationObserver(prepareForms).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>`;
if (!h.includes('id="freelanceflow-web3forms"')) h = h.replace("</body>", web3formsIntegration + "</body>");

const languageBridge = "<script id=\"freelanceflow-language-bridge\">\n(function(){\n const supported=[\"nl\",\"fr\",\"en\"], slugs=[\"dakwerker\",\"elektricien\",\"loodgieter\",\"schilder\",\"tandarts\",\"tuinman\"];\n function readLanguage(){\n  const q=new URLSearchParams(location.search).get(\"lang\");\n  if(supported.includes(q))return q;\n  try{const saved=localStorage.getItem(\"ff-lang\");if(supported.includes(saved))return saved}catch(e){}\n  const current=(document.documentElement.lang||\"\").slice(0,2).toLowerCase();\n  return supported.includes(current)?current:\"nl\";\n }\n function localizePortfolioLinks(lang){\n  document.querySelectorAll(\"a[href]\").forEach(function(link){\n   try{\n    const u=new URL(link.href,location.href);\n    if(u.origin!==location.origin)return;\n    const match=u.pathname.match(/^\\/(dakwerker|elektricien|loodgieter|schilder|tandarts|tuinman)\\/?$/);\n    if(!match)return;\n    const slug=match[1];\n    u.pathname=lang===\"nl\"?\"/\"+slug+\"/\":\"/\"+lang+\"/\"+slug+\"/\";\n    u.search=\"\";\n    link.href=u.pathname+u.hash;\n   }catch(e){}\n  });\n }\n function saveLanguage(lang){\n  if(!supported.includes(lang))return;\n  document.documentElement.lang=lang;\n  try{localStorage.setItem(\"ff-lang\",lang)}catch(e){}\n  localizePortfolioLinks(lang);\n }\n document.addEventListener(\"click\",function(event){\n  const control=event.target.closest(\"[data-lang],[data-language]\");\n  if(!control)return;\n  const lang=(control.getAttribute(\"data-lang\")||control.getAttribute(\"data-language\")||\"\").slice(0,2).toLowerCase();\n  if(supported.includes(lang))setTimeout(function(){saveLanguage(lang)},0);\n },true);\n new MutationObserver(function(){const lang=readLanguage();if(document.documentElement.lang!==lang){saveLanguage(lang)}else{localizePortfolioLinks(lang)}}).observe(document.documentElement,{attributes:true,attributeFilter:[\"lang\"]});\n document.addEventListener(\"DOMContentLoaded\",function(){saveLanguage(readLanguage())});\n window.addEventListener(\"pageshow\",function(){saveLanguage(readLanguage())});\n saveLanguage(readLanguage());\n})();\n</script>";
if (!h.includes('id="freelanceflow-language-bridge"')) h = h.replace("</body>", languageBridge + "</body>");
// Remove the stale redirect-based success notice. A message must only appear after a confirmed form response.
h = h.replace(/<div class="form-success" id="formSuccess"[\s\S]*?<\/div>/i, "");
h = h.replace(/<script>if\(new URLSearchParams\(location\.search\)\.get\('verzonden'\)==='1'\)[\s\S]*?<\/script>/i, "");
h = h.replace(/<input type="hidden" name="_next" value="[^"]*">/g, "");
// Load portfolio images reliably: request all six immediately rather than leaving
// off-screen cards dependent on native lazy-load thresholds. Decode asynchronously
// so image decoding does not block text and layout. Avoid sending the site referrer
// to third-party image hosts that may reject hotlinked assets.
let imageIndex = 0;
h = h.replace(/<img\b[^>]*>/gi, tag => {
  imageIndex++;
  tag = tag.replace(/\sloading=(["']).*?\1/ig, '').replace(/\sfetchpriority=(["']).*?\1/ig, '');
  tag = tag.replace(/\sreferrerpolicy=(["']).*?\1/ig, '');
  if (!/\bdecoding\s*=/.test(tag)) tag = tag.replace(/<img\b/i, '<img decoding="async"');
  tag = tag.replace(/<img\b/i, '<img loading="eager"');
  tag = tag.replace(/<img\b/i, '<img fetchpriority="' + (imageIndex === 1 ? 'high' : 'auto') + '"');
  tag = tag.replace(/<img\b/i, '<img referrerpolicy="no-referrer"');
  return tag;
});
const imagePerfCss = '<style id="freelanceflow-image-performance">img{max-width:100%;height:auto}picture{display:block}img[loading="eager"]{content-visibility:visible}</style>';
if (!h.includes('id="freelanceflow-image-performance"')) h = h.replace("</head>", imagePerfCss + "</head>");
// Use the new official FreelanceFlow contact address in visible text and mailto links.
h = h.replaceAll("heidings.consulting@gmail.com", "info@freelanceflow.eu");
fs.writeFileSync(file,h);

console.log("FreelanceFlow homepage, portfolio, multilingual copy and lead form updated.");


// Affordable website chatbot offer, translated across Dutch, French and English.
const chatbotSection = `
<section id="chatbot-services" class="section chatbot-section" aria-labelledby="chatbot-title">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow" data-chatbot="eyebrow">EXTRA DIENST</span>
      <h2 id="chatbot-title" data-chatbot="title">Een slimme chatbot op je website.</h2>
      <p data-chatbot="intro">Help bezoekers snel antwoorden vinden, ook wanneer je zelf even niet beschikbaar bent.</p>
    </div>
    <div class="chatbot-grid">
      <article class="chatbot-card">
        <span class="chatbot-tag" data-chatbot="basicTag">EENVOUDIG</span>
        <h3 data-chatbot="basicTitle">FAQ-chatbot</h3>
        <p class="chatbot-price">€19 <small data-chatbot="once">eenmalig</small></p>
        <p data-chatbot="basicText">Beantwoordt veelgestelde vragen over je diensten, openingsuren en contactgegevens.</p>
        <ul><li data-chatbot="basic1">Vaste antwoorden op veelgestelde vragen</li><li data-chatbot="basic2">In jouw huisstijl</li><li data-chatbot="basic3">Geschikt voor mobiel</li></ul>
      </article>
      <article class="chatbot-card chatbot-card-featured">
        <span class="chatbot-tag" data-chatbot="popular">POPULAIR</span>
        <h3 data-chatbot="aiTitle">AI-chatbot</h3>
        <p class="chatbot-price">€39 <small data-chatbot="once">eenmalig</small></p>
        <p data-chatbot="aiText">Een AI-chatbot die vragen beantwoordt op basis van de informatie over jouw bedrijf.</p>
        <ul><li data-chatbot="ai1">Antwoorden op basis van jouw bedrijfsinfo</li><li data-chatbot="ai2">Nederlands, Frans en Engels</li><li data-chatbot="ai3">Aangepast aan je website</li></ul>
      </article>
      <article class="chatbot-card">
        <span class="chatbot-tag" data-chatbot="extraTag">MEER AANVRAGEN</span>
        <h3 data-chatbot="leadTitle">Chatbot met leads</h3>
        <p class="chatbot-price">€59 <small data-chatbot="once">eenmalig</small></p>
        <p data-chatbot="leadText">Laat bezoekers hun gegevens en vraag achter via de chatbot.</p>
        <ul><li data-chatbot="lead1">Alles van de AI-chatbot</li><li data-chatbot="lead2">Naam, e-mail en bericht verzamelen</li><li data-chatbot="lead3">Gericht op nieuwe aanvragen</li></ul>
      </article>
    </div>
    <p class="chatbot-note" data-chatbot="note">Prijzen zijn eenmalige installatiekosten. Eventuele externe AI-gebruikskosten of extra koppelingen worden vooraf besproken.</p>
    <a class="btn chatbot-cta" href="#contact" data-chatbot="cta">Vraag je chatbot aan ↗</a>
  </div>
</section>
<style id="chatbot-services-style">
.chatbot-section{padding:90px 0;background:var(--surface,rgba(255,255,255,.025))}
.chatbot-section .container{max-width:1180px;margin:0 auto;padding:0 24px}
.chatbot-section .section-heading{max-width:680px;margin:0 0 34px}
.chatbot-section .section-heading h2{max-width:620px}
.chatbot-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.chatbot-card{padding:26px;border:1px solid var(--line,rgba(255,255,255,.15));border-radius:16px;background:rgba(255,255,255,.025)}
.chatbot-card-featured{border-color:#86a95c;box-shadow:0 0 0 1px #86a95c inset}
.chatbot-tag{display:inline-block;font-size:10px;letter-spacing:.13em;font-weight:750;color:#9cbe70}
.chatbot-card h3{margin:18px 0 8px;font-size:22px}
.chatbot-price{font-size:38px;font-weight:750;letter-spacing:-.05em;margin:8px 0}
.chatbot-price small{font-size:12px;font-weight:450;letter-spacing:0;color:var(--muted,#999)}
.chatbot-card>p:not(.chatbot-price){min-height:64px;line-height:1.65;color:var(--muted,#aaa)}
.chatbot-card ul{padding-left:19px;line-height:1.9}
.chatbot-note{max-width:800px;margin:22px 0;color:var(--muted,#aaa);font-size:13px;line-height:1.6}
.chatbot-cta{display:inline-flex;margin-top:8px}
@media(max-width:800px){.chatbot-grid{grid-template-columns:1fr}.chatbot-card>p:not(.chatbot-price){min-height:0}.chatbot-section{padding:64px 0}}
</style>`;
const chatbotTranslations = {
nl:{eyebrow:"EXTRA DIENST",title:"Een slimme chatbot op je website.",intro:"Help bezoekers snel antwoorden vinden, ook wanneer je zelf even niet beschikbaar bent.",basicTag:"EENVOUDIG",basicTitle:"FAQ-chatbot",once:"eenmalig",basicText:"Beantwoordt veelgestelde vragen over je diensten, openingsuren en contactgegevens.",basic1:"Vaste antwoorden op veelgestelde vragen",basic2:"In jouw huisstijl",basic3:"Geschikt voor mobiel",popular:"POPULAIR",aiTitle:"AI-chatbot",aiText:"Een AI-chatbot die vragen beantwoordt op basis van de informatie over jouw bedrijf.",ai1:"Antwoorden op basis van jouw bedrijfsinfo",ai2:"Nederlands, Frans en Engels",ai3:"Aangepast aan je website",extraTag:"MEER AANVRAGEN",leadTitle:"Chatbot met leads",leadText:"Laat bezoekers hun gegevens en vraag achter via de chatbot.",lead1:"Alles van de AI-chatbot",lead2:"Naam, e-mail en bericht verzamelen",lead3:"Gericht op nieuwe aanvragen",note:"Prijzen zijn eenmalige installatiekosten. Eventuele externe AI-gebruikskosten of extra koppelingen worden vooraf besproken.",cta:"Vraag je chatbot aan ↗"},
fr:{eyebrow:"SERVICE COMPLÉMENTAIRE",title:"Un chatbot intelligent sur votre site.",intro:"Aidez vos visiteurs à trouver rapidement des réponses, même lorsque vous êtes indisponible.",basicTag:"ESSENTIEL",basicTitle:"Chatbot FAQ",once:"paiement unique",basicText:"Répond aux questions fréquentes sur vos services, horaires et coordonnées.",basic1:"Réponses prédéfinies aux questions fréquentes",basic2:"Adapté à votre identité visuelle",basic3:"Compatible avec les mobiles",popular:"POPULAIRE",aiTitle:"Chatbot IA",aiText:"Un chatbot IA qui répond à partir des informations de votre entreprise.",ai1:"Réponses basées sur les informations de votre entreprise",ai2:"Néerlandais, français et anglais",ai3:"Adapté à votre site web",extraTag:"PLUS DE DEMANDES",leadTitle:"Chatbot avec contacts",leadText:"Permettez aux visiteurs de laisser leurs coordonnées et leur demande.",lead1:"Tout ce qui est inclus dans le chatbot IA",lead2:"Collecte du nom, de l’e-mail et du message",lead3:"Conçu pour générer des demandes",note:"Les prix correspondent à l’installation, en paiement unique. Les éventuels frais d’utilisation d’une IA externe ou intégrations supplémentaires sont discutés à l’avance.",cta:"Demander un chatbot ↗"},
en:{eyebrow:"EXTRA SERVICE",title:"Add a smart chatbot to your website.",intro:"Help visitors find answers quickly, even when you are not available.",basicTag:"ESSENTIAL",basicTitle:"FAQ chatbot",once:"one-time",basicText:"Answers common questions about your services, opening hours and contact details.",basic1:"Predefined answers to common questions",basic2:"Styled to match your brand",basic3:"Mobile-friendly",popular:"POPULAR",aiTitle:"AI chatbot",aiText:"An AI chatbot that answers questions using information about your business.",ai1:"Answers based on your business information",ai2:"Dutch, French and English",ai3:"Customized for your website",extraTag:"MORE ENQUIRIES",leadTitle:"Lead capture chatbot",leadText:"Let visitors leave their contact details and request through the chatbot.",lead1:"Everything in the AI chatbot",lead2:"Collects name, email and message",lead3:"Designed to generate enquiries",note:"Prices are one-time setup fees. Any external AI usage charges or extra integrations will be discussed in advance.",cta:"Request a chatbot ↗"}
};
function updateChatbotLanguage(){
 const lang=(document.documentElement.lang||"nl").slice(0,2);
 const dict=chatbotTranslations[lang]||chatbotTranslations.nl;
 document.querySelectorAll("[data-chatbot]").forEach(el=>{
  const key=el.getAttribute("data-chatbot");
  if(dict[key]) el.textContent=dict[key];
 });
}
if(!h.includes('id="chatbot-services"')){
 // Place the chatbot offer directly after the core services section and before the free-concept section.
 const anchor = /<section\b[^>]*>(?:(?!<\/section>)[\s\S])*?GRATIS &amp; VRIJBLIJVEND/;
 const match = h.match(anchor);
 if(!match) throw new Error("Could not find the free website concept section for chatbot placement");
 h = h.slice(0, match.index) + chatbotSection + h.slice(match.index);
}
const chatbotLanguageScript = `<script id="chatbot-services-translations">
const chatbotTranslations = ${JSON.stringify(chatbotTranslations)};
${updateChatbotLanguage.toString()}
document.addEventListener("DOMContentLoaded",updateChatbotLanguage);
new MutationObserver(updateChatbotLanguage).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
updateChatbotLanguage();
</script>`;
if(!h.includes('id="chatbot-services-translations"')) h=h.replace("</body>",chatbotLanguageScript+"</body>");

// Final write includes the chatbot section and language translations.
fs.writeFileSync(file,h);
