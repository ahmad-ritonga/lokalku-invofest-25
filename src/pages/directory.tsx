import { useState, useEffect, useMemo } from "react";
import { Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowUpDown, 
  MapPin, 
  Star, 
  Heart, 
  X,
  Store,
  Coffee,
  ShoppingBag,
  Wrench,
  Sparkles,
  ChevronDown,
  ChevronRight,
  SearchX
} from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import LazySection from "@/components/LazySection";
import LazyImage from "@/components/LazyImage";
import DefaultLayout from "@/layouts/default";
import { useLanguage } from "@/contexts/LanguageContext";
import { UMKM, umkmData, locations, getUMKMByCategory } from "@/data/umkm-data";

// UMKM Card Component
interface UMKMCardProps {
  umkm: UMKM;
  viewMode: "grid" | "list";
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
  userLocation?: { lat: number; lng: number } | null;
}

function UMKMCard({ umkm, viewMode, onToggleFavorite, onClick, userLocation }: UMKMCardProps) {
  const navigate = useNavigate();
  
  // Format price range to Rupiah
  const formatPriceRange = (priceRange?: "$" | "$$" | "$$$") => {
    switch (priceRange) {
      case "$":
        return "Rp 10.000 - 25.000";
      case "$$":
        return "Rp 25.000 - 50.000";
      case "$$$":
        return "Rp 50.000 - 100.000";
      default:
        return "Harga bervariasi";
    }
  };

  // Calculate distance if user location is available
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  const distance = userLocation && umkm.coordinates 
    ? calculateDistance(userLocation.lat, userLocation.lng, umkm.coordinates.lat, umkm.coordinates.lng)
    : null;

  const handleViewDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const categorySlug = umkm.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    const nameSlug = umkm.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/detail/${categorySlug}/${nameSlug}-${umkm.id}`);
  };

  return (
    <LazySection
      animationType="slideUp"
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 ${
        viewMode === "list" ? "overflow-hidden" : "overflow-hidden"
      }`}
    >
      <div
        className={`cursor-pointer group ${
          viewMode === "list" ? "flex gap-4 p-4" : ""
        }`}
        onClick={onClick}
      >
        {/* Image */}
        <div className={`relative ${
          viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "aspect-video"
        }`}>
          <LazyImage
            src={umkm.image}
            alt={umkm.name}
            className="w-full h-full object-cover rounded-lg"
          />
          
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <Chip
              size="sm"
              variant="solid"
              color={umkm.status === "open" ? "success" : "danger"}
              className="text-white"
            >
              {umkm.status === "open" ? "Buka" : "Tutup"}
            </Chip>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(umkm.id);
            }}
            className="absolute top-2 left-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={umkm.isFavorite ? `Remove ${umkm.name} from favorites` : `Add ${umkm.name} to favorites`}
            title={umkm.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={16}
              className={`${
                umkm.isFavorite 
                  ? "fill-red-500 text-red-500" 
                  : "text-gray-600 dark:text-gray-400"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Content */}
        <div className={`${viewMode === "list" ? "flex-1" : "p-4"}`}>
          {/* Category Chip */}
          <Chip size="sm" variant="flat" color="primary" className="mb-2">
            {umkm.category}
          </Chip>

          {/* Name */}
          <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {umkm.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {umkm.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({umkm.reviewCount} ulasan)
            </span>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {umkm.location}
              </span>
            </div>
            {distance !== null && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {distance.toFixed(1)} km
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {umkm.description}
          </p>

          {/* Price Range & View Detail Button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Chip size="sm" variant="flat" color="secondary">
                {formatPriceRange(umkm.priceRange)}
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onClick={handleViewDetail}
              endContent={<ChevronRight size={14} />}
            >
              Lihat Detail
            </Button>
          </div>
        </div>
      </div>
    </LazySection>
  );
}

// Main Directory Page Component
export default function DirectoryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Use centralized categories and locations data
  const categoryList = [
    {
      id: "all",
      name: language === 'en' ? 'All Categories' : 'Semua Kategori',
      icon: Store,
      count: umkmData.length
    },
    {
      id: "Makanan & Minuman",
      name: "Makanan & Minuman",
      icon: Coffee,
      count: getUMKMByCategory("Makanan & Minuman").length
    },
    {
      id: "Fashion",
      name: "Fashion",
      icon: ShoppingBag,
      count: getUMKMByCategory("Fashion").length
    },
    {
      id: "Kafe & Resto",
      name: "Kafe & Resto",
      icon: Coffee,
      count: getUMKMByCategory("Kafe & Resto").length
    },
    {
      id: "Kecantikan",
      name: "Kecantikan",
      icon: Sparkles,
      count: getUMKMByCategory("Kecantikan").length
    },
    {
      id: "Otomotif & Jasa",
      name: "Otomotif & Jasa",
      icon: Wrench,
      count: getUMKMByCategory("Otomotif & Jasa").length
    }
  ];
  const locationList = locations;
  
  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState(language === 'en' ? "All Banyumas" : "Semua Banyumas");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<"all" | "open" | "closed">("all");
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [umkmList, setUmkmList] = useState(umkmData);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Modal Controls - removed unused modal functionality

  // Force grid view on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewMode("grid");
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get user's current location
  const getUserLocation = () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(language === 'en' ? "Geolocation is not supported by your browser" : "Geolocation tidak didukung oleh browser Anda");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLoading(false);
        setSortBy("distance"); // Automatically sort by distance when location is obtained
      },
      (error) => {
        let errorMessage = language === 'en' ? "Unable to access location" : "Tidak dapat mengakses lokasi";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = language === 'en' 
              ? "Location access permission denied. Please enable it in browser settings." 
              : "Izin akses lokasi ditolak. Silakan aktifkan di pengaturan browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = language === 'en' ? "Location information is not available" : "Informasi lokasi tidak tersedia";
            break;
          case error.TIMEOUT:
            errorMessage = language === 'en' ? "Location request timeout" : "Permintaan lokasi timeout";
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  // Search placeholders with language support
  const placeholders = [
    language === 'en' ? "Search nearby restaurants..." : "Cari warung makan terdekat...",
    language === 'en' ? "Find batik stores..." : "Temukan toko batik...",
    language === 'en' ? "Search beauty salons..." : "Cari salon kecantikan...",
    language === 'en' ? "Good coffee shops..." : "Warung kopi enak...",
    language === 'en' ? "Electronics repair services..." : "Jasa service elektronik..."
  ];

  // Filter and Search Logic
  const filteredUMKM = useMemo(() => {
    let filtered = umkmList;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((umkm: UMKM) =>
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((umkm: UMKM) => umkm.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation !== (language === 'en' ? "All Banyumas" : "Semua Banyumas")) {
      filtered = filtered.filter((umkm: UMKM) => {
        // Map English location names back to Indonesian for filtering
        let locationToMatch = selectedLocation;
        if (language === 'en') {
          const locationMap: { [key: string]: string } = {
            "North Purwokerto": "Purwokerto Utara",
            "South Purwokerto": "Purwokerto Selatan",
            "West Purwokerto": "Purwokerto Barat",
            "East Purwokerto": "Purwokerto Timur",
            "Others": "Lainnya"
          };
          locationToMatch = locationMap[selectedLocation] || selectedLocation;
        }
        return umkm.location === locationToMatch;
      });
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((umkm: UMKM) => umkm.rating >= selectedRating);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((umkm: UMKM) => umkm.status === selectedStatus);
    }

    // Price range filter
    if (priceRange.length > 0) {
      filtered = filtered.filter((umkm: UMKM) => 
        priceRange.includes(umkm.priceRange || "$")
      );
    }

    // Sort - FIXED: Using proper Haversine distance calculation
    switch (sortBy) {
      case "name":
        filtered.sort((a: UMKM, b: UMKM) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a: UMKM, b: UMKM) => b.rating - a.rating);
        break;
      case "distance":
        if (userLocation) {
          filtered.sort((a: UMKM, b: UMKM) => {
            const distanceA = a.coordinates ? 
              calculateDistance(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng) : 
              Infinity;
            const distanceB = b.coordinates ? 
              calculateDistance(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng) : 
              Infinity;
            return distanceA - distanceB;
          });
        }
        break;
      case "newest":
        // For demo purposes, we'll sort by ID (assuming higher ID = newer)
        filtered.sort((a: UMKM, b: UMKM) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [umkmList, searchQuery, selectedCategory, selectedLocation, selectedRating, selectedStatus, priceRange, sortBy, userLocation, language]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);
  const paginatedUMKM = filteredUMKM.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already handled by onChange, but we can add additional logic here if needed
  };

  const handleToggleFavorite = (id: string) => {
    setUmkmList((prev: UMKM[]) => 
      prev.map((umkm: UMKM) => 
        umkm.id === id ? { ...umkm, isFavorite: !umkm.isFavorite } : umkm
      )
    );
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("Semua Banyumas");
    setSelectedRating(0);
    setSelectedStatus("all");
    setPriceRange([]);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const quickFilters = [
    { 
      label: language === 'en' ? "All" : "Semua", 
      value: "all", 
      active: selectedCategory === "all" && selectedStatus === "all" && sortBy === "relevance" 
    },
    { 
      label: language === 'en' ? "Open Now" : "Buka Sekarang", 
      value: "open", 
      active: selectedStatus === "open" 
    },
    { 
      label: language === 'en' ? "Highest Rated" : "Rating Tertinggi", 
      value: "rating", 
      active: sortBy === "rating" 
    },
    { 
      label: language === 'en' ? "Nearest" : "Terdekat", 
      value: "distance", 
      active: sortBy === "distance" 
    }
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                {language === 'en' ? 'Home' : 'Beranda'}
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 dark:text-white">
                {language === 'en' ? 'SMEs Directory' : 'Direktori UMKM'}
              </span>
            </nav>

            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'SMEs Directory' : 'Direktori UMKM'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {language === 'en' 
                    ? `Discover ${filteredUMKM.length} best SMEs in Banyumas`
                    : `Temukan ${filteredUMKM.length} UMKM terbaik di Banyumas`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4">
              {/* Search Input - Full Width */}
              <div className="w-full">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>

              {/* Filter and Sort Controls Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Quick Filter Chips - Responsive layout */}
                <div className="flex gap-2 overflow-x-hidden pb-2 sm:pb-0 flex-wrap">
                  {quickFilters.map((filter) => (
                    <button
                      key={filter.value}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                        filter.active 
                          ? "bg-primary-600 text-white shadow-md shadow-primary-500/30 dark:bg-primary-500 dark:text-white" 
                          : "bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-500 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-primary-400 dark:hover:text-primary-400"
                      }`}
                      onClick={() => {
                        if (filter.value === "all") {
                          resetFilters();
                        } else if (filter.value === "open") {
                          setSelectedStatus(selectedStatus === "open" ? "all" : "open");
                        } else if (filter.value === "rating") {
                          setSortBy(sortBy === "rating" ? "relevance" : "rating");
                        } else if (filter.value === "distance") {
                          // Request location when clicking Terdekat
                          if (!userLocation) {
                            getUserLocation();
                          } else {
                            // When location is available, always set to distance sort
                            setSortBy("distance");
                          }
                        }
                        setCurrentPage(1);
                      }}
                      disabled={filter.value === "distance" && locationLoading}
                    >
                      {filter.value === "distance" && locationLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Memuat...
                        </span>
                      ) : (
                        filter.label
                      )}
                    </button>
                  ))}
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Mobile Filter Button */}
                  {/* Filter button removed - modal not implemented */}

                  {/* Sort Dropdown */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        endContent={<ChevronDown size={16} />}
                        startContent={<ArrowUpDown size={16} />}
                        className="flex-1 sm:flex-none"
                        size="sm"
                      >
                        <span className="hidden sm:inline">Urutkan</span>
                        <ArrowUpDown size={16} className="sm:hidden" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[sortBy]}
                      selectionMode="single"
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        setSortBy(key);
                        setCurrentPage(1);
                      }}
                    >
                      <DropdownItem key="relevance">Relevansi</DropdownItem>
                      <DropdownItem key="rating">Rating Tertinggi</DropdownItem>
                      <DropdownItem key="distance">Terdekat</DropdownItem>
                      <DropdownItem key="name">Nama A-Z</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  {/* View Mode Toggle - Hidden on mobile */}
                  <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                    <Button
                      size="sm"
                      variant={viewMode === "grid" ? "solid" : "light"}
                      onPress={() => setViewMode("grid")}
                      className="min-w-0 px-3"
                    >
                      Grid
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "list" ? "solid" : "light"}
                      onPress={() => setViewMode("list")}
                      className="min-w-0 px-3"
                    >
                      List
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white">
                    Filter
                  </h3>
                  <Button
                    size="sm"
                    variant="light"
                    onPress={resetFilters}
                  >
                    Reset
                  </Button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Kategori</h4>
                  <div className="space-y-2">
                    {categoryList.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                            selectedCategory === category.id
                              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent size={18} />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {category.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Location' : 'Lokasi'}</h4>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-between"
                        endContent={<ChevronDown size={16} />}
                      >
                        {selectedLocation}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[selectedLocation]}
                      selectionMode="single"
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        setSelectedLocation(key);
                        setCurrentPage(1);
                      }}
                    >
                      {locationList.map((location) => (
                        <DropdownItem key={location}>{location}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Minimum Rating' : 'Rating Minimum'}</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => {
                          setSelectedRating(rating);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                          selectedRating === rating
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rating}+</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Status' : 'Status'}</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: language === 'en' ? "All" : "Semua" },
                    { value: "open", label: language === 'en' ? "Open" : "Buka" },
                    { value: "closed", label: language === 'en' ? "Closed" : "Tutup" }
                  ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setSelectedStatus(status.value as "all" | "open" | "closed");
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                          selectedStatus === status.value
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="text-sm">{status.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1">
              {/* Location Error Alert */}
              {locationError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-red-900 dark:text-red-200 mb-1">
                        {language === 'en' ? 'Unable to Access Location' : 'Tidak Dapat Mengakses Lokasi'}
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {locationError}
                      </p>
                    </div>
                    <button
                      onClick={() => setLocationError(null)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Location Success Alert */}
              {userLocation && !locationError && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                  {language === 'en' 
                    ? 'Your location has been detected successfully. Distance is displayed based on your current location.'
                    : 'Lokasi Anda berhasil dideteksi. Jarak ditampilkan berdasarkan lokasi Anda saat ini.'
                  }
                </p>
                  </div>
                </div>
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en' 
                ? `Showing ${paginatedUMKM.length} of ${filteredUMKM.length} results`
                : `Menampilkan ${paginatedUMKM.length} dari ${filteredUMKM.length} hasil`
              }
            </p>
              </div>

              {/* Results Grid/List */}
              {paginatedUMKM.length > 0 ? (
                <div className={`${
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                }`}>
                  {paginatedUMKM.map((umkm) => (
                    <UMKMCard
                      key={umkm.id}
                      umkm={umkm}
                      viewMode={viewMode}
                      onToggleFavorite={handleToggleFavorite}
                      onClick={() => {
                        // Create slug format: /detail/{category}-{name}-{id}
                        const categorySlug = umkm.category.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                        const nameSlug = umkm.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                        const slug = `${categorySlug}/${nameSlug}-${umkm.id}`;
                        navigate(`/detail/${slug}`);
                      }}
                      userLocation={userLocation}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SearchX size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {language === 'en' ? 'No results found' : 'Tidak ada hasil ditemukan'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {language === 'en' 
                      ? 'Try changing your search keywords or selected filters'
                      : 'Coba ubah kata kunci pencarian atau filter yang dipilih'
                    }
                  </p>
                  <Button
                    color="primary"
                    onPress={resetFilters}
                  >
                    {language === 'en' ? 'Reset Filter' : 'Reset Filter'}
                  </Button>
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
        </div>

        {/* Mobile Filter Modal - Truncated for brevity */}

        {/* Custom Styles */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */}
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
}