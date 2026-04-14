export interface SubMarketData {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  useCases: string[];
  bannerGradient: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  subMarkets: SubMarketData[];
}

export const industriesData: IndustryData[] = [
  {
    slug: "sugar-industry",
    name: "Sugar Industry",
    subMarkets: [
      { slug: "clarification", name: "Clarification", description: "Advanced chemicals for juice clarity and settling", longDescription: "Our clarification solutions are engineered to enhance juice purity, improve settling rates, and reduce sugar losses across the milling process. From flocculants to color precipitants, every formulation is designed for maximum efficiency in cane and beet sugar operations.", useCases: ["Juice clarification in sugar mills", "Color removal for refined sugar", "Mud filtration enhancement", "Raw sugar processing"], bannerGradient: "from-amber-700 to-amber-900" },
      { slug: "evaporation", name: "Evaporation", description: "Scale control for evaporator systems", longDescription: "Our evaporation chemicals prevent calcium and silica scale build-up in multi-effect evaporators and heat exchangers. By extending cleaning cycles and improving thermal efficiency, these products deliver significant cost savings and uninterrupted production.", useCases: ["Multiple-effect evaporator maintenance", "Heat exchanger scale prevention", "Thermal efficiency improvement", "Cleaning cycle extension"], bannerGradient: "from-orange-700 to-orange-900" },
      { slug: "crystallization", name: "Crystallization", description: "Viscosity control for better sugar recovery", longDescription: "Specialty additives that reduce massecuite viscosity to improve crystallization rates and centrifugal separation. These products directly increase sugar yield while lowering energy consumption during the boiling and curing stages.", useCases: ["Massecuite viscosity reduction", "Improved centrifugal performance", "Higher sugar recovery rates", "Energy optimization"], bannerGradient: "from-yellow-700 to-yellow-900" },
    ],
  },
  {
    slug: "paper-pulp",
    name: "Paper & Pulp",
    subMarkets: [
      { slug: "pulp-processing", name: "Pulp Processing", description: "Deinking and pulp treatment chemicals", longDescription: "Advanced deinking agents and pulp processing chemicals designed for recycled fiber operations. Our formulations ensure efficient ink removal, improved brightness, and cleaner pulp for high-quality paper production.", useCases: ["Recycled paper deinking", "Pulp brightness improvement", "Fiber cleaning and processing", "Flotation optimization"], bannerGradient: "from-emerald-700 to-emerald-900" },
      { slug: "paper-making", name: "Paper Making", description: "Wet-end and sizing chemicals", longDescription: "Complete wet-end chemistry solutions including retention aids, sizing agents, and strength additives. These products optimize paper machine performance, improve paper quality, and reduce raw material costs.", useCases: ["Wire section retention improvement", "Paper sizing for water resistance", "Dry and wet strength enhancement", "Filler retention optimization"], bannerGradient: "from-green-700 to-green-900" },
      { slug: "finishing", name: "Finishing", description: "Coating and finishing additives", longDescription: "High-performance coating binders and finishing chemicals that deliver superior print quality, gloss, and surface properties to coated papers and boards.", useCases: ["Paper coating applications", "Print quality enhancement", "Surface treatment", "Board finishing"], bannerGradient: "from-teal-700 to-teal-900" },
    ],
  },
  {
    slug: "textile",
    name: "Textile",
    subMarkets: [
      { slug: "pre-treatment", name: "Pre-treatment", description: "Wetting and desizing agents", longDescription: "Rapid wetting agents and enzyme-based desizing formulations that prepare fabrics for dyeing and finishing. Our pre-treatment range ensures uniform chemical penetration and efficient starch removal across all substrate types.", useCases: ["Fabric wetting and scouring", "Enzymatic desizing", "Bleaching preparation", "Substrate preparation"], bannerGradient: "from-blue-700 to-blue-900" },
      { slug: "dyeing", name: "Dyeing", description: "Levelling and dye auxiliaries", longDescription: "Precision dye auxiliaries that ensure uniform color distribution, improved dye uptake, and consistent batch-to-batch results. Compatible with reactive, disperse, and acid dye systems.", useCases: ["Uniform dye distribution", "Color fastness improvement", "Dye bath optimization", "Shade consistency"], bannerGradient: "from-indigo-700 to-indigo-900" },
      { slug: "finishing", name: "Finishing", description: "Softeners and functional finishes", longDescription: "Premium softeners and functional finishing agents that impart luxurious hand feel, anti-pilling properties, and durable performance characteristics to finished fabrics.", useCases: ["Fabric softening", "Anti-pilling treatment", "Water repellent finishing", "Wrinkle-free treatment"], bannerGradient: "from-violet-700 to-violet-900" },
    ],
  },
  {
    slug: "leather",
    name: "Leather",
    subMarkets: [
      { slug: "tanning", name: "Tanning", description: "Synthetic tanning agents", longDescription: "Chrome-free synthetic tanning agents that produce leather with excellent fullness, tight grain, and superior physical properties. Ideal for automotive, upholstery, and fashion leather applications.", useCases: ["Chrome-free tanning", "Automotive leather production", "Upholstery leather processing", "Fashion leather treatment"], bannerGradient: "from-stone-700 to-stone-900" },
      { slug: "retanning-finishing", name: "Retanning & Finishing", description: "Fatliquors and finishing chemicals", longDescription: "Comprehensive retanning and finishing solutions including fatliquors, dye carriers, and topcoat chemicals. These products deliver softness, flexibility, and aesthetic excellence to finished leather.", useCases: ["Leather softening and flexibility", "Uniform dye penetration", "Topcoat application", "Leather conditioning"], bannerGradient: "from-amber-800 to-stone-800" },
    ],
  },
  {
    slug: "paint-coating",
    name: "Paint & Coating",
    subMarkets: [
      { slug: "formulation-additives", name: "Formulation Additives", description: "Dispersants, rheology modifiers and defoamers", longDescription: "Essential formulation additives including high-performance dispersants, associative thickeners, and defoamers. These products ensure pigment stability, optimal viscosity, and defect-free paint films.", useCases: ["Pigment dispersion", "Viscosity and flow control", "Foam elimination", "Paint stability improvement"], bannerGradient: "from-red-700 to-red-900" },
      { slug: "performance-additives", name: "Performance Additives", description: "Film-forming and functional additives", longDescription: "Advanced film-forming aids, wetting agents, and functional additives that enhance coating performance. VOC-compliant solutions for architectural and industrial coating systems.", useCases: ["Film formation at low temperatures", "Surface wetting improvement", "VOC reduction", "Coating durability enhancement"], bannerGradient: "from-rose-700 to-rose-900" },
    ],
  },
  {
    slug: "detergent",
    name: "Detergent",
    subMarkets: [
      { slug: "household-cleaners", name: "Household Cleaners", description: "Surfactants and enzyme boosters", longDescription: "Biodegradable surfactants and multi-enzyme blends for household cleaning products. Our formulations deliver excellent cleaning performance with low environmental impact and mild skin compatibility.", useCases: ["Laundry detergent formulation", "Dishwashing liquids", "Multi-surface cleaners", "Stain removal products"], bannerGradient: "from-cyan-700 to-cyan-900" },
      { slug: "industrial-cleaning", name: "Industrial Cleaning", description: "Heavy-duty degreasers and cleaners", longDescription: "Concentrated industrial cleaning chemicals for demanding applications. Effective on oils, greases, and stubborn soils in CIP, soak tank, and spray wash operations across manufacturing facilities.", useCases: ["CIP cleaning systems", "Parts degreasing", "Floor and equipment cleaning", "Food plant sanitation"], bannerGradient: "from-sky-700 to-sky-900" },
    ],
  },
  {
    slug: "water-treatment",
    name: "Water Treatment",
    subMarkets: [
      { slug: "primary-treatment", name: "Primary Treatment", description: "Coagulants and flocculants", longDescription: "Inorganic coagulants and polymer flocculants for effective turbidity removal, color reduction, and solid-liquid separation in municipal and industrial water treatment applications.", useCases: ["Municipal water purification", "Industrial wastewater treatment", "Sludge dewatering", "Effluent clarification"], bannerGradient: "from-blue-800 to-blue-950" },
      { slug: "specialty-treatment", name: "Specialty Treatment", description: "Biocides, inhibitors and membrane chemicals", longDescription: "Specialized treatment chemicals including non-oxidizing biocides, corrosion inhibitors, and RO antiscalants. Comprehensive solutions for cooling towers, boiler systems, and membrane processes.", useCases: ["Cooling tower treatment", "Boiler water chemistry", "RO membrane protection", "Legionella control"], bannerGradient: "from-slate-700 to-slate-900" },
    ],
  },
  {
    slug: "biofuel-ethanol",
    name: "Biofuel / Ethanol",
    subMarkets: [
      { slug: "fermentation", name: "Fermentation", description: "Fermentation aids and enzyme systems", longDescription: "Nutrient-enhanced fermentation boosters and enzyme complexes that maximize yeast vitality, accelerate starch conversion, and increase ethanol yield per ton of feedstock.", useCases: ["Yeast performance enhancement", "Starch-to-sugar conversion", "Fermentation cycle optimization", "Ethanol yield improvement"], bannerGradient: "from-lime-700 to-lime-900" },
      { slug: "distillation", name: "Distillation", description: "Antifoams for distillation operations", longDescription: "Food-grade compatible antifoams designed specifically for ethanol distillation columns. These silicone-free formulations ensure smooth operation and consistent product quality.", useCases: ["Distillation column foam control", "Product purity maintenance", "Operational stability", "Energy efficiency improvement"], bannerGradient: "from-green-800 to-green-950" },
    ],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    subMarkets: [
      { slug: "processing-aids", name: "Processing Aids", description: "Food-grade antifoams and process chemicals", longDescription: "FDA-compliant processing aids including silicone antifoams and functional additives for food manufacturing. All products meet strict food safety regulations and are safe for direct contact applications.", useCases: ["Food processing defoaming", "Beverage production", "Confectionery manufacturing", "Edible oil processing"], bannerGradient: "from-orange-600 to-orange-800" },
      { slug: "hygiene-sanitation", name: "Hygiene & Sanitation", description: "CIP cleaners and sanitizers", longDescription: "Complete hygiene solutions for food and beverage facilities. Alkaline CIP cleaners, peracetic acid sanitizers, and surface disinfectants that ensure food safety compliance and microbiological control.", useCases: ["Dairy equipment cleaning", "Brewery sanitation", "Food contact surface treatment", "HACCP compliance"], bannerGradient: "from-red-600 to-red-800" },
    ],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    subMarkets: [
      { slug: "crop-protection", name: "Crop Protection", description: "Spray adjuvants and enhancers", longDescription: "Advanced spray adjuvants that enhance the performance of pesticides, herbicides, and fungicides. Our products improve leaf coverage, droplet retention, and active ingredient uptake for better crop protection outcomes.", useCases: ["Pesticide performance enhancement", "Herbicide application improvement", "Fungicide spray optimization", "Foliar nutrient delivery"], bannerGradient: "from-green-600 to-green-800" },
      { slug: "soil-management", name: "Soil Management", description: "Soil wetting and conditioning agents", longDescription: "Non-ionic soil wetting agents and conditioners that improve water penetration in hydrophobic soils, promote root zone moisture distribution, and enhance irrigation efficiency.", useCases: ["Hydrophobic soil treatment", "Irrigation efficiency", "Root zone moisture management", "Turf and landscape care"], bannerGradient: "from-emerald-600 to-emerald-800" },
    ],
  },
];

