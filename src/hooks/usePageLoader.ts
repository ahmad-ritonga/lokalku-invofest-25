import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader on route change
    setIsLoading(true);
    
    // Hide loader after a shorter delay for better performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced from 800ms to 500ms for lighter feel

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isLoading, setIsLoading };
}

// Hook for component loading states
export function useComponentLoader(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading
  };
}