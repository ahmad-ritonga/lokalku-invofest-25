import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { 
  HomeIcon, 
  BuildingStorefrontIcon, 
  MapIcon, 
  HeartIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchModal from "./SearchModal";

interface NavbarProps {
  onSearchOpen?: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Keyboard shortcuts for search modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Close search modal with Escape
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Handle featured section navigation
  const handleClick = (href: string) => {
    if (href === "/#featured") {
      if (location.pathname !== "/") {
        // Navigate to home page first, then scroll to featured section
        navigate("/");
        setTimeout(() => {
          const featuredElement = document.getElementById("featured");
          if (featuredElement) {
            featuredElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll to featured section
        const featuredElement = document.getElementById("featured");
        if (featuredElement) {
          featuredElement.scrollIntoView({ behavior: "smooth" });
        }
      }
      toggleMenu();
      return;
    }
  };

  const navItems = [
    {
      label: t("navbar.home"),
      href: "/",
      icon: HomeIcon,
      bgColor: "from-orange-500 to-orange-600",
      description: "Halaman utama",
      links: [
        { label: t("navbar.homeMenu.home"), href: "/", description: "Halaman utama" },
        { label: t("navbar.homeMenu.about"), href: "/about", description: "Tentang kami" },
        { label: t("navbar.homeMenu.featured"), href: "/#featured", description: "UMKM terpopuler" },
        { label: "Kontak", href: "https://www.ahmadrian.site/", description: "Hubungi kami", external: true }
      ]
    },
    {
      label: t("navbar.directory"),
      href: "/direktori",
      icon: BuildingStorefrontIcon,
      bgColor: "from-blue-500 to-blue-600",
      description: "Cari UMKM",
      links: [
        { label: t("navbar.directoryMenu.explore"), href: "/direktori", description: "Jelajahi semua UMKM" },
        { label: t("navbar.directoryMenu.categories"), href: "/direktori/kategori", description: "Jelajah berdasarkan kategori" },
        { label: t("navbar.directoryMenu.latest"), href: "/direktori/terbaru", description: "UMKM yang baru terdaftar" }
      ]
    },
    {
      label: t("navbar.map"),
      href: "/peta",
      icon: MapIcon,
      bgColor: "from-green-500 to-green-600",
      description: "Lokasi UMKM",
      links: [
        { label: t("navbar.mapMenu.viewMap"), href: "/peta", description: "Peta interaktif UMKM" },
        { label: t("navbar.mapMenu.nearby"), href: "/peta/terdekat", description: "UMKM di sekitar Anda" }
      ]
    },
    {
      label: t("navbar.favorites"),
      href: "/favorit",
      icon: HeartIcon,
      bgColor: "from-pink-500 to-pink-600",
      description: "UMKM Favorit",
      links: [
        { label: t("navbar.favoritesMenu.list"), href: "/favorit", description: "UMKM yang Anda simpan" }
      ]
    }
  ];

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const isTablet = window.matchMedia("(min-width: 641px) and (max-width: 1023px)").matches;
    
    if (isMobile) {
      // Mobile: 4 cards stacked vertically - increased for better spacing
      return Math.min(window.innerHeight - 140, 720); // Responsive to screen height
    } else if (isTablet) {
      // Tablet: 2x2 grid
      return 480;
    }
    // Desktop: 4 cards horizontal
    return 320;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    if (onSearchOpen) {
      onSearchOpen();
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#featured" && location.pathname === "/") {
      setTimeout(() => {
        const featuredElement = document.getElementById("featured");
        if (featuredElement) {
          featuredElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Wait for page to fully load
    }
  }, [location.pathname]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex justify-center px-2 sm:px-4 pt-2 sm:pt-4">
      <nav
        ref={navRef}
        className={`w-full max-w-7xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-500 ease-out overflow-hidden ${
          isMenuOpen ? "shadow-2xl" : ""
        }`}
        style={{ 
          height: isMenuOpen ? calculateHeight() : 70,
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-[70px] flex items-center justify-between px-3 sm:px-6 z-10">
          {/* Left: Hamburger Menu Button + Invofest Competition */}
          <div className="flex items-center gap-2 order-1">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="navigation-menu"
              title={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center gap-1 sm:gap-1.5">
                <div
                  className={`w-full h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5 sm:translate-y-2" : ""
                  }`}
                />
                <div
                  className={`w-full h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-0.5 sm:-translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
            
            {/* Invofest Competition - All Devices */}
            <a
              href="https://www.invofest-harkatnegeri.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md sm:rounded-lg transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Invofest Competition</span>
              <span className="sm:hidden">Invofest</span>
              <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </a>
          </div>

          {/* Center: Logo */}
          <RouterLink to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 group order-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <img 
                src="/assets/images/logo.webp" 
                alt="LokalKu Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <span className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white hidden sm:block">
              LokalKu
            </span>
          </RouterLink>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 order-3">
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full min-w-[280px] max-w-[420px]"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="flex-1 text-left">{t("navbar.search")}</span>
              <kbd className="hidden xl:inline-block px-2 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded flex-shrink-0">
                {navigator.platform.toLowerCase().includes('mac') ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
            
            <div className="relative group z-[110] flex-shrink-0">
              <div className="flex flex-col items-center gap-1">
                <LanguageSwitcher />
                <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Bahasa
                </span>
              </div>
            </div>
            
            <div className="relative group z-[110] flex-shrink-0">
              <div className="flex flex-col items-center gap-1">
                <AnimatedThemeToggler />
                <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Theme
                </span>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Actions */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2 order-3">
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Open search"
              title="Search UMKM businesses"
            >
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">Search</span>
            </button>
            
            <div className="relative group z-[110]">
              <LanguageSwitcher />
            </div>
            
            <div className="relative group z-[110]">
              <AnimatedThemeToggler />
            </div>
          </div>
        </div>

        {/* Cards Content */}
        <div
          id="navigation-menu"
          className={`absolute left-0 right-0 top-[70px] bottom-0 p-2 sm:p-4 overflow-y-auto ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 min-h-full">
            {navItems.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <div
                  key={item.href}
                  ref={setCardRef(idx)}
                  className={`bg-gradient-to-br ${item.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 shadow-lg hover:shadow-xl transition-all duration-300 lg:h-full ${
                    isActive ? "ring-2 ring-white ring-offset-2" : ""
                  } ${
                    isMenuOpen 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${idx * 60}ms` : '0ms',
                    transitionDuration: '400ms',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold font-display text-base sm:text-lg leading-tight">
                        {item.label}
                      </h3>
                      <p className="text-white/70 text-xs truncate">{item.description}</p>
                    </div>
                  </div>

                  {/* Card Links */}
                  <div className="flex flex-col gap-1 sm:gap-1.5 mt-auto">
                    {item.links.map((link) => {
                      return (
                        link.external ? (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => toggleMenu()}
                            className="group flex items-center gap-2 text-white/90 hover:text-white text-xs sm:text-sm font-medium transition-all hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                            aria-label={`${link.label} (opens in new tab)`}
                          >
                            <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <span className="truncate">{link.label}</span>
                          </a>
                        ) : (
                          <RouterLink
                            key={link.href}
                            to={link.href === "/#featured" ? "/" : link.href}
                            onClick={() => {
                              handleClick(link.href);
                              if (link.href !== "/#featured") {
                                toggleMenu();
                              }
                            }}
                            className="group flex items-center gap-2 text-white/90 hover:text-white text-xs sm:text-sm font-medium transition-all hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                          >
                            <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <span className="truncate">{link.label}</span>
                          </RouterLink>
                        )
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}