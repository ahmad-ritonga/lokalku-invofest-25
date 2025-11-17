import { useState, useEffect, useMemo, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Input,
  Card,
  CardBody,
  Chip,
  Select,
  SelectItem
} from "@heroui/react";
import {
  Navigation,
  Phone,
  Star,
  MapPin,
  Search,
  Eye,
  Locate,
  Clock,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DefaultLayout from "@/layouts/default";
import { umkmData, categories } from "@/data/umkm-data";

// Interface untuk UMKM dengan koordinat yang sudah dihitung jaraknya
interface UMKMWithDistance {
  id: string;
  name: string;
  category: string;
  location: string;
  distance?: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  status: "open" | "closed";
  priceRange?: "$" | "$$" | "$$$";
  isFavorite: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  address: string;
  calculatedDistance: number;
}

// Sort options
const sortOptions = [
  { key: "distance", label: "Jarak Terdekat" },
  { key: "rating", label: "Rating Tertinggi" },
  { key: "name", label: "Nama A-Z" }
];

// User location (Purwokerto center as default)
const DEFAULT_LOCATION: [number, number] = [109.234439, -7.421389]; // [lng, lat]

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}

// Format distance
function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
}

interface UMKMCardProps {
  umkm: UMKMWithDistance;
  onViewDetails: () => void;
}

