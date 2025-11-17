// Dynamic imports for heavy components to reduce initial bundle size

// Map components - only load when needed
export const loadMapComponents = () => ({
  GoogleMapsWrapper: () => import('@googlemaps/react-wrapper').then(m => m.Wrapper),
  GoogleMapsLoader: () => import('@googlemaps/js-api-loader').then(m => m.Loader)
});

// Animation libraries - only load when needed
export const loadAnimationLibraries = () => ({
  FramerMotion: () => import('framer-motion'),
  GSAP: () => import('gsap').then(m => m.gsap)
});

// Chart libraries - if used
export const loadChartLibraries = () => ({
  // Add chart libraries here if needed
});

// Heavy UI components
export const loadHeavyComponents = () => ({
  Swiper: () => import('swiper/react'),
  SwiperModules: () => import('swiper/modules')
});

// Utility to preload critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be used soon
  const criticalImports = [
    import('@heroui/react'),
    import('lucide-react'),
    import('react-router-dom')
  ];
  
  return Promise.all(criticalImports);
};

// Lazy load non-critical features
export const loadNonCriticalFeatures = () => ({
  Analytics: () => import('@vercel/analytics/react'),
  ChatWidget: () => import('../components/chat/ChatWidget'),
  SearchModal: () => import('../components/SearchModal')
});