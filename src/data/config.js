// Game constants and the scenario: who fights, where, and what they want.

export const WORLD = {
  W: 3200, // playable map width (world units)
  H: 2000, // playable map height
  MARGIN: 360, // ocean margin rendered around the map
  CELL: 74, // average territory size
  HM_STEP: 10, // heightmap resolution
  WATER: -3, // water surface height
};

export const LEAF = 0;
export const STONE = 1;

export const SIDES = [
  {
    id: LEAF,
    name: 'Leaf Alliance',
    short: 'Leaf',
    adj: 'Leaf',
    color: '#4cc46b',
    dark: '#1f6e38',
    tint: [64, 186, 98],
    css: 'leaf',
  },
  {
    id: STONE,
    name: 'Stone Dominion',
    short: 'Stone',
    adj: 'Stone',
    color: '#e0503f',
    dark: '#7c2018',
    tint: [206, 52, 58],
    css: 'stone',
  },
];

export const WAR_NAME = 'The Kazan Front';
export const START_YEAR = 412;

// Hours of game time per real second at 1x speed.
export const HOURS_PER_SECOND = 0.75;

export const TERRAIN = {
  plains: { name: 'Open Fields', move: 1.0, defense: 1.0 },
  forest: { name: 'Forest', move: 0.68, defense: 1.25 },
  mountain: { name: 'Mountains', move: 0.42, defense: 1.6 },
  lake: { name: 'Lake', move: 0, defense: 1 },
};

export const LOCATION_TYPES = {
  capital: { name: 'Capital', defense: 1.55, heal: 16, morale: 0.025 },
  city: { name: 'City', defense: 1.35, heal: 12, morale: 0.02 },
  fort: { name: 'Fort', defense: 1.85, heal: 10, morale: 0.02 },
  village: { name: 'Village', defense: 1.15, heal: 4, morale: 0.008 },
  bridge: { name: 'Bridgehead', defense: 1.1, heal: 0, morale: 0 },
};

export const UNIT_TYPES = {
  infantry: { name: 'Infantry', atk: 1.0, def: 1.0, speed: 1.0, max: 1000, symbol: 'inf' },
  assault: { name: 'Assault', atk: 1.35, def: 0.88, speed: 1.05, max: 900, symbol: 'assault' },
  scout: { name: 'Scout', atk: 0.55, def: 0.6, speed: 1.8, max: 450, symbol: 'scout' },
  medical: { name: 'Medical', atk: 0.12, def: 0.4, speed: 1.0, max: 350, symbol: 'medical' },
  heavy: { name: 'Heavy Weapons', atk: 1.6, def: 1.25, speed: 0.72, max: 650, symbol: 'heavy' },
};

export const XP_LEVELS = [
  { name: 'Green', min: 0, mult: 0.85, stars: 0 },
  { name: 'Regular', min: 10, mult: 1.0, stars: 1 },
  { name: 'Veteran', min: 30, mult: 1.15, stars: 2 },
  { name: 'Elite', min: 60, mult: 1.3, stars: 3 },
];

export function xpLevel(xp) {
  let lvl = XP_LEVELS[0];
  for (const l of XP_LEVELS) if (xp >= l.min) lvl = l;
  return lvl;
}

export const TRAITS = {
  Aggressive: { desc: '+20% attack power', icon: '🗡' },
  Defensive: { desc: '+25% power when defending', icon: '🛡' },
  Strategist: { desc: '+12% per extra battalion of the same army in a battle', icon: '♟' },
  Reckless: { desc: '+15% attack, ignores bad odds, +15% casualties', icon: '🔥' },
};

export const DIFFICULTY = {
  easy: { label: 'Recruit', enemyStrength: 0.62, aiThink: 4.5, aiAggro: 0.4, enemyReinf: 0.45, grace: 48, playerPower: 1.6, playerHeal: 2 },
  normal: { label: 'Officer', enemyStrength: 0.78, aiThink: 3.2, aiAggro: 0.6, enemyReinf: 0.7, grace: 30, playerPower: 1.3, playerHeal: 1.5 },
  hard: { label: 'General', enemyStrength: 0.95, aiThink: 2.2, aiAggro: 0.9, enemyReinf: 1.0, grace: 12, playerPower: 1.05, playerHeal: 1 },
};

// Approximate x of the starting front line for a given y.
export function startFrontX(y) {
  return 1620 - 120 * Math.sin(y / 310) - 60 * Math.sin(y / 97 + 2);
}

