import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  blurDataURL 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isIntersecting && !isLoaded && !isError) {
      const img = new Image();
      img.decoding = 'async'; // Optimize decoding
      img.onload = () => {
        setIsLoaded(true);
      };
      img.onerror = () => {
        setIsError(true);
      };
      img.src = src;
    }
  }, [isIntersecting, src, isLoaded, isError]);

  return (
    <div 
      ref={elementRef as any}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Placeholder/Blur */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse">
          {blurDataURL && (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110"
            />
          )}
          {placeholder && !blurDataURL && (
            <div className="flex items-center justify-center h-full text-gray-400">
              {placeholder}
            </div>
          )}
        </div>
      )}

      {/* Actual Image */}
      {isLoaded && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
}