import React, { useState, useMemo } from "react";
import { 
  Button, 
  Chip
} from "@heroui/react";
import { 
  Search, 
  Grid3X3, 
  List, 
  Store, 
  Utensils, 
  Shirt, 
  Heart, 
  Car, 
  ChevronRight,
  ArrowRight,
  LucideIcon,
  Layers,
  ShoppingBag
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import LazySection from "@/components/LazySection";
import LazyImage from "@/components/LazyImage";
import DefaultLayout from "@/layouts/default";
import { getUMKMByCategory } from "@/data/umkm-data";

interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
  count: number;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  image: string;
}

export default function DirectoryCategoriesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Create detailed categories with counts from centralized data
  const categories: Category[] = [
    {
      id: "kuliner",
      name: "Kuliner",
      nameEn: "Culinary",
      description: "Makanan dan minuman lokal khas Banyumas",
      descriptionEn: "Local food and beverages from Banyumas",
      icon: Utensils,
      count: getUMKMByCategory("Makanan & Minuman").length,
      color: "warning",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop"
    },
    {
      id: "fashion",
      name: "Fashion",
      nameEn: "Fashion",
      description: "Pakaian, batik, dan aksesoris tradisional",
      descriptionEn: "Clothing, batik, and traditional accessories",
      icon: Shirt,
      count: getUMKMByCategory("Fashion").length,
      color: "secondary",
      image: "https://images.unsplash.com/photo-1610003524635-5fe4c7e11b32?w=800&h=600&fit=crop"
    },
    {
      id: "kafe-resto",
      name: "Kafe & Resto",
      nameEn: "Cafe & Restaurant",
      description: "Kafe dan restoran dengan suasana nyaman",
      descriptionEn: "Cafes and restaurants with cozy atmosphere",
      icon: Store,
      count: getUMKMByCategory("Kafe & Resto").length,
      color: "primary",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop"
    },
    {
      id: "kecantikan",
      name: "Kesehatan & Kecantikan",
      nameEn: "Health & Beauty",
      description: "Produk kesehatan dan layanan kecantikan",
      descriptionEn: "Health products and beauty services",
      icon: Heart,
      count: getUMKMByCategory("Kecantikan").length,
      color: "danger",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop"
    },
    {
      id: "otomotif",
      name: "Otomotif & Jasa",
      nameEn: "Automotive & Services",
      description: "Layanan dan produk kendaraan bermotor",
      descriptionEn: "Automotive services and products",
      icon: Car,
      count: getUMKMByCategory("Otomotif & Jasa").length,
      color: "default",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop"
    },
    {
      id: "retail",
      name: "Retail",
      nameEn: "Retail",
      description: "Toko kelontong, minimarket, dan warung sembako",
      descriptionEn: "Grocery stores, minimarkets, and convenience stores",
      icon: ShoppingBag,
      count: getUMKMByCategory("Retail").length,
      color: "success",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    }
  ];

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    
    return categories.filter(category => {
      const name = language === 'en' ? category.nameEn : category.name;
      const description = language === 'en' ? category.descriptionEn : category.description;
      return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [categories, searchQuery, language]);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/direktori?kategori=${categoryId}`);
  };

  const placeholders = [
    language === 'en' ? "Search categories..." : "Cari kategori...",
    language === 'en' ? "Find your business type..." : "Temukan jenis usaha...",
    language === 'en' ? "Explore categories..." : "Jelajahi kategori...",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Calculate total UMKM count
  const totalUMKM = categories.reduce((sum, cat) => sum + cat.count, 0);

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
                {language === 'en' ? 'Categories' : 'Kategori'}
              </span>
            </nav>

            {/* Page Title with Icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Layers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'UMKM Categories' : 'Kategori UMKM'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {language === 'en' 
                    ? `Explore ${filteredCategories.length} categories with ${totalUMKM} local businesses` 
                    : `Jelajahi ${filteredCategories.length} kategori dengan ${totalUMKM} usaha lokal`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and View Toggle Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Input - Extended width */}
              <div className="flex-1 max-w-none">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg p-1 flex-shrink-0">
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? `${filteredCategories.length} categories available`
                : `${filteredCategories.length} kategori tersedia`}
            </p>
          </div>

          {/* Categories Grid/List */}
          {filteredCategories.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
              : "grid grid-cols-1 gap-4"
            }>
              {filteredCategories.map((category, index) => {
                const IconComponent = category.icon;
                const name = language === 'en' ? category.nameEn : category.name;
                const description = language === 'en' ? category.descriptionEn : category.description;
                
                return (
                  <LazySection
                    key={category.id}
                    animationType="slideUp"
                    delay={index * 0.05}
                    className="h-full"
                  >
                    <div
                      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col group ${
                        viewMode === "list" ? "!flex-row gap-4 p-4" : ""
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {/* Image with Icon Overlay */}
                      <div className={`relative flex-shrink-0 ${
                        viewMode === "list" ? "w-48 h-32" : "w-full aspect-[16/10]"
                      }`}>
                        <LazyImage
                          src={category.image}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Icon Overlay with Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center group-hover:from-black/80 group-hover:via-black/50 transition-all">
                          <div className="bg-white/95 dark:bg-gray-800/95 rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform shadow-lg">
                            <IconComponent size={viewMode === "list" ? 24 : 28} className="text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>

                        {/* Count Badge */}
                        <div className="absolute top-2 right-2">
                          <Chip 
                            color={category.color} 
                            variant="solid" 
                            size="sm"
                            className="text-white font-semibold shadow-md"
                          >
                            {category.count}
                          </Chip>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex flex-col flex-1 ${viewMode === "list" ? "" : "p-4"}`}>
                        <h3 className="font-playfair text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                          {name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-2 flex-grow">
                          {description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <Chip 
                            color={category.color} 
                            variant="flat" 
                            size="sm"
                            className="font-medium"
                          >
                            {category.count} {language === 'en' ? 'businesses' : 'usaha'}
                          </Chip>
                          
                          {viewMode === "list" && (
                            <ArrowRight size={20} className="text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </LazySection>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'No categories found' : 'Kategori tidak ditemukan'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === 'en' 
                    ? 'Try adjusting your search terms to find what you\'re looking for.' 
                    : 'Coba sesuaikan kata kunci pencarian untuk menemukan yang Anda cari.'}
                </p>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8 text-center">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {language === 'en' 
                ? 'Can\'t find what you\'re looking for?' 
                : 'Tidak menemukan yang Anda cari?'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Browse all businesses in our directory or use the search feature to find specific UMKM.' 
                : 'Jelajahi semua usaha di direktori kami atau gunakan fitur pencarian untuk menemukan UMKM spesifik.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                color="primary"
                size="lg"
                onPress={() => navigate('/direktori')}
                endContent={<ArrowRight size={18} />}
              >
                {language === 'en' ? 'Browse All UMKM' : 'Jelajahi Semua UMKM'}
              </Button>
              <Button
                variant="bordered"
                size="lg"
                onPress={() => navigate('/direktori/terbaru')}
              >
                {language === 'en' ? 'View Latest' : 'Lihat Terbaru'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}