// Centralized Product Configuration with Stripe Price IDs
// All products, subscriptions, and services in one place

export type ProductCategory = 
  | 'scamshield' 
  | 'ai-service' 
  | 'insurance' 
  | 'training' 
  | 'digital-book' 
  | 'physical-product';

export type PaymentType = 'subscription' | 'one-time';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  paymentType: PaymentType;
  stripePriceId: string;
  stripeProductId?: string;
  price: number; // in dollars
  billingInterval?: 'month' | 'year';
  features?: string[];
  popular?: boolean;
  isDigital?: boolean;
  imageUrl?: string;
  stock?: number;
}

// ScamShield Protection Plans (Subscriptions)
export const SCAMSHIELD_PLANS: Product[] = [
  {
    id: 'scamshield-starter',
    name: 'ScamShield Starter',
    description: 'Essential protection for individuals',
    category: 'scamshield',
    paymentType: 'subscription',
    stripePriceId: 'price_1SjwUHJ8osfwYbX7ZY71jSOR',
    stripeProductId: 'prod_SWvDVqaZCx2aax',
    price: 39,
    billingInterval: 'month',
    features: [
      '5 scam checks per month',
      'Email & phone verification',
      'Basic threat alerts',
      'Email support'
    ],
    popular: false
  },
  {
    id: 'scamshield-family',
    name: 'ScamShield Family',
    description: 'Complete protection for the whole family',
    category: 'scamshield',
    paymentType: 'subscription',
    stripePriceId: 'price_1SjwUIJ8osfwYbX7Ynjt7gMq',
    stripeProductId: 'prod_SWvDuDfcCDUAeC',
    price: 79,
    billingInterval: 'month',
    features: [
      '20 scam checks per month',
      'Up to 5 family members',
      'Real-time threat monitoring',
      'Priority phone support',
      'Family safety dashboard'
    ],
    popular: true
  },
  {
    id: 'scamshield-premium',
    name: 'ScamShield Premium',
    description: 'Maximum protection with concierge service',
    category: 'scamshield',
    paymentType: 'subscription',
    stripePriceId: 'price_1SjwULJ8osfwYbX7DdZ4Ckqc',
    stripeProductId: 'prod_SWvDVhZEzl3Fft',
    price: 129,
    billingInterval: 'month',
    features: [
      'Unlimited scam checks',
      'Unlimited family members',
      '24/7 concierge protection',
      'Identity theft monitoring',
      'Financial transaction alerts',
      'Dedicated security advisor'
    ],
    popular: false
  }
];

// AI Business Services (One-time payments)
export const AI_SERVICES: Product[] = [
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    description: 'Never miss a lead with 24/7 AI-powered call handling',
    category: 'ai-service',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwUSJ8osfwYbX7aTqXVqEZ',
    stripeProductId: 'prod_SWvDTd6tIwDfic',
    price: 9500,
    features: [
      '24/7 call answering',
      'Natural language processing',
      'Lead qualification',
      'Appointment scheduling',
      'CRM integration',
      'Call analytics dashboard'
    ]
  },
  {
    id: 'ai-follow-up',
    name: 'AI Follow-Up Automation',
    description: 'Automated follow-up sequences that convert',
    category: 'ai-service',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwUUJ8osfwYbX7yHojdcSK',
    stripeProductId: 'prod_SWvDoXxOAXVo5K',
    price: 12500,
    features: [
      'Multi-channel automation',
      'Smart timing optimization',
      'Personalized messaging',
      'Lead scoring',
      'Performance analytics',
      'A/B testing'
    ]
  },
  {
    id: 'ai-custom',
    name: 'Custom AI Automation',
    description: 'Tailored AI solutions for your unique business needs',
    category: 'ai-service',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwUVJ8osfwYbX7cAA0LiG2',
    stripeProductId: 'prod_SWvDA3dPWLhXvQ',
    price: 25000,
    features: [
      'Custom AI development',
      'Full workflow automation',
      'Dedicated project manager',
      'Unlimited integrations',
      'Priority support',
      '12-month maintenance'
    ]
  }
];

