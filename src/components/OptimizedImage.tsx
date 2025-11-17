import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Convert PNG to WebP if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('.png') && !originalSrc.startsWith('http')) {
      const webpSrc = originalSrc.replace('.png', '.webp');
      return webpSrc;
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to WebP if original fails (for consistency with WebP format)
    if (imgRef.current && src.includes('.png') && !src.includes('.webp')) {
      imgRef.current.src = src.replace('.png', '.webp');
    }
    onError?.();
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={isInView ? getOptimizedSrc(src) : placeholder}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError && "opacity-50"
        )}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          willChange: isLoaded ? "auto" : "opacity",
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}