// Named places. `goal` marks which side wants to capture it.
export const LOCATIONS = [
  { key: 'sennai', name: 'Sennai', type: 'capital', x: 330, y: 1010, side: LEAF },
  { key: 'mirel', name: 'Mirel', type: 'city', x: 640, y: 1690, side: LEAF },
  { key: 'halden', name: 'Halden', type: 'city', x: 760, y: 330, side: LEAF },
  { key: 'osk', name: 'Osk', type: 'city', x: 1230, y: 960, side: LEAF },
  { key: 'arden', name: 'Fort Arden', type: 'fort', x: 1290, y: 1490, side: LEAF },
  { key: 'tamsk', name: 'Fort Tamsk', type: 'fort', x: 1180, y: 560, side: LEAF },
  { key: 'kharzad', name: 'Kharzad', type: 'capital', x: 2890, y: 990, side: STONE },
  { key: 'vorsk', name: 'Vorsk', type: 'city', x: 2560, y: 300, side: STONE },
  { key: 'drav', name: 'Drav', type: 'city', x: 2000, y: 1130, side: STONE },
  { key: 'ketzen', name: 'Ketzen', type: 'city', x: 2420, y: 1700, side: STONE },
  { key: 'kazan', name: 'Fort Kazan', type: 'fort', x: 1955, y: 545, side: STONE },
  { key: 'brask', name: 'Fort Brask', type: 'fort', x: 2620, y: 1240, side: STONE },
];

// Bridges that become objectives. Resolved after roads are built: the bridge
// on the given river closest to (x, y); the objective cell is on `bank` side.
export const BRIDGE_OBJECTIVES = [
  { key: 'eastbridge', name: 'Eastern Bridge', river: 'tarn', x: 2330, y: 1180, side: STONE, bank: 'east' },
  { key: 'westbridge', name: 'Western Bridge', river: 'sela', x: 880, y: 760, side: LEAF, bank: 'west' },
];

export const OBJECTIVES = {
  [LEAF]: ['kharzad', 'kazan', 'vorsk', 'eastbridge'], // what the player must take
  [STONE]: ['sennai', 'arden', 'mirel', 'westbridge'], // what the enemy wants
};
export const CAPITAL = { [LEAF]: 'sennai', [STONE]: 'kharzad' };

export const RIVERS = [
  { key: 'sela', name: 'Sela', guide: (y) => 870 + 80 * Math.sin(y / 250 + 0.4) + 30 * Math.sin(y / 90) },
  { key: 'tarn', name: 'Tarn', guide: (y) => 2340 + 100 * Math.sin(y / 290 + 1.1) + 35 * Math.sin(y / 85 + 2) },
];

// Mountain ranges: polylines with a width; the pass at Fort Kazan stays open.
export const RANGES = [
  {
    pts: [
      [1430, -60],
      [1600, 170],
      [1760, 360],
      [1880, 470],
    ],
    width: 150,
    height: 230,
  },
  {
    pts: [
      [2035, 625],
      [2200, 760],
      [2360, 850],
      [2470, 900],
    ],
    width: 150,
    height: 210,
  },
  {
    pts: [
      [2520, 1460],
      [2720, 1620],
      [2960, 1800],
      [3150, 1900],
    ],
    width: 170,
    height: 200,
  },
  {
    pts: [
      [380, 260],
      [560, 420],
      [640, 560],
    ],
    width: 120,
    height: 110,
  },
  {
    pts: [
      [1480, 1780],
      [1640, 1900],
      [1760, 2060],
    ],
    width: 120,
    height: 130,
  },
  {
    pts: [
      [3050, 180],
      [3150, 420],
    ],
    width: 140,
    height: 160,
  },
];

export const LAKES = [
  { x: 1020, y: 1260, r: 85 },
  { x: 2700, y: 640, r: 80 },
];

export const VILLAGE_NAMES = [
  'Aldwick',
  'Brem',
  'Corva',
  'Dunmere',
  'Eskel',
  'Farrow',
  'Gelt',
  'Hask',
  'Ivel',
  'Jorn',
  'Kell',
  'Lusk',
  'Marrow',
  'Nidd',
  'Orly',
  'Pell',
  'Quarry',
  'Rook',
  'Sarn',
  'Tull',
  'Ubb',
  'Vesk',
  'Wold',
  'Yarrow',
  'Zell',
  'Ashby',
  'Birch',
  'Cobb',
  'Dray',
  'Elm',
  'Fenn',
  'Grit',
];

export const CAPTAINS = [
  'Ren',
  'Hayato',
  'Mika',
  'Sora',
  'Kenji',
  'Yuna',
  'Daisuke',
  'Akira',
  'Nori',
  'Haru',
  'Emi',
  'Taro',
  'Kaito',
  'Rin',
  'Shin',
  'Aoi',
  'Jiro',
  'Kota',
  'Mei',
  'Yori',
  'Bram',
  'Dorn',
  'Hesk',
  'Ivo',
  'Juska',
  'Korr',
  'Lev',
  'Mazur',
  'Orsk',
  'Petr',
  'Radim',
  'Stav',
  'Tomas',
  'Vadek',
  'Zora',
  'Grigor',
];

