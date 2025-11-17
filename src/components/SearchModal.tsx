import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Card,
  CardBody,
  Avatar,
  Chip,
  Kbd,
  Link,
} from "@heroui/react";
import { Search, MapPin, Star, ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { searchUMKM, umkmData, type UMKM } from "@/data/umkm-data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UMKM[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Get top 3 UMKM by rating
  const featuredUMKM = umkmData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchUMKM(searchQuery);
      setSearchResults(results.slice(0, 8)); // Limit to 8 results
      setSelectedIndex(0);
    } else {
      setSearchResults([]);
      setSelectedIndex(0);
    }
  }, [searchQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const totalItems = searchQuery.trim() ? searchResults.length : featuredUMKM.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => 
            prev < totalItems - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          const selectedUMKM = searchQuery.trim() 
            ? searchResults[selectedIndex] 
            : featuredUMKM[selectedIndex];
          if (selectedUMKM) {
            handleSelectUMKM(selectedUMKM);
          }
          break;
        case "Escape":
          e.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, searchQuery, featuredUMKM]);

  const handleSelectUMKM = (umkm: UMKM) => {
    // Create category slug by removing spaces and special characters
    const categorySlug = umkm.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    // Create name slug from UMKM name and append ID
    const nameSlug = umkm.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/detail/${categorySlug}/${nameSlug}-${umkm.id}`);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(0);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      placement="center"
      scrollBehavior="inside"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "mx-2 sm:mx-4 max-w-[95vw] sm:max-w-2xl",
        wrapper: "z-[200] flex items-center justify-center p-2 sm:p-4",
      }}
    >
      <ModalContent className="max-h-[85vh] sm:max-h-[80vh] overflow-hidden">
        <ModalHeader className="flex flex-col gap-1 pb-2 px-3 sm:px-5 pt-3 sm:pt-5">
          <h2 className="font-playfair text-sm sm:text-lg font-semibold">
            {t("search.title")}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-normal">
            {t("search.subtitle")}
          </p>
        </ModalHeader>
        <ModalBody className="pb-3 sm:pb-4 px-0 overflow-y-auto">
          {/* Search Input */}
          <div className="px-3 sm:px-5">
            <Input
              ref={inputRef}
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />}
              endContent={
                <div className="items-center gap-1 hidden sm:flex">
                  <Kbd keys={["escape"]}>ESC</Kbd>
                </div>
              }
              aria-label="Search for UMKM businesses"
              classNames={{
                input: "text-xs sm:text-sm",
                inputWrapper: "h-9 sm:h-10 md:h-11",
              }}
            />
          </div>

          {/* Follow for Updates Section */}
          {!searchQuery.trim() && (
            <div className="mt-2 sm:mt-3 px-3 sm:px-5">
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-800">
                <CardBody className="p-2 sm:p-2.5 md:p-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="p-1 sm:p-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-md sm:rounded-lg flex-shrink-0">
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-playfair font-semibold text-[10px] sm:text-xs mb-0.5">
                        {t("search.followUpdates")}
                      </h3>
                      <Link 
                        href="https://ahmadrian.site" 
                        target="_blank"
                        className="text-primary-600 dark:text-primary-400 text-[10px] sm:text-xs hover:underline truncate block"
                      >
                        ahmadrian.site
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Content Area */}
          <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 px-3 sm:px-5">
            {/* Search Results */}
            {searchQuery.trim() && (
              <>
                {searchResults.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-sm">{t("search.noResults")}</p>
                    <p className="text-xs mt-1">{t("search.tryDifferent")}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {searchResults.length} {t("search.resultsFound")}
                    </p>
                    
                    {searchResults.map((umkm, index) => (
                      <Card
                        key={umkm.id}
                        isPressable
                        className={`transition-all duration-200 ${
                          index === selectedIndex
                            ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 ring-2 ring-primary-200 dark:ring-primary-800"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                        onPress={() => handleSelectUMKM(umkm)}
                      >
                        <CardBody className="p-2 sm:p-2.5 h-[80px] sm:h-[88px] md:h-[96px]">
                          <div className="grid grid-cols-[auto_1fr_auto] gap-1.5 sm:gap-2 h-full items-center">
                            <Avatar
                              src={umkm.image}
                              alt={umkm.name}
                              className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0"
                            />
                            
                            <div className="flex-1 min-w-0 h-full flex flex-col justify-center">
                              <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                                <h3 className="font-playfair font-medium text-[11px] sm:text-xs truncate flex-1">
                                  {umkm.name}
                                </h3>
                                <Chip
                                  size="sm"
                                  color={umkm.status === "open" ? "success" : "default"}
                                  variant="flat"
                                  className="text-[9px] sm:text-[10px] h-4 sm:h-5 flex-shrink-0"
                                >
                                  {umkm.status === "open" ? t("common.open") : t("common.closed")}
                                </Chip>
                              </div>
                              
                              <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400 mb-1">
                                <div className="flex items-center gap-0.5 sm:gap-1 min-w-0 flex-1">
                                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">{umkm.location}</span>
                                </div>
                                
                                <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold text-yellow-600">{umkm.rating}</span>
                                  <span>({umkm.reviewCount})</span>
                                </div>
                              </div>
                              
                              <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-snug">
                                {umkm.description}
                              </p>
                            </div>
                            
                            {/* Navigation indicator - only show when this item is selected */}
                            {index === selectedIndex && (
                              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                                <ArrowRight className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                              </div>
                            )}
                            
                            {/* Default arrow for non-selected items */}
                            {index !== selectedIndex && (
                              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Featured UMKM - Show when no search query */}
            {!searchQuery.trim() && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-playfair font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    {t("search.topUMKM")}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {featuredUMKM.map((umkm, index) => (
                    <Card
                      key={umkm.id}
                      isPressable
                      className={`transition-all duration-200 ${
                        index === selectedIndex && !searchQuery.trim()
                          ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 ring-2 ring-primary-200 dark:ring-primary-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onPress={() => handleSelectUMKM(umkm)}
                    >
                      <CardBody className="p-2 sm:p-3 md:p-4 h-[100px] sm:h-[110px] md:h-[120px]">
                        <div className="grid grid-cols-[auto_1fr_auto] gap-2 sm:gap-3 h-full items-center">
                          {/* Avatar with rank badge */}
                          <div className="relative flex-shrink-0">
                            <Avatar
                              src={umkm.image}
                              alt={umkm.name}
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                            />
                            <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                              <h4 className="font-playfair font-semibold text-sm sm:text-base truncate flex-1">
                                {umkm.name}
                              </h4>
                              <Chip
                                size="sm"
                                color={umkm.status === "open" ? "success" : "default"}
                                variant="flat"
                                className="text-xs h-5 sm:h-6 flex-shrink-0"
                              >
                                {umkm.status === "open" ? t("common.open") : t("common.closed")}
                              </Chip>
                            </div>
                            
                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2">
                              <div className="flex items-center gap-1 min-w-0 flex-1">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{umkm.location}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-yellow-600">{umkm.rating}</span>
                                <span>({umkm.reviewCount})</span>
                              </div>
                            </div>
                            
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                              {umkm.description}
                            </p>
                          </div>
                          
                          {/* Arrow indicator */}
                          {index === selectedIndex && !searchQuery.trim() && (
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                          )}
                          
                          {!(index === selectedIndex && !searchQuery.trim()) && (
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts Help - Hidden on mobile */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 hidden sm:block">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Kbd keys={["up", "down"]} />
                    <span>{t("search.navigate")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Kbd keys={["enter"]} />
                    <span>{t("search.select")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Kbd keys={["escape"]} />
                    <span>{t("search.close")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}