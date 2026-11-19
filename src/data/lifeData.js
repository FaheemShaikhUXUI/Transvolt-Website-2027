export const LIFE_METADATA = {
  badge: 'Life in Transvolt',
  headline: 'Powering Purpose. Driving Tomorrow.',
  subtitle:
    'Our culture thrives where clean-air engineering meets high-voltage discipline. Here, your work directly replaces diesel emissions with silent, intelligent electric transit across India.',
  stats: [
    { value: '100%', label: 'Zero-Emission Purpose', sub: 'Direct climate impact daily' },
    { value: '57+', label: 'E-Buses Deployed', sub: 'In single municipal concessions' },
    { value: '4+', label: 'Operating Hubs', sub: 'Mumbai, Thane, Ulhasnagar, Delhi' },
    { value: '4.8/5', label: 'Team Sentiment', sub: 'Mission-driven peer score' },
  ],
};

export const CULTURE_PILLARS = [
  {
    id: 'impact',
    number: '01',
    title: 'Tangible Climate Impact',
    tagline: 'Engineering that breathes cleaner air into Indian cities.',
    description:
      'We don’t write code or turn wrenches for abstract vanity metrics. Every single day, Transvolt electric buses displace thousands of liters of toxic diesel smoke across Mumbai, Delhi, and industrial freight corridors.',
    highlights: [
      'Sub-second telemetry monitoring real-time CO2 avoidance',
      'Direct municipal partnership delivering green transit to citizens',
      'Gold-standard zero-tailpipe commercial transport',
    ],
    iconName: 'Leaf',
    badge: 'Real-World Mission',
  },
  {
    id: 'ownership',
    number: '02',
    title: 'Extreme Ownership & Agility',
    tagline: 'Flat hierarchies, big responsibilities, zero red tape.',
    description:
      'Whether you are commissioning a 240kW DC fast charger at 2 AM or architecting battery degradation predictive models, you are given the autonomy to make high-impact technical decisions.',
    highlights: [
      'Direct executive mentorship and decentralized decision-making',
      'Rapid prototype-to-field deployment cycle',
      'High ownership over entire vehicle and telemetry lifecycles',
    ],
    iconName: 'Zap',
    badge: 'Autonomy & Speed',
  },
  {
    id: 'safety',
    number: '03',
    title: 'High-Voltage Safety Culture',
    tagline: 'Precision and discipline where high power meets daily operations.',
    description:
      'Working around 800V DC powertrains and megawatt charging grids demands mutual respect and uncompromising rigor. Safety isn’t a checkbox at Transvolt—it’s our sacred engineering creed.',
    highlights: [
      'Certified arc-flash and high-voltage lock-out / tag-out protocols',
      'Continuous workshop electrical safety and defensive driving drills',
      'Zero-compromise vehicle telemetry pre-dispatch safety checks',
    ],
    iconName: 'ShieldCheck',
    badge: 'Safety First',
  },
  {
    id: 'growth',
    number: '04',
    title: 'Continuous Mastery & Inclusion',
    tagline: 'Accelerating careers at the forefront of clean tech.',
    description:
      'The electric vehicle revolution is writing new engineering textbooks in real-time. We invest heavily in our people through technical certifications, cross-functional depot tours, and inclusive leadership development.',
    highlights: [
      'Sponsored EV powertrain & cloud telemetry certifications',
      'Merit-based advancement across engineering and depot ranks',
      'Open forums with automotive OEMs and climate leaders',
    ],
    iconName: 'Sparkles',
    badge: 'Growth & Equity',
  },
];

