import Navbar from "@/components/navbar";
import { Button } from "@heroui/button";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-grow">
        {children}
      </main>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-6 left-6 z-40 group">
          <Button
            isIconOnly
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
            onPress={scrollToTop}
            aria-label="Scroll to top"
          >
            <ChevronUpIcon className="w-5 h-5" />
          </Button>
          
          {/* Tooltip - "Scroll to Top" on hover - positioned to the right */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-x-1 pointer-events-none z-45">
            <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
              Scroll to Top
              {/* Tooltip Arrow pointing left */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-gray-900 dark:border-r-white"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}