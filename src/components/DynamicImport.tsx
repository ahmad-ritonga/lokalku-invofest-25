import { lazy, Suspense, ComponentType } from 'react';
import { Spinner } from '@heroui/spinner';

interface DynamicImportProps {
  importFunc: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  className?: string;
}

export default function DynamicImport({ 
  importFunc, 
  fallback,
  className = ""
}: DynamicImportProps) {
  const LazyComponent = lazy(importFunc);

  const defaultFallback = (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <Spinner 
        size="lg" 
        color="primary"
        label="Loading..."
        classNames={{
          circle1: "border-b-primary-500",
          circle2: "border-b-orange-500",
          wrapper: "w-16 h-16"
        }}
      />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent />
    </Suspense>
  );
}