import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedMaskotProps {
  className?: string;
  size?: number | string;
  priority?: boolean;
}

export default function OptimizedMaskot({ 
  className, 
  size = 80, 
  priority = false 
}: OptimizedMaskotProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Convert size to number if it's a string
  const sizeValue = typeof size === 'string' ? 
    (size === 'sm' ? 32 : size === 'md' ? 48 : size === 'lg' ? 64 : 80) : 
    size;

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

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to PNG if WebP fails
    if (imgRef.current) {
      imgRef.current.src = "/assets/images/maskot.webp";
    }
  };

  return (
    <div className={cn("relative", className)}>
      <img
        ref={imgRef}
        src={isInView ? "/assets/images/maskot.webp" : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNmNGY0ZjQiLz48L3N2Zz4="}
        alt="LokalKU Maskot"
        width={sizeValue}
        height={sizeValue}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "transition-opacity duration-300 will-change-auto",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError && "opacity-50"
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"
          style={{ width: sizeValue, height: sizeValue }}
        />
      )}
    </div>
  );
}