export const GENERALS = [
  { id: 'kakashi', side: LEAF, name: 'Kakashi', trait: 'Strategist' },
  { id: 'mori', side: LEAF, name: 'Hana Mori', trait: 'Defensive' },
  { id: 'ono', side: LEAF, name: 'Daichi Ono', trait: 'Aggressive' },
  { id: 'kenta', side: LEAF, name: 'Ryo Kenta', trait: 'Reckless' },
  { id: 'vask', side: STONE, name: 'Garon Vask', trait: 'Aggressive' },
  { id: 'teshk', side: STONE, name: 'Mura Teshk', trait: 'Defensive' },
  { id: 'durn', side: STONE, name: 'Kesh Durn', trait: 'Reckless' },
  { id: 'ostrav', side: STONE, name: 'Ilya Ostrav', trait: 'Strategist' },
];

export const ARMIES = [
  { id: 'l1', side: LEAF, name: '1st Army', general: 'kakashi' },
  { id: 'l2', side: LEAF, name: '2nd Army', general: 'mori' },
  { id: 'l3', side: LEAF, name: '3rd Army', general: 'ono' },
  { id: 's1', side: STONE, name: 'Northern Army', general: 'vask' },
  { id: 's2', side: STONE, name: 'Central Army', general: 'teshk' },
  { id: 's3', side: STONE, name: 'Southern Army', general: 'durn' },
  { id: 's4', side: STONE, name: 'Capital Guard', general: 'ostrav' },
];

