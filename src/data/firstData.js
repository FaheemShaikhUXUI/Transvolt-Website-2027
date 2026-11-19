// Transvolt First Page Data - Industry Benchmarks, Historic Firsts & Engineering Innovations
export const FIRST_METADATA = {
  badge: 'BENCHMARKING COMMERCIAL EV EXCELLENCE • TRANSVOLT FIRSTS',
  title: 'Pioneering the Standards Others Measure By.',
  subtitle:
    'Explore the historic firsts, engineering breakthroughs, and institutional records that established Transvolt as India’s leading commercial EV operator and clean concessionaire.',
  stats: [
    { value: '#1', label: 'Private Concessionaire', sub: 'Long-term MMR municipal GCC' },
    { value: '100%', label: 'OEM-Agnostic Platform', sub: 'Unified fleet orchestration' },
    { value: '1,200 kW+', label: 'Megawatt Depot Capacity', sub: 'Dedicated fast-charge infrastructure' },
    { value: '99.4%', label: 'Fleet Availability Record', sub: 'Industry-leading reliability benchmark' },
  ],
};

export const TRANSVOLT_FIRSTS = [
  {
    id: 'gcc-concessions',
    number: '01',
    category: 'Public Transit Concessions',
    title: 'First Dedicated Long-Term Municipal GCC Electric Bus Operations in MMR',
    tagline: 'De-risking municipal electrification through asset ownership, depot charging, and performance-linked SLA delivery.',
    year: '2022',
    iconName: 'Bus',
    highlightBadge: 'HISTORIC MILESTONE',
    overview:
      'Transvolt was the pioneer private operator in the Mumbai Metropolitan Region to structure, fund, and operationalize long-term Gross Cost Contract (GCC) electric bus concessions for municipal corporations (Mira-Bhayandar and Ulhasnagar). We proved that electric bus concessions can deliver superior service without burdening municipal treasuries with upfront vehicle capital expenditure.',
    problemBefore:
      'Municipal transport corporations struggled with high diesel fleet maintenance costs, unpredictable fuel spikes, and lack of capital to purchase electric buses upfront.',
    transvoltSolution:
      'Transvolt took full ownership of the vehicle assets, depot charging equipment, and maintenance overheads, delivering reliable route operations on an agreed per-kilometer gross cost model with zero upfront financial debt for cities.',
    impactMetrics: [
      { label: 'Fleet Deployed', value: '57+ E-Buses' },
      { label: 'Uptime SLA', value: '99.4% Delivery' },
      { label: 'Diesel Replaced', value: '100% Zero Particulates' },
    ],
    technicalBadges: ['Gross Cost Contract (GCC)', '33kV Substation', '10-Year Concession Lifecycle'],
  },
  {
    id: 'oem-agnostic-os',
    number: '02',
    category: 'Fleet Operating System & Software',
    title: 'First 100% OEM-Agnostic Commercial Fleet Operating Architecture',
    tagline: 'Decoupling fleet intelligence from single vehicle manufacturers to run diverse commercial EV fleets seamlessly.',
    year: '2023',
    iconName: 'Cpu',
    highlightBadge: 'DEEP TECH FIRST',
    overview:
      'Unlike single-OEM operators locked into proprietary diagnostics, Transvolt architected India’s first completely OEM-agnostic fleet management software. Our system ingests standardized CAN bus telemetry, thermal management logs, and charging curves across multiple heavy vehicle manufacturers on a unified operational glass pane.',
    problemBefore:
      'Fleet operators were bound to single vehicle manufacturers, forced to use fragmented proprietary software dashboards with incompatible battery telematics and charging protocols.',
    transvoltSolution:
      'Engineered an open-architecture operating platform that normalizes vehicle data across diverse bus models and freight prime movers, enabling dynamic route dispatch, unified driver scoring, and standardized preventative maintenance.',
    impactMetrics: [
      { label: 'OEM Compatibility', value: 'Universal' },
      { label: 'Telemetry Channels', value: '45+ Live Feeds' },
      { label: 'Dispatch Efficiency', value: '+24% Turnaround' },
    ],
    technicalBadges: ['CAN Bus Ingestion', 'Universal CCS2 Diagnostics', 'Open REST Telemetry APIs'],
  },
  {
    id: 'megawatt-depots',
    number: '03',
    category: 'High-Power Infrastructure',
    title: 'First Purpose-Built Megawatt Depots with Dynamic Power Routing',
    tagline: 'Engineering dedicated high-voltage charging terminals capable of rapid turnarounds without grid brownouts.',
    year: '2023',
    iconName: 'Zap',
    highlightBadge: 'INFRASTRUCTURE BENCHMARK',
    overview:
      'Transvolt engineered India’s first purpose-built commercial EV depots powered by dedicated 33kV dedicated express feeder substations. Featuring multi-gun 240kW-360kW DC chargers and automated dynamic power load balancing, our depots can rapid-charge a 250 kWh bus battery pack to 80% state-of-charge in under 45 minutes.',
    problemBefore:
      'Public transport EV pilots frequently stalled due to low-voltage grid connections, slow AC charging overnight, and lack of dedicated high-power electrical infrastructure at bus depots.',
    transvoltSolution:
      'Transvolt engineered end-to-end electrical civil infrastructure: from utility high-tension step-down transformers to intelligent power distribution units that balance kilowatt delivery across charging bays based on real-time route departure schedules.',
    impactMetrics: [
      { label: 'Depot Aggregate Capacity', value: '1.2+ MW' },
      { label: 'Fast Charge Time', value: '45 Min (80% SoC)' },
      { label: 'Peak Grid Efficiency', value: '98.2% Power Factor' },
    ],
    technicalBadges: ['33kV HT Feeder', 'Dual-Gun 360kW DC', 'Smart Peak-Shaving Logic'],
  },
  {
    id: 'cell-health-analytics',
    number: '04',
    category: 'Battery Analytics & Safety',
    title: 'First AI-Driven Cell Degradation Forecasting & Thermal Safe-Zone',
    tagline: 'Eliminating thermal runaway risk and extending pack lifespan by predicting cell balance discrepancies.',
    year: '2024',
    iconName: 'ShieldCheck',
    highlightBadge: 'SAFETY INNOVATION',
    overview:
      'We pioneered real-time cell-level voltage differential monitoring across India’s extreme temperature swings (from 10°C in winter corridors to 48°C in peak Mumbai/Rajasthan summers). Our algorithms flag micro-deviations in internal cell impedance weeks before they manifest as operational route faults.',
    problemBefore:
      'Operators relied on primitive state-of-charge (SoC) gauges, unable to detect premature cell degradation or micro-shorts until a battery pack suffered an unexpected roadside breakdown or thermal event.',
    transvoltSolution:
      'Deployed machine-learning anomaly detection algorithms monitoring pack internal resistance, differential voltage, and cooling liquid flow rates, maintaining battery packs strictly within the optimal thermodynamic safety zone.',
    impactMetrics: [
      { label: 'Safety Record', value: 'Zero Thermal Faults' },
      { label: 'Pack Life Extension', value: '+28% Usable Cycles' },
      { label: 'Prediction Lead Time', value: '14 Days Advance' },
    ],
    technicalBadges: ['Cell Impedance Modeling', 'Automated Isolation Alerts', 'Real-time BMS Telematics'],
  },
  {
    id: 'heavy-freight-corridor',
    number: '05',
    category: 'Heavy Industrial Haulage',
    title: 'First Heavy 55-Ton Electric Commercial Haulage Corridor in Maharashtra',
    tagline: 'Proving the technical and economic viability of zero-emission heavy freight along industrial manufacturing belts.',
    year: '2024',
    iconName: 'Truck',
    highlightBadge: 'INDUSTRIAL PIONEER',
    overview:
      'Expanding beyond passenger transit, Transvolt introduced heavy commercial 55T gross combination weight electric prime movers on industrial routes in Maharashtra and Gujarat. This benchmark proved that heavy industrial bulk haulage (steel coils, cement, containers) can eliminate 80+ tons of carbon per truck annually at reduced operating expense.',
    problemBefore:
      'Heavy freight was widely considered impossible to electrify in India due to high vehicle weight, steep corridor gradients, and the non-existence of heavy fast-charging waystations.',
    transvoltSolution:
      'Formulated an integrated freight concession route with dedicated waypoint charging hubs and energy-dense prime movers, demonstrating a 38% fuel-cost reduction over heavy diesel equivalents.',
    impactMetrics: [
      { label: 'Vehicle Payload', value: '55-Ton GCW' },
      { label: 'TCO Reduction', value: '38% vs Diesel' },
      { label: 'Annual CO₂ Saved', value: '82 MT / Truck' },
    ],
    technicalBadges: ['Heavy Freight Prime Mover', 'Multi-Point Industrial Fast Charging', 'Regenerative Braking 3.0'],
  },
  {
    id: 'dual-iso-certification',
    number: '06',
    category: 'Governance & Institutional Excellence',
    title: 'First Dual ISO 14001:2015 & ISO 45001:2018 Certified Fleet Operator',
    tagline: 'Setting the institutional governance standard for occupational safety and environmental management in Indian EV transit.',
    year: '2023',
    iconName: 'Award',
    highlightBadge: 'GOVERNANCE FIRST',
    overview:
      'Transvolt was certified under both ISO 14001:2015 (Environmental Management System) and ISO 45001:2018 (Occupational Health & Safety Management System), reflecting rigorous procedural governance across high-voltage maintenance, depot electrical safety, and zero-accident driver protocols.',
    problemBefore:
      'Commercial fleet depots often operated with informal safety protocols, exposing technicians and drivers to high-voltage hazards without standardized PPE or emergency isolation SOPs.',
    transvoltSolution:
      'Institutionalized documented high-voltage lockout/tagout procedures, mandatory insulated safety tooling, and continuous driver welfare audits audited by third-party certification bodies.',
    impactMetrics: [
      { label: 'ISO Standard', value: '14001 & 45001' },
      { label: 'Lost Time Injuries', value: 'Zero (LTI = 0)' },
      { label: 'Audited Depots', value: '100% Certified' },
    ],
    technicalBadges: ['High-Voltage Lockout/Tagout', 'Third-Party Audited', 'Standard Operating Protocol (TSP-1)'],
  },
];

export const UPCOMING_FIRSTS_RADAR = [
  {
    phase: 'R&D Pilot 2026',
    title: 'Automated Overhead Megawatt Pantograph Docking',
    desc: 'Deploying inverted pantograph charging at terminal layover stops, replenishing 100 kWh of battery energy in under 8 minutes without manual cable plugging.',
    readiness: 'Lab Validation Complete',
    category: 'Ultra-Fast Charging',
  },
  {
    phase: 'Pilot Q3 2026',
    title: 'Dedicated Green Freight Highway Waystation (Western DFC)',
    desc: 'Solar-backed 600 kW megawatt charging waystations along the Western Dedicated Freight Corridor linking Jawaharlal Nehru Port (JNPA) to NCR logistics hubs.',
    readiness: 'Site Engineering Phase',
    category: 'Interstate Freight',
  },
  {
    phase: 'Target 2027',
    title: 'Second-Life Stationary Storage Depot Microgrids',
    desc: 'Repurposing retired vehicle battery modules into stationary depot BESS systems to buffer peak grid demand and supply 100% clean solar night charging.',
    readiness: 'Cell Testing Active',
    category: 'Circular Economy',
  },
];
