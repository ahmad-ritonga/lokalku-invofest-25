import { 
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import { useLanguage } from '@/contexts/LanguageContext';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import TextType from './ui/TextType';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

// Light Rays Component using OGL
const LightRays = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);

  const hexToRgb = (hex: string): [number, number, number] => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;

varying vec2 vUv;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  
  float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * spreadFactor;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  
  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, rayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, rayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

  vec4 fragColor = rays1 * 0.5 + rays2 * 0.4;

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  fragColor.rgb *= raysColor;
  gl_FragColor = fragColor;
}`;

      // Different colors for light and dark mode
      // Light mode: Warm amber/yellow (#fbbf24)
      // Dark mode: Orange (#f97316)
      const rayColor = isDarkMode ? '#f97316' : '#fbbf24';
      
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(rayColor) },
        raysSpeed: { value: isDarkMode ? 1.0 : 0.7 },
        lightSpread: { value: isDarkMode ? 0.8 : 1.2 },
        rayLength: { value: isDarkMode ? 2.0 : 1.8 },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];
        uniforms.rayPos.value = [0.5 * w, -0.2 * h];
        uniforms.rayDir.value = [0, 1];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        uniforms.iTime.value = t * 0.001;

        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (error) {
          console.warn('WebGL rendering error:', error);
          return;
        }
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        window.removeEventListener('resize', updatePlacement);

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error);
          }
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [isDarkMode]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        mixBlendMode: isDarkMode ? 'screen' : 'multiply',
        opacity: isDarkMode ? 1 : 0.2
      }}
    />
  );
};

export default function HeroSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Search placeholders for PlaceholdersAndVanishInput
  const searchPlaceholders = [
    t('hero.searchPlaceholder'),
    "Warung makan terdekat...",
    "Jasa laundry 24 jam...",
    "Toko batik Banyumas...",
    "Bengkel motor terpercaya...",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search value:', e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search submitted');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center pt-20 sm:pt-24">
        {/* Light Rays Background - Works in both modes */}
        <div className="absolute inset-0 overflow-hidden">
          <LightRays isDarkMode={isDarkMode} />
          {isDarkMode && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
            </>
          )}
        </div>

        {/* Light mode background pattern */}
        {!isDarkMode && (
          <div className="absolute inset-0">
            <div className="absolute top-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-4 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-orange-200/30 rounded-full blur-3xl" />
          </div>
        )}

        {/* Animated gradient orbs - Dark mode only */}
        {isDarkMode && (
          <>
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto hero-content">

            {/* Main Heading - Using font-display Tailwind class */}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 blur-fade-in-delay-100">
              <span className="block text-gray-900 dark:text-white mb-2">
                {t('hero.title')}
              </span>
              <span className="block bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Javanese Script with Typing Effect */}
            <div className="mb-6 blur-fade-in-delay-300">
              <TextType
                text={[
                  "ꦢꦶꦫꦺꦏ꧀ꦠꦺꦴꦂꦶ ꦈꦩ꧀ꦏꦺꦩ꧀ ꦧꦚꦸꦩꦱ꧀",
                  "ꦭꦺꦴꦏꦭ꧀ꦏꦸ꧈ ꦱꦺꦴꦭꦸꦱꦶ ꦥꦭꦶꦁ ꦲꦥꦶꦏ꧀"
                ]}
                typingSpeed={150}
                deletingSpeed={80}
                pauseDuration={3000}
                showCursor={true}
                cursorCharacter="|"
                loop={true}
                className="text-2xl md:text-3xl font-medium text-orange-600 dark:text-orange-400/80"
                style={{ fontFamily: 'NotoJavaneseRegular, serif' }}
              />
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto blur-fade-in-delay-500">
              {t('hero.subtitle')}
            </p>

            {/* Search Bar with PlaceholdersAndVanishInput */}
            <div className="mb-10 max-w-2xl mx-auto blur-fade-in-delay-700">
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center blur-fade-in-delay-900">
              <InteractiveHoverButton 
                className="bg-gray-900 dark:bg-white/10 backdrop-blur-md border border-gray-900 dark:border-white/20 text-white font-semibold hover:bg-gray-800 dark:hover:bg-white/20 transition-all shadow-lg"
                onClick={() => navigate('/direktori')}
              >
                {t('hero.exploreButton')}
              </InteractiveHoverButton>
              
              <Link to="/peta/terdekat">
                <button 
                  className="border-2 border-gray-300 dark:border-white/30 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-xl text-base flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={`${t('hero.nearbyButton')} - Find nearby UMKM locations`}
                >
                  <MapPinIcon className="w-5 h-5" aria-hidden="true" />
                  <span>
                    {t('hero.nearbyButton')}
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto blur-fade-in-delay-1100">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">150+</div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.registered')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">4.8</div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.rating')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">2.5K+</div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.users')}</div>
              </div>
            </div>
          </div>
        </div>


      </section>

    
    </>
  );
}