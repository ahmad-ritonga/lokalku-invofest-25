import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type LogoItem = 
  | { 
      node: React.ReactNode; 
      href?: string; 
      title?: string; 
      ariaLabel?: string; 
    } 
  | { 
      src: string; 
      alt?: string; 
      href?: string; 
      title?: string; 
      srcSet?: string; 
      sizes?: string; 
      width?: number; 
      height?: number; 
    }; 

export interface LogoLoopProps { 
  logos: LogoItem[]; 
  speed?: number; 
  direction?: 'left' | 'right'; 
  width?: number | string; 
  logoHeight?: number; 
  gap?: number; 
  pauseOnHover?: boolean; 
  fadeOut?: boolean; 
  fadeOutColor?: string; 
  scaleOnHover?: boolean; 
  ariaLabel?: string; 
  className?: string; 
  style?: React.CSSProperties; 
} 

const ANIMATION_CONFIG = { 
  SMOOTH_TAU: 0.25, 
  MIN_COPIES: 2, 
  COPY_HEADROOM: 2 
} as const; 

const toCssLength = (value?: number | string): string | undefined => 
  typeof value === 'number' ? `${value}px` : (value ?? undefined); 

const useResizeObserver = ( 
  callback: () => void, 
  elements: Array<React.RefObject<Element | null>>, 
  dependencies: React.DependencyList 
) => { 
  useEffect(() => { 
    if (!window.ResizeObserver) { 
      const handleResize = () => callback(); 
      window.addEventListener('resize', handleResize); 
      callback(); 
      return () => window.removeEventListener('resize', handleResize); 
    } 

    const observers = elements.map(ref => { 
      if (!ref.current) return null; 
      const observer = new ResizeObserver(callback); 
      observer.observe(ref.current); 
      return observer; 
    }); 

    callback(); 

    return () => { 
      observers.forEach(observer => observer?.disconnect()); 
    }; 
  }, dependencies); 
}; 

const useImageLoader = ( 
  seqRef: React.RefObject<HTMLUListElement | null>, 
  onLoad: () => void, 
  dependencies: React.DependencyList 
) => { 
  useEffect(() => { 
    const images = seqRef.current?.querySelectorAll('img') ?? []; 

    if (images.length === 0) { 
      onLoad(); 
      return; 
    } 

    let remainingImages = images.length; 
    const handleImageLoad = () => { 
      remainingImages -= 1; 
      if (remainingImages === 0) { 
        onLoad(); 
      } 
    }; 

    images.forEach(img => { 
      const htmlImg = img as HTMLImageElement; 
      if (htmlImg.complete) { 
        handleImageLoad(); 
      } else { 
        htmlImg.addEventListener('load', handleImageLoad, { once: true }); 
        htmlImg.addEventListener('error', handleImageLoad, { once: true }); 
      } 
    }); 

    return () => { 
      images.forEach(img => { 
        img.removeEventListener('load', handleImageLoad); 
        img.removeEventListener('error', handleImageLoad); 
      }); 
    }; 
  }, dependencies); 
}; 

