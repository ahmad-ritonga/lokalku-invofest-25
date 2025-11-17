import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import { Heart, Star, MapPin, Trash2, Share2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// UMKM Interface
interface UMKM {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  status: "open" | "closed";
}

// Lightweight Background Ripple Effect Component
const BackgroundRipple = ({ rows = 8, cols = 25, cellSize = 56 }: { rows?: number; cols?: number; cellSize?: number }) => {
  const [clickedCell, setClickedCell] = useState<{ row: number; col: number } | null>(null);

  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, idx) => idx), [rows, cols]);

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <div className="relative h-auto w-auto overflow-hidden">
        {/* Pointer events blocker overlay */}
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        
        <div 
          className="relative z-[3] mask-radial-from-20% mask-radial-at-top" 
          style={gridStyle}
        >
          {cells.map((idx) => {
            const rowIdx = Math.floor(idx / cols);
            const colIdx = idx % cols;
            const distance = clickedCell
              ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
              : 0;
            const delay = clickedCell ? Math.max(0, distance * 55) : 0;
            const duration = 200 + distance * 80;

            return (
              <div
                key={idx}
                className={cn(
                  "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 hover:opacity-80",
                  "border-neutral-300 dark:border-neutral-700",
                  "bg-neutral-100 dark:bg-neutral-900",
                  "dark:shadow-[0px_0px_40px_1px_rgba(0,0,0,0.3)_inset]",
                  clickedCell && "animate-cell-ripple"
                )}
                style={{
                  "--delay": `${delay}ms`,
                  "--duration": `${duration}ms`,
                } as React.CSSProperties}
                onClick={() => {
                  setClickedCell({ row: rowIdx, col: colIdx });
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Favorites() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<UMKM[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleBulkDelete = () => {
    const updatedFavorites = favorites.filter((fav) => !selectedItems.has(fav.id));
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedItems(new Set());
    setIsSelectionMode(false);
  };

  const handleShare = (umkm: UMKM) => {
    if (navigator.share) {
      navigator.share({
        title: umkm.name,
        text: umkm.description,
        url: window.location.origin + `/umkm/${umkm.id}`,
      });
    }
  };

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  const selectAll = () => {
    if (selectedItems.size === favorites.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(favorites.map((f) => f.id)));
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Background Ripple Effect */}
        <BackgroundRipple />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">{/* Changed pt-24 to pt-32 for more top padding */}
          {/* Header */}
          <div className="text-center mb-12 blur-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <Heart className="inline-block w-10 h-10 mr-3 text-red-500 fill-red-500" />
              {t("favorites.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("favorites.subtitle")}
            </p>
          </div>

          {/* Action Bar */}
          {favorites.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8 blur-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-4">
                <Chip color="primary" variant="flat" size="lg">
                  {favorites.length} UMKM
                </Chip>
                {isSelectionMode && (
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={selectAll}
                  >
                    {selectedItems.size === favorites.length ? t("favorites.actions.deselectAll") : t("favorites.actions.selectAll")}
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {isSelectionMode ? (
                  <>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      startContent={<Trash2 className="w-4 h-4" />}
                      onPress={handleBulkDelete}
                      isDisabled={selectedItems.size === 0}
                    >
                      {t("favorites.actions.delete")} ({selectedItems.size})
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      onPress={() => {
                        setIsSelectionMode(false);
                        setSelectedItems(new Set());
                      }}
                    >
                      {t("favorites.actions.cancel")}
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => setIsSelectionMode(true)}
                  >
                    {t("favorites.actions.manage")}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Favorites Grid */}
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("favorites.empty.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {t("favorites.empty.description")}
              </p>
              <Button
                as={Link}
                to="/direktori"
                color="primary"
                size="lg"
                className="font-semibold"
              >
                {t("favorites.actions.explore")}
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {favorites.map((umkm, idx) => (
                  <motion.div
                    key={umkm.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="blur-fade-in"
                    style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                  >
                    <Card
                      className={cn(
                        "group hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800",
                        isSelectionMode && "cursor-pointer",
                        selectedItems.has(umkm.id) && "ring-2 ring-primary-500"
                      )}
                      isPressable={isSelectionMode}
                      onPress={() => isSelectionMode && toggleSelection(umkm.id)}
                    >
                      <CardBody className="p-0">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={umkm.image}
                            alt={umkm.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          
                          {/* Selection Checkbox */}
                          {isSelectionMode && (
                            <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 rounded-full p-2">
                              <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                selectedItems.has(umkm.id)
                                  ? "bg-primary-500 border-primary-500"
                                  : "border-gray-400"
                              )}>
                                {selectedItems.has(umkm.id) && (
                                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <Chip
                          size="sm"
                          color={umkm.status === "open" ? "success" : "default"}
                          variant="flat"
                        >
                          {umkm.status === "open" ? t("favorites.status.open") : t("favorites.status.closed")}
                        </Chip>
                          </div>

                          {/* Quick Actions (Non-selection mode) */}
                          {!isSelectionMode && (
                            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="flat"
                                onPress={() => handleRemoveFavorite(umkm.id)}
                                className="backdrop-blur-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                onPress={() => handleShare(umkm)}
                                className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                              {umkm.name}
                            </h3>
                          </div>

                          <Chip size="sm" variant="flat" color="primary" className="mb-3">
                            {umkm.category}
                          </Chip>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {umkm.description}
                          </p>

                          {/* Info */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4 text-primary-500" />
                              <span className="line-clamp-1">{umkm.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {umkm.rating.toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({umkm.reviewCount} {t("favorites.reviews")})
                              </span>
                            </div>
                          </div>

                          {/* View Details Button */}
                          {!isSelectionMode && (
                            <Button
                              as={Link}
                              to={`/umkm/${umkm.id}`}
                              color="primary"
                              variant="flat"
                              fullWidth
                              endContent={<ExternalLink className="w-4 h-4" />}
                              className="font-semibold"
                            >
                              {t("favorites.actions.viewDetails")}
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Styles */}
        <style>{`
          @keyframes blurFadeIn {
            0% {
              opacity: 0;
              filter: blur(10px);
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              filter: blur(0);
              transform: translateY(0);
            }
          }

          .blur-fade-in {
            animation: blurFadeIn 0.8s ease-out both;
          }

          @keyframes cell-ripple {
            0% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              opacity: 0.4;
            }
          }

          .animate-cell-ripple {
            animation: cell-ripple var(--duration, 200ms) ease-out none 1 var(--delay, 0ms);
          }

          .cell {
            will-change: opacity;
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
}