// AI Service Insurance Plans (Subscriptions)
export const AI_INSURANCE_PLANS: Product[] = [
  {
    id: 'insurance-basic',
    name: 'AI Insurance Essential',
    description: 'Basic coverage for AI service protection',
    category: 'insurance',
    paymentType: 'subscription',
    stripePriceId: 'price_1SjwUMJ8osfwYbX7hBE9RiPI',
    stripeProductId: 'prod_SWvDMCcxHKvVD0',
    price: 199,
    billingInterval: 'month',
    features: [
      'Up to $50,000 coverage',
      'Basic error protection',
      'Email support',
      '72-hour response time'
    ]
  },
  {
    id: 'insurance-standard',
    name: 'AI Insurance Professional',
    description: 'Comprehensive coverage for growing businesses',
    category: 'insurance',
    paymentType: 'subscription',
    stripePriceId: 'price_1SjwUOJ8osfwYbX7uyyCGLES',
    stripeProductId: 'prod_SWvDlKjN2LHTI7',
    price: 399,
    billingInterval: 'month',
    features: [
      'Up to $150,000 coverage',
      'Full error & omission protection',
      'Priority support',
      '24-hour response time',
      'Quarterly audits'
    ],
    popular: true
  },
  {
    id: 'insurance-premium',
    name: 'AI Insurance Enterprise',
    description: 'Maximum protection for enterprise operations',
    category: 'insurance',
    paymentType: 'subscription',
    stripePriceId: 'price_1SjwUQJ8osfwYbX7Q5jRWQEt',
    stripeProductId: 'prod_SWvDuZyS4iQXds',
    price: 799,
    billingInterval: 'month',
    features: [
      'Up to $500,000 coverage',
      'Complete liability protection',
      'Dedicated account manager',
      '4-hour response time',
      'Monthly audits',
      'Compliance support'
    ]
  }
];

// Training Programs (One-time payments)
// Note: These use database-driven pricing - no Stripe price IDs needed
// Training is handled through booking/inquiry flow, not direct checkout
export const TRAINING_PROGRAMS: Product[] = [
  {
    id: 'training-individual',
    name: 'Individual Training',
    description: 'Comprehensive cybersecurity training for individuals',
    category: 'training',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwObJ8osfwYbX7UxSe7ORt', // Scam Defense Guide E-Book
    price: 34.99,
    isDigital: true,
    features: [
      'Self-paced online course',
      'Certificate of completion',
      'Lifetime access',
      'Mobile friendly'
    ]
  },
  {
    id: 'training-spanish',
    name: 'Capacitación en Español',
    description: 'Complete cybersecurity training in Spanish',
    category: 'training',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwOaJ8osfwYbX7MPe7VAm2', // AI Detection E-Book 
    price: 34.99,
    isDigital: true,
    features: [
      'Curso completo en español',
      'Certificado de finalización',
      'Acceso de por vida',
      'Compatible con móviles'
    ]
  },
  {
    id: 'training-enterprise',
    name: 'Enterprise Training',
    description: 'Team-based training for organizations',
    category: 'training',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwUVJ8osfwYbX7cAA0LiG2', // Custom AI (contact for quote)
    price: 599,
    isDigital: true,
    features: [
      'Up to 25 team members',
      'Admin dashboard',
      'Progress tracking',
      'Team certificates',
      'Priority support'
    ]
  }
];

