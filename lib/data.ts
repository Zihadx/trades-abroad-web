export type Trade = { slug: string; name: string; icon: string; blurb: string; skills: string[] };
export type Destination = { slug: string; name: string; code: string; tagline: string; lat: number; lon: number };

export const HUB = { lat: 23.7, lon: 90.4 }; // origin of the animated routes; change freely

export const trades: Trade[] = [
  { slug: "electrical", name: "Electrical", icon: "zap", blurb: "Installation, maintenance and fault-finding across residential, commercial and industrial systems.", skills: ["Wiring & installation", "Fault diagnosis", "Safety compliance"] },
  { slug: "plumbing", name: "Plumbing", icon: "wrench", blurb: "Water, drainage and gas-adjacent systems for homes, sites and facilities.", skills: ["Pipework & fittings", "Drainage", "System testing"] },
  { slug: "welding", name: "Welding", icon: "flame", blurb: "Structural, pipe and fabrication welding in demanding industrial settings.", skills: ["MIG / TIG / Arc", "Blueprint reading", "Quality inspection"] },
  { slug: "construction", name: "Construction", icon: "hardhat", blurb: "Site-based building roles from formwork and concrete to finishing.", skills: ["Site safety", "Concrete & formwork", "Team coordination"] },
  { slug: "carpentry", name: "Carpentry", icon: "hammer", blurb: "Framing, joinery and finishing carpentry for builds large and small.", skills: ["Framing", "Joinery", "Precision finishing"] },
  { slug: "hvac", name: "HVAC", icon: "fan", blurb: "Heating, ventilation, cooling and refrigeration installation and servicing.", skills: ["Install & commissioning", "Refrigeration", "Preventive maintenance"] },
  { slug: "mechanical", name: "Mechanical", icon: "cog", blurb: "Plant and machinery maintenance, fitting and mechanical repair.", skills: ["Machine fitting", "Predictive upkeep", "Technical drawings"] },
  { slug: "heavy-equipment", name: "Heavy Equipment", icon: "tractor", blurb: "Operation of excavators, cranes, loaders and other heavy machinery.", skills: ["Machine operation", "Load safety", "Daily inspections"] },
  { slug: "automotive", name: "Automotive", icon: "car", blurb: "Diagnostics, repair and servicing for light and commercial vehicles.", skills: ["Diagnostics", "Engine & drivetrain", "Electrical systems"] },
  { slug: "other-trades", name: "Other Trades", icon: "layers", blurb: "Painting, tiling, insulation, scaffolding and more specialist trades.", skills: ["Specialist finishing", "Site readiness", "Adaptability"] },
];

export const destinations: Destination[] = [
  { slug: "australia", name: "Australia", code: "AU", tagline: "Build your career Down Under", lat: -25.3, lon: 134 },
  { slug: "canada", name: "Canada", code: "CA", tagline: "Skilled trades across a vast landscape", lat: 56, lon: -106 },
  { slug: "united-kingdom", name: "United Kingdom", code: "UK", tagline: "Heritage cities, modern infrastructure", lat: 54, lon: -2.5 },
  { slug: "germany", name: "Germany", code: "DE", tagline: "Precision engineering culture", lat: 51, lon: 10.4 },
  { slug: "uae", name: "UAE", code: "AE", tagline: "Fast-moving, large-scale projects", lat: 24.3, lon: 54.4 },
  { slug: "new-zealand", name: "New Zealand", code: "NZ", tagline: "Rebuilding and growing", lat: -41, lon: 174 },
];

export const steps = [
  { t: "Explore Opportunities", d: "Browse trades and destinations to understand where your skills fit.", icon: "compass" },
  { t: "Select Your Trade", d: "Choose the discipline that matches your experience and goals.", icon: "target" },
  { t: "Prepare Your Profile", d: "Organise your experience, qualifications and references clearly.", icon: "file" },
  { t: "Submit Application", d: "Apply through a structured, transparent process.", icon: "send" },
  { t: "Recruitment & Assessment", d: "Take part in employer-led screening and skills assessment.", icon: "clipboard" },
  { t: "Begin Your Career", d: "Move forward with guidance on the next practical steps.", icon: "rocket" },
];

export const why = [
  { t: "Global career opportunities", d: "A single place to explore skilled trades roles across borders.", icon: "globe" },
  { t: "Skilled workforce connections", d: "Bridging experienced tradespeople and employers who need them.", icon: "users" },
  { t: "Structured guidance", d: "A clear path from first look to application, step by step.", icon: "clipboard" },
  { t: "Transparent process", d: "Plain-language information about what each stage involves.", icon: "shield" },
  { t: "Professional support", d: "People to talk to when you have questions.", icon: "headset" },
  { t: "Employer connections", d: "Tools for international employers to find qualified talent.", icon: "handshake" },
];

export const faqs = [
  { q: "Which trades are covered?", a: "Electrical, plumbing, welding, construction, carpentry, HVAC, mechanical, heavy equipment, automotive and other skilled trades." },
  { q: "Are jobs guaranteed in any country?", a: "No. Opportunities, visa rules and licensing differ by country and employer, and change over time. Always verify with official sources." },
  { q: "What do I need to apply?", a: "Typically a clear profile of your experience, qualifications and references. Requirements vary by role and destination." },
  { q: "How does recruitment work?", a: "You prepare a profile, apply, and may go through employer screening and skills assessment before any offer." },
  { q: "Do I need years of experience?", a: "Many roles expect proven hands-on experience. Each listing states what the employer is looking for." },
  { q: "Can employers use the platform?", a: "Yes. Employers can enquire about accessing skilled professionals and workforce recruitment support." },
];

export const articles = [
  { slug: "international-trades-careers", t: "International Skilled Trades Careers", d: "What working in your trade abroad can look like." },
  { slug: "preparing-overseas", t: "Preparing for Overseas Employment", d: "Documents, skills and expectations to get ready early." },
  { slug: "trades-in-demand", t: "Skilled Trades in Global Demand", d: "Understanding where and why trades skills are sought." },
];

export const jobs = [
  { id: 1, title: "Industrial Electrician", trade: "electrical", country: "uae", type: "Full-time" },
  { id: 2, title: "Pipe Welder (TIG)", trade: "welding", country: "canada", type: "Contract" },
  { id: 3, title: "HVAC Service Technician", trade: "hvac", country: "australia", type: "Full-time" },
  { id: 4, title: "Site Carpenter", trade: "carpentry", country: "new-zealand", type: "Full-time" },
  { id: 5, title: "Excavator Operator", trade: "heavy-equipment", country: "germany", type: "Contract" },
  { id: 6, title: "Plant Mechanic", trade: "mechanical", country: "united-kingdom", type: "Full-time" },
  { id: 7, title: "Commercial Plumber", trade: "plumbing", country: "australia", type: "Full-time" },
  { id: 8, title: "Vehicle Diagnostics Technician", trade: "automotive", country: "canada", type: "Full-time" },
];