export const DAY_IN_LIFE_TRACKS = [
  {
    id: 'depot-ops',
    role: 'Depot Operations & Turnaround',
    location: 'Mira Bhayandar Depot (Thane)',
    person: 'Ramesh Kulkarni',
    personTitle: 'Senior Depot Operations Lead',
    quote:
      'At 5:00 AM when our first wave of 30 electric buses powers up silently and leaves the depot for morning commuter routes, you feel the true scale of what we are building.',
    timeline: [
      { time: '05:30 AM', title: 'Dawn Fleet Dispatch & SoC Check', desc: 'Pre-flight battery diagnostics and visual tire telemetry validation before municipal routes start.' },
      { time: '11:00 AM', title: 'Megawatt Charging Balancing', desc: 'Optimizing 180kW fast chargers to take advantage of off-peak grid power tariffs and scheduled mid-day top-ups.' },
      { time: '03:30 PM', title: 'Preventive HV Diagnostics', desc: 'Inspecting CCS2 connector cables, switchgear temperatures, and auxiliary DC-DC converters.' },
      { time: '08:00 PM', title: 'Night Return & Telemetry Sync', desc: 'Fleet telemetry dump, automated overnight slow charging queue assignment, and crew debrief.' },
    ],
  },
  {
    id: 'software-iot',
    role: 'Fleet Telematics & Software',
    location: 'Mumbai Head Office & Remote',
    person: 'Ananya Deshmukh',
    personTitle: 'Lead Telemetry Software Architect',
    quote:
      'We ingest thousands of CAN-bus messages per second from running buses. Watching real-time battery thermal dissipation curves predict a cell imbalance before a driver even notices is magic.',
    timeline: [
      { time: '09:30 AM', title: 'Morning NOC Telemetry Standup', desc: 'Reviewing cross-city vehicle uptime, SoC consumption variance, and overnight fast-charge speeds.' },
      { time: '11:30 AM', title: 'Predictive Range Model Refinement', desc: 'Fine-tuning ML models accounting for air-conditioner load during heavy summer traffic corridors.' },
      { time: '03:00 PM', title: 'OEM Firmware Handshake Validation', desc: 'Pairing new vehicle BMS telematics with Transvolt Fleet OS cloud endpoints over WebSockets.' },
      { time: '06:00 PM', title: 'Municipal Dashboard Updates', desc: 'Deploying live passenger transit reliability analytics for municipal transport directors.' },
    ],
  },
  {
    id: 'public-strategy',
    role: 'Concessions & Strategy',
    location: 'Delhi NCR Regional HQ',
    person: 'Vikramaditya Rao',
    personTitle: 'AVP Public Transit Partnerships',
    quote:
      'Working at Transvolt means shaping public mobility policy with state governments and municipal commissioners who want clean air for millions of daily commuters.',
    timeline: [
      { time: '10:00 AM', title: 'State Transport Undertaking Review', desc: 'Discussing corridor electrification viability and GCC concession route schedules with STU leadership.' },
      { time: '01:30 PM', title: 'Financial Lifecycle Modeling', desc: 'Evaluating Capex vs. Opex optimization and green bond financing structures for 100 new bus tenders.' },
      { time: '04:00 PM', title: 'Depot Land & Power Allotment Walkthrough', desc: 'Collaborating with state electricity boards on dedicated 11kV substation grid drops.' },
      { time: '06:30 PM', title: 'Clean Mobility Roundtable', desc: 'Representing Transvolt at industry clean-energy forums on public fleet electrification.' },
    ],
  },
];

export const PERKS_BENEFITS = [
  {
    iconName: 'Heart',
    title: 'Comprehensive Health & Family Coverage',
    desc: 'Top-tier medical insurance for you and your dependents, plus accident coverage and annual wellness checkups.',
    category: 'Wellness',
  },
  {
    iconName: 'Bus',
    title: 'Clean EV Commute Support',
    desc: 'Special subsidies for EV two-wheeler purchases and complimentary charging access at all Transvolt depots.',
    category: 'Sustainability',
  },
  {
    iconName: 'GraduationCap',
    title: 'Continuous Technical Sponsorship',
    desc: 'Full sponsorship for High Voltage certifications, cloud computing credentials, and automotive engineering degrees.',
    category: 'Learning',
  },
  {
    iconName: 'Clock',
    title: 'Flexible & Balanced Working Models',
    desc: 'Hybrid options for tech and headquarters teams with generous annual paid leave, parental leave, and wellness days.',
    category: 'Work-Life',
  },
  {
    iconName: 'Award',
    title: 'Fleet Milestone Incentives & Equity',
    desc: 'Transparent performance bonuses and employee stock options directly tied to commercial fleet uptime and green milestones.',
    category: 'Wealth',
  },
  {
    iconName: 'Users',
    title: 'Open Culture & Annual Green Retreats',
    desc: 'Flat communication culture, regular townhalls with founders, and company retreats celebrating zero-emission records.',
    category: 'Community',
  },
];

export const CULTURE_GALLERY = [
  {
    id: 'gal-1',
    title: 'Depot Technical Team in Action',
    location: 'Mira Bhayandar Depot',
    category: 'Depot & Field',
    image: '/about/about-depot-team.jpg',
    caption: 'Our field technicians and electrical engineers conducting pre-dispatch diagnostics.',
  },
  {
    id: 'gal-2',
    title: 'Municipal Fleet Inauguration Ceremony',
    location: 'Ulhasnagar Concession Hub',
    category: 'Celebration',
    image: '/about/about-depot-inauguration.jpg',
    caption: 'Celebrating the rollout of zero-emission transit buses with municipal leadership.',
  },
  {
    id: 'gal-3',
    title: 'Megawatt Fast-Charging Infrastructure',
    location: 'Western Transit Corridor',
    category: 'Infrastructure',
    image: '/about/about-charging-station.jpg',
    caption: 'Dual-gun DC fast charging stations powering commercial electric buses round the clock.',
  },
  {
    id: 'gal-4',
    title: 'Active Fleet Operations on the Move',
    location: 'Mumbai Metropolitan Region',
    category: 'Fleet in Action',
    image: '/about/about-bus-fleet.jpg',
    caption: '12m electric buses navigating urban routes, replacing thousands of tons of emissions.',
  },
  {
    id: 'gal-5',
    title: 'Connected Telemetry NOC Engineering',
    location: 'Mumbai Innovation Center',
    category: 'Tech & IoT',
    image: '/about/fleet-monitoring-engineer.jpg',
    caption: 'Software and telemetry analysts tracking live battery health and vehicle uptime.',
  },
  {
    id: 'gal-6',
    title: 'Mission for Blue Skies & Green Cities',
    location: 'Nationwide Corridors',
    category: 'Mission',
    image: '/about/climate-green-mission.jpg',
    caption: 'Transforming industrial transport into silent, clean electric energy.',
  },
];