const UMKMCard = forwardRef<HTMLDivElement, UMKMCardProps>(({ umkm, onViewDetails }, ref) => {
  const { language } = useLanguage();

  const handleToggleFavorite = () => {
    console.log("Toggle favorite for:", umkm.id);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <CardBody className="p-0">
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
            {/* Image */}
            <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
              <img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
              />
              
              {/* Status Badge */}
              <Chip
                color={umkm.status === "open" ? "success" : "danger"}
                variant="solid"
                size="sm"
                className="absolute top-2 left-2"
              >
                {umkm.status === "open" 
                  ? (language === 'en' ? 'Open' : 'Buka') 
                  : (language === 'en' ? 'Closed' : 'Tutup')
                }
              </Chip>

              {/* Favorite Button */}
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90"
                onPress={handleToggleFavorite}
              >
                <Heart 
                  size={16} 
                  className={umkm.isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"} 
                />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div className="flex-1">
                  <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {umkm.name}
                  </h3>
                  <Chip color="primary" variant="flat" size="sm" className="mb-2">
                    {umkm.category}
                  </Chip>
                </div>
                
                {umkm.priceRange && (
                  <Chip color="secondary" variant="flat" size="sm">
                    {umkm.priceRange}
                  </Chip>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {umkm.description}
              </p>

              {/* Info Row */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{umkm.rating}</span>
                  <span className="text-xs text-gray-500">({umkm.reviewCount})</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-sm">{formatDistance(umkm.calculatedDistance)}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  <span className="text-sm">{umkm.location}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                  {umkm.address}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  color="primary"
                  size="sm"
                  startContent={<Eye size={16} />}
                  onPress={onViewDetails}
                  className="flex-1 sm:flex-none"
                >
                  {language === 'en' ? 'View Details' : 'Lihat Detail'}
                </Button>
                
                {umkm.phone && (
                  <Button
                    variant="bordered"
                    size="sm"
                    isIconOnly
                    as="a"
                    href={`tel:${umkm.phone}`}
                  >
                    <Phone size={16} />
                  </Button>
                )}
                
                <Button
                  variant="bordered"
                  size="sm"
                  isIconOnly
                  as="a"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${umkm.coordinates.lat},${umkm.coordinates.lng}`}
                  target="_blank"
                >
                  <Navigation size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
});

UMKMCard.displayName = 'UMKMCard';

export default function MapNearbyPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("distance");
  const [userLocation, setUserLocation] = useState<[number, number]>(DEFAULT_LOCATION);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [hasUserLocation, setHasUserLocation] = useState(false);

  // Get all UMKM data and calculate distances
  const processedUMKM = useMemo(() => {
    console.log('🔍 Processing UMKM data:', umkmData.length, 'items');
    console.log('📍 User location:', userLocation);
    
    const processed = umkmData.map((umkm) => {
      // Calculate distance from user location
      const distance = calculateDistance(
        userLocation[1], // user lat
        userLocation[0], // user lng
        umkm.coordinates.lat,
        umkm.coordinates.lng
      );

      console.log(`📍 ${umkm.name}: ${distance.toFixed(2)} km`);

      return {
        ...umkm,
        calculatedDistance: distance
      };
    });

    // Filter only UMKM within 10km by default
    const nearby = processed.filter(umkm => umkm.calculatedDistance <= 10);
    console.log(`✅ Found ${nearby.length} UMKM within 10km`);
    
    return nearby;
  }, [userLocation]);

  // Filter and sort UMKM
  const filteredAndSortedUMKM = useMemo(() => {
    console.log('🔎 Filtering UMKM...');
    console.log('Search query:', searchQuery);
    console.log('Selected category:', selectedCategory);
    console.log('Sort by:', sortBy);
    
    let filtered = processedUMKM.filter(umkm => {
      const matchesSearch = searchQuery === "" || 
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    console.log(`✅ ${filtered.length} UMKM after filtering`);

    // Sort based on selected option
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.calculatedDistance - b.calculatedDistance;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [processedUMKM, searchQuery, selectedCategory, sortBy]);

  const handleViewDetails = (umkm: UMKMWithDistance) => {
    navigate(`/direktori/${umkm.id}`);
  };

  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('📍 Got user location:', longitude, latitude);
          setUserLocation([longitude, latitude]);
          setHasUserLocation(true);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("❌ Error getting location:", error);
          setIsLoadingLocation(false);
          // Keep using default location
        }
      );
    }
  };

  // Try to get user location on mount
  useEffect(() => {
    handleGetUserLocation();
  }, []);

  console.log('🎯 Rendering with', filteredAndSortedUMKM.length, 'UMKM');

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Nearby SMEs' : 'UMKM Terdekat'}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'en' 
                    ? 'Find SMEs around your location' 
                    : 'Temukan UMKM di sekitar lokasi Anda'
                  }
                </p>
              </div>
              
              <Button
                color="primary"
                variant="flat"
                size="sm"
                startContent={<Locate size={16} />}
                onPress={handleGetUserLocation}
                isLoading={isLoadingLocation}
              >
                {isLoadingLocation 
                  ? (language === 'en' ? 'Searching...' : 'Mencari...') 
                  : (language === 'en' ? 'Update Location' : 'Perbarui Lokasi')
                }
              </Button>
            </div>
            
            {/* Location Info */}
            {hasUserLocation && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-green-600 dark:text-green-400" />
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {language === 'en' 
                      ? 'Using your current location' 
                      : 'Menggunakan lokasi Anda saat ini'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder={language === 'en' 
                    ? "Search SMEs, categories, or addresses..." 
                    : "Cari UMKM, kategori, atau alamat..."
                  }
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={<Search size={18} className="text-gray-400" />}
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-10"
                  }}
                  isClearable
                  onClear={() => setSearchQuery("")}
                />
              </div>

              {/* Category Filter */}
              <div className="w-full sm:w-48">
                <Select
                  placeholder={language === 'en' ? 'Select Category' : 'Pilih Kategori'}
                  selectedKeys={[selectedCategory]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setSelectedCategory(selected);
                  }}
                  classNames={{
                    trigger: "h-10"
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem key={category}>
                      {category}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Sort */}
              <div className="w-full sm:w-48">
                <Select
                  placeholder={language === 'en' ? 'Sort By' : 'Urutkan'}
                  selectedKeys={[sortBy]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setSortBy(selected);
                  }}
                  classNames={{
                    trigger: "h-10"
                  }}
                >
                  {sortOptions.map((option) => (
                    <SelectItem key={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'en' 
                  ? `${filteredAndSortedUMKM.length} SMEs Found` 
                  : `${filteredAndSortedUMKM.length} UMKM Ditemukan`
                }
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? `Sorted by ${sortOptions.find(opt => opt.key === sortBy)?.label.toLowerCase()}` 
                  : `Diurutkan berdasarkan ${sortOptions.find(opt => opt.key === sortBy)?.label.toLowerCase()}`
                }
              </p>
            </div>
          </div>

          {/* UMKM List */}
          {filteredAndSortedUMKM.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'No SMEs Found' : 'Tidak Ada UMKM Ditemukan'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {language === 'en' 
                  ? 'Try changing your search keywords or selected filters' 
                  : 'Coba ubah filter atau kata kunci pencarian Anda'
                }
              </p>
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  setSearchQuery("");
                  setSelectedCategory("Semua");
                }}
              >
                {language === 'en' ? 'Reset Filter' : 'Reset Filter'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedUMKM.map((umkm) => (
                  <UMKMCard
                    key={umkm.id}
                    umkm={umkm}
                    onViewDetails={() => handleViewDetails(umkm)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}