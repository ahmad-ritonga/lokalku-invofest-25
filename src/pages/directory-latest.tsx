import React, { useState, useMemo } from "react";
import { 
  Button, 
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination
} from "@heroui/react";
import { 
  Search, 
  Grid3X3, 
  List, 
  MapPin, 
  Star, 
  Heart, 
  TrendingUp, 
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  Sparkles,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import DefaultLayout from "@/layouts/default";
import LazySection from "@/components/LazySection";
import LazyImage from "@/components/LazyImage";
import { UMKM, umkmData, categories } from "@/data/umkm-data";

type SortOption = "newest" | "rating" | "reviews" | "trending";

export default function DirectoryLatestPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get centralized data
  const [umkmList, setUmkmList] = useState<UMKM[]>(umkmData);

  const sortOptions = [
    { key: "newest", label: language === 'en' ? "Newest" : "Terbaru" },
    { key: "rating", label: language === 'en' ? "Highest Rating" : "Rating Tertinggi" },
    { key: "reviews", label: language === 'en' ? "Most Reviews" : "Review Terbanyak" },
    { key: "trending", label: language === 'en' ? "Trending" : "Trending" }
  ];

  const filteredAndSortedUMKM = useMemo(() => {
    let filtered = umkmList.filter((umkm: UMKM) => {
      const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           umkm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (umkm.tags && umkm.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = selectedCategory === "all" || umkm.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a: UMKM, b: UMKM) => {
      switch (sortBy) {
        case "newest":
          // Since registeredDate doesn't exist, use id as fallback for sorting
          return parseInt(b.id) - parseInt(a.id);
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "trending":
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [umkmList, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredAndSortedUMKM.length / itemsPerPage);
  const paginatedUMKM = filteredAndSortedUMKM.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUMKMClick = (umkm: UMKM) => {
    const categorySlug = umkm.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    const nameSlug = umkm.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/detail/${categorySlug}/${nameSlug}-${umkm.id}`);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUmkmList((prev: UMKM[]) => 
      prev.map((umkm: UMKM) => 
        umkm.id === id ? { ...umkm, isFavorite: !umkm.isFavorite } : umkm
      )
    );
  };

  const formatPriceRange = (priceRange?: "$" | "$$" | "$$$") => {
    switch (priceRange) {
      case "$": return "Rp 10.000 - 25.000";
      case "$$": return "Rp 25.000 - 50.000";
      case "$$$": return "Rp 50.000 - 100.000";
      default: return "Harga bervariasi";
    }
  };

  const placeholders = [
    language === 'en' ? "Search latest businesses..." : "Cari usaha terbaru...",
    language === 'en' ? "Find new UMKM..." : "Temukan UMKM baru...",
    language === 'en' ? "Discover trending businesses..." : "Temukan usaha trending...",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {language === 'en' ? 'Home' : 'Beranda'}
              </Link>
              <ChevronRight size={16} />
              <Link to="/direktori" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {language === 'en' ? 'SMEs Directory' : 'Direktori UMKM'}
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 dark:text-white font-medium">
                {language === 'en' ? 'Latest' : 'Terbaru'}
              </span>
            </nav>

            {/* Page Title with Icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Latest UMKM' : 'UMKM Terbaru'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {language === 'en' 
                    ? `Discover ${filteredAndSortedUMKM.length} newest businesses in Banyumas` 
                    : `Temukan ${filteredAndSortedUMKM.length} usaha terbaru di Banyumas`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4">
              {/* Search Input */}
              <div className="w-full">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>

              {/* Filter Controls Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Left Side - Category Filter */}
                <div className="flex items-center gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        endContent={<ChevronDown size={16} />}
                        className="w-full sm:w-auto"
                      >
                        {selectedCategory === "all" ? "Kategori" : selectedCategory}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[selectedCategory]}
                      selectionMode="single"
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setSelectedCategory(selectedKey);
                        setCurrentPage(1);
                      }}
                    >
                      {categories.map((category, index) => (
                        <DropdownItem key={index}>{category}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>

                  {/* Sort Dropdown */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        endContent={<ChevronDown size={16} />}
                        startContent={<ArrowUpDown size={16} />}
                        className="w-full sm:w-auto"
                      >
                        <span className="hidden sm:inline">
                          {language === 'en' ? 'Sort' : 'Urutkan'}
                        </span>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[sortBy]}
                      selectionMode="single"
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as SortOption;
                        setSortBy(selectedKey);
                        setCurrentPage(1);
                      }}
                    >
                      {sortOptions.map((option) => (
                        <DropdownItem key={option.key}>{option.label}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Right Side - View Mode Toggle */}
                <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "solid" : "light"}
                    onPress={() => setViewMode("grid")}
                    className="min-w-0 px-3"
                    startContent={<Grid3X3 size={16} />}
                  >
                    Grid
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "solid" : "light"}
                    onPress={() => setViewMode("list")}
                    className="min-w-0 px-3"
                    startContent={<List size={16} />}
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? `Showing ${paginatedUMKM.length} of ${filteredAndSortedUMKM.length} results`
                : `Menampilkan ${paginatedUMKM.length} dari ${filteredAndSortedUMKM.length} hasil`}
            </p>
          </div>

          {/* UMKM Grid/List */}
          {paginatedUMKM.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
              : "space-y-4"
            }>
              {paginatedUMKM.map((umkm, index) => (
                <LazySection
                  key={umkm.id}
                  animationType="slideUp"
                  delay={index * 0.05}
                  className="h-full"
                >
                  <div 
                    className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col group ${
                      viewMode === "list" ? "!flex-row gap-4 p-4" : ""
                    }`}
                    onClick={() => handleUMKMClick(umkm)}
                  >
                    {/* Image */}
                    <div className={`relative flex-shrink-0 ${
                      viewMode === "list" ? "w-48 h-32" : "w-full aspect-[16/10]"
                    }`}>
                      <LazyImage
                        src={umkm.image}
                        alt={umkm.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        <Chip
                          size="sm"
                          color={umkm.status === "open" ? "success" : "default"}
                          variant="solid"
                          className="text-white font-medium"
                        >
                          {umkm.status === "open" 
                            ? (language === 'en' ? 'Open' : 'Buka') 
                            : (language === 'en' ? 'Closed' : 'Tutup')
                          }
                        </Chip>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {umkm.isNew && (
                          <Chip size="sm" color="primary" variant="solid" className="text-white font-medium flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{language === 'en' ? 'New' : 'Baru'}</span>
                          </Chip>
                        )}
                        {umkm.isTrending && (
                          <Chip size="sm" color="warning" variant="solid" className="text-white font-medium flex items-center gap-1">
                            <TrendingUp size={12} />
                            <span>Trending</span>
                          </Chip>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(umkm.id, e)}
                        className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
                      >
                        <Heart 
                          size={16} 
                          className={umkm.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"} 
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col flex-1 ${viewMode === "list" ? "" : "p-4"}`}>
                      {/* Category Chip */}
                      <div className="mb-2">
                        <Chip size="sm" variant="flat" color="primary">
                          {umkm.category}
                        </Chip>
                      </div>

                      {/* Name */}
                      <h3 className="font-playfair text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {umkm.name}
                      </h3>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {umkm.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({umkm.reviewCount} {language === 'en' ? 'reviews' : 'ulasan'})
                        </span>
                      </div>

                      {/* Location & Distance */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {umkm.location}
                          </span>
                        </div>
                        {umkm.distance && (
                          <>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {umkm.distance}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2 flex-grow">
                        {umkm.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(umkm.tags || []).slice(0, 3).map((tag, tagIndex) => (
                          <Chip key={tagIndex} size="sm" variant="flat" color="default" className="text-xs">
                            {tag}
                          </Chip>
                        ))}
                      </div>

                      {/* Footer - Price Range */}
                      {umkm.priceRange && (
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
                          <Chip size="sm" variant="flat" color="secondary" className="font-medium">
                            {formatPriceRange(umkm.priceRange)}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </div>
                </LazySection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'No businesses found' : 'Tidak ada usaha ditemukan'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Try adjusting your search terms or filters to find what you\'re looking for.' 
                    : 'Coba sesuaikan kata kunci pencarian atau filter untuk menemukan yang Anda cari.'}
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
                showShadow
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}