// Digital Books - Using actual Stripe price IDs
export const DIGITAL_BOOKS: Product[] = [
  {
    id: 'book-scam-defense',
    name: 'Complete Scam Defense Guide',
    description: 'Everything you need to protect yourself from modern scams',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwObJ8osfwYbX7UxSe7ORt',
    price: 34.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-cyber-safety',
    name: 'Cybersecurity for Seniors',
    description: 'Easy-to-understand guide for staying safe online',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwOgJ8osfwYbX7BFT7VyBl',
    price: 19.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-identity-protection',
    name: 'Identity Protection Handbook',
    description: 'Protect your identity in the digital age',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwOdJ8osfwYbX7MPe7VAm2',
    price: 32.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-crypto-defense',
    name: 'Crypto Scam Defense',
    description: 'Protect your digital assets from fraud',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmsJ8osfwYbX7ioMIlJB0',
    price: 34.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-romance-scam',
    name: 'Romance Scam Awareness',
    description: 'Protect your heart and wallet',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmtJ8osfwYbX7cCVawnfv',
    price: 28.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-voice-clone',
    name: 'Voice Clone Detection',
    description: 'Spot AI fake calls instantly',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmuJ8osfwYbX7s4o4JB2a',
    price: 31.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-medicare-fraud',
    name: 'Medicare Fraud Protection',
    description: 'Complete senior healthcare safety',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmvJ8osfwYbX7NqgadyPs',
    price: 26.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-email-safety',
    name: 'Email Safety Essentials',
    description: 'Stop inbox threats forever',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmxJ8osfwYbX7UPSnS1v8',
    price: 22.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-tax-scam',
    name: 'Tax Scam Prevention',
    description: 'Avoid IRS imposter schemes',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmyJ8osfwYbX7tb11WOIS',
    price: 29.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-tech-support',
    name: 'Tech Support Fraud Defense',
    description: 'Never get fooled by fake support',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJmzJ8osfwYbX7SE1V5Dnn',
    price: 25.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-grandparent-scam',
    name: 'Grandparent Scam Defense',
    description: 'Protecting family bonds from scammers',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJn0J8osfwYbX7t2Ta3TxZ',
    price: 24.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-investment-fraud',
    name: 'Investment Fraud Guide',
    description: 'Spot Ponzi schemes fast',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJn1J8osfwYbX77tR8VN6p',
    price: 36.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'book-charity-scam',
    name: 'Charity Scam Awareness',
    description: 'Give safely to real causes',
    category: 'digital-book',
    paymentType: 'one-time',
    stripePriceId: 'price_1StJn2J8osfwYbX7i25vJA5t',
    price: 21.99,
    isDigital: true,
    imageUrl: '/placeholder.svg'
  }
];

// Physical Products - Using actual Stripe price IDs
export const PHYSICAL_PRODUCTS: Product[] = [
  {
    id: 'product-wifi-extender',
    name: 'Secure WiFi Signal Extender',
    description: 'Extend your WiFi range with built-in security features',
    category: 'physical-product',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwPJJ8osfwYbX7vEPLPml1',
    price: 39.99,
    isDigital: false,
    stock: 100,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'product-privacy-screen',
    name: 'Privacy Screen Protector',
    description: 'Keep your screen private from prying eyes',
    category: 'physical-product',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwOtJ8osfwYbX7spllhrec',
    price: 39.99,
    isDigital: false,
    stock: 200,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'product-faraday-bag',
    name: 'RFID Faraday Bag',
    description: 'Block all signals to protect your devices',
    category: 'physical-product',
    paymentType: 'one-time',
    stripePriceId: 'price_1SjwOyJ8osfwYbX7SXOyTNh8',
    price: 19.99,
    isDigital: false,
    stock: 150,
    imageUrl: '/placeholder.svg'
  }
];

// All Products Combined
export const ALL_PRODUCTS: Product[] = [
  ...SCAMSHIELD_PLANS,
  ...AI_SERVICES,
  ...AI_INSURANCE_PLANS,
  ...TRAINING_PROGRAMS,
  ...DIGITAL_BOOKS,
  ...PHYSICAL_PRODUCTS
];

// Helper Functions
export const getProductById = (id: string): Product | undefined => {
  return ALL_PRODUCTS.find(p => p.id === id);
};

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return ALL_PRODUCTS.find(p => p.stripePriceId === priceId);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return ALL_PRODUCTS.filter(p => p.category === category);
};

export const getSubscriptionProducts = (): Product[] => {
  return ALL_PRODUCTS.filter(p => p.paymentType === 'subscription');
};

export const getOneTimeProducts = (): Product[] => {
  return ALL_PRODUCTS.filter(p => p.paymentType === 'one-time');
};

// Veteran Discount Configuration
export const VETERAN_DISCOUNT = {
  percentage: 10,
  trainingPercentage: 17,
  eligibleCategories: ['scamshield', 'ai-service', 'insurance', 'training', 'digital-book', 'physical-product'] as ProductCategory[]
};

export const calculateVeteranDiscount = (price: number, category: ProductCategory): number => {
  const discountRate = category === 'training' 
    ? VETERAN_DISCOUNT.trainingPercentage 
    : VETERAN_DISCOUNT.percentage;
  return price * (discountRate / 100);
};
