import { Link } from "react-router-dom";
import { 
  MapPinIcon,
  EnvelopeIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  MapIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export default function Footer() {
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
  const navigationLinks = [
    { label: t("footer.navigation.home"), href: "/", icon: HomeIcon },
    { label: t("footer.navigation.directory"), href: "/direktori", icon: BuildingStorefrontIcon },
    { label: t("footer.navigation.map"), href: "/peta", icon: MapIcon },
    { label: t("footer.navigation.favorites"), href: "/favorit", icon: HeartIcon }
  ];

  const informationLinks = [
    { label: t("footer.information.about"), href: "/about" },
    { label: t("footer.information.contact"), href: "https://www.ahmadrian.site/", external: true },
    { label: t("footer.information.privacy"), href: "/privasi" },
    { label: t("footer.information.terms"), href: "/syarat" },
    { label: t("footer.information.faq"), href: "/faq" }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/rian_syaifullah",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ahmad-rian",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/ahmad-rian",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "Website",
      url: "https://ahmadrian.site",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    }
  ];

  const currentYear = new Date().getFullYear();

  // Payment logos data with LinkAja positioned at 6th position
  const paymentLogos = [
    { src: "/assets/pembayaran/qris-logo.svg", alt: "QRIS", title: "QRIS", isProminent: false },
    { src: "/assets/pembayaran/dana-logo.svg", alt: "DANA", title: "DANA", isProminent: false },
    { src: "/assets/pembayaran/ovo-logo.svg", alt: "OVO", title: "OVO", isProminent: false },
    { src: "/assets/pembayaran/bca-logo.svg", alt: "BCA", title: "Bank BCA", isProminent: false },
    { src: "/assets/pembayaran/mandiri-logo.svg", alt: "Mandiri", title: "Bank Mandiri", isProminent: false },
    { src: "/assets/pembayaran/linkaja-logo.svg", alt: "LinkAja", title: "LinkAja", isProminent: true },
    { src: "/assets/pembayaran/bni-logo.svg", alt: "BNI", title: "Bank BNI", isProminent: false },
    { src: "/assets/pembayaran/bri-logo.svg", alt: "BRI", title: "Bank BRI", isProminent: false },
    { src: "/assets/pembayaran/bsi-logo.svg", alt: "BSI", title: "Bank Syariah Indonesia", isProminent: false },
    { src: "/assets/pembayaran/bjb.svg", alt: "BJB", title: "Bank BJB", isProminent: false },
    { src: "/assets/pembayaran/btn-logo-2.svg", alt: "BTN", title: "Bank BTN", isProminent: false },
    { src: "/assets/pembayaran/card-logo.svg", alt: "Credit Card", title: "Credit Card", isProminent: false },
    { src: "/assets/pembayaran/pospay-logo.svg", alt: "PosPay", title: "PosPay", isProminent: false },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black dark:from-black dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Payment Partners Section */}
      <div className="bg-white dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Partner Pembayaran
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Metode pembayaran yang didukung untuk kemudahan transaksi UMKM
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            {/* Mobile-optimized marquee container */}
            <div 
              className="inline-flex w-max animate-marquee-smooth"
              style={{
                // Ensure proper width calculation for mobile
                minWidth: '200%',
                // Force hardware acceleration
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                // Improve rendering performance
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* First set of logos */}
              {paymentLogos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className={`flex-shrink-0 w-auto transition-all duration-300 hover:scale-110 mx-4 ${
                    logo.isProminent 
                      ? 'h-12 md:h-14 drop-shadow-lg hover:drop-shadow-xl' 
                      : 'h-8 md:h-10 opacity-80 hover:opacity-100'
                  }`}
                  title={logo.title}
                  style={{
                    // Prevent layout shifts on mobile
                    minWidth: 'auto',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto object-contain"
                    loading="lazy"
                    style={{
                      // Improve image rendering on mobile
                      imageRendering: 'crisp-edges' as const
                    }}
                  />
                </div>
              ))}
              
              {/* Second set for seamless loop */}
              {paymentLogos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className={`flex-shrink-0 w-auto transition-all duration-300 hover:scale-110 mx-4 ${
                    logo.isProminent 
                      ? 'h-12 md:h-14 drop-shadow-lg hover:drop-shadow-xl' 
                      : 'h-8 md:h-10 opacity-80 hover:opacity-100'
                  }`}
                  title={logo.title}
                  aria-hidden="true"
                  style={{
                    // Prevent layout shifts on mobile
                    minWidth: 'auto',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto object-contain"
                    loading="lazy"
                    style={{
                      // Improve image rendering on mobile
                      imageRendering: 'crisp-edges' as const
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Fade out edges - optimized for mobile */}
            <div 
              className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-gray-800 to-transparent pointer-events-none z-10"
              style={{
                // Ensure proper layering on mobile
                transform: 'translateZ(1px)',
                WebkitTransform: 'translateZ(1px)'
              }}
            ></div>
            <div 
              className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none z-10"
              style={{
                // Ensure proper layering on mobile
                transform: 'translateZ(1px)',
                WebkitTransform: 'translateZ(1px)'
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-gray-800/50">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg shadow-primary-500/20">
                <img 
                  src="/assets/images/logo.webp" 
                  alt="LokalKu Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-2xl">LokalKu</span>
            </div>
            
            {/* Javanese Script Brand Description */}
            <div className="space-y-2">
              <p className="text-primary-400 font-medium" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
                ꦭꦺꦴꦏꦭ꧀ꦏꦸ - ꦥ꧀ꦭꦠ꧀ꦥꦺꦴꦂꦩ꧀ ꦢꦶꦫꦺꦏ꧀ꦠꦺꦴꦂꦶ ꦢꦶꦒꦶꦠꦭ꧀
              </p>
              <p className="text-gray-500 text-xs italic">
                (LokalKu - Platform direktori digital)
              </p>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-2 text-gray-400 group hover:text-primary-400 transition-colors">
              <MapPinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{t("footer.location")}</span>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="space-y-5">
            <h3 className="text-white font-bold font-display text-lg">{t("footer.navigation.title")}</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-all duration-200"
                    >
                      <div className="p-1.5 rounded-lg bg-gray-800/50 group-hover:bg-primary-500/10 transition-colors">
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3 - Information */}
          <div className="space-y-5">
            <h3 className="text-white font-bold font-display text-lg">{t("footer.information.title")}</h3>
            <ul className="space-y-3">
              {informationLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-5">
            <h3 className="text-white font-bold font-display text-lg">{t("footer.contact.title")}</h3>
            <div className="space-y-4">
              <a 
                href="mailto:alriansr@gmail.com" 
                className="group flex items-start gap-3 text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <div className="p-1.5 rounded-lg bg-gray-800/50 group-hover:bg-primary-500/10 transition-colors mt-0.5">
                  <EnvelopeIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium break-all">
                 alriansr@gmail.com
                </span>
              </a>
              
              
              <a 
                href="https://instagram.com/rian_syaifullah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <div className="p-1.5 rounded-lg bg-gray-800/50 group-hover:bg-primary-500/10 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">@rian_syaifullah</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-sm text-center lg:text-left">
              © {currentYear} <span className="text-gray-400 font-semibold">LokalKu Banyumas</span>. {t("footer.copyright")}
            </div>

            {/* Creator Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="text-center sm:text-right">
                <div className="text-gray-300 text-sm font-semibold">
                  {t("footer.creator.name")}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  {t("footer.creator.university")}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm text-gray-400 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-500 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom gradient line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      </div>
    </footer>
  );
}