import { Button } from "@heroui/react";
import { 
  ArrowRightIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import LazySection from "./LazySection";
import BenefitsMarquee3D from "./BenefitsMarquee3D";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect } from "react";

export default function WhyChooseSection() {
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

  return (
    <LazySection 
      animationType="slideRight" 
      className="py-16 md:py-24 bg-gradient-to-br from-orange-50/30 via-white to-blue-50/20 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            {t("whyChoose.title")}{" "}
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              {t("whyChoose.titleHighlight")}
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-primary-700 dark:text-primary-300" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              {t("whyChoose.subtitle")}
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("whyChoose.description")}
          </p>
        </div>

        {/* Benefits 3D Marquee */}
        <div className="mb-16">
          <BenefitsMarquee3D />
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 p-12 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" />
                  <path d="M10,10 Q15,5 20,10 T30,10" stroke="white" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
              {t("whyChoose.cta.title")}
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t("whyChoose.cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                as={Link}
                to="/direktori"
                className="bg-white text-primary-600 font-semibold shadow-lg hover:shadow-xl transition-all px-8"
                endContent={<ArrowRightIcon className="w-4 h-4" />}
              >
                {t("whyChoose.cta.exploreButton")}
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-600 transition-all px-8"
                startContent={<PlusIcon className="w-4 h-4" />}
              >
                {t("whyChoose.cta.registerButton")}
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-[0.02]">
            <div className="w-48 sm:w-96 h-48 sm:h-96 bg-gradient-radial from-primary-200 via-orange-200 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </LazySection>
  );
}