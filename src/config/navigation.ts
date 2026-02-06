// Centralized Navigation Configuration
// All routes, protected routes, and navigation metadata

export interface NavRoute {
  path: string;
  name: string;
  description?: string;
  icon?: string;
  protected?: boolean;
  adminOnly?: boolean;
  showInNav?: boolean;
  children?: NavRoute[];
}

// Main Navigation Routes
export const MAIN_NAV_ROUTES: NavRoute[] = [
  {
    path: '/',
    name: 'Home',
    description: 'InVision Network - Digital Safety & Protection',
    showInNav: true
  },
  {
    path: '/training',
    name: 'Learn & Train',
    description: 'Cybersecurity training and ScamShield protection plans',
    showInNav: true
  },
  {
    path: '/business',
    name: 'AI & Business',
    description: 'AI automation services and business solutions',
    showInNav: true
  },
  {
    path: '/resources',
    name: 'Resources',
    description: 'Digital products, books, and security tools',
    showInNav: true
  },
  {
    path: '/about',
    name: 'About',
    description: 'About InVision Network and our mission',
    showInNav: true
  },
  {
    path: '/contact',
    name: 'Contact',
    description: 'Get in touch with our team',
    showInNav: true
  }
];

// Portal Routes (Protected)
export const PORTAL_ROUTES: NavRoute[] = [
  {
    path: '/portal/admin',
    name: 'Admin Dashboard',
    protected: true,
    adminOnly: true
  },
  {
    path: '/portal/staff',
    name: 'Staff Dashboard',
    protected: true
  },
  {
    path: '/portal/senior',
    name: 'Senior Dashboard',
    protected: true
  },
  {
    path: '/portal/caregiver',
    name: 'Caregiver Dashboard',
    protected: true
  },
  {
    path: '/portal/healthcare',
    name: 'Healthcare Dashboard',
    protected: true
  },
  {
    path: '/portal/trainer',
    name: 'Trainer Dashboard',
    protected: true
  },
  {
    path: '/portal/analyst',
    name: 'Analyst Dashboard',
    protected: true
  },
  {
    path: '/portal/developer',
    name: 'Developer Dashboard',
    protected: true
  },
  {
    path: '/portal/my-courses',
    name: 'My Courses',
    description: 'View your enrolled courses and training progress',
    protected: true
  },
  {
    path: '/portal/my-bookings',
    name: 'My Bookings',
    description: 'View and manage your service bookings',
    protected: true
  }
];

// Legal/Policy Routes
export const LEGAL_ROUTES: NavRoute[] = [
  {
    path: '/privacy',
    name: 'Privacy Policy'
  },
  {
    path: '/terms',
    name: 'Terms of Service'
  },
  {
    path: '/accessibility',
    name: 'Accessibility'
  },
  {
    path: '/sitemap',
    name: 'Sitemap'
  }
];

// Business Sub-Routes
export const BUSINESS_ROUTES: NavRoute[] = [
  {
    path: '/business/ai-receptionist',
    name: 'AI Receptionist',
    description: '24/7 AI-powered call handling'
  },
  {
    path: '/business/ai-automation',
    name: 'AI Automation',
    description: 'Automated follow-up and lead nurturing'
  },
  {
    path: '/business/website-design',
    name: 'Website Design',
    description: 'Professional website development'
  },
  {
    path: '/business/website-insurance',
    name: 'Website Insurance',
    description: 'Website protection and maintenance'
  }
];

// All Routes Combined
export const ALL_ROUTES: NavRoute[] = [
  ...MAIN_NAV_ROUTES,
  ...PORTAL_ROUTES,
  ...LEGAL_ROUTES,
  ...BUSINESS_ROUTES
];

// Helper Functions
export const getRouteByPath = (path: string): NavRoute | undefined => {
  return ALL_ROUTES.find(r => r.path === path);
};

export const getProtectedRoutes = (): NavRoute[] => {
  return ALL_ROUTES.filter(r => r.protected);
};

export const getAdminRoutes = (): NavRoute[] => {
  return ALL_ROUTES.filter(r => r.adminOnly);
};

export const getMainNavRoutes = (): NavRoute[] => {
  return MAIN_NAV_ROUTES.filter(r => r.showInNav);
};

// Route Helpers
export const isProtectedRoute = (path: string): boolean => {
  const route = getRouteByPath(path);
  return route?.protected ?? false;
};

export const isAdminRoute = (path: string): boolean => {
  const route = getRouteByPath(path);
  return route?.adminOnly ?? false;
};
