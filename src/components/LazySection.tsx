import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  threshold?: number;
  id?: string;
}

export default function LazySection({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  id
}: LazySectionProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin: '50px',
    triggerOnce: true
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isIntersecting) {
      switch (animationType) {
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'slideRight':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'scale':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={elementRef as any}
      id={id}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
}