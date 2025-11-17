import { Button } from "@heroui/react";
import { ArrowRightIcon, FireIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import LazySection from "./LazySection";
import { useLanguage } from "../contexts/LanguageContext";
import Masonry from "./Masonry";
import { useEffect, useMemo } from "react";
import { umkmData } from "@/data/umkm-data";

export default function FeaturedUMKMSection() {
  const { t } = useLanguage();

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      // Theme checking logic if needed
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
  
  // Transform centralized UMKM data for Masonry display using useMemo for stability
  const umkmItems = useMemo(() => {
    console.log('FeaturedUMKMSection: Processing UMKM data, total items:', umkmData.length);
    
    const items = umkmData.slice(0, 10).map((umkm, index) => {
      // Ensure data integrity
      if (!umkm || !umkm.id || !umkm.name || !umkm.category || !umkm.image) {
        console.warn('Invalid UMKM data:', umkm);
        return null;
      }

      try {
        const categorySlug = umkm.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
        const nameSlug = umkm.name.toLowerCase().replace(/\s+/g, '-');
        
        return {
          id: umkm.id,
          img: umkm.image,
          url: `/detail/${categorySlug}/${nameSlug}-${umkm.id}`,
          height: 350 + (index % 4) * 25, // Varied heights for masonry effect
          name: umkm.name,
          category: umkm.category
        };
      } catch (error) {
        console.error('Error processing UMKM item:', umkm, error);
        return null;
      }
    }).filter((item): item is NonNullable<typeof item> => item !== null);
    
    console.log('FeaturedUMKMSection: Processed items count:', items.length);
    return items;
  }, []);

  return (
    <LazySection 
      id="featured"
      animationType="slideUp" 
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-orange-50/30 to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-12 sm:-right-24 w-48 sm:w-96 h-48 sm:h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-12 sm:-left-24 w-48 sm:w-96 h-48 sm:h-96 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-primary-100 dark:from-orange-900/30 dark:to-primary-900/30 rounded-full mb-6 border border-orange-200 dark:border-orange-800">
            <FireIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-900 dark:text-orange-300">
              {t("featuredUmkm.badge") || "Pilihan Terbaik"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gray-900 dark:text-white">{t("featuredUmkm.title.prefix") || "UMKM"} </span>
            <span className="bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              {t("featuredUmkm.title.highlight") || "Unggulan"}
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-orange-600 dark:text-orange-400" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              {t("featuredUmkm.javaneseScript") || "ꦈꦩ꧀ꦏꦺꦩ꧀ ꦈꦁꦒꦸꦭꦤ꧀"}
            </p>
          </div>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("featuredUmkm.description") || "Temukan UMKM pilihan terbaik dengan rating tertinggi dan ulasan positif dari pelanggan"}
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="mb-12">
          {(() => {
            console.log('FeaturedUMKMSection: Rendering, umkmItems.length:', umkmItems.length);
            
            if (umkmItems.length > 0) {
              return (
                <Masonry
                  items={umkmItems}
                  ease="power3.out"
                  duration={0.6}
                  stagger={0.05}
                  animateFrom="bottom"
                  scaleOnHover={true}
                  hoverScale={0.98}
                  blurToFocus={true}
                  colorShiftOnHover={false}
                />
              );
            } else {
              console.warn('FeaturedUMKMSection: No UMKM items to display');
              return (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("featuredUmkm.noData") || "Tidak ada data UMKM yang tersedia"}
                  </p>
                </div>
              );
            }
          })()}
        </div>

        {/* View All Button - Improved Mobile Responsiveness */}
        <div className="text-center mb-16">
          <Button
            size="lg"
            as={Link}
            to="/direktori"
            className="bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all px-6 sm:px-8 text-sm sm:text-base group w-auto"
            endContent={
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          >
            <span className="whitespace-nowrap">
              {t("featuredUmkm.viewAll") || "Lihat Semua UMKM"}
            </span>
          </Button>
        </div>

        
      </div>
    </LazySection>
  );
}