import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export const Marquee = memo(function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  // Memoize repeated elements to avoid recreating on every render
  const repeatedElements = useMemo(() => {
    return Array(Math.min(repeat, 6)) // Limit max repeat to reduce DOM nodes
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
          style={{
            // Use transform3d for GPU acceleration
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      ));
  }, [children, vertical, pauseOnHover, reverse, repeat]);

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        // Optimize for animations
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        // Reduce paint operations
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      }}
    >
      {repeatedElements}
    </div>
  );
});
