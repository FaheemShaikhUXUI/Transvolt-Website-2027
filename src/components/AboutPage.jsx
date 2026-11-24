import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { indiaMapData } from '../data/indiaMapData';
import { MapPin, Check, ChevronRight, X, ShieldCheck, Zap, Sparkles, HeartHandshake, Maximize2, Shield, ClipboardList, Heart, Leaf, Globe, Users, Linkedin, ExternalLink, Activity, ArrowUpRight, Search, Play, Pause } from 'lucide-react';

export const AboutPage = ({ currentSection = 0, onNavigate }) => {
  const { isDark } = useTheme();
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState('mh'); // Default selected: Maharashtra
  const [selectedCityId, setSelectedCityId] = useState('mumbai'); // Default selected: Mumbai
  const [showCertModal, setShowCertModal] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [prevSlideIdx, setPrevSlideIdx] = useState(0);
  const [activePillarTab, setActivePillarTab] = useState('beliefs'); // 'beliefs' | 'vision' | 'values'
  const cardsContainerRef = useRef(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [activeTeamTab, setActiveTeamTab] = useState('founders'); // 'founders' | 'team'
  const [activePartnerFilter, setActivePartnerFilter] = useState('concessions'); // 'concessions' | 'oem' | 'chargers' | 'all'
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');

  const partnersData = [
    // Clients & Concessioning Authorities
    {
      id: 'mbmt',
      name: 'Mira Bhaindar Municipal Corporation',
      role: 'Concessioning Authority',
      category: 'concessions',
      categoryLabel: 'Concessioning Authority',
      logo: '/assets/MBMT-Partner-BsD9v2dv.png',
    },
    {
      id: 'umc',
      name: 'Ulhasnagar Municipal Corporation',
      role: 'Concessioning Authority',
      category: 'concessions',
      categoryLabel: 'Concessioning Authority',
      logo: '/assets/Ulhasnagar_Partner-e4_LykLY.png',
    },
    {
      id: 'nmc',
      name: 'Nagpur Municipal Corporation',
      role: 'Concessioning Authority',
      category: 'concessions',
      categoryLabel: 'Concessioning Authority',
      logo: '/assets/nagpur_municipal-DS8y9ERm.jpg',
    },
    {
      id: 'vecv-customer',
      name: 'VE Commercial Vehicles Ltd. (VECV)',
      role: 'Our Esteemed Customer',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/VECV-logo-TB_O5BqB.png',
    },
    {
      id: 'star-cement',
      name: 'Star Cement',
      role: 'Movement of Limestone & Cement Logistics',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/StarCement-BNa6w9Cl.jpg',
    },
    {
      id: 'ultratech',
      name: 'UltraTech Cement',
      role: 'Industrial Electric Freight Corridor Partner',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/ultratech_cement_logo-EAFihHtx.png',
    },
    {
      id: 'gti',
      name: 'Gateway Terminals India',
      role: 'Port Terminal Logistics & Container Haulage',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/gateway_terminals_india.png',
    },
    {
      id: 'jm-baxi',
      name: 'J M Baxi Ports & Logistics',
      role: 'Port Terminal Infrastructure & Freight Corridor',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/jm-main-logo-CVd1H-7Z.svg',
    },
    {
      id: 'wonder-cement',
      name: 'Wonder Cement',
      role: 'Heavy Industrial Raw Material EV Freight',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/WCL-CVHUatqj.png',
    },
    {
      id: 'psa',
      name: 'PSA (Port of Singapore Authority)',
      role: 'Global Port Maritime Terminal Operations',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/PSA-0jgLuCXH.jpg',
    },
    {
      id: 'jindal-steel',
      name: 'Jindal Steel Limited',
      role: 'Internal Plant & Long-Haul Steel Logistics',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/Jindal_Steel-Bh7b9jw1.png',
    },
    {
      id: 'tata-steel',
      name: 'Tata Steel',
      role: 'Heavy Commercial Zero-Emission Steel Haulage',
      category: 'concessions',
      categoryLabel: 'Esteemed Customer',
      logo: '/assets/TATA_STEEL-6kZtckyK.svg',
    },

    // OEM Partners
    {
      id: 'pinnacle',
      name: 'Pinnacle Mobility Solution Pvt. Ltd.',
      role: 'OEM Bus Supplier & JV Partner for Mira Bhaindar, Ulhasnagar & Nagpur Projects',
      category: 'oem',
      categoryLabel: 'OEM & JV Partner',
      logo: '/assets/pinnacle_mobility.png',
    },
    {
      id: 'vecv-oem',
      name: 'VE Commercial Vehicles Ltd. (VECV)',
      role: 'OEM Commercial Electric Bus Supplier',
      category: 'oem',
      categoryLabel: 'OEM Partner',
      logo: '/assets/VECV-logo-TB_O5BqB.png',
    },
    {
      id: 'propel',
      name: 'Propel',
      role: 'OEM EV-Dumper Heavy Truck Supplier',
      category: 'oem',
      categoryLabel: 'OEM Partner',
      logo: '/assets/propel_ev.png',
    },
    {
      id: 'montra',
      name: 'Montra Electric',
      role: 'Manufacturer of Electric Trucks & Mobility Solutions',
      category: 'oem',
      categoryLabel: 'OEM Partner',
      logo: '/assets/montra_electric-COck9xNJ.png',
    },
    {
      id: 'eim-oem',
      name: 'EIM (Energy In Motion)',
      role: 'OEM & Charging Infrastructure Technology Partner',
      category: 'oem',
      categoryLabel: 'OEM Partner',
      logo: '/assets/eim_energy_in_motion.jpg',
    },
    {
      id: 'blue-energy',
      name: 'Blue Energy Motors',
      role: 'Manufacturer of Heavy Zero-Emission Commercial Trucks',
      category: 'oem',
      categoryLabel: 'OEM Partner',
      logo: '/assets/Blue_Energy_Logo-B6BHqNTf.svg',
    },
    {
      id: 'qucev',
      name: 'QUCEV',
      role: 'Manufacturer of Electric Trucks & Fleet Solutions',
      category: 'oem',
      categoryLabel: 'OEM Partner',
      logo: '/assets/qucev_ev.png',
    },

    // Charger & CPO Partners
    {
      id: 'klickwatt',
      name: 'Klickwatt',
      role: 'Charge Point Operator for Mira Bhaindar & Ulhasnagar Concessions',
      category: 'chargers',
      categoryLabel: 'Charge Point Operator',
      logo: '/assets/Klickwatt-DPBGfE7m.png',
    },
    {
      id: 'star-charge',
      name: 'Star Charge',
      role: 'High-Power DC Fast Chargers at Mira Bhaindar Depots',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/Star_Charger_Partner-C2xnBN9h.png',
    },
    {
      id: 'siemens',
      name: 'Siemens Charger',
      role: 'Megawatt Charging Infrastructure at Mira Bhaindar & Indore Depots',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/seimensCharger_Partners-BLZHC-ti.jpeg',
    },
    {
      id: 'tirex',
      name: 'Tirex',
      role: 'Fast-Charging Depot Stations for Bhopal Transit Fleet',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/tirex-BJQowY_j.svg',
    },
    {
      id: 'mindra',
      name: 'Mindra',
      role: 'Dedicated Charger OEM for UltraTech Dhar Industrial Corridor',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/Mindra_Logo-Dh7sW0_6.png',
    },
    {
      id: 'tkt',
      name: 'TKT',
      role: 'Heavy-Duty Industrial Charging for Jindal Steel Corridors',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/TKT_Logo-Qt17se8-.png',
    },
    {
      id: 'exicom',
      name: 'Exicom',
      role: 'High-Capacity Depot Chargers for Wonder Cement Freight Network',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/Exicom_Logo-DnUSCcJW.jpg',
    },
    {
      id: 'eim-cpo',
      name: 'EIM (Energy In Motion)',
      role: 'Specialized Port Depot Chargers for J M Baxi Logistics',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/eim_energy_in_motion.jpg',
    },
    {
      id: 'vnt',
      name: 'VNT',
      role: 'Heavy Industry Fleet Chargers for Tata Steel & Star Cement',
      category: 'chargers',
      categoryLabel: 'Charger OEM',
      logo: '/assets/VNT-logo-yBYPHimJ.png',
    },
  ];


    const foundersList = [
    {
      name: "Dheeraj Jhawar",
      role: "Co-Founder and Managing Director",
      image: "/assets/Dheeraj-Jhawar-CXaqYT-s.svg",
      linkedin: "https://www.linkedin.com/in/dheeraj-jhawar-5558232/",
      bio: "Visionary leader steering Transvolt's strategic growth, capital infrastructure, and long-term zero-emission transit concessions across India."
    },
    {
      name: "Sandeep Agarwal",
      role: "Co-Founder and Managing Director",
      image: "/assets/Sandeep-Agrawal-DLRE-U4p.svg",
      linkedin: "https://www.linkedin.com/in/sandeep-agarwal-b893ba99/",
      bio: "Pioneering commercial e-mobility expansion, institutional DFI investments with IFC and Finnfund, and large-scale industrial partnerships."
    },
    {
      name: "Debasis Mohanty",
      role: "Co-Founder and Chief Executive Officer",
      image: "/assets/Debasis-Mohanty-BlURH82z.svg",
      linkedin: "https://www.linkedin.com/in/debasismohanty/",
      bio: "Spearheading technological innovation, advanced depot IoT charging networks, and mission-critical fleet operations with proven reliability."
    }
  ];

  const executiveTeamList = [
    {
      name: "Parag Deshmukh",
      role: "Chief Financial Officer",
      image: "/assets/Parag-Deshmukh-CutLu__F.svg",
      linkedin: "https://www.linkedin.com/in/parag-deshmukh-b34860194/"
    },
    {
      name: "Deepak Choksi",
      role: "Chief Technology Officer",
      image: "/assets/Deepak-Choksi-BvQNNxKO.svg",
      linkedin: "https://www.linkedin.com/in/deepak-choksi-02a9111a/"
    },
    {
      name: "Abhishek Jhawar",
      role: "Director Finance",
      image: "/assets/Abhishek-Jhawar-HfDpE6qC.svg",
      linkedin: "https://www.linkedin.com/in/abhishek-jhawar-00251525/"
    },
    {
      name: "Bhrugesh Amin",
      role: "President Projects & Strategy",
      image: "/assets/Bhrugesh-Amin-LT2aJhQ0.svg",
      linkedin: "https://www.linkedin.com/in/bhrugesh-amin-98320815/"
    },
    {
      name: "Mandar Hinge",
      role: "President Operation",
      image: "/assets/Mandar-Hinge-Cj7qTf9d.svg",
      linkedin: "https://www.linkedin.com/in/mandar-hinge-a60b76299/"
    },
    {
      name: "Hemant Velhankar",
      role: "President Engineering & Maintenance",
      image: "/assets/Hemant-Velhankar-CqXKJfl4.svg",
      linkedin: "https://www.linkedin.com/in/hemant-velhankar-7b5a5b12/"
    },
    {
      name: "Kiran Kakkar",
      role: "Senior Vice President, Accounts, Taxation & Compliance",
      image: "/assets/KiranKakkar-CT_oIlpP.png",
      linkedin: "https://www.linkedin.com/in/kiran-kakkar-5874031b/"
    },
    {
      name: "Mihir Vasa",
      role: "Senior Vice President, Investor Relations & Risk Officer",
      image: "/assets/Mihir-Vasa-DUILHTcR.svg",
      linkedin: "https://www.linkedin.com/in/mihirv1/"
    },
    {
      name: "Nimesh Kanabar",
      role: "Senior Vice President, Business Assurance & Intelligence",
      image: "/assets/Nimesh-VpnrpXWF.jpg?v=2",
      linkedin: "https://www.linkedin.com/in/nimesh-kanabar-32a31521/"
    },
    {
      name: "Saima Khalfay",
      role: "Head - Human Resources",
      image: "/assets/Saima-Khalfay-05s5fAIA.svg",
      linkedin: "https://www.linkedin.com/in/saimakhalfay-vphr/"
    },
    {
      name: "Siddesh Rai",
      role: "Vice President, Business Development",
      image: "/assets/Siddesh-Rai-Be6DZDrq.svg",
      linkedin: "https://www.linkedin.com/in/siddesh-rai-034a7125/"
    },
    {
      name: "Amar Singh",
      role: "Vice President, Battery & Energy",
      image: "/assets/AmarSingh-B9ffjeBZ.png",
      linkedin: "https://www.linkedin.com/in/amar-singh-battery/"
    },
    {
      name: "Madhavi Deshpande",
      role: "Director Gender Equality, Inclusiveness & Sustainability",
      image: "/assets/Madhavi-Deshpande-BJAeGMTd.svg",
      linkedin: "https://www.linkedin.com/in/madhavi-deshpande-4042692/"
    },
    {
      name: "Manisha Srivastav",
      role: "Vice President, Legal",
      image: "/assets/ManishaSrivastava-DSBXG7pp.png",
      linkedin: "https://www.linkedin.com/in/manisha-srivastava-6693655/"
    },
    {
      name: "Ritesh Biyani",
      role: "Vice President, Business Development",
      image: "/assets/RiteshBiyani-DVot7j9a.png",
      linkedin: "https://www.linkedin.com/in/ritesh-biyani-8305b116/"
    }
  ];

  const carouselSlides = [
    {
      id: 0,
      tag: "5,000+ Zero Emission Target",
      headline: "ELECTRIC BUS FLEET",
      description: "Scaling India's premier commercial electric bus platform with long-term municipal Gross Cost Contracts and green transit fleets.",
      image: "/about/about-bus-fleet.jpg",
      cardTitle: "5,000+ Target Fleet",
      cardSubtitle: "Commercial HCV Scaling",
      stat: "5,000+ e-Buses",
      location: "Pan-India Concessions",
    },
    {
      id: 1,
      tag: "Megawatt-Scale Infrastructure",
      headline: "FAST CHARGING HUBS",
      description: "Dedicated high-power DC fast-charging depot networks ensuring high vehicle uptime, smart telemetry, and rapid turnarounds.",
      image: "/about/about-charging-station.jpg",
      cardTitle: "Depot Fast Charging",
      cardSubtitle: "High-Voltage Power Infra",
      stat: "60-180 kW DC",
      location: "Key Operating Depots",
    },
    {
      id: 2,
      tag: "Dedicated Ground & Pilot Crew",
      headline: "OPERATIONS & MAINTENANCE",
      description: "Specialized EV engineers, skilled technical ground crews, and trained pilots operating around the clock for seamless transit reliability.",
      image: "/about/about-depot-team.jpg",
      cardTitle: "Skilled Depot Teams",
      cardSubtitle: "Ground Crew & Pilots",
      stat: "24/7 Monitoring",
      location: "Central Fleet Depots",
    },
    {
      id: 3,
      tag: "Intra-City Clean Mobility",
      headline: "ZERO-EMISSION TRANSIT",
      description: "Modern electric buses serving passengers daily with silent, smooth, zero-tailpipe emission rides across high-density urban corridors.",
      image: "/about/about-electric-bus-side.jpg",
      cardTitle: "Urban e-Bus Transit",
      cardSubtitle: "Public Mobility Services",
      stat: "100% Electric",
      location: "Urban Commute Routes",
    },
    {
      id: 4,
      tag: "Strategic Commercial Milestones",
      headline: "CONCESSION FLAG-OFFS",
      description: "Inaugural deployments and public-private partnerships driving heavy commercial EV transformation in partnership with leading global DFIs.",
      image: "/about/about-depot-inauguration.jpg",
      cardTitle: "Strategic Flag-Offs",
      cardSubtitle: "Institutional Partnerships",
      stat: "IFC & FinnFund Backed",
      location: "National Rollout",
    },
    {
      id: 5,
      tag: "Heavy Fleet Depot Logistics",
      headline: "COMMERCIAL DEPOT BAYS",
      description: "State-of-the-art parking and charging bays engineered to accommodate heavy commercial electric buses and high-tonnage mining haulage trucks.",
      image: "/about/about-depot-bay.jpg",
      cardTitle: "Commercial Depot Bays",
      cardSubtitle: "Depot Logistics & Staging",
      stat: "100+ Bay Capacity",
      location: "Major Metro Hubs",
    },
    {
      id: 6,
      tag: "Public Passenger Mobility",
      headline: "MUNICIPAL BUS TRANSIT",
      description: "Partnering with municipal transport undertakings to replace diesel bus fleets with silent, sustainable heavy electric vehicles.",
      image: "/about/about-municipal-transit.jpg",
      cardTitle: "Municipal Transit",
      cardSubtitle: "Urban Mass Mobility",
      stat: "Zero Diesel Emissions",
      location: "Metropolitan Corridors",
    },
    {
      id: 7,
      tag: "Western India Operations",
      headline: "PUNE METROPOLITAN FLEET",
      description: "Operational commercial electric buses executing high-frequency routes across the Pune metropolitan region with proven uptime.",
      image: "/about/about-pune-depot.jpg",
      cardTitle: "Metro Depot Fleets",
      cardSubtitle: "Maharashtra Hubs",
      stat: "190+ Active Fleet",
      location: "Pune & Mumbai Region",
    },
    {
      id: 8,
      tag: "High-Power Dual-Gun Depots",
      headline: "CHARGING TELEMETRY",
      description: "Smart IoT-connected charging stations with dynamic load balancing, thermal management, and rapid commercial vehicle battery turnaround.",
      image: "/about/about-pune-charging.jpg",
      cardTitle: "Dual-Gun DC Hubs",
      cardSubtitle: "IoT Power Telemetry",
      stat: "Rapid Dwell Times",
      location: "Central Concession Depots",
    },
  ];
  const currentSlide = carouselSlides[activeSlideIdx] || carouselSlides[0];

  // Auto-scroll ONLY the horizontal thumbnail track (NEVER call scrollIntoView which causes vertical page shifts)
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (container) {
      const cardEl = container.querySelector(`[data-slide-idx="${activeSlideIdx}"]`);
      if (cardEl) {
        const containerLeft = container.getBoundingClientRect().left;
        const cardLeft = cardEl.getBoundingClientRect().left;
        const targetScrollLeft = container.scrollLeft + (cardLeft - containerLeft) - 20;
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeSlideIdx]);

  // Lock window scroll position to top (0, 0) whenever section changes to prevent any top gap/stuck state
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [currentSection]);

  // Continuous photo slideshow running every 2 seconds with butter-smooth cross-fade
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIdx((curr) => {
        setPrevSlideIdx(curr);
        return (curr + 1) % carouselSlides.length;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const handleSelectSlide = (newIdx) => {
    if (newIdx === activeSlideIdx) return;
    setPrevSlideIdx(activeSlideIdx);
    setActiveSlideIdx(newIdx);
  };

  // Geographic centers of presence states for 15% pop-out origin
  const stateCenters = {
    dl: { x: 186.3, y: 210.4 },
    gj: { x: 65.9, y: 354.9 },
    mp: { x: 214.3, y: 319.0 },
    mh: { x: 179.7, y: 435.3 },
    ml: { x: 484.1, y: 282.7 },
    or: { x: 340.1, y: 405.2 },
    rj: { x: 119.0, y: 256.8 },
  };

  // Structured Presence Data: States -> Cities (with Coordinates & Snug Label Offsets) -> Projects
  const presenceData = {
    dl: {
      id: 'dl',
      name: 'Delhi-NCR',
      cities: [
        {
          id: 'delhi',
          name: 'New Delhi',
          x: 186,
          y: 206,
          labelOffset: { x: 7, y: -7 },
          projectTitle: 'Delhi Capital Zero-Emission Transit & Freight',
          fleetType: '12m Low-Floor E-Buses & Smart Fleet Depots',
          description:
            'Operating high-capacity zero-emission electric buses across key arterial routes in the National Capital Region. Transvolt’s fleet actively eliminates diesel particulate matter in high-congestion corridors, backed by smart overnight charging infrastructure and real-time battery analytics.',
        },
        {
          id: 'gurugram',
          name: 'Gurugram',
          x: 178,
          y: 216,
          labelOffset: { x: -56, y: 6 },
          projectTitle: 'Cyber City Corporate Clean Haulage Corridors',
          fleetType: 'Premium Electric Commuter Coaches & Heavy Shuttles',
          description:
            'Dedicated electric employee transportation connecting Delhi and Gurugram technology hubs. These premium electric coaches run on fixed-schedule duty cycles, drastically reducing corporate scope-3 emissions and road congestion.',
        },
        {
          id: 'noida',
          name: 'Noida',
          x: 196,
          y: 212,
          labelOffset: { x: 7, y: 6 },
          projectTitle: 'Noida Industrial Express EV Freight',
          fleetType: 'Electric Heavy Commercial Haulers & Logistics',
          description:
            'Electrifying supply chain corridors between warehousing hubs in Greater Noida and central distribution centers with heavy-duty electric commercial vehicles and rapid top-up charging.',
        },
      ],
    },
    mh: {
      id: 'mh',
      name: 'Maharashtra',
      cities: [
        {
          id: 'mumbai',
          name: 'Mumbai',
          x: 104,
          y: 444,
          labelOffset: { x: -38, y: 8 }, // Snug directly below Mumbai's dot
          projectTitle: 'Mumbai Metropolitan Intra-City & Corporate Shuttles',
          fleetType: '12m AC Electric Buses & Heavy Employee Shuttles',
          description:
            'Transvolt operates heavy commercial electric bus fleets across the Mumbai Metropolitan Region, delivering high-frequency corporate employee shuttles and clean public transit solutions integrated with dedicated megawatt charging stations.',
        },
        {
          id: 'nagpur',
          name: 'Nagpur',
          x: 236,
          y: 395,
          labelOffset: { x: 8, y: -7 },
          projectTitle: 'Nagpur Municipal GCC Public E-Bus Concession',
          fleetType: 'Gross Cost Contract (GCC) Public Transit Buses',
          description:
            'A landmark public transit concession deploying over 100+ zero-emission electric buses for Nagpur Municipal Corporation, providing silent, emission-free urban transport with 99.8% uptime reliability across vital city corridors.',
        },
        {
          id: 'mira-bhayandar',
          name: 'Mira-Bhayandar',
          x: 104,
          y: 426,
          labelOffset: { x: -44, y: -16 }, // Snug directly above Mira-Bhayandar's dot
          projectTitle: 'MBMT Urban E-Mobility Fleet Integration',
          fleetType: 'City Feeder & Trunk Electric Bus Network',
          description:
            'Supplying and operating zero-emission feeder and trunk transit buses for the Mira Bhayandar Municipal Transport authority, optimizing commuter travel times while eliminating metric tons of diesel exhaust daily.',
        },
        {
          id: 'ulhasnagar',
          name: 'Ulhasnagar',
          x: 116,
          y: 438,
          labelOffset: { x: 8, y: -7 }, // Snug directly right of Ulhasnagar's dot
          projectTitle: 'Ulhasnagar Smart City Clean Commute Project',
          fleetType: 'Electric Midi-Buses & Opportunity Charging Hubs',
          description:
            'Deploying high-efficiency electric midi-buses and infrastructure to connect regional industrial clusters and commercial hubs with clean, quiet, and passenger-friendly transport.',
        },
      ],
    },
    ml: {
      id: 'ml',
      name: 'Meghalaya',
      cities: [
        {
          id: 'shillong',
          name: 'Shillong',
          x: 486,
          y: 284,
          labelOffset: { x: 8, y: -7 },
          projectTitle: 'Shillong Eco-Sensitive Hill Transit',
          fleetType: 'High-Torque Electric Hill Transit Midi-Buses',
          description:
            'Operating specialized high-torque hill-climb electric buses across Shillong’s hilly terrain, protecting fragile Himalayan ecology with 100% emission-free passenger transit and regenerative downhill braking.',
        },
        {
          id: 'byrnihat',
          name: 'Byrnihat',
          x: 468,
          y: 280,
          labelOffset: { x: -46, y: -15 },
          projectTitle: 'Byrnihat Industrial Zero-Emission Freight Route',
          fleetType: 'Electric Heavy Commercial Industrial Trucks',
          description:
            'Heavy industrial electric trucks serving manufacturing and mineral plants in the Byrnihat industrial corridor, proving electric heavy haulage viability in challenging hill topography.',
        },
      ],
    },
    gj: {
      id: 'gj',
      name: 'Gujarat',
      cities: [
        {
          id: 'mundra',
          name: 'Mundra & Kandla Ports',
          x: 42,
          y: 348,
          labelOffset: { x: -65, y: 14 },
          projectTitle: 'Ashwa 55T Port Logistics & Container Haulage',
          fleetType: 'Ashwa 55T Heavy Duty Electric Tractor Trailers',
          description:
            'Deploying Transvolt Ashwa 55T heavy electric tractor trailers for 24/7 round-the-clock port container transfer, cutting fuel costs by 65% and delivering zero carbon port logistics between berths and inland container depots.',
        },
        {
          id: 'ahmedabad',
          name: 'Ahmedabad',
          x: 75,
          y: 340,
          labelOffset: { x: 8, y: -8 },
          projectTitle: 'Ahmedabad Urban Clean Feeder Network',
          fleetType: 'Electric Transit Buses & Megawatt Fast Charging',
          description:
            'Electrifying arterial bus routes and heavy goods logistics across Ahmedabad with automated battery health analytics and turnkey charging infrastructure.',
        },
        {
          id: 'surat',
          name: 'Surat',
          x: 88,
          y: 390,
          labelOffset: { x: 8, y: 5 },
          projectTitle: 'Surat Industrial Textile & Freight Corridor',
          fleetType: 'Electric Commercial Tippers & Heavy Delivery Trucks',
          description:
            'Zero-emission freight transport linking textile and diamond manufacturing districts to national highway logistics corridors.',
        },
      ],
    },
    mp: {
      id: 'mp',
      name: 'Madhya Pradesh',
      cities: [
        {
          id: 'indore',
          name: 'Indore',
          x: 160,
          y: 350,
          labelOffset: { x: -24, y: 10 },
          projectTitle: 'Indore Cleanest City Public Transit Network',
          fleetType: 'Zero-Emission City E-Buses & Automated Depot Chargers',
          description:
            'Partnering with municipal authorities in India’s cleanest city to operate high-efficiency electric public transit fleets backed by green grid energy and smart depots.',
        },
        {
          id: 'bhopal',
          name: 'Bhopal',
          x: 200,
          y: 330,
          labelOffset: { x: 8, y: -7 },
          projectTitle: 'Bhopal Smart City Green Corridor',
          fleetType: 'Intra-City Electric Transit Buses',
          description:
            'Integrating zero-emission electric buses along the capital city’s rapid transit routes, ensuring reduced commute times and zero tailpipe emissions.',
        },
      ],
    },
    or: {
      id: 'or',
      name: 'Odisha',
      cities: [
        {
          id: 'paradip',
          name: 'Paradip Port',
          x: 375,
          y: 408,
          labelOffset: { x: 8, y: -7 },
          projectTitle: 'Paradip Coastal Mining & Port Freight',
          fleetType: 'Heavy-Duty Electric Tippers & Ashwa 55T Haulers',
          description:
            'Heavy industrial haulage transporting coal and mineral freight from mining hubs to coastal berths using high-torque zero-emission heavy electric tippers and trailers.',
        },
        {
          id: 'bhubaneswar',
          name: 'Bhubaneswar',
          x: 345,
          y: 416,
          labelOffset: { x: -38, y: 10 },
          projectTitle: 'Bhubaneswar Capital Green Public Transit',
          fleetType: 'Electric Public Transit Fleet & Charging Stations',
          description:
            'Modernizing capital city commuting through state-of-the-art electric public buses equipped with regenerative braking, real-time passenger information, and high-safety battery packs.',
        },
      ],
    },
    rj: {
      id: 'rj',
      name: 'Rajasthan',
      cities: [
        {
          id: 'jaipur',
          name: 'Jaipur',
          x: 150,
          y: 242,
          labelOffset: { x: 8, y: -7 },
          projectTitle: 'Jaipur Inter-City Clean Mobility Route',
          fleetType: 'Long-Range Inter-City Electric Coaches',
          description:
            'Operating inter-city electric coach services between Jaipur and neighboring NCR hubs, delivering luxury comfort and ultra-low noise pollution.',
        },
        {
          id: 'jodhpur',
          name: 'Jodhpur',
          x: 98,
          y: 262,
          labelOffset: { x: -28, y: 10 },
          projectTitle: 'Mineral & Stone Quarry Heavy Haulage',
          fleetType: 'Industrial Heavy Duty Electric Tippers',
          description:
            'Electrifying heavy industrial haulage in the stone and mineral processing belts with rugged, heavy-torque electric tippers designed for extreme heat environments.',
        },
      ],
    },
  };

  // State List for the Full-Width Tiles with EV & Charger Metrics
  const presenceStateList = [
    {
      id: 'dl',
      name: 'Delhi-NCR',
      evCount: '180+',
      chargersCount: '48+',
    },
    {
      id: 'mh',
      name: 'Maharashtra',
      evCount: '420+',
      chargersCount: '115+',
    },
    {
      id: 'ml',
      name: 'Meghalaya',
      evCount: '45+',
      chargersCount: '16+',
    },
    {
      id: 'gj',
      name: 'Gujarat',
      evCount: '260+',
      chargersCount: '72+',
    },
    {
      id: 'mp',
      name: 'Madhya Pradesh',
      evCount: '190+',
      chargersCount: '54+',
    },
    {
      id: 'or',
      name: 'Odisha',
      evCount: '140+',
      chargersCount: '38+',
    },
    {
      id: 'rj',
      name: 'Rajasthan',
      evCount: '110+',
      chargersCount: '32+',
    },
  ];

  // Active state data, active city project & centroid for 15% pop-out
  const currentStateData = presenceData[selectedStateId] || presenceData['mh'];
  const activeCities = currentStateData.cities;
  const currentCity =
    activeCities.find((c) => c.id === selectedCityId) || activeCities[0];
  const activeCenter = stateCenters[selectedStateId] || { x: 179.7, y: 435.3 };

  // Dynamic collision avoidance for city badges on the map
  const resolvedCityBadges = React.useMemo(() => {
    const placedBoxes = [];
    return activeCities.map((city) => {
      const isCityActive = currentCity.id === city.id;
      const tagWidth = Math.round(city.name.length * 5.4 + 10);
      const tagHeight = 13;
      const pref = city.labelOffset || { x: 7, y: -7 };

      // Candidate offsets in priority order
      const candidateOffsets = [
        pref,
        { x: 8, y: -7 },
        { x: 8, y: 8 },
        { x: -tagWidth - 6, y: 8 },
        { x: -tagWidth - 6, y: -7 },
        { x: -Math.round(tagWidth / 2), y: 12 },
        { x: -Math.round(tagWidth / 2), y: -tagHeight - 8 },
        { x: 8, y: -tagHeight - 8 },
        { x: -tagWidth - 6, y: 16 },
      ];

      let bestOffset = candidateOffsets[0];
      let minOverlap = Infinity;

      for (const cand of candidateOffsets) {
        const box = {
          x1: city.x + cand.x,
          y1: city.y + cand.y,
          x2: city.x + cand.x + tagWidth,
          y2: city.y + cand.y + tagHeight,
        };

        let overlapArea = 0;
        for (const pb of placedBoxes) {
          const ix1 = Math.max(box.x1, pb.x1);
          const iy1 = Math.max(box.y1, pb.y1);
          const ix2 = Math.min(box.x2, pb.x2);
          const iy2 = Math.min(box.y2, pb.y2);
          if (ix2 > ix1 && iy2 > iy1) {
            overlapArea += (ix2 - ix1) * (iy2 - iy1);
          }
        }

        if (overlapArea === 0) {
          bestOffset = cand;
          minOverlap = 0;
          break;
        } else if (overlapArea < minOverlap) {
          minOverlap = overlapArea;
          bestOffset = cand;
        }
      }

      const finalBox = {
        x1: city.x + bestOffset.x,
        y1: city.y + bestOffset.y,
        x2: city.x + bestOffset.x + tagWidth,
        y2: city.y + bestOffset.y + tagHeight,
      };
      placedBoxes.push(finalBox);

      return {
        ...city,
        tagWidth,
        tagHeight,
        offset: bestOffset,
        isCityActive,
      };
    });
  }, [activeCities, currentCity.id]);

  // Auto-play state for Our Presence section (5s per city -> next state)
  const [isPresencePlaying, setIsPresencePlaying] = useState(true);
  const [presenceProgress, setPresenceProgress] = useState(0);

  // Handler when user selects a city manually
  const handleSelectCity = (cityId) => {
    setSelectedCityId(cityId);
    setPresenceProgress(0);
  };

  // Handler when user clicks a state button
  const handleSelectState = (stateId) => {
    setSelectedStateId(stateId);
    if (presenceData[stateId] && presenceData[stateId].cities.length > 0) {
      setSelectedCityId(presenceData[stateId].cities[0].id);
    }
    setPresenceProgress(0);
  };

  // 5-second per city auto-play timer with top stroke progress bar, then next state
  useEffect(() => {
    if (!isPresencePlaying) return;
    if (currentSection !== 1 && currentSection !== undefined) return;

    const intervalMs = 50;
    const totalDurationMs = 5000;
    const step = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setPresenceProgress((prev) => {
        if (prev >= 100) {
          const stateData = presenceData[selectedStateId] || presenceData['mh'];
          const cities = stateData.cities;
          const currentCityIdx = cities.findIndex((c) => c.id === selectedCityId);

          if (currentCityIdx !== -1 && currentCityIdx < cities.length - 1) {
            // Advance to next city in current state
            setSelectedCityId(cities[currentCityIdx + 1].id);
          } else {
            // All cities in current state completed -> Move to next state
            const currentStateIdx = presenceStateList.findIndex((s) => s.id === selectedStateId);
            const nextStateIdx = currentStateIdx !== -1 ? (currentStateIdx + 1) % presenceStateList.length : 0;
            const nextState = presenceStateList[nextStateIdx];
            setSelectedStateId(nextState.id);
            if (presenceData[nextState.id]?.cities?.length > 0) {
              setSelectedCityId(presenceData[nextState.id].cities[0].id);
            }
          }
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPresencePlaying, currentSection, selectedStateId, selectedCityId, presenceStateList, presenceData]);

  return (
    <section
      id="about"
      className={`relative w-full h-screen overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#000000] text-white' : 'bg-[#FFFFFF] text-gray-900'
      }`}
    >
      {/* SVG Definitions for Section 1 Transvolt Dual-Chevron Arrow Mask */}
      <svg
        width="1"
        height="1"
        className="absolute pointer-events-none -z-50 opacity-0 overflow-hidden"
        style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '1px', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="transvoltArrowClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.000000 0.000000 L 0.295445 0.000000 L 0.581263 0.499991 L 0.295445 0.999985 L 0.000000 0.999985 L 0.285818 0.499991 Z M 0.418759 0.000000 L 0.714204 0.000000 L 1.000000 0.499991 L 0.714204 0.999985 L 0.418759 0.999985 L 0.704564 0.499991 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Vertical Slider Container (Translates between Section 0 and Section 1) */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ======================================================== */}
        {/* SECTION 1: WELCOME TO TRANSVOLT & WHO WE ARE (Arrow Video) */}
        {/* ======================================================== */}
        <div className="w-full h-screen overflow-hidden relative flex flex-col justify-start">
          <div className="relative z-10 w-full h-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-24 lg:pt-28 pb-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Column: Welcome & Who We Are */}
            <div className="w-full lg:max-w-[52%] xl:max-w-[50%] flex flex-col space-y-3.5 sm:space-y-4">
              {/* Main Headline */}
              <div className="flex flex-col space-y-2 pb-2">
                <h1 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-tight inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                  Welcome to Transvolt
                </h1>

                {/* Highlighted Mission Text */}
                <p className="text-xs sm:text-[14px] lg:text-[15px] font-semibold text-[#548235] dark:text-[#72B347] leading-relaxed pt-0.5">
                  where we're pioneering the change towards a future of{' '}
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    ZERO EMISSION
                  </span>{' '}
                  mobility, with Safety and Sustainability at the forefront!
                </p>

                {/* Italic Slogan */}
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-gray-500 dark:text-gray-400 italic font-medium">
                  Join us as we redefine the way we move, prioritizing a cleaner, greener tomorrow for all.
                </p>
              </div>

              {/* Sub-heading: Who We Are */}
              <div className="pt-1">
                <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-tight inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                  Who We Are
                </h2>
              </div>

              {/* 4 Description Paragraphs */}
              <div className="space-y-2 sm:space-y-2.5 text-[11.5px] sm:text-[12.5px] lg:text-[13px] leading-relaxed">
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong className="font-bold text-gray-900 dark:text-white">
                    India's First OEM agnostic EV Platform
                  </strong>{' '}
                  for Heavy Commercial Vehicles - Electric Buses and Electric Trucks; Transvolt owns and
                  operates the e-HCVs in B to G and B to B segments across India. Our solution covers
                  Intra-City e-Buses, Corporate e-Bus Services, School e-Buses, e-Trucks for haulage, mines and
                  ports.
                </p>

                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Supported by International Finance Corporation of{' '}
                  <strong className="font-bold text-gray-900 dark:text-white">"IFC"</strong> (part of
                  World Bank Group) and{' '}
                  <strong className="font-bold text-gray-900 dark:text-white">FinnFund</strong> (majority-owned
                  by the State of Finland).
                </p>

                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong className="font-bold text-gray-900 dark:text-white">Transvolt</strong> is more
                  than a business; it's a commitment to combating climate change and improving air quality
                  through zero-emission mobility solutions. We're dedicated to building a green platform that
                  offers{' '}
                  <strong className="font-bold text-gray-900 dark:text-white">
                    ZEROEMISSION
                  </strong>{' '}
                  services, in alignment with global efforts towards sustainable transportation.
                </p>

                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  With a dedicated team and support from top infrastructure funds and financial institutions,
                  we're leading the charge towards sustainable transportation in India and beyond!
                </p>
              </div>

              {/* ISO Certifications Block (Image 2 - Minimal Color Tiles) */}
              <div className="pt-2 sm:pt-2.5">
                {/* Header: ISO Certified Company with Green Checkmark Icon */}
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-1.5">
                      ISO Certified Company
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#548235]/15 text-[#548235] ring-1 ring-[#548235]/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    </h3>
                  </div>

                  {/* View Certificate Modal Trigger / Pill Button */}
                  <button
                    type="button"
                    onClick={() => setShowCertModal(true)}
                    className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold text-gray-500 hover:text-[#548235] dark:text-gray-400 dark:hover:text-[#72B347] transition-colors group cursor-pointer px-2 py-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    <span>View Certificate</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Two Minimal Color Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {/* Tile 1: ISO 14001:2015 (Environmental Management - Minimal Green Tint) */}
                  <div
                    onClick={() => setShowCertModal(true)}
                    className="group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer bg-[#548235]/[0.05] hover:bg-[#548235]/[0.10] border-[#548235]/25 hover:border-[#548235]/50 dark:bg-[#548235]/[0.10] dark:hover:bg-[#548235]/[0.16] dark:border-[#548235]/30 dark:hover:border-[#548235]/60 hover:shadow-md hover:shadow-[#548235]/10"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src="/assets/iso_14001_logo.png"
                        alt="ISO 14001:2015"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-[12.5px] font-bold text-gray-900 dark:text-white truncate">
                          ISO 14001:2015
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#548235] shrink-0" />
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate">
                        Environmental Management
                      </span>
                    </div>
                  </div>

                  {/* Tile 2: ISO 45001:2018 (Occupational Health & Safety - Minimal Blue Tint) */}
                  <div
                    onClick={() => setShowCertModal(true)}
                    className="group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer bg-[#4472C4]/[0.05] hover:bg-[#4472C4]/[0.10] border-[#4472C4]/25 hover:border-[#4472C4]/50 dark:bg-[#4472C4]/[0.10] dark:hover:bg-[#4472C4]/[0.16] dark:border-[#4472C4]/30 dark:hover:border-[#4472C4]/60 hover:shadow-md hover:shadow-[#4472C4]/10"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src="/assets/iso_45001_logo.png"
                        alt="ISO 45001:2018"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-[12.5px] font-bold text-gray-900 dark:text-white truncate">
                          ISO 45001:2018
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4472C4] shrink-0" />
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate">
                        Occupational Health & Safety
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Arrow Mask with Video */}
            <div className="w-full lg:max-w-[46%] xl:max-w-[48%] flex items-center justify-center lg:justify-end py-2">
              <div
                className="relative w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[640px] xl:max-w-[700px] aspect-[411/330] flex items-center justify-center drop-shadow-xl transition-all duration-300"
                style={{
                  clipPath: 'url(#transvoltArrowClip)',
                  WebkitClipPath: 'url(#transvoltArrowClip)',
                }}
              >
                <video
                  src="/About_us_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  style={{
                    clipPath: 'url(#transvoltArrowClip)',
                    WebkitClipPath: 'url(#transvoltArrowClip)',
                  }}
                />
              </div>
            </div>

          </div>
        </div>

{/* ======================================================== */}
        {/* SECTION 2: OUR PRESENCE & INTERACTIVE STATE/PROJECT HUB   */}
        {/* ======================================================== */}
        <div className="w-full h-screen overflow-hidden relative flex flex-col justify-start">
          <div className="relative z-10 w-full h-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-22 lg:pt-24 pb-6 flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10">
            
            {/* Left Column: Interactive State Selector, Cities & Project Details (Anchored to Top) */}
            <div className="w-full lg:max-w-[52%] xl:max-w-[50%] flex flex-col space-y-2.5 sm:space-y-3 self-start">
              
              {/* Section Headline */}
              <div className="pb-0.5">
                <h1 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-tight inline-block animate-dynamic-green-gradient">
                  Our Presence
                </h1>
              </div>

              {/* Overview Description Paragraph */}
              <p className={`text-[12px] sm:text-[13px] lg:text-[13.5px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong className="font-bold text-gray-900 dark:text-white">TRANSVOLT</strong> owns
                and operates an advanced commercial EV fleet across heavy industrial freight corridors,
                public bus concessions, and major logistics hubs. Select a state below to explore regional
                projects and city infrastructure:
              </p>

              {/* 1. Interactive State Selection Tiles (Full Width Matching Paragraph) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1 w-full">
                {presenceStateList.map((state) => {
                  const isSelected = selectedStateId === state.id;

                  return (
                    <button
                      key={state.id}
                      onClick={() => handleSelectState(state.id)}
                      onMouseEnter={() => setHoveredStateId(state.id)}
                      onMouseLeave={() => setHoveredStateId(null)}
                      className={`group flex flex-col justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer w-full ${
                        isSelected
                          ? 'bg-[#548235] text-white border-[#548235] shadow-lg shadow-[#548235]/30 ring-2 ring-[#548235]/30 scale-[1.01]'
                          : isDark
                          ? 'bg-white/[0.04] border-white/10 text-gray-200 hover:border-[#548235]/60 hover:bg-white/[0.08] hover:shadow-md'
                          : 'bg-white border-gray-200 text-gray-800 hover:border-[#548235]/60 hover:bg-gray-50/90 hover:shadow-md'
                      }`}
                    >
                      {/* A) State Name (On top of the tile and Bold and large font) */}
                      <div className="flex items-center justify-between gap-1.5 w-full mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 transition-transform ${
                              isSelected
                                ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] scale-110'
                                : 'bg-[#548235] dark:bg-[#72B347] shadow-[0_0_5px_rgba(84,130,53,0.5)]'
                            }`}
                          />
                          <h3
                            className={`text-[13.5px] sm:text-[15px] font-bold tracking-tight truncate ${
                              isSelected ? 'text-white' : 'text-[#4472C4]'
                            }`}
                          >
                            {state.name}
                          </h3>
                        </div>

                        {isSelected && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white shrink-0">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Metrics: B) Number of EV's & C) Number of Chargers (Perfect Vertical Centering) */}
                      <div
                        className={`grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 pb-1 border-t w-full items-center ${
                          isSelected
                            ? 'border-white/20'
                            : isDark
                            ? 'border-white/10'
                            : 'border-gray-100'
                        }`}
                      >
                        {/* B) Number of EV's */}
                        <div className="flex items-center justify-between pr-1.5 sm:pr-2 min-w-0">
                          <span
                            className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-semibold truncate leading-none ${
                              isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            Number of EV's
                          </span>
                          <span
                            className={`text-xs sm:text-[13px] font-extrabold ml-1 shrink-0 leading-none ${
                              isSelected ? 'text-white' : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {state.evCount}
                          </span>
                        </div>

                        {/* C) Number of Chargers */}
                        <div
                          className={`flex items-center justify-between pl-1.5 sm:pl-2 border-l min-w-0 ${
                            isSelected
                              ? 'border-white/20'
                              : isDark
                              ? 'border-white/10'
                              : 'border-gray-200'
                          }`}
                        >
                          <span
                            className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-semibold truncate leading-none ${
                              isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            Chargers
                          </span>
                          <span
                            className={`text-xs sm:text-[13px] font-extrabold ml-1 shrink-0 leading-none ${
                              isSelected ? 'text-white' : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {state.chargersCount}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 2. Sub-Buttons for Cities under Selected State with Play/Pause on Right Side */}
              <div className="pt-1.5 flex flex-col space-y-1.5">
                <span className="text-[10.5px] font-mono uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                  Operational Hubs & Cities in {currentStateData.name}:
                </span>

                <div className="flex items-center justify-between gap-2.5 w-full">
                  {/* City selection tabs on left */}
                  <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                    {activeCities.map((city) => {
                      const isCitySelected = currentCity.id === city.id;

                      return (
                        <button
                          key={city.id}
                          onClick={() => handleSelectCity(city.id)}
                          className={`px-3 py-1 rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            isCitySelected
                              ? 'bg-[#548235]/15 dark:bg-[#72B347]/20 border border-[#548235] dark:border-[#72B347] text-[#548235] dark:text-[#72B347] font-bold shadow-xs'
                              : isDark
                              ? 'border border-white/15 bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/25'
                              : 'border border-gray-300/80 bg-gray-100/70 text-gray-600 hover:text-gray-900 hover:bg-gray-200/80 hover:border-gray-400'
                          }`}
                        >
                          <MapPin className="w-3 h-3 stroke-[2.2]" />
                          <span>{city.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Play/Pause Button on opposite (right) side of city selection tabs */}
                  <button
                    onClick={() => setIsPresencePlaying((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                      isPresencePlaying
                        ? 'bg-[#548235]/15 text-[#548235] dark:text-[#72B347] border-[#548235]/60 hover:bg-[#548235]/25 shadow-xs'
                        : isDark
                        ? 'bg-white/[0.06] text-gray-300 border-white/20 hover:bg-white/10 hover:text-white'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    title={isPresencePlaying ? 'Pause Auto-Play (5s per City)' : 'Resume Auto-Play (5s per City)'}
                    aria-label={isPresencePlaying ? 'Pause Auto-Play' : 'Play Auto-Play'}
                  >
                    {isPresencePlaying ? (
                      <>
                        <Pause className="w-3 h-3 fill-current stroke-[1.5]" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current stroke-[1.5]" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Play</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 3. Project Details Card Below the Sub-Buttons with Top Stroke Duration Progress */}
              <div
                className={`relative p-3.5 sm:p-4 rounded-xl border transition-all duration-300 min-h-[96px] sm:min-h-[105px] flex flex-col justify-start overflow-hidden ${
                  isDark
                    ? 'bg-[#0E131E]/80 border-white/10 shadow-sm'
                    : 'bg-white/90 border-gray-200 shadow-sm'
                }`}
              >
                {/* 1. Duration Line on Top Stroke (5s per City) */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-black/[0.04] dark:bg-white/[0.06] pointer-events-none z-10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#548235] via-[#66b338] to-[#22c55e] shadow-[0_0_8px_rgba(84,130,53,0.7)]"
                    style={{
                      width: `${presenceProgress}%`,
                      transition: presenceProgress === 0 ? 'none' : 'width 60ms linear',
                    }}
                  />
                </div>

                {/* Project Header & Fleet Tag */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-gray-200/70 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#548235] dark:bg-[#72B347] animate-pulse" />
                    <h3 className="text-xs sm:text-[13.5px] font-bold text-gray-900 dark:text-white tracking-tight uppercase">
                      {currentCity.projectTitle}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#548235]/10 dark:bg-[#72B347]/15 text-[#548235] dark:text-[#72B347] self-start sm:self-auto border border-[#548235]/20">
                    {currentCity.fleetType}
                  </span>
                </div>

                {/* Project Description Paragraph */}
                <p
                  className={`pt-2 text-[11.5px] sm:text-[12.5px] leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {currentCity.description}
                </p>
              </div>

            </div>

            {/* Right Column: Frameless India Map with 15% Soft Pop-Out & Vibrant Green Outer Glow */}
            <div className="w-full lg:max-w-[48%] xl:max-w-[50%] flex items-center justify-center lg:justify-end py-1 self-center">
              <div className="relative w-full max-w-[600px] sm:max-w-[650px] lg:max-w-[700px] xl:max-w-[750px] flex items-center justify-center">
                
                {/* Top Right: Selected State Name Display (Thin Gray Subtitle + Bold Large Name) & Map Legends */}
                <div className="absolute top-0 right-2 sm:right-4 z-20 flex flex-col items-end text-right select-none pointer-events-none">
                  <span className="text-[11px] sm:text-xs font-light tracking-wider text-gray-400 dark:text-gray-500 uppercase">
                    Selected State
                  </span>
                  {/* State Name with Right-to-Left Staggered Letter-by-Letter Reveal Animation */}
                  <span
                    key={`state-title-${selectedStateId}`}
                    className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900 dark:text-white tracking-tight uppercase leading-tight inline-flex items-center justify-end"
                  >
                    {(() => {
                      const chars = currentStateData.name.split('');
                      const total = chars.length;
                      return chars.map((char, index) => (
                        <span
                          key={`${selectedStateId}-${index}`}
                          className="inline-block animate-letter-reveal opacity-0"
                          style={{
                            animationDelay: `${(total - 1 - index) * 38}ms`,
                            whiteSpace: char === ' ' ? 'pre' : 'normal',
                          }}
                        >
                          {char}
                        </span>
                      ));
                    })()}
                  </span>

                  {/* 3 Map Legends in One Line Below State Name */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 pt-1.5 pointer-events-auto">
                    {/* 1. Other States */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#E2E8F0] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] shrink-0" />
                      <span className="text-[9.5px] sm:text-[10.5px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Other States
                      </span>
                    </div>

                    {/* 2. Our Presence */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#D7E9D5] dark:bg-[#1C2E1B] border border-[#548235]/60 shrink-0" />
                      <span className="text-[9.5px] sm:text-[10.5px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Our Presence
                      </span>
                    </div>

                    {/* 3. Selected State */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#548235] border border-[#1F3C16] shadow-[0_0_6px_rgba(34,197,94,0.7)] shrink-0" />
                      <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        Selected State
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bay of Bengal Minimal Light Green Glassmorphism Tile */}
                <div className="absolute top-[75%] sm:top-[76%] lg:top-[77%] right-2 sm:right-4 z-20 max-w-[270px] sm:max-w-[310px] lg:max-w-[340px] p-2.5 sm:p-3 lg:p-3.5 rounded-xl bg-[#548235]/12 dark:bg-[#548235]/20 backdrop-blur-md border border-[#548235]/30 dark:border-[#548235]/45 shadow-lg shadow-[#548235]/15 dark:shadow-black/40 select-none pointer-events-auto transition-all duration-300">
                  <p className="text-[10px] sm:text-[11px] lg:text-[11.5px] leading-relaxed font-medium text-[#3B6220] dark:text-[#7EBA59]">
                    <strong className="font-extrabold text-[#2F521B] dark:text-[#8AE255] tracking-wide">TRANSVOLT</strong> has been promoted by group of professionals having substantial experience of building nation and raising optimized funding for infrastructure business. Transvolt is working very closely with some of the large Development Financial Institutions to fund its growth plan.
                  </p>
                </div>

                <svg
                  viewBox={indiaMapData.viewBox}
                  className="w-full max-h-[75vh] h-auto drop-shadow-sm select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <style>{`
                      @keyframes statePopOutGrow {
                        0% {
                          transform: scale(1);
                        }
                        100% {
                          transform: scale(1.15);
                        }
                      }
                      @keyframes whiteFlashCrossAnim {
                        0% {
                          transform: translate(-160px, -160px);
                          opacity: 0;
                        }
                        15% {
                          opacity: 1;
                        }
                        55% {
                          transform: translate(160px, 160px);
                          opacity: 1;
                        }
                        70%, 100% {
                          transform: translate(160px, 160px);
                          opacity: 0;
                        }
                      }
                    `}</style>

                    {/* Linear Gradient for 8% White Flash in Cross (Diagonal 45 deg) */}
                    <linearGradient
                      id="selectedStateWhiteFlashCross"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="47%" stopColor="#FFFFFF" stopOpacity="0.08" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
                      <stop offset="53%" stopColor="#FFFFFF" stopOpacity="0.08" />
                      <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>

                    {/* Counter 45 deg Linear Gradient for Cross Flash Intersect */}
                    <linearGradient
                      id="selectedStateWhiteFlashCross2"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
                      <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Base Layer: Non-Selected Indian States */}
                  <g id="india-states-base-layer">
                    {indiaMapData.locations.map((loc) => {
                      if (loc.id === selectedStateId) return null; // Rendered in pop-out layer on top

                      const isHovered = hoveredStateId === loc.id;
                      const isPresenceState = Boolean(presenceData[loc.id]);

                      return (
                        <path
                          key={loc.id}
                          id={`state-${loc.id}`}
                          d={loc.path}
                          onClick={() => {
                            if (isPresenceState) handleSelectState(loc.id);
                          }}
                          onMouseEnter={() => setHoveredStateId(loc.id)}
                          onMouseLeave={() => setHoveredStateId(null)}
                          className={`transition-all duration-300 ${
                            isPresenceState ? 'cursor-pointer' : 'cursor-default'
                          } ${
                            isPresenceState
                              ? isDark
                                ? isHovered
                                  ? 'fill-[#274424] stroke-[#548235] stroke-[1.2]'
                                  : 'fill-[#1C2E1B] stroke-[#548235]/60 stroke-[0.8]'
                                : isHovered
                                ? 'fill-[#C3DFC0] stroke-[#548235] stroke-[1.2]'
                                : 'fill-[#D7E9D5] stroke-[#548235]/50 stroke-[0.8]'
                              : isDark
                              ? isHovered
                                ? 'fill-[#334155] stroke-[#64748B] stroke-[1]'
                                : 'fill-[#1E293B] stroke-[#334155] stroke-[0.7]'
                              : isHovered
                              ? 'fill-[#CBD5E1] stroke-[#64748B] stroke-[1]'
                              : 'fill-[#E2E8F0] stroke-[#CBD5E1] stroke-[0.7]'
                          }`}
                        >
                          <title>
                            {loc.name} {isPresenceState ? '(Transvolt Active Hub)' : ''}
                          </title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Top Layer: 15% Soft Pop-Out Selected State with Green Outer Glow & Snug City Dots */}
                  {(() => {
                    const selectedLoc = indiaMapData.locations.find(
                      (l) => l.id === selectedStateId
                    );
                    if (!selectedLoc) return null;

                    return (
                      <g
                        key={`popout-state-${selectedStateId}`}
                        id="selected-state-popout-group"
                        style={{
                          transformOrigin: `${activeCenter.x}px ${activeCenter.y}px`,
                          animation: 'statePopOutGrow 380ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                          filter:
                            'drop-shadow(0 0 8px rgba(34, 197, 94, 0.85)) drop-shadow(0 0 22px rgba(34, 197, 94, 0.50)) drop-shadow(0 0 42px rgba(34, 197, 94, 0.25))',
                        }}
                      >
                        {/* 1. Selected State Fill with 8% White Flash in Cross for Selected State Only */}
                        <defs>
                          <clipPath id={`selected-state-clip-${selectedStateId}`}>
                            <path d={selectedLoc.path} />
                          </clipPath>
                        </defs>

                        {/* Base Solid Brand Green Fill with 8% White Flash in Cross */}
                        <g clipPath={`url(#selected-state-clip-${selectedStateId})`}>
                          <path
                            d={selectedLoc.path}
                            fill="#548235"
                            className="cursor-pointer"
                          />

                          {/* 8% White Flash in Cross (Diagonal Crossing Sheen) */}
                          <g
                            style={{
                              transformOrigin: `${activeCenter.x}px ${activeCenter.y}px`,
                              animation: 'whiteFlashCrossAnim 4s ease-in-out infinite',
                              pointerEvents: 'none',
                            }}
                          >
                            <rect
                              x={activeCenter.x - 220}
                              y={activeCenter.y - 220}
                              width="440"
                              height="440"
                              fill="url(#selectedStateWhiteFlashCross)"
                            />
                            <rect
                              x={activeCenter.x - 220}
                              y={activeCenter.y - 220}
                              width="440"
                              height="440"
                              fill="url(#selectedStateWhiteFlashCross2)"
                            />
                          </g>
                        </g>

                        {/* State Outline Stroke */}
                        <path
                          d={selectedLoc.path}
                          fill="none"
                          stroke="#1F3C16"
                          strokeWidth="0.8"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          className="pointer-events-none"
                        >
                          <title>{selectedLoc.name} (Selected Transvolt Hub)</title>
                        </path>

                        {/* 2. City Markers & Dynamic Anti-Collision Badges */}
                        <g id="selected-state-city-dots">
                          {[...resolvedCityBadges]
                            .sort((a, b) => (a.isCityActive ? 1 : b.isCityActive ? -1 : 0))
                            .map((city) => {
                              const isCityActive = city.isCityActive;
                              const offset = city.offset;
                              const tagWidth = city.tagWidth;

                              return (
                                <g
                                  key={city.id}
                                  className="cursor-pointer group"
                                  onClick={() => handleSelectCity(city.id)}
                                >
                                  {/* Static White Glowing Dot */}
                                  <circle
                                    cx={city.x}
                                    cy={city.y}
                                    r={isCityActive ? 4.5 : 3.2}
                                    fill="#FFFFFF"
                                    style={{
                                      filter: isCityActive
                                        ? 'drop-shadow(0 0 6px #FFFFFF) drop-shadow(0 0 12px rgba(255,255,255,0.95))'
                                        : 'drop-shadow(0 0 4px #FFFFFF)',
                                    }}
                                    className="transition-all duration-200"
                                  />

                                  {/* Center Core Dot for Active City */}
                                  {isCityActive && (
                                    <circle
                                      cx={city.x}
                                      cy={city.y}
                                      r="1.6"
                                      fill="#4472C4"
                                      className="transition-all duration-200"
                                    />
                                  )}

                                  {/* Dynamic City Name Label Tag - Collision-Resolved Position */}
                                  <g
                                    transform={`translate(${city.x + offset.x}, ${city.y + offset.y})`}
                                    className="pointer-events-none"
                                  >
                                    <rect
                                      x="0"
                                      y="0"
                                      width={tagWidth}
                                      height="13"
                                      rx="2.5"
                                      className={`transition-all duration-200 ${
                                        isCityActive
                                          ? 'fill-[#4472C4] stroke-white stroke-[0.8] drop-shadow-[0_2px_6px_rgba(68,114,196,0.6)]'
                                          : 'fill-black/75 stroke-white/20 stroke-[0.5]'
                                      }`}
                                    />
                                    <text
                                      x={tagWidth / 2}
                                      y="9.5"
                                      textAnchor="middle"
                                      fill="#FFFFFF"
                                      fontSize="7.5"
                                      fontWeight={isCityActive ? '700' : '500'}
                                      fontFamily="sans-serif"
                                      className="select-none tracking-wide"
                                    >
                                      {city.name}
                                    </text>
                                  </g>
                                </g>
                              );
                            })}
                        </g>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>

          </div>
        </div>


        {/* ======================================================== */}
        {/* SECTION 3: EXACT 50% / 50% SPLIT WITH BUTTER-SMOOTH CROSS-DISSOLVE SLIDESHOW */}
        {/* ======================================================== */}
        <div 
          className="w-full h-screen overflow-hidden relative flex flex-col lg:flex-row bg-white dark:bg-[#000000] select-none"
        >
          {/* ======================================================== */}
          {/* LEFT 50%: EXACT 50% WIDTH - ROADMAP & THREE OPEN TILES  */}
          {/* ======================================================== */}
          <div data-bg="light" className="w-full lg:w-1/2 h-full flex flex-col justify-center items-start section-container-left px-5 sm:px-[34px] pr-6 sm:pr-8 lg:pr-10 pt-28 sm:pt-32 pb-14 sm:pb-16 bg-white dark:bg-[#000000] z-10 shrink-0">
            <div className="w-full max-w-[720px] lg:max-w-[768px] my-auto flex flex-col space-y-5 sm:space-y-6">
              {/* Category / Strategic Roadmap Tracker */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2.5px] bg-[#548235]" />
                <span className="text-[10.5px] sm:text-[11px] font-mono font-bold tracking-widest text-[#548235] dark:text-[#72B347] uppercase">
                  STRATEGIC ROADMAP • 2025–2030
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-[1.14] text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                Transvolt Plans to Be 5,000+ Zero Emission Vehicle Platform in Next 3 to 5 Years.
              </h2>
            </div>

            {/* THREE VERTICAL TILES (Side-by-Side 3-Column Grid of True Portrait/Vertical Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 xl:gap-4 pt-1 w-full items-stretch">
              
              {/* Vertical Tile 1: Our Core Beliefs */}
              <div className="p-4 sm:p-5 xl:p-6 rounded-[22px] min-h-[265px] sm:min-h-[290px] bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex flex-col justify-between shadow-xs hover:border-[#548235]/50 hover:shadow-md transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#548235]/10 dark:bg-[#548235]/20 border border-[#548235]/25 flex items-center justify-center text-[#548235] dark:text-[#72B347] shrink-0">
                      <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold font-mono text-gray-400 dark:text-gray-500 tracking-wider">
                      01
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-[15px] xl:text-[16px] font-bold text-gray-900 dark:text-white tracking-tight pt-0.5">
                    Our Core Beliefs
                  </h3>

                  <p className="text-xs sm:text-[12.5px] xl:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    At Transvolt, we believe in clean, green, and safe commuting for both present and future generations. We're dedicated to providing commutes with transportation that's not just safe and efficient but also environmentally friendly.
                  </p>
                </div>
              </div>

              {/* Vertical Tile 2: Vision and Mission */}
              <div className="p-4 sm:p-5 xl:p-6 rounded-[22px] min-h-[265px] sm:min-h-[290px] bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex flex-col justify-between shadow-xs hover:border-[#548235]/50 hover:shadow-md transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#548235]/10 dark:bg-[#548235]/20 border border-[#548235]/25 flex items-center justify-center text-[#548235] dark:text-[#72B347] shrink-0">
                      <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold font-mono text-gray-400 dark:text-gray-500 tracking-wider">
                      02
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-[15px] xl:text-[16px] font-bold text-gray-900 dark:text-white tracking-tight pt-0.5">
                    Vision and Mission
                  </h3>

                  <p className="text-xs sm:text-[12.5px] xl:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our goal is simple: to offer easy, convenient, and green mobility solutions that enhance the quality of life for people and communities. We're committed to running a safe, sustainable business that delivers value to our stakeholders.
                  </p>
                </div>
              </div>

              {/* Vertical Tile 3: Our Values */}
              <div className="p-4 sm:p-5 xl:p-6 rounded-[22px] min-h-[265px] sm:min-h-[290px] bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex flex-col justify-between shadow-xs hover:border-[#548235]/50 hover:shadow-md transition-all">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#548235]/10 dark:bg-[#548235]/20 border border-[#548235]/25 flex items-center justify-center text-[#548235] dark:text-[#72B347] shrink-0">
                      <Sparkles className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold font-mono text-gray-400 dark:text-gray-500 tracking-wider">
                      03
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-[15px] xl:text-[16px] font-bold text-gray-900 dark:text-white tracking-tight pt-0.5">
                    Our Values
                  </h3>

                  <div className="space-y-1.5 text-[11px] sm:text-[11.5px] xl:text-[12px] leading-normal text-gray-600 dark:text-gray-300">
                    <div><strong className="text-gray-900 dark:text-white">Safety First:</strong> Passenger safety.</div>
                    <div><strong className="text-gray-900 dark:text-white">Customer Commitment:</strong> Pure delight.</div>
                    <div><strong className="text-gray-900 dark:text-white">Team Support:</strong> Collaboration.</div>
                    <div><strong className="text-gray-900 dark:text-white">Accountability:</strong> Performance.</div>
                    <div className="text-amber-600 dark:text-amber-400 font-bold pt-0.5">★ Excellence in all we do.</div>
                  </div>
                </div>
              </div>

            </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT 50%: EXACT 50% WIDTH - BUTTER-SMOOTH CROSS-FADE   */}
          {/* ======================================================== */}
          <div className="w-full lg:w-1/2 h-full relative overflow-hidden select-none bg-black">
            
            {/* Dynamic Full-Bleed Background Images (Silky Smooth Opacity Cross-Fade with Zero Blink) */}
            {carouselSlides.map((slide, idx) => {
              const isCurrent = activeSlideIdx === idx;
              const isPrev = prevSlideIdx === idx;

              // Permanent transition-opacity on all slides ensures zero unstyled opacity snap/blink
              let layerClass = 'z-0 opacity-0 pointer-events-none';
              if (isCurrent) {
                layerClass = 'z-10 opacity-100';
              } else if (isPrev) {
                layerClass = 'z-[5] opacity-100';
              }

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out will-change-[opacity] ${layerClass}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full min-w-full min-h-full object-cover object-center"
                  />
                </div>
              );
            })}

            {/* Top Dark Vignette (Smooth cinematic top gradient for header controls & sky) */}
            <div className="absolute top-0 left-0 right-0 h-44 sm:h-52 lg:h-60 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-[15]" />

            {/* Bottom Dark Vignette (Smooth cinematic bottom gradient for thumbnails & progress indicator) */}
            <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-72 lg:h-80 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none z-[15]" />

            {/* Bottom Showcase Strip (Frame 4575 Design: Image Selected Green Stroke + Squares + Line) */}
            <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 right-0 z-20 flex flex-col space-y-3">
              
              {/* Row of Square Image Tiles */}
              <div className="w-full overflow-hidden">
                <div
                  ref={cardsContainerRef}
                  className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto custom-scrollbar-none py-1 pr-6 sm:pr-8 scroll-smooth"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {carouselSlides.map((slide, idx) => {
                    const isCardActive = activeSlideIdx === idx;
                    return (
                      <div
                        key={slide.id}
                        data-slide-idx={idx}
                        onClick={() => handleSelectSlide(idx)}
                        className={`group relative shrink-0 w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out border ${
                          isCardActive
                            ? 'ring-2 ring-[#548235] border-white/90 shadow-[0_0_16px_rgba(84,130,53,0.7)] -translate-y-1 scale-105'
                            : 'border-white/25 opacity-75 hover:opacity-100 hover:border-white/60 hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Square Image Thumbnail */}
                        <img
                          src={slide.image}
                          alt={slide.cardTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Dark Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                        {/* Top-Right Index Pill */}
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[8px] font-mono font-bold text-white">
                          {String(idx + 1).padStart(2, '0')}
                        </div>

                        {/* Bottom Label (Frame 4575: 'Image Selected' for active, title for others) */}
                        <div className="absolute bottom-1.5 left-1.5 right-1.5">
                          <p className={`text-[9px] sm:text-[9.5px] font-bold leading-tight truncate ${
                            isCardActive ? 'text-[#72B347]' : 'text-white'
                          }`}>
                            {isCardActive ? 'Image Selected' : slide.cardTitle}
                          </p>
                        </div>

                        {/* Glowing Active Bar */}
                        {isCardActive && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-[#548235] shadow-[0_0_8px_#548235]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar Line & Controls (Frame 4575 Design) */}
              <div className="w-full pr-6 sm:pr-8 flex items-center justify-between gap-4">
                
                {/* Horizontal Progress Track Line */}
                <div className="flex-1 h-[2.5px] bg-white/20 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#548235] rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_#548235]"
                    style={{
                      width: `${((activeSlideIdx + 1) / carouselSlides.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Circular Prev/Next & Counter Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectSlide(activeSlideIdx > 0 ? activeSlideIdx - 1 : carouselSlides.length - 1)}
                    className="w-8 h-8 rounded-full border border-white/30 hover:border-white hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer group"
                    title="Previous Slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSlide(activeSlideIdx < carouselSlides.length - 1 ? activeSlideIdx + 1 : 0)}
                    className="w-8 h-8 rounded-full border border-white/30 hover:border-white hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer group"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  
                  {/* Counter: 01 / 09 */}
                  <div className="flex items-baseline gap-1 font-mono text-white text-xs pl-1">
                    <span className="font-bold text-[#548235] dark:text-[#72B347]">
                      {String(activeSlideIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-400 text-[10px]">
                      / {String(carouselSlides.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* SECTION 4: FLEET MANAGEMENT & MONITORING APPLICATIONS    */}
        {/* ======================================================== */}
        <div className="w-full h-screen overflow-hidden relative flex flex-col justify-start bg-slate-50/60 dark:bg-[#000000] select-none">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#4472C4]/[0.04] dark:bg-[#4472C4]/[0.08] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#548235]/[0.04] dark:bg-[#548235]/[0.08] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full h-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-22 lg:pt-24 pb-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* ---------------------------------------------------- */}
            {/* LEFT COLUMN: MODERN ENTERPRISE TELEMATICS PANEL */}
            {/* ---------------------------------------------------- */}
            <div className="w-full lg:w-[52%] xl:w-[53%] flex flex-col justify-center space-y-3 sm:space-y-3.5">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                    Fleet Monitoring Applications
                  </h2>

                  {/* Brand Accent */}
                  <div className="hidden sm:flex items-center gap-1 opacity-80">
                    <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">TRANSVOLT IOT</span>
                  </div>
                </div>

                {/* Intro Copy */}
                <div className="flex flex-col space-y-1">
                  <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed">
                    In the era of electric mobility, intelligent fleet management is key to maximizing performance, battery longevity, and sustainability. Unmonitored vehicle health can drain operational resources and reduce route uptime.
                  </p>
                  <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium text-[#4472C4] dark:text-[#6893DF] leading-relaxed">
                    Transvolt delivers complete 360° visibility—your trusted partner in high-uptime EV fleet monitoring and depot IoT control.
                  </p>
                </div>

                {/* Precision Engineer Photo with Live Badge - Below Paragraph */}
                <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/10 shadow-md w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px] self-start">
                  <img
                    src="/about/fleet-monitoring-engineer.jpg?v=3"
                    alt="Fleet Monitoring Engineer inspecting commercial electric vehicles"
                    className="w-full h-26 sm:h-28 lg:h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[9.5px] font-mono px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/20">
                    <span>Live Depot Telemetry</span>
                    <span className="text-emerald-400 font-bold">● Active</span>
                  </div>
                </div>

                {/* 6 High-Impact Value Points (Sleek UI Tile Tablets) */}
                <div className="space-y-2 pt-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white tracking-tight">
                      Why Choose Us? Core Capabilities
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium">
                      6 Core Capabilities
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      {
                        title: "Real-Time Telemetry",
                        desc: "Live EV tracking, battery SoC % & cycle health.",
                        icon: Activity,
                      },
                      {
                        title: "Route Optimization",
                        desc: "AI dispatch minimizing deadhead mileage & power draw.",
                        icon: MapPin,
                      },
                      {
                        title: "Driver Safety & Scoring",
                        desc: "Speed governance, driver alerts & road compliance.",
                        icon: ShieldCheck,
                      },
                      {
                        title: "Predictive Maintenance",
                        desc: "Depot health telemetry & off-peak charging schedules.",
                        icon: Zap,
                      },
                      {
                        title: "ESG & Carbon Audits",
                        desc: "Auditable zero-emission compliance & green reports.",
                        icon: Leaf,
                      },
                      {
                        title: "Depot Diagnostics & OTA",
                        desc: "24/7 remote firmware updates & rapid incident support.",
                        icon: Sparkles,
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="group/tile p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#0E1526] border border-gray-200/90 dark:border-white/10 hover:border-[#548235]/60 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#548235]/12 text-[#548235] dark:text-[#72B347] shrink-0">
                            <item.icon className="w-3 h-3 stroke-[2.2]" />
                          </span>
                          <strong className="text-[10.5px] sm:text-[11px] font-bold text-gray-950 dark:text-white tracking-tight leading-tight truncate">
                            {item.title}
                          </strong>
                        </div>
                        <p className="text-[9px] sm:text-[9.5px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action & SLA Bar */}
                <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('services')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold text-white animate-gradient-shuffle shadow-md shadow-[#4472C4]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Explore Fleet Applications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#548235]" />
                      99.8% Uptime SLA
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Zap className="w-4 h-4 text-[#4472C4]" />
                      Depot IoT Ready
                    </span>
                  </div>
                </div>

              </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT COLUMN: THREE VERTICAL PRECISION TILES */}
            {/* ---------------------------------------------------- */}
            <div className="w-full lg:w-[48%] xl:w-[47%] flex flex-col justify-center shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 xl:gap-4 w-full items-stretch">
                
                {/* Tile 1: 01 WE PLAN */}
                <div className="group relative min-h-[460px] sm:min-h-[490px] xl:min-h-[520px] p-4 sm:p-5 xl:p-5.5 rounded-2xl bg-white dark:bg-[#0D1525] border border-gray-200/90 dark:border-white/10 hover:border-[#4472C4]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div className="flex flex-col space-y-3.5">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4472C4] to-[#2B4C8C] text-white flex items-center justify-center shadow-md shadow-[#4472C4]/25 group-hover:scale-105 transition-transform">
                        <ClipboardList className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                        01
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-[14px] xl:text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">
                        We Plan
                      </h3>
                      <p className="text-[10px] sm:text-[10.5px] text-[#4472C4] dark:text-[#6893DF] font-semibold uppercase tracking-wider leading-snug pt-0.5">
                        Turnkey EV Strategy &amp; Route Telemetry
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-[11.5px] xl:text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      We meticulously craft tailored fleet management strategies to optimize your EV operations. Our team analyzes vehicle selection, route scheduling, and charging infrastructure to ensure maximum efficiency. Advanced telemetry provides real-time insights into energy usage, battery cycles, and driver performance to eliminate operational downtime.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>STRATEGY &amp; ROUTE</span>
                    <span className="text-[#4472C4] font-semibold">OPTIMIZED</span>
                  </div>
                </div>

                {/* Tile 2: 02 WE CARE */}
                <div className="group relative min-h-[460px] sm:min-h-[490px] xl:min-h-[520px] p-4 sm:p-5 xl:p-5.5 rounded-2xl bg-white dark:bg-[#0D1525] border border-gray-200/90 dark:border-white/10 hover:border-[#548235]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div className="flex flex-col space-y-3.5">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#548235] to-[#3B5D24] text-white flex items-center justify-center shadow-md shadow-[#548235]/25 group-hover:scale-105 transition-transform">
                        <Heart className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                        02
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-[14px] xl:text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">
                        We Care
                      </h3>
                      <p className="text-[10px] sm:text-[10.5px] text-[#548235] dark:text-[#72B347] font-semibold uppercase tracking-wider leading-snug pt-0.5">
                        24/7 Monitoring &amp; Driver Safety First
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-[11.5px] xl:text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      Your fleet's reliability and passenger safety are at the core of our operations. We provide round-the-clock technical dispatch, proactive predictive maintenance schedules, and continuous battery health monitoring. Our comprehensive driver training suites enhance onboard comfort, safety standards, and road compliance.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>SAFETY FIRST</span>
                    <span className="text-[#548235] font-semibold">24/7 ACTIVE</span>
                  </div>
                </div>

                {/* Tile 3: 03 WE COMMIT */}
                <div className="group relative min-h-[460px] sm:min-h-[490px] xl:min-h-[520px] p-4 sm:p-5 xl:p-5.5 rounded-2xl bg-white dark:bg-[#0D1525] border border-gray-200/90 dark:border-white/10 hover:border-[#4472C4]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div className="flex flex-col space-y-3.5">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4472C4] to-[#548235] text-white flex items-center justify-center shadow-md shadow-[#4472C4]/25 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                        03
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-[14px] xl:text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">
                        We Commit
                      </h3>
                      <p className="text-[10px] sm:text-[10.5px] text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235] dark:from-[#6893DF] dark:to-[#72B347] font-semibold uppercase tracking-wider leading-snug pt-0.5">
                        99.8% Availability &amp; Net-Zero Mission
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-[11.5px] xl:text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      We pledge unwavering dedication to your fleet's long-term commercial uptime. Through regular OTA software updates, transparent carbon accounting analytics, and rapid depot spare management, we build resilient zero-emission ecosystems that deliver superior ROI and clean urban mobility.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>UPTIME SLA</span>
                    <span className="text-[#4472C4] font-semibold">99.8% READY</span>
                  </div>
                </div>

              </div>
            </div>
            </div>

          </div>
        
        {/* ======================================================== */}
        {/* SECTION 4.5: CLIMATE COMMITMENT & GREEN PLATFORM         */}
        {/* ======================================================== */}
        <div data-bg="dark" className="w-full h-screen overflow-hidden relative flex flex-col justify-center items-center bg-black select-none">
          {/* Full-Bleed Aerial Green City Background */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/about/climate-green-mission.jpg?v=4"
              alt="Climate Action and Green Mobility"
              className="w-full h-full object-cover object-center filter brightness-95 saturate-105"
            />
            {/* Clean Uniform Tint (No Dark Vignette) */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          </div>

          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-8 flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
            
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#548235]/25 border border-[#548235]/40 text-[#72B347] backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest">
                  CLIMATE ACTION • ZERO EMISSION SERVICES
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold text-white tracking-tight leading-tight drop-shadow-md">
                Pioneering the Sustainable Electric Future
              </h2>
            </div>

            {/* Three Glassmorphic Mission Cards (Matching Image Exactly) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full max-w-5xl">
              
              {/* Card 1 */}
              <div className="relative group rounded-2xl p-6 sm:p-7 backdrop-blur-xl bg-black/45 border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-3.5 hover:bg-black/60 hover:border-[#548235]/60 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#548235] border-2 border-white/80 flex items-center justify-center text-white shadow-lg shadow-[#548235]/50 group-hover:scale-110 transition-transform">
                  <Leaf className="w-5 h-5 stroke-[2.4]" />
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-white leading-relaxed font-medium">
                  We are taking action to combat climate change and improve local air quality by zero emission mobility solutions for the communities and our customers.
                </p>
              </div>

              {/* Card 2 */}
              <div className="relative group rounded-2xl p-6 sm:p-7 backdrop-blur-xl bg-black/45 border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-3.5 hover:bg-black/60 hover:border-[#548235]/60 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#548235] border-2 border-white/80 flex items-center justify-center text-white shadow-lg shadow-[#548235]/50 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 stroke-[2.4]" />
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-white leading-relaxed font-medium">
                  Transvolt is dedicated to building a green platform to provide ZERO EMISSION services.
                </p>
              </div>

              {/* Card 3 */}
              <div className="relative group rounded-2xl p-6 sm:p-7 backdrop-blur-xl bg-black/45 border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-3.5 hover:bg-black/60 hover:border-[#548235]/60 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#548235] border-2 border-white/80 flex items-center justify-center text-white shadow-lg shadow-[#548235]/50 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 stroke-[2.4]" />
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-white leading-relaxed font-medium">
                  Transvolt is fully aligned to be a significant player in supporting the global aim to provide sustainable, green transportation solutions with value creations for all the stakeholders.
                </p>
              </div>

            </div>

          </div>
        </div>


        {/* ======================================================== */}
        {/* SECTION 5: OUR TEAM (Founding Team + Meet The Team)       */}
        {/* ======================================================== */}
        <div
          id="our-team-section"
          className="w-full h-screen overflow-y-auto relative flex flex-col justify-start bg-slate-50/50 dark:bg-[#000000] select-none scroll-smooth"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#548235]/[0.03] dark:bg-[#548235]/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4472C4]/[0.03] dark:bg-[#4472C4]/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-24 pb-16 flex flex-col space-y-12">
            
            {/* Main Section Header */}
            <div className="flex flex-col items-center text-center space-y-2 border-b border-gray-200/80 dark:border-white/10 pb-6">
              <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                Our Team
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl">
                The visionary founders and commercial mobility leaders driving India's premier heavy electric vehicle platform.
              </p>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SUB-SECTION 1: FOUNDER TEAM (EXACT IMAGE 2 STYLE)    */}
            {/* ---------------------------------------------------- */}
            <div className="w-full flex flex-col space-y-6">
              <div className="flex flex-col items-center text-center space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#548235] dark:text-[#72B347] uppercase tracking-widest">
                  FOUNDING VISIONARIES
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Founder Team
                </h3>
              </div>

              {/* 3 Prominent Executive Cards (Image 2) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl mx-auto items-stretch">
                {foundersList.map((founder) => (
                  <div
                    key={founder.name}
                    className="group relative rounded-3xl bg-white dark:bg-[#0D1525] border border-gray-200/90 dark:border-white/10 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(84,130,53,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center"
                  >
                    {/* Top Circular Portrait with Warm/Green Ring (Image 2) */}
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-md group-hover:shadow-[0_0_28px_rgba(84,130,53,0.55)] group-hover:scale-105 transition-all duration-500">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full rounded-full object-cover object-center bg-gray-50 dark:bg-white/5 filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 ease-in-out"
                      />
                    </div>

                    {/* Name */}
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-4 tracking-tight">
                      {founder.name}
                    </h4>

                    {/* Role / Designation directly below Name */}
                    <p className="text-xs sm:text-[12.5px] font-bold text-[#548235] dark:text-[#72B347] pt-1.5 tracking-wide uppercase">
                      {founder.role}
                    </p>

                    {/* Bio below Role/Designation */}
                    <p className="text-xs sm:text-[12px] text-gray-600 dark:text-gray-300 italic leading-relaxed pt-2.5 px-1 min-h-[52px]">
                      {founder.bio}
                    </p>

                    {/* Bottom Social / LinkedIn Button */}
                    {founder.linkedin && (
                      <div className="pt-4">
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name} LinkedIn Profile`}
                          className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#548235] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 cursor-pointer"
                        >
                          <Linkedin className="w-4 h-4 fill-white" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SUB-SECTION 2: MEET THE TEAM (EXACT IMAGE 3 STYLE)   */}
            {/* ---------------------------------------------------- */}
            <div className="w-full flex flex-col space-y-8 pt-8 border-t border-gray-200/80 dark:border-white/10">
              <div className="flex flex-col items-center text-center space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#4472C4] dark:text-[#6893DF] uppercase tracking-widest">
                  MANAGEMENT EXCELLENCE
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Meet the team
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Key executives steering finance, engineering, telematics, and nationwide fleet operations.
                </p>
              </div>

              {/* Clean Rows of Circular Headshots without boxes (Exact Image 3 Style) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10 max-w-5xl mx-auto w-full items-start text-center">
                {executiveTeamList.map((member) => (
                  <a
                    key={member.name}
                    href={member.linkedin || '#'}
                    target={member.linkedin ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-1"
                  >
                    {/* Circular Headshot on Soft Neutral Background (Image 3) */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10 shadow-sm group-hover:shadow-[0_0_22px_rgba(84,130,53,0.55)] group-hover:scale-105 transition-all duration-500">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover object-center filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-500 ease-in-out"
                      />
                    </div>

                    {/* Name */}
                    <h4 className="text-xs sm:text-[13.5px] font-bold text-gray-900 dark:text-white pt-3 tracking-tight group-hover:text-[#548235] transition-colors leading-snug">
                      {member.name}
                    </h4>

                    {/* Role */}
                    <p className="text-[10.5px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium pt-0.5 leading-snug">
                      {member.role}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-8 border-t border-gray-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">
              <span>Transvolt Mobility Private Limited • Executive Governance</span>
              <span className="font-mono text-[#548235] dark:text-[#72B347] font-bold">18 Executive Members Across India</span>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 6: OUR PARTNERS (Clients, OEMs & CPO Partners)   */}
        {/* ======================================================== */}
        <div
          id="our-partners-section"
          className="w-full h-screen overflow-y-auto relative flex flex-col justify-start bg-slate-50/50 dark:bg-[#000000] select-none scroll-smooth"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#548235]/[0.03] dark:bg-[#548235]/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4472C4]/[0.03] dark:bg-[#4472C4]/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-24 pb-16 flex flex-col space-y-7">
            
            {/* Header: Title & Description (Left Aligned) */}
            <div className="flex flex-col space-y-1.5 border-b border-gray-200/80 dark:border-white/10 pb-5">
              <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                Our Partners
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-400 max-w-3xl">
                Leading public transit authorities, global commercial OEMs, and energy infrastructure giants co-powering India's commercial zero-emission transition.
              </p>
            </div>

            {/* Top Category Menu Selection & Minimal Rounded Search Bar - Left Aligned & Vertically Centered */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-gray-200/80 dark:border-white/10 pb-3">
              {/* Left: Category Menu Tabs */}
              <div className="flex items-center flex-nowrap overflow-x-auto text-xs sm:text-[13.5px] lg:text-[14.5px] font-sans" style={{ scrollbarWidth: 'none' }}>
                {[
                  {
                    id: 'concessions',
                    label: 'Clients & Concessioning Authorities',
                    count: partnersData.filter((p) => p.category === 'concessions').length,
                    description: '12 Long-Term Public Transit Concessions & High-Volume Industrial Heavy Freight Corridors',
                  },
                  {
                    id: 'oem',
                    label: 'OEM Partners',
                    count: partnersData.filter((p) => p.category === 'oem').length,
                    description: '7 Premier Electric Vehicle Commercial Manufacturers (Buses, Haulage Dumpers & Heavy Trucks)',
                  },
                  {
                    id: 'chargers',
                    label: 'Charger & CPO Partners',
                    count: partnersData.filter((p) => p.category === 'chargers').length,
                    description: '9 High-Power Depot Infrastructure Providers & Charge Point Operators (Up to Megawatt Fast-Charging)',
                  },
                  {
                    id: 'all',
                    label: 'All Partners',
                    count: partnersData.length,
                    description: 'Complete Partner Ecosystem — 28 Public Authorities, Industrial Freight Clients, Commercial OEMs & Energy Leaders',
                  },
                ].map((tab, idx, arr) => {
                  const isActive = activePartnerFilter === tab.id;
                  return (
                    <React.Fragment key={tab.id}>
                      <button
                        type="button"
                        onClick={() => setActivePartnerFilter(tab.id)}
                        className={`group relative py-1.5 px-1 sm:px-2 flex items-center gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'text-[#548235] dark:text-[#72B347] font-bold'
                            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                            isActive
                              ? 'bg-[#548235]/15 text-[#548235] dark:bg-[#72B347]/20 dark:text-[#72B347] font-bold'
                              : 'bg-gray-150 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-white/15'
                          }`}
                        >
                          {tab.count}
                        </span>

                        {/* Active Bottom Underline Bar */}
                        {isActive && (
                          <span className="absolute bottom-[-13px] left-0 right-0 h-[2.5px] bg-[#548235] dark:bg-[#72B347] rounded-full transition-all" />
                        )}
                      </button>

                      {/* Vertical Separator '|' */}
                      {idx < arr.length - 1 && (
                        <span className="text-gray-300 dark:text-white/20 select-none px-2.5 sm:px-4 font-light text-sm sm:text-base">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Right: Minimal Rounded Search Bar - Vertically Centered */}
              <div className="relative flex items-center shrink-0 w-full sm:w-60 md:w-68 self-end md:self-center">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={partnerSearchQuery}
                  onChange={(e) => setPartnerSearchQuery(e.target.value)}
                  placeholder="Search partners..."
                  className="w-full h-10 pl-10 pr-9 text-xs sm:text-[13px] rounded-full bg-gray-100/90 dark:bg-white/[0.06] border border-gray-200/90 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#548235] focus:ring-1 focus:ring-[#548235]/30 focus:bg-white dark:focus:bg-[#0E1526] transition-all shadow-xs"
                />
                {partnerSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setPartnerSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Contextual Active Category Description Strip (Left Aligned) */}
            <div className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-gray-100/70 dark:bg-white/[0.03] border border-gray-200/70 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#548235] shrink-0" />
                <span className="font-medium">
                  {partnerSearchQuery ? (
                    <span>
                      Search results matching <strong className="text-gray-900 dark:text-white">"{partnerSearchQuery}"</strong>
                    </span>
                  ) : (
                    <>
                      {activePartnerFilter === 'concessions' && '12 Long-Term Public Transit Concessions & High-Volume Industrial Heavy Freight Corridors'}
                      {activePartnerFilter === 'oem' && '7 Premier Electric Vehicle Commercial Manufacturers (Buses, Haulage Dumpers & Heavy EV Trucks)'}
                      {activePartnerFilter === 'chargers' && '9 High-Power Depot Infrastructure Providers & Charge Point Operators (Up to Megawatt Charging)'}
                      {activePartnerFilter === 'all' && '28 Public Authorities, Industrial Freight Clients, Commercial OEMs & Energy Infrastructure Providers'}
                    </>
                  )}
                </span>
              </span>
              <span className="text-[11px] font-mono text-gray-400 shrink-0 hidden sm:inline">
                PAN-India Operations
              </span>
            </div>

            {/* Modern Partner Tiles Grid / Empty Search State */}
            {(() => {
              const displayPartners = (
                activePartnerFilter === 'all'
                  ? partnersData
                  : partnersData.filter((p) => p.category === activePartnerFilter)
              ).filter((partner) => {
                if (!partnerSearchQuery.trim()) return true;
                const q = partnerSearchQuery.toLowerCase().trim();
                return (
                  partner.name.toLowerCase().includes(q) ||
                  partner.role.toLowerCase().includes(q) ||
                  partner.categoryLabel.toLowerCase().includes(q)
                );
              });

              if (displayPartners.length === 0) {
                return (
                  <div className="w-full py-16 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      No partners found matching "{partnerSearchQuery}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Try searching another name or switch category.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setPartnerSearchQuery('')}
                        className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 font-semibold transition-colors cursor-pointer"
                      >
                        Clear Search
                      </button>
                      {activePartnerFilter !== 'all' && (
                        <button
                          type="button"
                          onClick={() => setActivePartnerFilter('all')}
                          className="px-3 py-1.5 text-xs rounded-lg bg-[#548235] hover:bg-[#446b2b] text-white font-semibold transition-colors cursor-pointer"
                        >
                          Search All Partners
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full">
                  {displayPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="group relative p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0E1526] border border-gray-200/90 dark:border-white/10 hover:border-[#548235]/60 hover:shadow-lg dark:hover:shadow-[#548235]/5 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3.5 sm:gap-4"
                    >
                      {/* Logo on Left */}
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-white border border-gray-150/90 dark:border-white/10 p-2 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* Name & Supporting Text on Right */}
                      <div className="flex flex-col space-y-0.5 min-w-0 flex-1">
                        <h4 className="text-[13px] sm:text-[14px] font-bold text-gray-900 dark:text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#548235] dark:group-hover:text-[#72B347] transition-colors">
                          {partner.name}
                        </h4>
                        <p className="text-[11px] sm:text-[11.5px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">
                          {partner.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

          </div>
        </div>

      </div>

      {/* ISO Certificate Modal */}
      {showCertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setShowCertModal(false)}
        >
          <div
            className="relative w-full max-w-2xl p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/10 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#548235]/15 text-[#548235] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    ISO Certified Company
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#548235]/15 text-[#548235]">
                      Verified Compliance
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Transvolt Mobility Private Limited Global Accreditations
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Certificates Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Certificate 1: ISO 14001:2015 */}
              <div className="p-4 rounded-xl bg-[#548235]/[0.06] border border-[#548235]/25 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white p-1 border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                      <img
                        src="/assets/iso_14001_logo.png"
                        alt="ISO 14001"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">
                        ISO 14001:2015
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#548235] block">
                        Environmental Management System
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    Certified international standards for systematically managing and reducing environmental impact, greenhouse emissions, and operational waste across commercial fleet depots and transport routes.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#548235]/15 flex items-center justify-between text-[10.5px] font-medium text-[#548235]">
                  <span>Accreditation: Active</span>
                  <span>Zero-Emission Standard</span>
                </div>
              </div>

              {/* Certificate 2: ISO 45001:2018 */}
              <div className="p-4 rounded-xl bg-[#4472C4]/[0.06] border border-[#4472C4]/25 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white p-1 border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                      <img
                        src="/assets/iso_45001_logo.png"
                        alt="ISO 45001"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">
                        ISO 45001:2018
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#4472C4] block">
                        Occupational Health & Safety
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    Rigorous standards guaranteeing workplace health and safety, driver / pilot welfare, high-voltage battery handling safety protocols, and passenger security across all commercial operations.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#4472C4]/15 flex items-center justify-between text-[10.5px] font-medium text-[#4472C4]">
                  <span>Accreditation: Active</span>
                  <span>Safety-First Standard</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#548235]" />
                Audited & verified by accredited third-party certification bodies
              </span>
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collage Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity cursor-pointer animate-fade-in"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full p-3 rounded-2xl bg-[#0D1117] border border-white/20 overflow-hidden shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] max-h-[75vh] bg-black flex items-center justify-center">
              <img
                src={activeLightboxImg.src}
                alt={activeLightboxImg.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="pt-3 px-1 flex items-center justify-between text-white">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeLightboxImg.title}
                </h3>
                <p className="text-xs text-gray-300">
                  {activeLightboxImg.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightboxImg(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
