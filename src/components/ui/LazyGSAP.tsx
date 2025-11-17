import { lazy, Suspense } from "react";

// Lazy load GSAP components
const TextTypeComponent = lazy(() => import("./TextType"));
const MasonryComponent = lazy(() => import("../Masonry"));

interface LazyTextTypeProps {
  text: string;
  className?: string;
  speed?: number;
}

interface LazyMasonryProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  items: any[]; // Add items prop to match Masonry component
}

// Fallback components
const TextTypeFallback = ({ text, className }: { text: string; className?: string }) => (
  <div className={className}>{text}</div>
);

const MasonryFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {children}
  </div>
);

export function LazyTextType(props: LazyTextTypeProps) {
  return (
    <Suspense fallback={<TextTypeFallback text={props.text} className={props.className} />}>
      <TextTypeComponent {...props} />
    </Suspense>
  );
}

export function LazyMasonry(props: LazyMasonryProps) {
  return (
    <Suspense fallback={<MasonryFallback children={props.children} />}>
      <MasonryComponent {...props} />
    </Suspense>
  );
}