const useAnimationLoop = ( 
  trackRef: React.RefObject<HTMLDivElement | null>, 
  targetVelocity: number, 
  seqWidth: number, 
  isHovered: boolean, 
  pauseOnHover: boolean 
) => { 
  const rafRef = useRef<number | null>(null); 
  const lastTimestampRef = useRef<number | null>(null); 
  const offsetRef = useRef(0); 
  const velocityRef = useRef(0); 

  useEffect(() => { 
    const track = trackRef.current; 
    if (!track) return; 

    if (seqWidth > 0) { 
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth; 
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`; 
    } 

    const animate = (timestamp: number) => { 
      if (lastTimestampRef.current === null) { 
        lastTimestampRef.current = timestamp; 
      } 

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000; 
      lastTimestampRef.current = timestamp; 

      const target = pauseOnHover && isHovered ? 0 : targetVelocity; 

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU); 
      velocityRef.current += (target - velocityRef.current) * easingFactor; 

      if (seqWidth > 0) { 
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime; 
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth; 
        offsetRef.current = nextOffset; 

        const translateX = -offsetRef.current; 
        track.style.transform = `translate3d(${translateX}px, 0, 0)`; 
      } 

      rafRef.current = requestAnimationFrame(animate); 
    }; 

    rafRef.current = requestAnimationFrame(animate); 

    return () => { 
      if (rafRef.current !== null) { 
        cancelAnimationFrame(rafRef.current); 
        rafRef.current = null; 
      } 
      lastTimestampRef.current = null; 
    }; 
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]); 
}; 

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 48,
    gap = 40,
    pauseOnHover = false,
    fadeOut = false,
    fadeOutColor = '#ffffff',
    scaleOnHover = false,
    ariaLabel = 'Logo carousel',
    className = '',
    style = {},
  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const seqRef = useRef<HTMLUListElement | null>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [seqWidth, setSeqWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    const targetVelocity = useMemo(() => {
      return direction === 'left' ? speed : -speed;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const container = containerRef.current;
      const seq = seqRef.current;

      if (!container || !seq) return;

      const containerRect = container.getBoundingClientRect();
      const seqRect = seq.getBoundingClientRect();

      setContainerWidth(containerRect.width);
      setSeqWidth(seqRect.width);
    }, []);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos]);
    useImageLoader(seqRef, () => {}, [logos]);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

    const numCopies = useMemo(() => {
      if (seqWidth === 0 || containerWidth === 0) return ANIMATION_CONFIG.MIN_COPIES;
      return Math.max(
        ANIMATION_CONFIG.MIN_COPIES,
        Math.ceil((containerWidth / seqWidth) * ANIMATION_CONFIG.COPY_HEADROOM)
      );
    }, [seqWidth, containerWidth]);

    const renderLogo = useCallback((logo: LogoItem, index: number) => {
      const logoStyle = {
        height: toCssLength(logoHeight),
        marginRight: toCssLength(gap),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      };

      const logoClassName = `logo-item ${scaleOnHover ? 'hover:scale-110 transition-transform duration-200' : ''}`;

      const content = 'node' in logo ? (
        <div 
          key={index}
          className={logoClassName}
          style={logoStyle} 
          title={logo.title} 
          aria-label={logo.ariaLabel}
        >
          {logo.node}
        </div>
      ) : (
        <img
          key={index}
          className={logoClassName}
          style={{
            ...logoStyle,
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          src={logo.src}
          alt={logo.alt || ''}
          title={logo.title}
          srcSet={logo.srcSet}
          sizes={logo.sizes}
          width={logo.width}
          height={logo.height}
        />
      );

      return logo.href ? (
        <a
          key={index}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          {content}
        </a>
      ) : (
        content
      );
    }, [logoHeight, gap, scaleOnHover]);

    const containerStyle: React.CSSProperties = {
      width: toCssLength(width),
      height: toCssLength(logoHeight),
      position: 'relative',
      overflow: 'hidden',
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      willChange: 'transform',
    };

    const seqStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      margin: 0,
      padding: 0,
      listStyle: 'none',
    };

    const fadeOutStyle: React.CSSProperties = fadeOut
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to right, ${fadeOutColor} 0%, transparent 10%, transparent 90%, ${fadeOutColor} 100%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }
      : {};

    return (
      <div
        ref={containerRef}
        className={`logo-loop ${className}`}
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel}
        role="img"
      >
        <div ref={trackRef} style={trackStyle}>
          {Array.from({ length: numCopies }, (_, copyIndex) => (
            <ul key={copyIndex} ref={copyIndex === 0 ? seqRef : null} style={seqStyle}>
              {logos.map(renderLogo)}
            </ul>
          ))}
        </div>
        {fadeOut && <div style={fadeOutStyle} />}
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;