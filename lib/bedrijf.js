// Alle gegevens zijn overgenomen van de live site op 01-09-2026
// (contactpagina, tarievenpagina en 'waarom trainen bij Sayan').
export const bedrijf = {
  naam: 'Fitstudio Sayan',
  claim: 'Buiten trainen in Oudehaske. Weer of geen weer.',
  straat: 'Badweg 4',
  postcode: '8465 NN',
  plaats: 'Oudehaske',
  telefoon: '+31 6 13003431',
  telefoonNet: '06 13 00 34 31',
  email: 'info@fitstudiosayan.nl',
  kvk: '71804196',
  btw: 'NL002378204B63',
  whatsapp: 'https://wa.me/31613003431',
  facebook: 'https://www.facebook.com/FitstudioSayan/',
  instagram: 'https://www.instagram.com/fitstudiosayan/',
};

// Bedragen komen uit de webshop in Virtuagym: dat is het systeem waar leden
// daadwerkelijk afrekenen. De losse tarievenpagina van de oude site noemde
// nog 35 en 45 euro; iemand die 35 leest en 46 betaalt, belt met een klacht.
export const tarieven = [
  {
    naam: 'Onbeperkt abonnement',
    prijs: '48',
    eenheid: 'per vier weken',
    voorWie: 'Voor wie twee keer per week of vaker traint',
    regels: [
      'Onbeperkt meetrainen, binnen en buiten',
      'Alle groepslessen, ook bootcamp en Anti-roest',
      'Begeleiding van Sayan, Dennis of Chris',
      'Groepen van maximaal acht personen',
      'Per vier weken opzegbaar, geen inschrijfgeld',
    ],
    uitgelicht: true,
  },
  {
    naam: '10x Workout Credits',
    prijs: '70',
    eenheid: '10 trainingen',
    voorWie: 'Voor wie ongeveer één keer per week komt',
    regels: [
      'Tien keer meetrainen, binnen én buiten',
      'Er gaat alleen een credit af als je er bent',
      'Geen abonnement en geen opzegtermijn',
      'Ideaal om rustig te beginnen',
    ],
    uitgelicht: false,
  },
  {
    naam: 'Personal training 1x per week',
    prijs: '195',
    eenheid: 'per maand',
    voorWie: 'Voor wie persoonlijke begeleiding wil én in de groep traint',
    regels: [
      'Elke week 45 minuten één op één',
      'Inclusief alle groepslessen',
      'Eigen schema, afgestemd op jouw doel',
      'Je mag iemand gratis meenemen',
    ],
    uitgelicht: false,
  },
  {
    naam: 'Personal training 2x per week',
    prijs: '390',
    eenheid: 'per maand',
    voorWie: 'Voor wie snel en gericht resultaat wil',
    regels: [
      'Twee keer per week 45 minuten één op één',
      'Inclusief alle groepslessen',
      'Eigen schema, afgestemd op jouw doel',
      'Je mag iemand gratis meenemen',
    ],
    uitgelicht: false,
  },
];

// Personal training gaat per pakket, los van de groepslessen.
export const personalTarieven = [
  { naam: 'PT45 1x per week', prijs: '195', eenheid: 'per maand, incl. groepslessen' },
  { naam: 'PT45 2x per week', prijs: '390', eenheid: 'per maand, incl. groepslessen' },
  { naam: 'PT45 3x per week', prijs: '555', eenheid: 'per maand' },
];

export const trainers = [
  {
    naam: 'Sayan Bervoets',
    rol: 'Eigenaar en personal trainer',
    tekst:
      'Na een paar jaar in een grote sportschool wilde ik iets anders: een kleinschalige studio waar ik iedereen ken en weet wat iemand nodig heeft. Inmiddels zijn we jaren en heel veel trainingen verder.',
    foto: '/foto/sayan-portret.webp',
  },
  {
    naam: 'Dennis Noor',
    rol: 'Personal trainer',
    tekst:
      'Begonnen met één avond groepstraining, inmiddels sta ik er bijna dagelijks. Naast de groepstrainingen kun je ook 1-op-1 met mij aan de slag.',
    foto: '/foto/dennis-portret.webp',
  },
  {
    naam: 'Chris Oord',
    rol: 'Personal trainer',
    tekst:
      'Chris is de derde trainer van Fitstudio Sayan. Je ziet hem bij de groepslessen en je kunt ook 1-op-1 met hem aan de slag.',
    foto: '/foto/chris-portret.webp',
  },
];

