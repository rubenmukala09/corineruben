// Centralized Service Configuration
// Business services, website design packages, and consulting

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  features: string[];
  popular?: boolean;
  cta: {
    text: string;
    action: 'checkout' | 'contact' | 'booking';
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  packages: ServicePackage[];
}

// Website Design Packages
export const WEBSITE_DESIGN_PACKAGES: ServicePackage[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Perfect for launching a single product or service',
    price: 1500,
    features: [
      'Single responsive page',
      'Mobile-optimized design',
      'Contact form integration',
      'Basic SEO setup',
      '2 revision rounds',
      '2-week delivery'
    ],
    cta: { text: 'Get Started', action: 'contact' }
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Complete website for established businesses',
    price: 3500,
    features: [
      'Up to 10 pages',
      'Custom responsive design',
      'Blog integration',
      'Advanced SEO optimization',
      'Analytics setup',
      '3 revision rounds',
      '4-week delivery'
    ],
    popular: true,
    cta: { text: 'Get Quote', action: 'contact' }
  },
  {
    id: 'ecommerce-website',
    name: 'E-Commerce Website',
    description: 'Full-featured online store with payment processing',
    price: 7500,
    features: [
      'Unlimited products',
      'Payment gateway integration',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Advanced analytics',
      '6-week delivery'
    ],
    cta: { text: 'Schedule Call', action: 'booking' }
  }
];

// Website Insurance/Maintenance Packages
export const WEBSITE_INSURANCE_PACKAGES: ServicePackage[] = [
  {
    id: 'essential-protection',
    name: 'Essential Protection',
    description: 'Basic website maintenance and security',
    price: 99,
    priceLabel: '/month',
    features: [
      'Weekly backups',
      'Security monitoring',
      'Plugin updates',
      'Uptime monitoring',
      'Email support'
    ],
    cta: { text: 'Subscribe', action: 'checkout' }
  },
  {
    id: 'professional-protection',
    name: 'Professional Protection',
    description: 'Comprehensive care for business websites',
    price: 199,
    priceLabel: '/month',
    features: [
      'Daily backups',
      'Advanced security scanning',
      'Performance optimization',
      'Content updates (2hr/mo)',
      'Priority phone support',
      'Monthly reports'
    ],
    popular: true,
    cta: { text: 'Subscribe', action: 'checkout' }
  },
  {
    id: 'enterprise-protection',
    name: 'Enterprise Protection',
    description: 'Maximum protection for critical websites',
    price: 399,
    priceLabel: '/month',
    features: [
      'Real-time backups',
      '24/7 security monitoring',
      'CDN integration',
      'Content updates (8hr/mo)',
      'Dedicated account manager',
      'SLA guarantee',
      'Disaster recovery'
    ],
    cta: { text: 'Contact Us', action: 'contact' }
  }
];

// Consulting Services
export const CONSULTING_SERVICES: ServicePackage[] = [
  {
    id: 'security-audit',
    name: 'Security Audit',
    description: 'Comprehensive security assessment of your digital presence',
    price: 500,
    features: [
      'Full vulnerability scan',
      'Password security review',
      'Network analysis',
      'Detailed report',
      'Remediation guidance'
    ],
    cta: { text: 'Book Audit', action: 'booking' }
  },
  {
    id: 'business-consulting',
    name: 'Business AI Consulting',
    description: 'Strategic guidance for AI implementation',
    price: 250,
    priceLabel: '/hour',
    features: [
      'AI readiness assessment',
      'Implementation roadmap',
      'Vendor evaluation',
      'ROI analysis',
      'Change management plan'
    ],
    cta: { text: 'Schedule Call', action: 'booking' }
  },
  {
    id: 'training-workshop',
    name: 'Team Training Workshop',
    description: 'On-site or virtual training for your team',
    price: 2000,
    priceLabel: '/day',
    features: [
      'Custom curriculum',
      'Hands-on exercises',
      'Q&A sessions',
      'Training materials',
      'Certificate of completion'
    ],
    cta: { text: 'Request Quote', action: 'contact' }
  }
];

// All Service Categories
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'website-design',
    name: 'Website Design',
    description: 'Professional website design and development',
    icon: 'Globe',
    packages: WEBSITE_DESIGN_PACKAGES
  },
  {
    id: 'website-insurance',
    name: 'Website Insurance',
    description: 'Ongoing protection and maintenance',
    icon: 'Shield',
    packages: WEBSITE_INSURANCE_PACKAGES
  },
  {
    id: 'consulting',
    name: 'Consulting Services',
    description: 'Expert guidance and training',
    icon: 'Users',
    packages: CONSULTING_SERVICES
  }
];

// Helper Functions
export const getServicePackageById = (id: string): ServicePackage | undefined => {
  for (const category of SERVICE_CATEGORIES) {
    const pkg = category.packages.find(p => p.id === id);
    if (pkg) return pkg;
  }
  return undefined;
};

export const getAllServicePackages = (): ServicePackage[] => {
  return SERVICE_CATEGORIES.flatMap(cat => cat.packages);
};
