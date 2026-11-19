const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const coffeeDir = path.join(publicDir, 'images', 'coffees');

fs.mkdirSync(coffeeDir, { recursive: true });

function createCupSvg({ title, liquidColor, cremaColor, detailSvg = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <radialGradient id="saucerShad" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#E6E5E5" />
      <stop offset="100%" stop-color="#D7D5D5" />
    </radialGradient>
    <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F3F2F2" />
    </linearGradient>
    <filter id="drop" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Saucer shadow & plate -->
  <ellipse cx="60" cy="62" rx="54" ry="46" fill="#000000" opacity="0.08" />
  <ellipse cx="60" cy="60" rx="52" ry="44" fill="url(#saucerShad)" />
  <ellipse cx="60" cy="60" rx="42" ry="34" fill="#FFFFFF" />
  <ellipse cx="60" cy="60" rx="36" ry="28" fill="#F3F2F2" />

  <!-- Cup outer rim -->
  <ellipse cx="60" cy="58" rx="34" ry="26" fill="url(#cupGrad)" stroke="#E6E5E5" stroke-width="1.5" filter="url(#drop)" />

  <!-- Coffee liquid -->
  <ellipse cx="60" cy="58" rx="30" ry="22" fill="${liquidColor}" />

  <!-- Crema / Foam -->
  <ellipse cx="60" cy="58" rx="27" ry="19" fill="${cremaColor}" opacity="0.9" />

  <!-- Detail layer (latte art, ice cubes, chocolate, cinnamon, etc.) -->
  ${detailSvg}

  <!-- Cup reflection shine -->
  <path d="M 36 54 A 26 18 0 0 1 54 40" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5" />
</svg>`;
}

const coffees = [
  {
    name: 'expresso',
    liquidColor: '#361E15',
    cremaColor: '#8C4D26',
    detailSvg: `
      <ellipse cx="58" cy="57" rx="14" ry="9" fill="#B56938" opacity="0.6" />
      <ellipse cx="55" cy="55" rx="8" ry="5" fill="#D98A52" opacity="0.4" />
    `
  },
  {
    name: 'americano',
    liquidColor: '#2B170E',
    cremaColor: '#5C311E',
    detailSvg: `
      <ellipse cx="60" cy="58" rx="18" ry="12" fill="#7A452B" opacity="0.3" />
    `
  },
  {
    name: 'expresso-cremoso',
    liquidColor: '#3B1F13',
    cremaColor: '#D89E6B',
    detailSvg: `
      <ellipse cx="60" cy="58" rx="22" ry="15" fill="#E6BA92" opacity="0.8" />
      <circle cx="54" cy="55" r="3" fill="#FFF" opacity="0.5" />
      <circle cx="66" cy="59" r="2" fill="#FFF" opacity="0.5" />
      <circle cx="61" cy="52" r="2" fill="#FFF" opacity="0.6" />
    `
  },
  {
    name: 'cafe-gelado',
    liquidColor: '#2C160B',
    cremaColor: '#4A2818',
    detailSvg: `
      <!-- Ice cubes -->
      <rect x="48" y="50" width="10" height="9" rx="1.5" fill="#FFFFFF" opacity="0.75" transform="rotate(12 53 54)" />
      <rect x="62" y="52" width="9" height="8" rx="1.5" fill="#FFFFFF" opacity="0.7" transform="rotate(-15 66 56)" />
      <rect x="54" y="60" width="8" height="7" rx="1.5" fill="#FFFFFF" opacity="0.6" transform="rotate(25 58 63)" />
    `
  },
  {
    name: 'cafe-com-leite',
    liquidColor: '#6B4226',
    cremaColor: '#B88B67',
    detailSvg: `
      <ellipse cx="60" cy="58" rx="24" ry="16" fill="#D6B498" opacity="0.7" />
      <ellipse cx="60" cy="58" rx="14" ry="9" fill="#EAD5C3" opacity="0.9" />
    `
  },
  {
    name: 'latte',
    liquidColor: '#7A4D2E',
    cremaColor: '#E6D3C2',
    detailSvg: `
      <!-- Latte art leaf -->
      <path d="M 60 70 Q 56 62 60 48 Q 64 62 60 70 Z" fill="#9C6644" opacity="0.7" />
      <path d="M 60 66 Q 52 60 50 56 Q 55 56 60 62" fill="#9C6644" opacity="0.7" />
      <path d="M 60 66 Q 68 60 70 56 Q 65 56 60 62" fill="#9C6644" opacity="0.7" />
      <circle cx="60" cy="47" r="3" fill="#9C6644" opacity="0.7" />
    `
  },
  {
    name: 'capuccino',
    liquidColor: '#4E2C1A',
    cremaColor: '#F5EBE1',
    detailSvg: `
      <!-- Cinnamon dots -->
      <circle cx="56" cy="54" r="1.5" fill="#8B4513" />
      <circle cx="63" cy="53" r="1.2" fill="#8B4513" />
      <circle cx="59" cy="61" r="1.4" fill="#8B4513" />
      <circle cx="66" cy="62" r="1.2" fill="#8B4513" />
      <circle cx="52" cy="59" r="1.3" fill="#8B4513" />
      <circle cx="62" cy="57" r="1.8" fill="#8B4513" />
      <circle cx="54" cy="52" r="1" fill="#8B4513" />
    `
  },
  {
    name: 'macchiato',
    liquidColor: '#361C10',
    cremaColor: '#5C331E',
    detailSvg: `
      <!-- White foam drop in center -->
      <ellipse cx="60" cy="58" rx="10" ry="8" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="60" cy="58" rx="6" ry="4" fill="#F0E6DF" />
    `
  },
  {
    name: 'mochaccino',
    liquidColor: '#2B1408',
    cremaColor: '#EADCCE',
    detailSvg: `
      <!-- Chocolate drizzle zig-zag -->
      <path d="M 46 56 Q 53 50 60 56 T 74 56" stroke="#4A1C0A" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 49 61 Q 56 55 63 61 T 71 61" stroke="#4A1C0A" stroke-width="2" fill="none" stroke-linecap="round" />
    `
  },
  {
    name: 'chocolate-quente',
    liquidColor: '#241006',
    cremaColor: '#4A2311',
    detailSvg: `
      <ellipse cx="60" cy="58" rx="22" ry="15" fill="#3D1A0B" />
      <!-- Whipped cream swirls -->
      <ellipse cx="60" cy="57" rx="14" ry="10" fill="#FFFFFF" opacity="0.95" />
      <ellipse cx="58" cy="55" rx="9" ry="6" fill="#F7EFE9" />
      <circle cx="62" cy="55" r="1.5" fill="#3D1A0B" />
      <circle cx="57" cy="58" r="1.2" fill="#3D1A0B" />
    `
  },
  {
    name: 'cubano',
    liquidColor: '#1F1109',
    cremaColor: '#542E18',
    detailSvg: `
      <!-- Mint leaf -->
      <path d="M 60 55 C 54 48 64 44 68 47 C 70 53 66 58 60 55 Z" fill="#2E7D32" />
      <line x1="61" y1="54" x2="67" y2="48" stroke="#1B5E20" stroke-width="0.8" />
      <circle cx="53" cy="62" r="3" fill="#DBAC2C" opacity="0.6" />
    `
  },
  {
    name: 'havaiano',
    liquidColor: '#4A2713',
    cremaColor: '#D9B89A',
    detailSvg: `
      <!-- Coconut flakes -->
      <ellipse cx="60" cy="58" rx="18" ry="12" fill="#FFFDF8" opacity="0.8" />
      <line x1="52" y1="54" x2="57" y2="52" stroke="#D7C4B7" stroke-width="1.8" stroke-linecap="round" />
      <line x1="63" y1="55" x2="68" y2="56" stroke="#D7C4B7" stroke-width="1.8" stroke-linecap="round" />
      <line x1="56" y1="62" x2="61" y2="61" stroke="#D7C4B7" stroke-width="1.8" stroke-linecap="round" />
    `
  },
  {
    name: 'arabe',
    liquidColor: '#1A0C05',
    cremaColor: '#4A2510',
    detailSvg: `
      <!-- Cardamom & spice specks -->
      <circle cx="57" cy="53" r="1.5" fill="#C47F17" />
      <circle cx="64" cy="55" r="1.5" fill="#8047F8" opacity="0.7" />
      <circle cx="54" cy="61" r="1.2" fill="#C47F17" />
      <circle cx="62" cy="63" r="1.4" fill="#C47F17" />
      <ellipse cx="60" cy="58" rx="8" ry="5" fill="#331A0D" opacity="0.8" />
    `
  },
  {
    name: 'irlandes',
    liquidColor: '#261208',
    cremaColor: '#F5ECE3',
    detailSvg: `
      <!-- Whiskey swirl golden ring -->
      <ellipse cx="60" cy="58" rx="20" ry="14" fill="none" stroke="#DBAC2C" stroke-width="2" opacity="0.8" />
      <ellipse cx="60" cy="58" rx="13" ry="9" fill="#FFFFFF" opacity="0.95" />
      <path d="M 58 55 Q 60 52 62 55 Q 64 58 60 58 Z" fill="#E6D0BA" />
    `
  }
];

// Generate each coffee SVG
coffees.forEach(c => {
  const svg = createCupSvg(c);
  fs.writeFileSync(path.join(coffeeDir, `${c.name}.svg`), svg, 'utf-8');
});
console.log(`Generated ${coffees.length} coffee SVGs in public/images/coffees/`);

// Generate Hero Coffee SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 380" width="480" height="380" fill="none">
  <defs>
    <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F1E9C9" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#DBAC2C" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FAFAFA" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cupBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E6E5E5" />
      <stop offset="40%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#D7D5D5" />
    </linearGradient>
    <linearGradient id="cupSleeve" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#272221" />
      <stop offset="50%" stop-color="#403937" />
      <stop offset="100%" stop-color="#272221" />
    </linearGradient>
    <filter id="heroShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#272221" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- Background Warm Aura -->
  <circle cx="250" cy="190" r="160" fill="url(#heroGlow)" />

  <!-- Coffee Beans Scattered -->
  <!-- Bean 1 -->
  <g transform="translate(140, 260) rotate(-25)">
    <ellipse cx="14" cy="10" rx="14" ry="10" fill="#403937" />
    <path d="M 4 10 Q 14 6 24 10" stroke="#DBAC2C" stroke-width="2" fill="none" />
  </g>
  <!-- Bean 2 -->
  <g transform="translate(180, 290) rotate(15)">
    <ellipse cx="12" cy="8" rx="12" ry="8" fill="#C47F17" />
    <path d="M 3 8 Q 12 5 21 8" stroke="#F1E9C9" stroke-width="1.8" fill="none" />
  </g>
  <!-- Bean 3 -->
  <g transform="translate(320, 270) rotate(40)">
    <ellipse cx="15" cy="11" rx="15" ry="11" fill="#403937" />
    <path d="M 5 11 Q 15 8 25 11" stroke="#DBAC2C" stroke-width="2.2" fill="none" />
  </g>
  <!-- Bean 4 -->
  <g transform="translate(350, 240) rotate(-35)">
    <ellipse cx="11" cy="7" rx="11" ry="7" fill="#8047F8" opacity="0.8" />
    <path d="M 3 7 Q 11 4 19 7" stroke="#EBE5F9" stroke-width="1.5" fill="none" />
  </g>

  <!-- Cup Group (slanted slightly) -->
  <g transform="rotate(7 240 190)" filter="url(#heroShadow)">
    <!-- Cup Base & Body -->
    <path d="M 195 90 L 285 90 L 265 260 L 215 260 Z" fill="url(#cupBody)" />

    <!-- Cup Lid -->
    <rect x="188" y="74" width="104" height="18" rx="6" fill="#272221" />
    <rect x="202" y="66" width="76" height="10" rx="3" fill="#403937" />
    <rect x="232" y="62" width="16" height="6" rx="2" fill="#272221" />

    <!-- Black Sleeve with Logo -->
    <path d="M 200 135 L 280 135 L 273 215 L 207 215 Z" fill="url(#cupSleeve)" />

    <!-- Brand icon & text on sleeve -->
    <circle cx="240" cy="168" r="14" fill="#C47F17" />
    <text x="240" y="173" font-family="'Baloo 2', cursive" font-weight="bold" font-size="12" fill="#FFFFFF" text-anchor="middle">CD</text>
    <text x="240" y="196" font-family="'Roboto', sans-serif" font-size="8" font-weight="bold" fill="#F1E9C9" letter-spacing="1.5" text-anchor="middle">COFFEE</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'hero-coffee.svg'), heroSvg, 'utf-8');
console.log('Generated hero-coffee.svg');

// Generate Success Delivery Illustration SVG matching Figma
const successSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" width="500" height="320" fill="none">
  <!-- Ground / Road Shadow -->
  <ellipse cx="250" cy="275" rx="200" ry="12" fill="#E6E5E5" opacity="0.6" />

  <!-- Speed lines -->
  <line x1="40" y1="230" x2="100" y2="230" stroke="#DBAC2C" stroke-width="3" stroke-linecap="round" opacity="0.8" />
  <line x1="20" y1="245" x2="120" y2="245" stroke="#8047F8" stroke-width="3" stroke-linecap="round" opacity="0.6" />
  <line x1="50" y1="260" x2="90" y2="260" stroke="#C47F17" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />

  <!-- Green decorative bush on left -->
  <circle cx="110" cy="255" r="16" fill="#88B04B" />
  <circle cx="125" cy="250" r="20" fill="#6A9A36" />
  <circle cx="140" cy="258" r="14" fill="#4D7C26" />

  <!-- Scooter rear wheel -->
  <circle cx="200" cy="245" r="28" fill="#272221" />
  <circle cx="200" cy="245" r="15" fill="#E6E5E5" />
  <circle cx="200" cy="245" r="6" fill="#272221" />

  <!-- Scooter front wheel -->
  <circle cx="340" cy="245" r="28" fill="#272221" />
  <circle cx="340" cy="245" r="15" fill="#E6E5E5" />
  <circle cx="340" cy="245" r="6" fill="#272221" />

  <!-- Scooter Chassis / Body (Purple) -->
  <path d="M 195 240 L 240 240 L 285 240 L 310 200 L 325 180 L 315 178 L 295 210 L 230 215 L 210 230 Z" fill="#8047F8" />
  <!-- Under-seat engine cover -->
  <ellipse cx="230" cy="225" rx="35" ry="22" fill="#4B2995" />
  <!-- Floorboard -->
  <rect x="250" y="235" width="45" height="10" rx="3" fill="#272221" />

  <!-- Front stem and shield -->
  <path d="M 315 175 L 330 245" stroke="#C47F17" stroke-width="6" stroke-linecap="round" />
  <path d="M 310 170 Q 330 180 325 220" stroke="#8047F8" stroke-width="12" stroke-linecap="round" />

  <!-- Handlebar & Headlight -->
  <rect x="300" y="162" width="28" height="6" rx="3" fill="#272221" />
  <circle cx="328" cy="165" r="7" fill="#DBAC2C" stroke="#C47F17" stroke-width="2" />
  <!-- Light beam -->
  <polygon points="335,162 440,145 430,220 335,170" fill="#DBAC2C" opacity="0.15" />

  <!-- Delivery cargo box on back rack (Brown/Cardboard) -->
  <rect x="160" y="165" width="46" height="42" rx="4" fill="#C47F17" />
  <rect x="163" y="168" width="40" height="36" rx="2" fill="#DBAC2C" />
  <line x1="183" y1="168" x2="183" y2="204" stroke="#C47F17" stroke-width="2" />
  <!-- Coffee cup logo on box -->
  <circle cx="183" cy="186" r="6" fill="#4B2995" />
  <text x="183" y="189" font-size="6" fill="#FFF" font-family="sans-serif" font-weight="bold" text-anchor="middle">☕</text>

  <!-- Rider body -->
  <!-- Legs -->
  <path d="M 235 190 L 265 205 L 275 235" stroke="#272221" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <!-- Torso (Yellow T-Shirt) -->
  <path d="M 235 150 L 255 190 L 230 190 Z" fill="#DBAC2C" />
  <circle cx="242" cy="165" r="14" fill="#DBAC2C" />
  <!-- Arms reaching handlebar -->
  <path d="M 245 155 L 285 168 L 308 165" stroke="#C47F17" stroke-width="6" stroke-linecap="round" fill="none" />
  <!-- Head & Neck -->
  <circle cx="250" cy="132" r="9" fill="#F1E9C9" />
  <!-- Hair / Cap -->
  <path d="M 242 128 Q 254 120 258 128" fill="#272221" stroke="#272221" stroke-width="4" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'success-delivery.svg'), successSvg, 'utf-8');
console.log('Generated success-delivery.svg');