// Het volledige aanbod, zoals het verspreid over zijn oude site stond. De
// pagina /aanbod/ was daar leeg, terwijl dit precies is wat mensen zoeken.
export const diensten = [
  {
    naam: 'Groepstraining buiten',
    kort: 'Vier keer per week bootcamp en outdoor fitness, in een vaste groep.',
    punten: ['Weer of geen weer', 'Elk niveau door elkaar', 'Vaste tijden per week'],
    pad: '/buiten-fitness-friesland/',
    foto: '/foto/groep-plein.webp',
  },
  {
    naam: 'Indoor training',
    kort: 'Binnen trainen in groepen van maximaal acht, zodat er tijd is voor iedereen.',
    punten: ['Maximaal 8 deelnemers', 'Aangepast bij blessure of beperking', 'Doelen worden geevalueerd'],
    pad: '/indoor/',
    foto: '/foto/studio/studio-roeien.webp',
  },
  {
    naam: 'Personal training',
    kort: 'Sessies van 45 minuten, een op een, opgebouwd zonder je te overbelasten.',
    punten: ['1, 2 of 3 keer per week', 'Eigen schema', 'Je mag iemand gratis meenemen'],
    pad: '/personal-training/',
    foto: '/foto/squat-buiten.webp',
  },
  {
    naam: 'Duo en small group',
    kort: 'Samen met een maatje of in een klein groepje trainen, met dezelfde aandacht.',
    punten: ['Kosten delen', 'Zelfde begeleiding', 'Gezelliger volhouden'],
    pad: '/duo-training-heerenveen/',
    foto: '/foto/duo-buiten.webp',
  },
  {
    naam: 'Anti-roest voor senioren',
    kort: 'Soepel, sterk en in balans blijven. Eerste maand vergoed via de gemeente.',
    punten: ['Maandag, woensdag en vrijdag 9:30', 'Zonder prestatiedruk', 'Eerste maand gratis'],
    pad: '/personal-trainer-senioren-heerenveen/',
    foto: '/foto/studio/studio-senior-bal.webp',
  },
  {
    naam: 'Bedrijfsfitness',
    kort: 'Fitte werknemers functioneren beter. Wij komen naar het bedrijf toe.',
    punten: ['Op eigen terrein', 'Met de Sportwagen', 'Ook bij de brandweer'],
    pad: '/personal-trainer-bedrijfstraining/',
    foto: '/foto/wagen-brandweer.webp',
  },
  {
    naam: 'De Sportwagen',
    kort: 'Een mobiele sportschool: trainen in je eigen straat, tuin of op het veld.',
    punten: ['Alles aan boord', 'Overal in Friesland', 'Geen Ferrari, wel een gym'],
    pad: '/de-sportwagen-friesland/',
    foto: '/foto/wagen-water.webp',
  },
];

// Van de drukversie van zijn A5-flyer (Oudehaske in Beweging). Deze training
// staat nergens op de oude site, terwijl 'eerste maand vergoed' de sterkste
// reden is die hij heeft om binnen te lopen.
export const antiRoest = {
  titel: 'Anti-roest training',
  ondertitel: 'Blijf soepel, sterk en vol energie',
  tekst:
    'Merk je dat traplopen of wandelen moeizamer gaat? De Anti-roest training is er voor senioren in De Fryske Marren. We werken aan soepele gewrichten, sterkere spieren en betere balans — op jouw tempo, met persoonlijke aandacht.',
  punten: [
    'Laagdrempelig en gezellig',
    'Geschikt voor elk niveau',
    'Bewegen zonder prestatiedruk',
    'Samen in actie, samen vitaal blijven',
  ],
  wanneer: 'Maandag, woensdag en vrijdag om 9:30 uur',
  vergoeding:
    'Dankzij de samenwerking met GGD Fryslân, gemeente De Fryske Marren en Sociaal Werk De Kear is je eerste maand volledig vergoed.',
};
