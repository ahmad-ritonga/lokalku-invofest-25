// LoaderOne - Three bouncing dots with CSS animations (optimized)
export const LoaderOne = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600 animate-bounce [animation-delay:0ms]" />
      <div className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600 animate-bounce [animation-delay:200ms]" />
      <div className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600 animate-bounce [animation-delay:400ms]" />
    </div>
  );
};

// LoaderTwo - Optimized with CSS animations
export const LoaderTwo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 animate-pulse" />
      <div className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 animate-pulse [animation-delay:200ms]" />
      <div className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 animate-pulse [animation-delay:400ms]" />
    </div>
  );
};

// LoaderThree - Simple CSS spinner
export const LoaderThree = () => {
  return (
    <div className="h-20 w-20 animate-spin rounded-full border-4 border-neutral-200 border-t-yellow-500 dark:border-neutral-700 dark:border-t-yellow-400" />
  );
};

// Page loader with backdrop - optimized
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center gap-4 animate-fade-in-up">
        <LoaderOne />
        <p className="text-sm text-muted-foreground font-medium">
          Memuat...
        </p>
      </div>
    </div>
  );
};

// Component loader for inline usage - optimized
export const ComponentLoader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2"
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

// Dots loader for variety - optimized
export const DotsLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:200ms]" />
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:400ms]" />
    </div>
  );
};

// Skeleton loader for content - optimized
export const SkeletonLoader = ({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
};