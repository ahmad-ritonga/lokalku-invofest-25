import { Button } from "@heroui/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo, memo, useCallback, startTransition, useState, useEffect } from "react";
import React from "react";
import DefaultLayout from "@/layouts/default";
import Footer from "@/components/footer";
import LazyImage from "@/components/LazyImage";
import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";

// Enhanced ImageGrid with mouse movement effect and credit overlay
const ImageGrid = memo(({ images }: { images: any[] }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to viewport center
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-4 grid-rows-4 gap-2 h-[500px]">
      {images.map((img, idx) => {
        // Calculate unique parallax effect for each image
        const parallaxX = mousePosition.x * (1 + idx * 0.3);
        const parallaxY = mousePosition.y * (1 + idx * 0.2);
        
        return (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 group cursor-pointer"
            style={{
              animation: isVisible ? `fadeInUp 0.6s ease-out ${idx * 0.05}s both` : 'none',
              transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: isVisible ? 1 : 0,
            }}
          >
            <LazyImage
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            {/* Credit overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
              <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-medium">Photo by</p>
                <p className="text-sm font-bold">{img.credit}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

// Animated List Item Component
const AnimatedListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="mx-auto w-full"
      style={{
        animation: 'fadeInScale 0.6s ease-out both',
      }}
    >
      {children}
    </div>
  );
};

// Mission Item with enhanced styling
const MissionItem = memo(({ item }: { item: any }) => (
  <div 
    className="flex gap-4 items-start p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[102%] cursor-pointer border border-gray-100 dark:border-gray-700"
  >
    <div className={`flex-shrink-0 w-12 h-12 ${item.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-primary-600 to-primary-700'} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
      {item.num}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
    </div>
  </div>
));

// AnimatedList Component with Intersection Observer
const AnimatedList = memo(({ children, delay = 400 }: { children: React.ReactNode, delay?: number }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted && visibleCount < childrenArray.length) {
      const timeout = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [hasStarted, visibleCount, childrenArray.length, delay]);

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      {childrenArray.slice(0, visibleCount).map((child, idx) => (
        <AnimatedListItem key={idx}>
          {child}
        </AnimatedListItem>
      ))}
    </div>
  );
});

// ScrollReveal component for cards and sections
const ScrollReveal = memo(({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      style={{
        animation: isVisible ? `fadeInUp 0.6s ease-out ${delay}s both` : 'none',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
});

// Optimized CTA buttons dengan useCallback
const CTAButtons = memo(({ t }: { t: any }) => {
  const handleExploreClick = useCallback(() => {
    startTransition(() => {
      // Navigation akan dilakukan oleh Link component
    });
  }, []);

  const handleContactClick = useCallback(() => {
    startTransition(() => {
      // Navigation akan dilakukan oleh Link component
    });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      <Button
        size="lg"
        as={Link}
        to="/direktori"
        className="bg-gradient-to-r from-primary-600 to-orange-500 text-white font-semibold px-8 transform hover:scale-105 transition-transform duration-200"
        endContent={<ArrowRightIcon className="w-5 h-5" />}
        onPress={handleExploreClick}
      >
        {t('about.cta.explore')}
      </Button>
      <Button
        size="lg"
        as="a"
        href="https://www.ahmadrian.site/"
        target="_blank"
        rel="noopener noreferrer"
        variant="bordered"
        className="border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold px-8 transform hover:scale-105 transition-transform duration-200"
        onPress={handleContactClick}
      >
        {t('about.cta.contact')}
      </Button>
    </div>
  );
});

export default function About() {
  const { language, t } = useLanguage();

  // UMKM-themed images from Unsplash - 16 images for 4x4 grid
  const umkmImages = useMemo(() => [
    { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Kedai Kopi Lokal", credit: "Sorin Gheorghita" },
    { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Warung Makan", credit: "Farhad Ibrahimzade" },
    { src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Toko Retail", credit: "Mike Petrucci" },
    { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Butik Fashion", credit: "Clark Street" },
    { src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Kedai Minuman", credit: "Nathan Dumlao" },
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Toko Kelontong", credit: "Austin Distel" },
    { src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Restoran Kecil", credit: "Jay Wennington" },
    { src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Kafe Modern", credit: "Helena Lopes" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Bar & Resto", credit: "Jay Wennington" },
    { src: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Toko Bunga", credit: "Beata Ratuszniak" },
    { src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Bakery Artisan", credit: "Nik Owens" },
    { src: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Kedai Juice", credit: "Brooke Lark" },
    { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Barbershop", credit: "Ksenia Chernaya" },
    { src: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Salon Kecantikan", credit: "Tamara Bellis" },
    { src: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Toko Buku", credit: "Kimberly Farmer" },
    { src: "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=400&h=300&fit=crop&fm=webp&q=80", alt: "Craft Store", credit: "Annie Spratt" },
  ], []);

  // Memoized mission items dengan dependency yang tepat
  const missionItems = useMemo(() => [
    {
      num: "1",
      title: t('about.mission.items.empowerment.title'),
      desc: t('about.mission.items.empowerment.description'),
      color: "primary"
    },
    {
      num: "2",
      title: t('about.mission.items.technology.title'),
      desc: t('about.mission.items.technology.description'),
      color: "orange"
    },
    {
      num: "3",
      title: t('about.mission.items.community.title'),
      desc: t('about.mission.items.community.description'),
      color: "primary"
    },
    {
      num: "4",
      title: t('about.mission.items.growth.title'),
      desc: t('about.mission.items.growth.description'),
      color: "orange"
    }
  ], [t]);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section - Clean without blob background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content with blur fade animation */}
              <div className="text-center lg:text-left animate-blur-fade">
                {/* Logo */}
                <div className="mb-8 flex justify-center lg:justify-start">
                  <img 
                    src="/assets/images/logo.webp" 
                    alt="LokalKU Logo" 
                    className="w-16 h-16 object-contain animate-bounce-slow"
                    loading="eager"
                    decoding="sync"
                  />
                </div>

                {/* Title dengan Playfair Display seperti hero-section.tsx */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <span className="block text-gray-900 dark:text-white mb-2">
                    {t('about.title')}
                  </span>
                  {language === 'id' && (
                    <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-orange-600 dark:text-orange-400" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
                      ꦧꦧꦒꦤ꧀ ꦭꦺꦴꦏꦭ꧀ꦏꦸ
                    </span>
                  )}
                </h1>
                
                {/* Vision Statement */}
                <div className="mb-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('about.vision.title')}
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('about.vision.description')}
                  </p>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t('about.subtitle')}
                </p>

                {/* CTA Buttons - Optimized */}
                <CTAButtons t={t} />
              </div>

              {/* Right Column - Enhanced Image Grid with parallax movement and blur fade */}
              <div className="animate-blur-fade-right">
                <ImageGrid images={umkmImages} />
              </div>
            </div>
          </div>
        </section>

        {/* Global Reach Section - Enhanced cards with hover animations */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-gray-900 dark:text-white">
                  {t('about.map.title.local')} {" "}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500">
                  {t('about.map.title.global')}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('about.map.description')}
              </p>
            </div>

            {/* Enhanced Grid Cards with scroll-triggered animations */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Purwokerto - Local */}
              <ScrollReveal delay={0.1}>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl border border-orange-200 dark:border-orange-800 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPinIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 animate-pulse-slow" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Purwokerto</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Pusat UMKM lokal Banyumas dengan ratusan bisnis terdaftar
                  </p>
                </div>
              </ScrollReveal>

              {/* National Reach */}
              <ScrollReveal delay={0.2}>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-800 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse-slow" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nasional</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Terhubung dengan Jakarta, Yogyakarta, Surabaya, dan kota besar Indonesia
                  </p>
                </div>
              </ScrollReveal>

              {/* Global Network */}
              <ScrollReveal delay={0.3}>
                <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl border border-primary-200 dark:border-primary-800 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <GlobeAltIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-pulse-slow" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Global</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Jangkauan internasional ke Singapura, Malaysia, dan negara ASEAN
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Mission Section - Enhanced with AnimatedList */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-gray-900 dark:text-white">
                  {t('about.mission.title')}
                </span>
              </h2>
            </div>

            <AnimatedList delay={400}>
              {missionItems.map((item) => (
                <MissionItem key={item.num} item={item} />
              ))}
            </AnimatedList>
          </div>
        </section>

        {/* CTA Section - Clean without blob background */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-orange-500 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('about.cta.title')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                as={Link}
                to="/direktori"
                className="bg-white text-primary-600 font-semibold px-8 transform hover:scale-110 transition-transform duration-200"
                endContent={<ArrowRightIcon className="w-5 h-5" />}
              >
                {t('about.cta.start')}
              </Button>
              <Button
                size="lg"
                as="a"
                href="https://www.ahmadrian.site/"
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
                className="border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-600 px-8 transform hover:scale-110 transition-all duration-200"
              >
                {t('about.cta.contact_team')}
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out both;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </DefaultLayout>
  );
}