const fs = require('fs');
const path = require('path');
const vm = require('vm');

const file = path.resolve('dist/index.html');
let html = fs.readFileSync(file, 'utf8');

const start = html.indexOf('const translations=');
const end = html.indexOf(';\n', start);
if (start < 0 || end < 0) throw new Error('Could not locate homepage translations');
const source = html.slice(start, end + 1).replace('const translations=', 'globalThis.translations=');
const context = {};
vm.runInNewContext(source, context);
const t = context.translations;

const copy = {
  nl: {
    heroEyebrow: 'Webdesign dat klanten oplevert Â· BelgiÃ«',
    heroTitle: 'Wij bouwen websites die jouw bedrijf<br><em>nieuwe klanten opleveren.</em>',
    heroText: 'Van tandartspraktijk tot loodgieter, elektricien of andere zelfstandige: wij ontwerpen snelle, professionele websites die je diensten helder tonen, vertrouwen opbouwen en bezoekers omzetten in aanvragen.',
    heroCta: 'Vraag een gratis websiteconcept aan â†—',
    heroWork: 'Bekijk onze realisaties',
    proof1: 'Persoonlijke aanpak',
    proof2: 'Op maat voor jouw sector',
    proof3: 'Mobielvriendelijk ontwerp',
    workEyebrow: 'Conceptportfolio',
    workTitle: 'Ontdek wat we<br>voor jouw zaak kunnen bouwen.',
    workIntro: 'Bekijk zes uitgewerkte concepten voor verschillende sectoren. Elk ontwerp toont hoe een professionele website jouw diensten en bedrijf sterker kan presenteren.',
    freeTypeLabel: 'Welk soort website zoek je?',
    freeType1: 'Be¶»§q«^