// Starting battalions. Either `at` a location key, or (y, depth) behind the front.
export const BATTALIONS = [
  // Leaf - 1st Army (north)
  {
    side: LEAF,
    army: 'l1',
    name: '1st Infantry Battalion',
    short: '1st Inf',
    type: 'infantry',
    y: 300,
    depth: 110,
    xp: 14,
  },
  {
    side: LEAF,
    army: 'l1',
    name: '2nd Infantry Battalion',
    short: '2nd Inf',
    type: 'infantry',
    y: 560,
    depth: 110,
    xp: 12,
  },
  {
    side: LEAF,
    army: 'l1',
    name: '3rd Assault Battalion',
    short: '3rd Aslt',
    type: 'assault',
    y: 430,
    depth: 230,
    xp: 34,
  },
  { side: LEAF, army: 'l1', name: '1st Scout Battalion', short: '1st Sct', type: 'scout', y: 730, depth: 150, xp: 12 },
  // Leaf - 2nd Army (center)
  {
    side: LEAF,
    army: 'l2',
    name: '3rd Leaf Battalion',
    short: '3rd Leaf',
    type: 'infantry',
    y: 900,
    depth: 110,
    xp: 36,
    soldiers: 850,
    morale: 0.78,
    captain: 'Ren',
  },
  {
    side: LEAF,
    army: 'l2',
    name: '4th Infantry Battalion',
    short: '4th Inf',
    type: 'infantry',
    y: 1110,
    depth: 110,
    xp: 4,
  },
  {
    side: LEAF,
    army: 'l2',
    name: '5th Infantry Battalion',
    short: '5th Inf',
    type: 'infantry',
    y: 1310,
    depth: 120,
    xp: 12,
  },
  { side: LEAF, army: 'l2', name: 'Medical Battalion', short: 'Medical', type: 'medical', y: 1060, depth: 300, xp: 10 },
  { side: LEAF, army: 'l2', name: '7th Infantry Battalion', short: '7th Inf', type: 'infantry', at: 'sennai', xp: 2 },
  // Leaf - 3rd Army (south)
  {
    side: LEAF,
    army: 'l3',
    name: '1st Assault Battalion',
    short: '1st Aslt',
    type: 'assault',
    y: 1500,
    depth: 130,
    xp: 16,
    soldiers: 742,
    morale: 0.64,
    org: 0.71,
  },
  {
    side: LEAF,
    army: 'l3',
    name: 'Heavy Weapons Battalion',
    short: 'Hvy Wpns',
    type: 'heavy',
    y: 1640,
    depth: 230,
    xp: 14,
  },
  {
    side: LEAF,
    army: 'l3',
    name: '6th Infantry Battalion',
    short: '6th Inf',
    type: 'infantry',
    y: 1760,
    depth: 110,
    xp: 6,
  },
  { side: LEAF, army: 'l3', name: '2nd Scout Battalion', short: '2nd Sct', type: 'scout', y: 1910, depth: 140, xp: 12 },

  // Stone - Northern Army
  {
    side: STONE,
    army: 's1',
    name: '14th Stone Battalion',
    short: '14th',
    type: 'infantry',
    y: 290,
    depth: 110,
    xp: 14,
  },
  { side: STONE, army: 's1', name: '9th Stone Battalion', short: '9th', type: 'infantry', y: 540, depth: 110, xp: 12 },
  {
    side: STONE,
    army: 's1',
    name: '21st Stone Assault Battalion',
    short: '21st Aslt',
    type: 'assault',
    y: 420,
    depth: 240,
    xp: 20,
  },
  {
    side: STONE,
    army: 's1',
    name: '3rd Stone Scout Battalion',
    short: '3rd Sct',
    type: 'scout',
    y: 720,
    depth: 140,
    xp: 10,
  },
  { side: STONE, army: 's1', name: '17th Stone Battalion', short: '17th', type: 'infantry', at: 'kazan', xp: 22 },
  // Stone - Central Army
  {
    side: STONE,
    army: 's2',
    name: '11th Stone Battalion',
    short: '11th',
    type: 'infantry',
    y: 880,
    depth: 110,
    xp: 12,
  },
  {
    side: STONE,
    army: 's2',
    name: '12th Stone Battalion',
    short: '12th',
    type: 'infantry',
    y: 1090,
    depth: 110,
    xp: 8,
  },
  {
    side: STONE,
    army: 's2',
    name: '6th Stone Heavy Battalion',
    short: '6th Hvy',
    type: 'heavy',
    y: 1000,
    depth: 250,
    xp: 14,
  },
  {
    side: STONE,
    army: 's2',
    name: '15th Stone Battalion',
    short: '15th',
    type: 'infantry',
    y: 1290,
    depth: 120,
    xp: 10,
  },
  { side: STONE, army: 's2', name: '18th Stone Battalion', short: '18th', type: 'infantry', at: 'drav', xp: 6 },
  // Stone - Southern Army
  {
    side: STONE,
    army: 's3',
    name: '22nd Stone Assault Battalion',
    short: '22nd Aslt',
    type: 'assault',
    y: 1480,
    depth: 120,
    xp: 18,
  },
  {
    side: STONE,
    army: 's3',
    name: '16th Stone Battalion',
    short: '16th',
    type: 'infantry',
    y: 1660,
    depth: 110,
    xp: 10,
  },
  {
    side: STONE,
    army: 's3',
    name: '7th Stone Heavy Battalion',
    short: '7th Hvy',
    type: 'heavy',
    y: 1590,
    depth: 260,
    xp: 12,
  },
  {
    side: STONE,
    army: 's3',
    name: '4th Stone Scout Battalion',
    short: '4th Sct',
    type: 'scout',
    y: 1880,
    depth: 130,
    xp: 8,
  },
  // Stone - Capital Guard
  {
    side: STONE,
    army: 's4',
    name: '1st Stone Guard Battalion',
    short: '1st Guard',
    type: 'infantry',
    at: 'kharzad',
    xp: 40,
  },
  { side: STONE, army: 's4', name: '19th Stone Battalion', short: '19th', type: 'infantry', at: 'vorsk', xp: 6 },
];

// Names for battalions that arrive later as reinforcements.
export const REINFORCEMENT_NAMES = {
  [LEAF]: [
    ['8th Infantry Battalion', '8th Inf', 'infantry'],
    ['2nd Assault Battalion', '2nd Aslt', 'assault'],
    ['9th Infantry Battalion', '9th Inf', 'infantry'],
    ['2nd Heavy Weapons Battalion', '2nd Hvy', 'heavy'],
    ['10th Infantry Battalion', '10th Inf', 'infantry'],
    ['3rd Scout Battalion', '3rd Sct', 'scout'],
    ['11th Infantry Battalion', '11th Inf', 'infantry'],
    ['4th Assault Battalion', '4th Aslt', 'assault'],
  ],
  [STONE]: [
    ['23rd Stone Battalion', '23rd', 'infantry'],
    ['24th Stone Assault Battalion', '24th Aslt', 'assault'],
    ['25th Stone Battalion', '25th', 'infantry'],
    ['8th Stone Heavy Battalion', '8th Hvy', 'heavy'],
    ['26th Stone Battalion', '26th', 'infantry'],
    ['27th Stone Assault Battalion', '27th Aslt', 'assault'],
    ['28th Stone Battalion', '28th', 'infantry'],
    ['5th Stone Scout Battalion', '5th Sct', 'scout'],
    ['29th Stone Battalion', '29th', 'infantry'],
    ['30th Stone Battalion', '30th', 'infantry'],
  ],
};
