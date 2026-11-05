export const calculatorConfig = {
  status: 'pending_business_approval' as const,
  locations: ['Gurgaon', 'Noida', 'Delhi'],
  teamSizes: ['25 seats', '50 seats', '100+ seats', 'Custom'],
  finishTiers: ['Standard Modular', 'Bespoke Corporate', 'Luxury Executive'],
  // Populate only after written business approval. Values are intentionally null.
  pricing: {
    'Standard Modular': null,
    'Bespoke Corporate': null,
    'Luxury Executive': null,
  } as Record<string, number | null>,
  timelines: {
    'Standard Modular': null,
    'Bespoke Corporate': null,
    'Luxury Executive': null,
  } as Record<string, string | null>,
};

export const calculatorCanQuote = () => Object.values(calculatorConfig.pricing).every((value) => typeof value === 'number');