// Helper to find industry/submarket by slug
export const findSubMarket = (industrySlug: string, subMarketSlug: string) => {
  const industry = industriesData.find((i) => i.slug === industrySlug);
  if (!industry) return null;
  const subMarket = industry.subMarkets.find((s) => s.slug === subMarketSlug);
  if (!subMarket) return null;
  return { industry, subMarket };
};

// Get related sub-markets (same industry first, then others)
export const getRelatedSubMarkets = (industrySlug: string, subMarketSlug: string, count = 6): { industry: IndustryData; subMarket: SubMarketData }[] => {
  const results: { industry: IndustryData; subMarket: SubMarketData }[] = [];

  // Same industry, different sub-market
  const sameIndustry = industriesData.find((i) => i.slug === industrySlug);
  if (sameIndustry) {
    sameIndustry.subMarkets
      .filter((s) => s.slug !== subMarketSlug)
      .forEach((s) => results.push({ industry: sameIndustry, subMarket: s }));
  }

  // Other industries
  for (const ind of industriesData) {
    if (ind.slug === industrySlug) continue;
    for (const sm of ind.subMarkets) {
      if (results.length >= count) break;
      results.push({ industry: ind, subMarket: sm });
    }
    if (results.length >= count) break;
  }

  return results.slice(0, count);
};
