import React, { useState, useRef, useEffect } from 'react';
import {
  Film,
  Play,
  Pause,
  Truck,
  Bus,
  Zap,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Anchor,
  Package,
  Layers,
  ArrowUpRight,
  Activity,
  Gauge,
  BatteryCharging,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConstellationNetwork } from './ConstellationNetwork';
import { SmoothLoopVideo } from './SmoothLoopVideo';

// Growing Blue Stroke Ring behind Hexagons (1px stroke, electric blue, shown ONLY for hovered hexagon)
const HexagonStroke = ({ isHovered, style, strokeColor = '#1E90FF' }) => {
  // Shown strictly behind the hovered hexagon (fades in and grows to scale 1.48)
  const scaleClass = isHovered
    ? 'scale-[1.48] opacity-100 z-20'
    : 'scale-100 opacity-0 z-[5]';

  return (
    <div
      style={{
        ...style,
        transformOrigin: 'center center',
      }}
      className={`absolute pointer-events-none transition-all duration-500 ease-out ${scaleClass}`}
    >
      <svg
        viewBox="0 0 100 86.6"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(30,144,255,0.85)]"
      >
        <polygon
          points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// 1px Stroke Border for Video Hexagons (White in light theme, Dark Gray in black theme)
const VideoHexagonBorder = ({ isDark, strokeWidth = 1 }) => (
  <svg
    viewBox="0 0 100 86.6"
    preserveAspectRatio="none"
    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
  >
    <polygon
      points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
      fill="none"
      stroke={isDark ? '#404040' : '#FFFFFF'}
      className="stroke-white dark:stroke-[#404040] transition-colors duration-300"
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      strokeLinejoin="round"
    />
  </svg>
);

// Interactive Video Hexagon with Theme-adaptive Stroke, Green Glow on Hover, Black Fill, and Centered Text
const VideoHexagon = ({
  id,
  label,
  style,
  videoSrc,
  isDark,
  activeHexagon,
  setActiveHexagon,
}) => {
  const isHovered = activeHexagon === id;

  return (
    <>
      {/* 1. Growing Blue Stroke behind Hexagon (Shown ONLY for hovered hexagon, 1px stroke) */}
      <HexagonStroke
        isHovered={isHovered}
        style={style}
      />

      {/* 2. Scaled Hexagon Card with Green Glow and 1px White Stroke */}
      <div
        style={{
          ...style,
          transformOrigin: 'center center',
          filter: isHovered
            ? 'drop-shadow(0 0 16px rgba(84, 130, 53, 0.40)) drop-shadow(0 0 30px rgba(34, 197, 94, 0.25)) drop-shadow(0 20px 35px rgba(0, 0, 0, 0.45))'
            : 'none',
          transition: 'transform 500ms ease-out, filter 500ms ease-out',
        }}
        className={`absolute pointer-events-none ${
          isHovered ? 'scale-[1.30] z-30' : 'scale-100 z-10'
        }`}
      >
        {/* The Clipped Video Container (Hover detection strictly within polygon, full black fill behind) */}
        <div
          onMouseEnter={() => setActiveHexagon(id)}
          onMouseLeave={() => setActiveHexagon(null)}
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
          className="w-full h-full overflow-hidden pointer-events-auto cursor-pointer relative bg-black"
        >
          {/* Video Opacity: 70% default, 95% on hover */}
          {videoSrc ? (
            <div
              className={`w-full h-full transition-opacity duration-500 ease-out ${
                isHovered ? 'opacity-[0.95]' : 'opacity-70'
              }`}
            >
              <SmoothLoopVideo src={videoSrc} />
            </div>
          ) : (
            <div className="w-full h-full bg-black transition-colors duration-300" />
          )}

          {/* Centered Category Label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-2 text-center">
            <span
              className={`font-bold text-white tracking-wider text-xs sm:text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,0,0,0.85)] transition-all duration-300 ${
                isHovered ? 'scale-110 text-white' : 'scale-100 text-white/90'
              }`}
            >
              {label}
            </span>
          </div>
        </div>

        {/* 3. Green Halo Stroke on Hover (40% opacity) */}
        <svg
          viewBox="0 0 100 86.6"
          preserveAspectRatio="none"
          className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10 transition-opacity duration-500 ease-out ${
            isHovered ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <polygon
            points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
            fill="none"
            stroke="#548235"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </svg>

        {/* 4. 1px Stroke Border around Video Hexagon (White in light, Dark Gray in black theme) */}
        <VideoHexagonBorder isDark={isDark} strokeWidth={1} />
      </div>
    </>
  );
};

// 7 Core Industry Solutions (Directly from live site: transvolt.in/service)
const solutionsData = [
  {
    id: 'public-transport',
    title: 'Public Transport',
    subtitle: 'Intra-City & Inter-City Transit',
    icon: Bus,
    image: '/solutions/public_transport.jpg',
    tag: 'Municipal Concessioning (GCC)',
    impactBadge: 'Zero Tailpipe Emissions',
    highlightStats: [
      { label: 'Uptime Reliability', val: '98.5%+' },
      { label: 'Fleet Configurations', val: '9m & 12m AC' },
      { label: 'Contract Model', val: 'Gross Cost Contract' },
    ],
    description:
      'Transvolt provides eco-friendly EV buses for intra-city and inter-city public transport, supported by intelligent fleet management solutions. Our web-based application enables real-time tracking, route optimization, and predictive maintenance. We deliver sustainable mobility with smart technology, keeping your urban and long-distance fleets running efficiently.',
    capabilities: [
      'Intelligent real-time transit telemetry & passenger load monitoring',
      'Dynamic route planning & automated municipal schedule dispatch',
      'Predictive depot maintenance algorithms to eliminate mid-route breakdowns',
      'Full compliance with FAME-II, PM-eBus Sewa & state transport authority standards',
    ],
  },
  {
    id: 'employee-transport',
    title: 'Employee Transport',
    subtitle: 'Corporate Staff & Campus Mobility',
    icon: Users,
    image: '/solutions/employee_transport.jpg',
    tag: 'Corporate & Tech Parks',
    impactBadge: '100% Carbon-Neutral Commute',
    highlightStats: [
      { label: 'Punctuality Index', val: '99.2%' },
      { label: 'Safety Standards', val: 'AIS 140 GPS & Panic' },
      { label: 'Roster Automation', val: 'AI Smart Routing' },
    ],
    description:
      'Transvolt provides eco-friendly EV buses for safe and sustainable employee transportation solutions. Our end-to-end fleet management service includes real-time tracking, route optimization, and automated scheduling through our intelligent web-based platform. Designed for corporate needs, we ensure reliable, cost-effective, and carbon-neutral staff transportation with smart fleet monitoring and maintenance alerts.',
    capabilities: [
      'Automated shift roster scheduling with automated employee pickup sequencing',
      'AI-powered geo-fencing and real-time live trip tracking with SOS panic buttons',
      'Direct ESG reporting metrics with precise monthly carbon offset certification',
      'Premium air-conditioned silent cabins enhancing workforce comfort & productivity',
    ],
  },
  {
    id: 'cement-industry',
    title: 'Cement Industries',
    subtitle: 'Raw Material Transit & Heavy Bulk Haulage',
    icon: Building2,
    image: '/solutions/cement_industry.jpg',
    tag: 'Heavy Industrial Haulage',
    impactBadge: 'Heavy-Duty 55T GCW Capability',
    highlightStats: [
      { label: 'Load Capability', val: 'Up to 55,000 kg GCW' },
      { label: 'Operating Efficiency', val: '40%+ Cost Reduction' },
      { label: 'Duty Cycle', val: '24/7 Continuous Haulage' },
    ],
    description:
      'Transvolt provides eco-friendly EV trucks tailored for the cement industry, delivering sustainable and cost-effective logistics solutions. Our end-to-end fleet management service includes real-time load monitoring, route optimization, and automated dispatch through our AI-powered web platform. Designed for heavy-duty performance, we ensure reliable, low-emission transport with smart diagnostics and maintenance alerts.',
    capabilities: [
      'High-torque electric tractor units built for clinker, fly ash & bulk cement transit',
      'Real-time automated weighbridge load synchronization & payload diagnostics',
      'Fast automated battery swapping / multi-gun megawatt depot fast charging',
      'Ruggedized dust-sealed powertrains with IP67/IP69K battery enclosure protection',
    ],
  },
  {
    id: 'steel-industry',
    title: 'Steel Industries',
    subtitle: 'High-Temperature & Heavy Coil Logistics',
    icon: Layers,
    image: '/solutions/steel_industry.svg',
    tag: 'Heavy Metallurgical Transit',
    impactBadge: 'Engineered for Extreme Payloads',
    highlightStats: [
      { label: 'Instant Torque', val: '2,400+ Nm' },
      { label: 'Monitoring', val: '24/7 Smart Telematics' },
      { label: 'Reliability', val: 'Predictive AI Alerts' },
    ],
    description:
      'Transvolt delivers high-performance EV trucks engineered for the steel industry, offering durable, zero-emission transport for raw materials and finished products. Our integrated fleet management system features real-time weight monitoring, smart preventive maintenance (for specific steels), and optimized route planning via our AI-powered web platform. Built for heavy loads and demanding environments, our trucks ensure operational costs while ensuring 24/7 reliability with predictive maintenance alerts.',
    capabilities: [
      'Engineered for severe duty cycles: hot metal handling, steel coils, and heavy slabs',
      'Integrated axle weight sensors to prevent overload stress and optimize tire wear',
      'Smart preventive maintenance alerts preventing structural downtime',
      'Substantial noise and vibration reduction improving intra-plant workplace safety',
    ],
  },
  {
    id: 'mining',
    title: 'Mining',
    subtitle: 'Rugged Off-Road Haulage & Pit Logistics',
    icon: Truck,
    image: '/solutions/mining.png',
    tag: 'Severe Duty Off-Road',
    impactBadge: 'Slashing Fuel Costs by up to 60%',
    highlightStats: [
      { label: 'Fuel Slash', val: 'Up to 60% Savings' },
      { label: 'Heavy Tippers', val: '8x4 65,000 kg Off-Road' },
      { label: 'Standards', val: 'Tier 4 Emission Compliant' },
    ],
    description:
      'Provides rugged EV trucks built for the mining industry, delivering zero-emission haulage in even the toughest terrains. Our heavy-duty fleet solutions feature real-time payload analysis, gradeability tracking, and battery optimization through our cloud-based management platform. Engineered for extreme conditions, these trucks cut downtime with AI-driven maintenance alerts while slashing fuel costs by up to 60%. Transform your mine operations with smart, sustainable haulage that meets Tier 4 emission standards.',
    capabilities: [
      'Massive regenerative downhill braking that recharges batteries during descent',
      'Advanced gradeability telemetry & axle torque distribution on steep gradients',
      'Cloud-based payload analytics preventing under-loading and hazardous over-fill',
      'Reinforced high-tensile steel tipping bodies built for abrasive rock & mineral ores',
    ],
  },
  {
    id: 'ports',
    title: 'Ports',
    subtitle: 'Container Handling & Terminal Drayage',
    icon: Anchor,
    image: '/solutions/ports.jpg',
    tag: 'Maritime Harbor Logistics',
    impactBadge: '70% Noise Pollution Reduction',
    highlightStats: [
      { label: 'Acoustic Cut', val: '70% Lower decibels' },
      { label: 'Yard Routing', val: 'Automated Drayage' },
      { label: 'Compliance', val: '100% Green Port Regs' },
    ],
    description:
      'Delivers high-efficiency EV trucks designed for port logistics, enabling zero-emission container handling and sustainable terminal operations. Our port-optimized fleet solutions include real-time cargo tracking, automated yard navigation, and energy management through our centralized web platform. Built for 24/7 heavy cycles, these trucks reduce noise pollution by 70% while offering predictive maintenance to maximize uptime. Modernize your port\'s equipment with sustainable EV fleets that meet strict harbor emission regulations.',
    capabilities: [
      'Seamless integration with Terminal Operating Systems (TOS) & automated gate systems',
      'Ultra-efficient stop-and-go port cycle power management with zero idle emissions',
      'Substantial reduction in port acoustic pollution for enhanced operator safety',
      'High-speed yard tractor turning radius with automated container trailer hitching',
    ],
  },
  {
    id: 'general-cargo',
    title: 'General Cargo',
    subtitle: 'Last-Mile & Mid-Mile Supply Chain Logistics',
    icon: Package,
    image: '/solutions/general_cargo.svg',
    tag: 'Freight & FMCG Logistics',
    impactBadge: '40% Lower Operating Costs',
    highlightStats: [
      { label: 'Opex Savings', val: '40% Reduction' },
      { label: 'Coverage', val: 'Urban & Semi-Urban' },
      { label: 'Platform', val: 'AI Dynamic Dispatch' },
    ],
    description:
      'Provides versatile EV trucks and tempos for all general cargo needs, delivering eco-friendly last-mile and mid-mile logistics solutions. Our smart fleet management includes real-time load monitoring, dynamic route planning, and automated delivery tracking through our user-friendly web platform. Designed for urban and semi-urban operations, our vehicles reduce operating costs by 40% while offering superior battery life and maintenance-free service. Upgrade your cargo fleet sustainably with our reliable, tech-enabled EV transport – perfect for retailers, distributors, and logistics providers.',
    capabilities: [
      'Versatile electric delivery vehicles optimized for dense city traffic and regional distribution',
      'Dynamic multi-drop route optimization slashing deadhead kilometers',
      'Automated proof-of-delivery telematics and customer delivery ETAs',
      'Virtually maintenance-free electric drivetrains with long-life thermal management',
    ],
  },
];

// Certified OEM Fleet Partners & Technical Specifications (from live site)
const oemFleetPartners = [
  {
    name: 'Eka Mobility',
    model: '9m / 12m (AC / Non-AC)',
    category: 'Electric Bus',
    specs: [
      { label: '9m Capacity', val: 'D + 35 HB (2x2)' },
      { label: '12m Capacity', val: 'D + 43 HB (2x2)' },
      { label: 'Role', val: 'City & Inter-City Transit' },
    ],
    image: '/solutions/oem_eka.svg',
    website: 'https://ekamobility.com/portfolio/eka-12m/',
  },
  {
    name: 'VECV (Volvo Eicher)',
    model: '9m / 12m (AC)',
    category: 'Electric Bus',
    specs: [
      { label: '9m Capacity', val: 'D + 35 HB (2x2)' },
      { label: '12m Capacity', val: 'D + 43 HB (2x2)' },
      { label: 'Interior', val: 'High-Back Luxury Seating' },
    ],
    image: '/solutions/oem_vecv.svg',
    website: 'https://www.vecv.in/',
  },
  {
    name: 'IPL TECH (Montra Electric)',
    model: 'Montra 6x4TT',
    category: 'Heavy Electric Tractor',
    specs: [
      { label: 'Payload', val: '37,000 kg' },
      { label: 'Config', val: '6x4 Heavy Tractor' },
      { label: 'Segment', val: 'Heavy Bulk & Cement' },
    ],
    image: '/solutions/oem_ipl.svg',
    website: 'https://montraelectrictruck.com/',
  },
  {
    name: 'Propel Industries',
    model: '8x4 470 HEV Heavy Tipper',
    category: 'Mining & Construction Dumper',
    specs: [
      { label: 'On Road GVW', val: '35,000 kg' },
      { label: 'Off Road GVW', val: '65,000 kg' },
      { label: 'Application', val: 'Heavy Mining & Quarries' },
    ],
    image: '/solutions/oem_propel.png',
    website: 'https://www.propelind.com/propel-industries-470-hev-heavy-duty-electric-tipper-8x4-receives-homologation-certification/',
  },
  {
    name: 'EIM (Energy In Motion)',
    model: 'Ashwa 4x2',
    category: 'Electric Tractor Trailer',
    specs: [
      { label: 'Battery Type', val: 'Swappable LFP' },
      { label: 'Capacity', val: '282 kWh' },
      { label: 'GCW', val: '55,000 kg' },
    ],
    image: '/solutions/oem_eim.png',
    website: 'https://www.energyinmotion.in/',
  },
  {
    name: 'Blue Energy Motors',
    model: 'BE5548e',
    category: 'Heavy Electric Tractor',
    specs: [
      { label: 'Battery Chemistry', val: 'LFP Lithium Iron Phosphate' },
      { label: 'Capacity', val: '282 kWh (Swappable)' },
      { label: 'GCW', val: '55,000 kg' },
    ],
    image: '/solutions/oem_blueenergy.jpg',
    website: 'https://blueenergymotors.com/',
  },
  {
    name: 'QUCEV',
    model: 'Q55 Heavy EV',
    category: 'Electric Tractor Trailer',
    specs: [
      { label: 'Battery Cell', val: "BYD's Patented Blade Battery" },
      { label: 'Capacity', val: '301.6 kWh' },
      { label: 'GCW', val: '55,000 kg' },
    ],
    image: '/solutions/oem_qucev.jpg',
    website: 'https://qucev.com/',
  },
];

export const ServicesPage = ({ onNavigate }) => {
  const { isDark } = useTheme();

  // Hexagon Video Slots (4 Hexagons: Public Transport, Mine, Cement, Port)
  const [hexagonVideos, setHexagonVideos] = useState([
    {
      id: 1,
      num: '01',
      title: 'Public Transport',
      slot: 'Left Hexagon',
      videoSrc: '/services-videos/1_trimmed.mp4', // Municipal Electric Bus
    },
    {
      id: 2,
      num: '02',
      title: 'Mine',
      slot: 'Top Hexagon',
      videoSrc: '/services-videos/2.mp4', // Mining Pit Logistics
    },
    {
      id: 3,
      num: '03',
      title: 'Cement',
      slot: 'Bottom Hexagon',
      videoSrc: '/services-videos/3.mp4', // Cement Plant Haulage
    },
    {
      id: 4,
      num: '04',
      title: 'Port',
      slot: 'Right Hexagon',
      videoSrc: '/services-videos/4.mp4', // Port Container Logistics
    },
  ]);

  const [activeHexagon, setActiveHexagon] = useState(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState('public-transport');
  const activeSolution = solutionsData.find(s => s.id === selectedSolutionId) || solutionsData[0];

  // Auto-play timer & 1px duration progress line for Solutions Engineered for Scale
  const [isSolutionPlaying, setIsSolutionPlaying] = useState(true);
  const [solutionProgress, setSolutionProgress] = useState(0);

  useEffect(() => {
    if (!isSolutionPlaying) return;

    const stepMs = 50;
    const durationMs = 6000;
    const increment = (stepMs / durationMs) * 100;

    const timer = setInterval(() => {
      setSolutionProgress((prev) => {
        if (prev + increment >= 100) {
          setSelectedSolutionId((currId) => {
            const currIdx = solutionsData.findIndex((s) => s.id === currId);
            const nextIdx = (currIdx + 1) % solutionsData.length;
            return solutionsData[nextIdx].id;
          });
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isSolutionPlaying]);

  const handleSelectSolution = (id) => {
    setSelectedSolutionId(id);
    setSolutionProgress(0);
  };

  const oemScrollRef = useRef(null);

  const scrollOem = (direction) => {
    if (oemScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      oemScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Gradient Edge Fade Mask: 0% Opacity near ends for cards extending outside
  const [oemMask, setOemMask] = useState({ left: false, right: true });

  const handleOemScroll = () => {
    if (!oemScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = oemScrollRef.current;
    const canLeft = scrollLeft > 8;
    const canRight = scrollLeft < scrollWidth - clientWidth - 8;
    setOemMask((prev) => {
      if (prev.left === canLeft && prev.right === canRight) return prev;
      return { left: canLeft, right: canRight };
    });
  };

  // Charger Partners Carousel Ref & Scroll
  const chargerScrollRef = useRef(null);
  const [chargerMask, setChargerMask] = useState({ left: false, right: true });

  const scrollCharger = (direction) => {
    if (chargerScrollRef.current) {
      const scrollAmount = direction === 'left' ? -290 : 290;
      chargerScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleChargerScroll = () => {
    if (!chargerScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = chargerScrollRef.current;
    const canLeft = scrollLeft > 8;
    const canRight = scrollLeft < scrollWidth - clientWidth - 8;
    setChargerMask((prev) => {
      if (prev.left === canLeft && prev.right === canRight) return prev;
      return { left: canLeft, right: canRight };
    });
  };

  useEffect(() => {
    handleOemScroll();
    handleChargerScroll();
    const handleResize = () => {
      handleOemScroll();
      handleChargerScroll();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getChargerMaskStyle = () => {
    const fadeDistance = '56px';
    if (chargerMask.left && chargerMask.right) {
      return {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black calc(100% - ${fadeDistance}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black calc(100% - ${fadeDistance}), transparent 100%)`,
      };
    }
    if (chargerMask.left && !chargerMask.right) {
      return {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black 100%)`,
      };
    }
    if (!chargerMask.left && chargerMask.right) {
      return {
        WebkitMaskImage: `linear-gradient(to right, black 0%, black calc(100% - ${fadeDistance}), transparent 100%)`,
        maskImage: `linear-gradient(to right, black 0%, black calc(100% - ${fadeDistance}), transparent 100%)`,
      };
    }
    return {};
  };

  const getOemMaskStyle = () => {
    const fadeDistance = '64px';
    if (oemMask.left && oemMask.right) {
      return {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black calc(100% - ${fadeDistance}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black calc(100% - ${fadeDistance}), transparent 100%)`,
      };
    }
    if (oemMask.left && !oemMask.right) {
      return {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}, black 100%)`,
      };
    }
    if (!oemMask.left && oemMask.right) {
      return {
        WebkitMaskImage: `linear-gradient(to right, black 0%, black calc(100% - ${fadeDistance}), transparent 100%)`,
        maskImage: `linear-gradient(to right, black 0%, black calc(100% - ${fadeDistance}), transparent 100%)`,
      };
    }
    return {};
  };

  // Concessioning Authorities & Esteemed Clients (from transvolt.in/services)
  const clients = [
    { name: 'Mira Bhaindar Municipal Corp.', role: 'Concessioning Authority' },
    { name: 'Ulhasnagar Municipal Corp.', role: 'Concessioning Authority' },
    { name: 'Nagpur Municipal Corp.', role: 'Concessioning Authority' },
    { name: 'Tata Steel', role: 'Heavy EV Fleet Customer' },
    { name: 'UltraTech Cement', role: 'Raw Material Transit' },
    { name: 'Jindal Steel Limited (JSL)', role: 'Zero-Emission Logistics' },
    { name: 'J M Baxi Ports & Logistics', role: 'Port EV Fleet Concession' },
    { name: 'PSA Singapore Authority', role: 'Container Freight Movement' },
    { name: 'Star Cement', role: 'Limestone Supply Chain' },
    { name: 'Wonder Cement', role: 'Bulk Cement Logistics' },
  ];

  // Depot Fast-Charging & Infrastructure Partners with Authentic Deployment Data
  const chargerFleetPartners = [
    {
      name: 'Siemens',
      category: 'Megawatt Depot Charger',
      logo: '/chargers/siemens.jpg',
      deployment: 'Mira Bhaindar & Indore Municipal Fleet',
      powerRating: '240kW - 360kW DC',
      standard: 'CCS2 Dual Gun',
      uptime: '99.9% Uptime',
    },
    {
      name: 'Star Charge',
      category: 'Ultra-Fast DC Hub',
      logo: '/chargers/star_charge.png',
      deployment: 'Mira Bhaindar Municipal Corporation',
      powerRating: '180kW - 240kW Split',
      standard: 'CCS2 / Dynamic Power',
      uptime: '99.8% Uptime',
    },
    {
      name: 'Exicom',
      category: 'Heavy Industrial DC',
      logo: '/chargers/exicom.jpg',
      deployment: 'Wonder Cement Raw Material Transit',
      powerRating: '200kW Fast Dispenser',
      standard: 'CCS2 / AIS138',
      uptime: '99.7% Uptime',
    },
    {
      name: 'Tirex Transmission',
      category: 'Depot Fast Charger',
      logo: '/chargers/tirex.svg',
      deployment: 'Bhopal City EV Bus Network',
      powerRating: '120kW - 240kW Dual',
      standard: 'CCS2 Fast Charging',
      uptime: '99.8% Uptime',
    },
    {
      name: 'Mindra',
      category: 'Heavy Mining EV Charger',
      logo: '/chargers/mindra.png',
      deployment: 'UltraTech Cement Dhar Heavy Fleet',
      powerRating: '240kW High-Amp Heavy DC',
      standard: 'Heavy EV CCS2',
      uptime: '99.9% Uptime',
    },
    {
      name: 'Klickwatt',
      category: 'High-Power Depot Charger',
      logo: '/chargers/klickwatt.png',
      deployment: 'Mira Bhaindar & Ulhasnagar Concession',
      powerRating: '180kW Ultra-Fast DC',
      standard: 'CCS2 Liquid/Air-Cooled',
      uptime: '99.7% Uptime',
    },
    {
      name: 'TKT Chargers',
      category: 'Heavy Steel Transit DC',
      logo: '/chargers/tkt.png',
      deployment: 'Jindal Steel Limited (JSL) Project',
      powerRating: '240kW Heavy Duty Dispenser',
      standard: 'CCS2 Multi-Vehicle',
      uptime: '99.8% Uptime',
    },
    {
      name: 'VNT Chargers',
      category: 'Megawatt Bus Fast Charger',
      logo: '/chargers/vnt.png',
      deployment: 'Inter-City & Transit Depots',
      powerRating: '180kW - 300kW High-Speed',
      standard: 'Dual CCS2 Gun',
      uptime: '99.7% Uptime',
    },
    {
      name: 'EIM (Energy In Motion)',
      category: 'Battery Swap & Port DC',
      logo: '/chargers/eim.png',
      deployment: 'J M Baxi Ports & Logistics Terminals',
      powerRating: 'Fast Swappable / High-C DC',
      standard: 'Automated Port Swapping',
      uptime: '99.9% Uptime',
    },
  ];

  // Fleet Monitoring Application Core Capabilities
  const fleetCapabilities = [
    {
      title: 'Monitor Fleet Performance in Real-Time',
      desc: 'Track EV location, battery status, charging patterns, and maintenance needs seamlessly.',
    },
    {
      title: 'Optimize Routes for Maximum Efficiency',
      desc: 'AI-driven insights minimize unnecessary mileage and energy consumption.',
    },
    {
      title: 'Enhance Driver Safety & Compliance',
      desc: 'Receive alerts for aggressive driving, speeding, or unauthorized vehicle use.',
    },
    {
      title: 'Reduce Operational Costs',
      desc: 'Extend battery life and optimize charging schedules with predictive analytics.',
    },
    {
      title: 'Boost Sustainability',
      desc: 'Lower your carbon footprint by eliminating inefficiencies and maximizing energy efficiency.',
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-slate-50 dark:bg-[#000000] text-gray-900 dark:text-white select-none transition-colors duration-300">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="fixed top-24 left-10 w-[500px] h-[500px] bg-[#548235]/[0.04] dark:bg-[#548235]/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-24 right-10 w-[500px] h-[500px] bg-[#4472C4]/[0.04] dark:bg-[#4472C4]/[0.08] rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* SECTION 1: ZERO EMISSION PLATFORM & 4 VERTICAL VIDEO CAPSULES (HERO)       */}
      {/* ========================================================================= */}
      <section id="services-section-0" className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-16 px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 max-w-[1780px] mx-auto scroll-mt-20">
        
        {/* Main 2-Column Grid: Left (Nice UI Content) & Right (Hexagon Shape Cluster) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* ---------------------------------------------------- */}
          {/* LEFT SIDE: Image 1 Content Designed in Nice UI        */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col space-y-6 w-full">
            

            {/* Main Header (from Image 1) */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.15] text-gray-950 dark:text-white">
                Transvolt's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#548235] to-[#2e7d32] dark:from-[#72B347] dark:to-[#4ade80]">
                  Zero Emission
                </span>{' '}
                Platform
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                Integrated B2G, B2B, and B2C commercial e-mobility infrastructure for India.
              </p>
            </div>

            {/* Impact Vision Quote Card (from Top of Image 1) */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#548235]/10 via-[#4472C4]/10 to-transparent p-4 sm:p-5 border-l-4 border-[#548235] border-y border-r border-gray-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
              <p className="text-sm sm:text-[15.5px] font-semibold text-gray-900 dark:text-gray-100 leading-relaxed italic">
                “We want to empower the freedom to move in a clean, green and quiet environment with safety.”
              </p>
            </div>

            {/* Ecosystem Narrative (from Top/Middle of Image 1) */}
            <p className="text-xs sm:text-[13.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
              Transvolt works towards the development &amp; operation of an integrated and connected ecosystem wherein everyone has access to clean, green, and quiet transportation solutions across the <strong>B2G, B2C, and B2B</strong> domains. We make the entire ecosystem sustainable and accessible for all users — children, pregnant women, senior citizens, and specially-abled friends.
            </p>

            {/* Core Operational Verticals & Inclusivity UI Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Tile 1: B2G */}
              <div className="group p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0D1525] border border-[#548235]/35 dark:border-[#548235]/45 hover:border-[#548235] dark:hover:border-[#72B347] shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#548235]/10 text-[#548235] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white tracking-tight">
                  B2G Municipal Concessions
                </h4>
              </div>

              {/* Tile 2: B2B */}
              <div className="group p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0D1525] border border-[#4472C4]/35 dark:border-[#4472C4]/45 hover:border-[#4472C4] dark:hover:border-[#6893DF] shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#4472C4]/10 text-[#4472C4] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white tracking-tight">
                  B2B Heavy Haulage &amp; Logistics
                </h4>
              </div>

              {/* Tile 3: B2C */}
              <div className="group p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0D1525] border border-[#548235]/35 dark:border-[#548235]/45 hover:border-[#548235] dark:hover:border-[#72B347] shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#548235]/10 text-[#548235] flex items-center justify-center shrink-0">
                  <Bus className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white tracking-tight">
                  B2C Smart Public Transit
                </h4>
              </div>

              {/* Tile 4: Accessible */}
              <div className="group p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0D1525] border border-[#548235]/35 dark:border-[#548235]/45 hover:border-[#548235] dark:hover:border-[#72B347] shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#548235]/10 text-[#548235] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white tracking-tight">
                  Specially-Abled &amp; Senior Accessible
                </h4>
              </div>
            </div>

            {/* Detailed Fleet & Charging Highlights (from Bottom of Image 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0D1525] border border-gray-200/90 dark:border-white/10 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#548235] font-bold text-xs uppercase tracking-wide">
                  <Truck className="w-4 h-4" />
                  <span>Heavy-Duty EV Fleet</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Advanced EV trucks and tippers engineered to withstand heavy-duty mining, construction, steel, and port logistics with zero tailpipe emissions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0D1525] border border-gray-200/90 dark:border-white/10 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#4472C4] font-bold text-xs uppercase tracking-wide">
                  <Zap className="w-4 h-4" />
                  <span>Megawatt Depot Charging</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Turnkey depot charging infrastructure and smart battery management ensuring seamless vehicle uptime and optimized energy costs.
                </p>
              </div>
            </div>



          </div>


          {/* ---------------------------------------------------- */}
          {/* RIGHT SIDE: Hexagon Shape Showcase Cluster (4 Gray Video Slots Diamond) */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center lg:items-end w-full">
            <div className="relative w-full max-w-[784px] aspect-[446/282] select-none">
              
              {/* Dynamic Constellation Network (Behind & Surrounding Hexagons - Portfolio V2/V3 Style) */}
              <ConstellationNetwork
                isDark={isDark}
                className="absolute -inset-10 sm:-inset-16 lg:-inset-24 z-0 pointer-events-none"
              />

              {/* 1. Accent Hexagon: Bottom-Left (Small) */}
              <HexagonStroke
                isHovered={activeHexagon === 5}
                style={{
                  left: '14.80%',
                  top: '75.53%',
                  width: '15.92%',
                  height: '22.70%',
                }}
              />
              <div
                onMouseEnter={() => setActiveHexagon(5)}
                onMouseLeave={() => setActiveHexagon(null)}
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  left: '14.80%',
                  top: '75.53%',
                  width: '15.92%',
                  height: '22.70%',
                  transformOrigin: 'center center',
                }}
                className={`absolute bg-[#EEF3EF] dark:bg-[#1A2420] transition-all duration-500 ease-out cursor-pointer ${
                  activeHexagon === 5
                    ? 'scale-[1.30] z-30 shadow-xl'
                    : 'scale-100 z-10'
                }`}
              />

              {/* 2. Accent Hexagon: Top-Right (Small) */}
              <HexagonStroke
                isHovered={activeHexagon === 6}
                style={{
                  left: '83.86%',
                  top: '14.89%',
                  width: '16.14%',
                  height: '22.00%',
                }}
              />
              <div
                onMouseEnter={() => setActiveHexagon(6)}
                onMouseLeave={() => setActiveHexagon(null)}
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  left: '83.86%',
                  top: '14.89%',
                  width: '16.14%',
                  height: '22.00%',
                  transformOrigin: 'center center',
                }}
                className={`absolute bg-[#EEF3EF] dark:bg-[#1A2420] transition-all duration-500 ease-out cursor-pointer ${
                  activeHexagon === 6
                    ? 'scale-[1.30] z-30 shadow-xl'
                    : 'scale-100 z-10'
                }`}
              />

              {/* 3. Video Hexagon 1: Left (Video Slot 1 - Public Transport) */}
              <VideoHexagon
                id={1}
                label="Public Transport"
                style={{
                  left: '0%',
                  top: '25.53%',
                  width: '35.43%',
                  height: '48.94%',
                }}
                videoSrc={hexagonVideos[0]?.videoSrc}
                isDark={isDark}
                activeHexagon={activeHexagon}
                setActiveHexagon={setActiveHexagon}
              />

              {/* 4. Video Hexagon 2: Top-Center (Video Slot 2 - Mine) */}
              <VideoHexagon
                id={2}
                label="Mine"
                style={{
                  left: '27.80%',
                  top: '0%',
                  width: '35.65%',
                  height: '48.94%',
                }}
                videoSrc={hexagonVideos[1]?.videoSrc}
                isDark={isDark}
                activeHexagon={activeHexagon}
                setActiveHexagon={setActiveHexagon}
              />

              {/* 5. Video Hexagon 3: Bottom-Center (Video Slot 3 - Cement) */}
              <VideoHexagon
                id={3}
                label="Cement"
                style={{
                  left: '28.03%',
                  top: '51.06%',
                  width: '35.43%',
                  height: '48.94%',
                }}
                videoSrc={hexagonVideos[2]?.videoSrc}
                isDark={isDark}
                activeHexagon={activeHexagon}
                setActiveHexagon={setActiveHexagon}
              />

              {/* 6. Video Hexagon 4: Right (Video Slot 4 - Port) */}
              <VideoHexagon
                id={4}
                label="Port"
                style={{
                  left: '56.28%',
                  top: '25.53%',
                  width: '35.65%',
                  height: '48.94%',
                }}
                videoSrc={hexagonVideos[3]?.videoSrc}
                isDark={isDark}
                activeHexagon={activeHexagon}
                setActiveHexagon={setActiveHexagon}
              />

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INDUSTRY SOLUTIONS & CERTIFIED OEM FLEETS (COMPACT VERTICAL)   */}
      {/* ========================================================================= */}
      <section id="services-section-1" className="relative z-10 w-full py-8 sm:py-10 bg-slate-50/50 dark:bg-[#070B12] border-t border-gray-200/80 dark:border-white/10 scroll-mt-20">
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 space-y-5 sm:space-y-6">
          
          {/* Compact Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-gray-200/60 dark:border-white/10">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Solutions Engineered for Scale
              </h2>
            </div>
            <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 max-w-md sm:text-right">
              Turnkey heavy EV fleet deployment across 7 core B2G &amp; B2B industrial sectors in India.
            </p>
          </div>

          {/* 7 Industry Selector Pills / Filter Navigation */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {solutionsData.map((sol) => {
                const IconComponent = sol.icon;
                const isSelected = sol.id === selectedSolutionId;
                return (
                  <button
                    key={sol.id}
                    onClick={() => handleSelectSolution(sol.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ease-out cursor-pointer ${
                      isSelected
                        ? 'bg-[#548235] text-white shadow-md shadow-[#548235]/30 ring-2 ring-[#548235]/40 scale-[1.02]'
                        : 'bg-white dark:bg-[#0F172A] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#548235]/40 hover:bg-slate-100 dark:hover:bg-[#152033]'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 transition-colors duration-200 ${isSelected ? 'text-white' : 'text-[#548235] dark:text-[#72B347]'}`} />
                    <span>{sol.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SOLUTION HERO SPOTLIGHT (GRAY BG & CRISP WHITE TEXT WITH SMOOTH CROSSFADE) */}
          <div className="relative bg-[#272B33] rounded-2xl border border-gray-600/50 shadow-xl overflow-hidden lg:h-[370px]">
            {/* Top Right Corner Play / Pause Button - Highlighted */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <button
                type="button"
                onClick={() => setIsSolutionPlaying((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs backdrop-blur-md transition-all duration-200 cursor-pointer select-none shadow-md hover:scale-105 active:scale-95 ${
                  isSolutionPlaying
                    ? 'bg-[#548235] hover:bg-[#44692a] text-white border border-emerald-300/50 shadow-emerald-950/40 ring-2 ring-[#548235]/50'
                    : 'bg-amber-500 hover:bg-amber-600 text-white border border-amber-300/50 shadow-amber-950/40 ring-2 ring-amber-500/50'
                }`}
                title={isSolutionPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
                aria-label={isSolutionPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
              >
                {isSolutionPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    <span className="text-[11px] font-mono tracking-wide font-bold">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-white" />
                    <span className="text-[11px] font-mono tracking-wide font-bold">Play</span>
                  </>
                )}
              </button>
            </div>

            <div key={activeSolution.id} className="grid grid-cols-1 lg:grid-cols-12 h-full animate-solution-fade">
              
              {/* Visual Column (5 Cols) - Locked Height */}
              <div className="lg:col-span-5 relative h-[220px] sm:h-[260px] lg:h-full overflow-hidden bg-slate-900">
                <img
                  key={activeSolution.image}
                  src={activeSolution.image}
                  alt={activeSolution.title}
                  className="w-full h-full object-cover animate-solution-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {activeSolution.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-[#548235]/90 backdrop-blur-md text-white shadow-md">
                    {activeSolution.impactBadge}
                  </span>
                </div>

                {/* Bottom Highlight Stats on Image - Exactly Same Style as Home Page 2 Tile */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl sm:rounded-2xl bg-gray-500/10 backdrop-blur-md border border-white/10 shadow-lg text-white">
                    {activeSolution.highlightStats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] sm:text-[10.5px] font-semibold text-white/90 tracking-wide uppercase leading-tight mb-0.5 drop-shadow-sm">
                          {stat.label}
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-white tracking-tight drop-shadow-md truncate">
                          {stat.val}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Column (7 Cols) - Gray Background with All White Text */}
              <div className="lg:col-span-7 p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full overflow-hidden bg-[#272B33]">
                <div className="space-y-2 overflow-hidden">
                  {/* Category & Title */}
                  <div className="pr-20 sm:pr-24">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                      {activeSolution.subtitle}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      {activeSolution.title}
                    </h3>
                  </div>

                  {/* Description - Crisp White/90 */}
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal line-clamp-3">
                    {activeSolution.description}
                  </p>

                  {/* 2-Column Capabilities Checklist - White Text */}
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Key Capabilities &amp; Telematics
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {activeSolution.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] sm:text-xs text-white font-medium leading-tight line-clamp-2">
                            {cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row - Pinned Permanently at Bottom */}
                <div className="pt-2.5 border-t border-white/15 flex items-center justify-between gap-3 mt-auto">
                  <button
                    onClick={() => onNavigate && onNavigate(4)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#548235] hover:bg-[#43692a] text-white text-xs font-bold shadow transition-all duration-200 cursor-pointer group"
                  >
                    <span>Deploy {activeSolution.title} EV Fleet</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('oem-partners-spec-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>OEM Specs Below</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* 1. Duration Progress Line: 2px thickness at bottom of big gray tile */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 pointer-events-none">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-[#548235] to-teal-400 shadow-[0_0_8px_rgba(84,130,53,0.8)]"
                style={{
                  width: `${solutionProgress}%`,
                  transition: isSolutionPlaying ? 'width 50ms linear' : 'none',
                }}
              />
            </div>
          </div>

          {/* OEM PARTNERS SECTION WITH GENEROUS BREATHING SPACE & CAPSULE ARROWS */}
          <div id="oem-partners-spec-anchor" className="space-y-4 pt-6 border-t border-gray-200/60 dark:border-white/10">
            {/* Headline and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#4472C4] dark:text-[#6893DF] uppercase tracking-widest">
                  CERTIFIED VEHICLE PLATFORMS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                  OEM Partner
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                  Homologated heavy electric commercial vehicle partnerships powering Transvolt fleets across India.
                </p>
              </div>
            </div>

            {/* Carousel Container with Small Vertical Capsule Arrows */}
            <div className="relative group/carousel">
              {/* Left Vertical Capsule Arrow (Floating on track edge) */}
              <button
                onClick={() => scrollOem('left')}
                aria-label="Scroll left"
                className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-7 h-12 sm:h-14 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-lg hover:bg-[#548235] hover:text-white hover:border-[#548235] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* Scrollable Track with Gradient Edge Fade Mask & Frameless Minimalist Scrollbar */}
              <div
                ref={oemScrollRef}
                onScroll={handleOemScroll}
                style={getOemMaskStyle()}
                className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto clean-scrollbar scroll-smooth pt-2 pb-4 px-1 snap-x snap-mandatory"
              >
                {oemFleetPartners.map((oem, idx) => (
                  <div
                    key={idx}
                    className="w-[270px] sm:w-[295px] shrink-0 snap-start bg-white dark:bg-[#0D1525] rounded-2xl border border-gray-200/90 dark:border-white/10 p-5 shadow-sm hover:shadow-xl hover:border-[#548235]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Vehicle Showcase Image Box */}
                      <div className="w-full h-36 sm:h-40 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-white/[0.04] dark:to-white/[0.01] flex items-center justify-center p-3 overflow-hidden border border-gray-100 dark:border-white/5 relative">
                        <img
                          src={oem.image}
                          alt={oem.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/70 backdrop-blur-sm text-[#548235] dark:text-[#72B347] border border-gray-200/60 dark:border-white/10">
                          {oem.category}
                        </span>
                      </div>

                      {/* Brand & Model */}
                      <div className="space-y-0.5">
                        <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-[#548235] transition-colors">
                          {oem.name}
                        </h4>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {oem.model}
                        </p>
                      </div>

                      {/* Technical Specs with Clean Spacing */}
                      <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-white/5">
                        {oem.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start justify-between text-xs py-0.5">
                            <span className="text-gray-400 dark:text-gray-400 font-medium">{spec.label}</span>
                            <span className="font-bold text-gray-800 dark:text-gray-200 text-right ml-2">{spec.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dossier Link Button */}
                    <div className="pt-4 mt-3">
                      <a
                        href={oem.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#548235] hover:text-white text-gray-700 dark:text-gray-200 text-xs font-bold transition-all duration-200 shadow-sm group-hover:shadow"
                      >
                        <span>View Specifications</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Vertical Capsule Arrow (Floating on track edge) */}
              <button
                onClick={() => scrollOem('right')}
                aria-label="Scroll right"
                className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-7 h-12 sm:h-14 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-lg hover:bg-[#548235] hover:text-white hover:border-[#548235] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* DEPOT FAST-CHARGING & INFRASTRUCTURE PARTNERS (BELLOW OEM PARTNER) */}
          <div className="space-y-4 pt-6 border-t border-gray-200/60 dark:border-white/10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#548235] dark:text-[#72B347] uppercase tracking-widest flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  HIGH-VOLTAGE POWER INFRASTRUCTURE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                  Depot Fast-Charging &amp; Infrastructure Partners
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                  Turnkey megawatt-ready depot charging partnerships powering continuous 24/7 commercial EV fleet uptime.
                </p>
              </div>

              <span className="hidden sm:inline-flex text-[11px] font-mono text-gray-400 dark:text-gray-400">
                Megawatt-Ready Interoperable Standards
              </span>
            </div>

            {/* Charger Partners Carousel with Floating Edge Capsule Arrows & Gradient Mask */}
            <div className="relative group/chargerCarousel">
              {/* Left Vertical Capsule Arrow */}
              <button
                onClick={() => scrollCharger('left')}
                aria-label="Scroll left"
                className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-7 h-12 sm:h-14 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-lg hover:bg-[#548235] hover:text-white hover:border-[#548235] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* Scrollable Track with Gradient Edge Fade Mask & Frameless Minimalist Scrollbar */}
              <div
                ref={chargerScrollRef}
                onScroll={handleChargerScroll}
                style={getChargerMaskStyle()}
                className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto clean-scrollbar scroll-smooth pt-2 pb-4 px-1 snap-x snap-mandatory"
              >
                {chargerFleetPartners.map((cp, idx) => (
                  <div
                    key={idx}
                    className="w-[245px] sm:w-[265px] shrink-0 snap-start bg-[#F2F8F0] dark:bg-[#0A150F] rounded-2xl border border-[#548235]/25 dark:border-[#548235]/35 p-4 sm:p-4.5 shadow-sm hover:shadow-xl hover:border-[#548235] hover:shadow-[#548235]/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Top Subtle Hover Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#548235] to-[#4472C4] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-3">
                      {/* Logo Stage */}
                      <div className="w-full h-24 rounded-xl bg-white dark:bg-white/[0.06] flex items-center justify-center p-3 border border-[#548235]/15 dark:border-white/10 relative shadow-xs">
                        <img
                          src={cp.logo}
                          alt={cp.name}
                          className="max-h-full max-w-[85%] object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold bg-[#548235]/15 text-[#548235] dark:text-[#72B347] border border-[#548235]/25">
                          {cp.powerRating}
                        </span>
                      </div>

                      {/* Brand & Category */}
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-[#548235] transition-colors">
                          {cp.name}
                        </h4>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#548235] dark:text-[#72B347]">
                          {cp.category}
                        </p>
                      </div>

                      {/* Deployed Project Callout */}
                      <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-[#548235]/20 dark:border-white/5 space-y-0.5">
                        <span className="text-[9px] font-mono uppercase text-[#548235] dark:text-[#72B347] block font-bold">
                          Active Concession
                        </span>
                        <p className="text-[11px] font-medium text-gray-800 dark:text-gray-200 leading-snug line-clamp-2">
                          {cp.deployment}
                        </p>
                      </div>
                    </div>

                    {/* Technical Specs Footer */}
                    <div className="pt-3 mt-3 border-t border-[#548235]/15 dark:border-white/10 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-gray-500 dark:text-gray-400 font-medium">
                        {cp.standard}
                      </span>
                      <span className="font-bold text-[#548235] dark:text-[#72B347] font-mono">
                        {cp.uptime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Vertical Capsule Arrow */}
              <button
                onClick={() => scrollCharger('right')}
                aria-label="Scroll right"
                className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-6 sm:w-7 h-12 sm:h-14 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-lg hover:bg-[#548235] hover:text-white hover:border-[#548235] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FLEET MONITORING APPLICATIONS & TELEMATICS ECOSYSTEM (UNIFORM) */}
      {/* ========================================================================= */}
      <section id="services-section-2" className="relative z-10 w-full py-8 sm:py-10 bg-slate-50/50 dark:bg-[#070B12] border-t border-gray-200/80 dark:border-white/10 scroll-mt-20">
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 space-y-6 sm:space-y-7">
          
          {/* Section Header: Uniform with Section 2 */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-2 border-b border-gray-200/60 dark:border-white/10">
            <div className="space-y-1 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Fleet Monitoring Applications
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                In the era of electric mobility, efficient fleet management is key to maximizing performance and sustainability. Unoptimized routes, excessive energy consumption, and unmonitored vehicle health can drain your resources and hinder your progress. That's where we come in—your trusted partner in intelligent EV fleet monitoring and control.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 text-[11px] font-mono text-gray-600 dark:text-gray-300 shrink-0 self-start">
              <span className="w-2 h-2 rounded-full bg-[#548235] animate-pulse"></span>
              <span>Live Telematics 24/7</span>
            </div>
          </div>

          {/* Main 2-Column Showcase: Left (Why Choose Us) & Right (Visual Hero & HUD) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            
            {/* Left Column: Why Choose Us (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0D1525] p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-3.5">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#548235] rounded-full"></span>
                  Why Choose Us?
                </h3>
                <p className="text-xs sm:text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  We deliver advanced web-based software, real-time dashboards, and intuitive mobile applications designed to give you complete visibility and control over your electric fleet.
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-300 pt-0.5">
                  Our solutions empower businesses to:
                </p>
              </div>

              {/* 5 Capability Checkpoints (Compact & Uniform) */}
              <div className="space-y-2">
                {fleetCapabilities.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 flex items-start gap-2.5 group hover:border-[#548235]/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#548235] dark:text-[#72B347] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal block">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Fleet Monitoring Application Hero & Live Telematics HUD */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-slate-900 border border-gray-200/80 dark:border-white/10 shadow-sm relative flex flex-col justify-between min-h-[300px] lg:min-h-0">
              <img
                src="/solutions/fleet_monitoring.png"
                alt="Transvolt Fleet Monitoring Application"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Live Telematics Active Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Telematics</span>
              </div>

              {/* Bottom HUD Metrics Overlay (Proportionate) */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-lg space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-300 border-b border-white/10 pb-1.5">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Gauge className="w-3 h-3" />
                    TRANSVOLT IOT CLOUD
                  </span>
                  <span className="font-mono text-white/80">LATENCY &lt; 85ms</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center pt-0.5">
                  <div>
                    <div className="text-[9.5px] text-gray-400 font-medium">Uptime Index</div>
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-400">99.8%</div>
                  </div>
                  <div>
                    <div className="text-[9.5px] text-gray-400 font-medium">Diagnostics</div>
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-400">AIS140 GPS</div>
                  </div>
                  <div>
                    <div className="text-[9.5px] text-gray-400 font-medium">Efficiency Boost</div>
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-400">+24.5%</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Seamless Control at Your Fingertips & CTA (Compact & Uniform) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#111827] text-white border border-white/10 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Connected Cockpit
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    ⚡ Drive Smarter. Conserve Energy. Sustain the Future.
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Seamless Control at Your Fingertips
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  Whether you're in the office or on the move, our user-friendly dashboards and mobile apps keep you connected to your EV fleet 24/7. Make smarter decisions, improve productivity, and accelerate your transition to a greener future—all from one powerful platform.
                </p>

                <p className="text-[11px] text-gray-400 leading-relaxed pt-0.5">
                  Join forward-thinking businesses that rely on us to transform their electric fleets into high-performing, cost-efficient, and eco-conscious assets. Let's electrify your mobility business together!
                </p>
              </div>

              {/* Action Button (Uniform with Section 2 Buttons) */}
              <div className="shrink-0 flex flex-col items-start lg:items-end justify-center">
                <button
                  onClick={() => onNavigate && onNavigate(4)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#548235] hover:bg-[#43692a] text-white text-xs font-bold shadow-md transition-all duration-200 group cursor-pointer active:scale-95"
                >
                  <span>Contact for Introduction</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <span className="text-[10px] font-mono text-gray-400 mt-1.5 text-left lg:text-right">
                  Custom EV Telematics Demo
                </span>
              </div>
            </div>
          </div>

          {/* Esteemed Customers & Municipal Authorities */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200/60 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#548235] dark:text-[#72B347] uppercase tracking-wider">
                  OPERATIONAL FLEET FOOTPRINT
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                  Concessioning Authorities &amp; Industrial Customers
                </h3>
              </div>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                10+ Major Municipal &amp; Industrial Concessions
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {clients.map((c) => (
                <div
                  key={c.name}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#0D1525] border border-gray-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between text-center space-y-1.5 hover:border-[#548235] transition-colors"
                >
                  <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[10px] font-mono text-[#548235] dark:text-[#72B347]">
                    {c.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ServicesPage;

