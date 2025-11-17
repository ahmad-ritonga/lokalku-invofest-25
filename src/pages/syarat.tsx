import { useState, useEffect, useRef } from "react";
import { 
  ChevronDownIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface TermsSection {
  title: string;
  content: string;
  icon?: string;
}

// Subtle Background Pattern
const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900" />
      
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
    </div>
  );
};

// Table of Contents Component
const TableOfContents = ({ 
  sections, 
  activeSection, 
  onNavigate 
}: { 
  sections: TermsSection[]; 
  activeSection: number | null;
  onNavigate: (index: number) => void;
}) => {
  return (
    <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <DocumentTextIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Daftar Isi
        </h3>
      </div>
      
      <nav className="space-y-1">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
              activeSection === index
                ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            )}
          >
            <span className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="line-clamp-1">{section.title}</span>
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Accordion Item Component
const AccordionItem = ({ 
  item, 
  index, 
  isOpen, 
  onToggle 
}: { 
  item: TermsSection; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-200 dark:border-gray-700 last:border-0"
      id={`section-${index}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 px-1 text-left group"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-1">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
              isOpen 
                ? "bg-primary-600 text-white shadow-md" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400"
            )}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold mb-1 transition-colors",
              isOpen 
                ? "text-primary-600 dark:text-primary-400" 
                : "text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
            )}>
              {item.title}
            </h3>
          </div>
        </div>
        
        <ChevronDownIcon 
          className={cn(
            "w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300",
            isOpen 
              ? "rotate-180 text-primary-600 dark:text-primary-400" 
              : "text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
          )}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-12 pr-1 pb-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Info Box Component
const InfoBox = ({ 
  children, 
  variant = "info" 
}: { 
  children: React.ReactNode; 
  variant?: "info" | "warning" | "success" 
}) => {
  const variants = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      IconComponent: InformationCircleIcon
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      IconComponent: ShieldCheckIcon
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      IconComponent: CheckCircleIcon
    }
  };

  const config = variants[variant];
  const IconComponent = config.IconComponent;

  return (
    <div className={cn("rounded-xl border-2 p-4", config.bg, config.border)}>
      <div className="flex gap-3">
        <IconComponent className={cn("w-6 h-6 flex-shrink-0", config.icon)} />
        <div className="flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function TermsAndConditions() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<number | null>(0);
  const isScrollingRef = useRef(false);

  const termsData: TermsSection[] = [
    {
      title: t("terms.sections.acceptance.title"),
      content: t("terms.sections.acceptance.content")
    },
    {
      title: t("terms.sections.services.title"),
      content: t("terms.sections.services.content")
    },
    {
      title: t("terms.sections.registration.title"),
      content: t("terms.sections.registration.content")
    },
    {
      title: t("terms.sections.userConduct.title"),
      content: t("terms.sections.userConduct.content")
    },
    {
      title: t("terms.sections.content.title"),
      content: t("terms.sections.content.content")
    },
    {
      title: t("terms.sections.privacy.title"),
      content: t("terms.sections.privacy.content")
    },
    {
      title: t("terms.sections.liability.title"),
      content: t("terms.sections.liability.content")
    },
    {
      title: t("terms.sections.modifications.title"),
      content: t("terms.sections.modifications.content")
    },
    {
      title: t("terms.sections.termination.title"),
      content: t("terms.sections.termination.content")
    },
    {
      title: t("terms.sections.governing.title"),
      content: t("terms.sections.governing.content")
    }
  ];

  // Intersection Observer untuk mendeteksi section yang aktif
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -50% 0px', // Offset untuk header dan threshold
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return; // Skip jika sedang scroll programmatic

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionIndex = parseInt(sectionId.replace('section-', ''));
          setActiveSection(sectionIndex);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe semua section
    termsData.forEach((_, index) => {
      const element = document.getElementById(`section-${index}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [termsData.length]);

  // Handler untuk toggle accordion tanpa scroll
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handler untuk navigasi dari table of contents dengan scroll
  const handleNavigate = (index: number) => {
    setOpenIndex(index);
    setActiveSection(index);
    isScrollingRef.current = true; // Set flag untuk mencegah intersection observer
    
    // Gunakan requestAnimationFrame untuk timing yang lebih baik
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
          const headerOffset = 120; // Offset yang lebih besar untuk header sticky
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Gunakan scrollTo dengan options yang lebih halus
          window.scrollTo({
            top: Math.max(0, offsetPosition), // Pastikan tidak scroll ke posisi negatif
            behavior: 'smooth'
          });

          // Reset flag setelah scroll selesai
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000); // Delay untuk memastikan scroll selesai
        }
      }, 300); // Delay yang lebih lama untuk memastikan accordion terbuka sepenuhnya
    });
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900 relative">
        {/* Background Pattern */}
        <BackgroundPattern />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-16">
          {/* Header Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Beranda
                </a>
                <ChevronDownIcon className="w-4 h-4 -rotate-90" />
                <span className="text-gray-900 dark:text-white font-medium">
                  Syarat & Ketentuan
                </span>
              </nav>

              {/* Title */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
                  <ShieldCheckIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {t("terms.badge")}
                  </span>
                </div>
                
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("terms.title")}
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("terms.description")}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Efektif sejak: 1 Januari 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric',
                    month: 'long', 
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-8">
                <InfoBox variant="warning">
                  <strong className="font-semibold">Penting untuk dibaca:</strong> Dengan mengakses atau menggunakan layanan LokalKu, 
                  Anda setuju untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju, 
                  harap jangan gunakan layanan kami.
                </InfoBox>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Table of Contents - Desktop Only */}
              <div className="hidden lg:block lg:col-span-3">
                <TableOfContents 
                  sections={termsData}
                  activeSection={activeSection}
                  onNavigate={handleNavigate}
                />
              </div>

              {/* Terms Accordion */}
              <div className="lg:col-span-9">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
                  {termsData.map((item, index) => (
                    <AccordionItem
                      key={index}
                      item={item}
                      index={index}
                      isOpen={openIndex === index}
                      onToggle={() => handleToggle(index)}
                    />
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-8">
                  <InfoBox variant="success">
                    <strong className="font-semibold">Sudah membaca semua ketentuan?</strong> Jika Anda memiliki pertanyaan atau 
                    membutuhkan klarifikasi, jangan ragu untuk menghubungi tim kami.
                  </InfoBox>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-orange-500 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />
              </div>

              <div className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <DocumentTextIcon className="w-12 h-12 text-white mx-auto mb-4" />
                  
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                    {t("terms.contact.title")}
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-8">
                    {t("terms.contact.description")}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.ahmadrian.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                    >
                      <EnvelopeIcon className="w-5 h-5" />
                      {t("terms.contact.email")}
                    </a>
                    
                    <a
                      href="https://wa.me/6282123479638"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:scale-105 border-2 border-white/30"
                    >
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      {t("terms.contact.whatsapp")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}