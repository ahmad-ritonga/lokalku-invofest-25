import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Cake, 
  Wrench,
  ChevronRight,
  Heart,
  Monitor,
  Truck,
  GraduationCap,
  Store
} from "lucide-react";
import LazySection from "./LazySection";
import { useLanguage } from "../contexts/LanguageContext";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { categories, getUMKMByCategory } from "@/data/umkm-data";

export default function CategoriesSection() {
  const { t } = useLanguage();
  
  // Get categories from centralized data and add UI-specific properties
  const categoriesData = categories;
  const categoryItems = [
    {
      id: 1,
      name: t("categories.items.food.name"),
      count: getUMKMByCategory(categoriesData[0]).length,
      icon: Cake,
      description: t("categories.items.food.description"),
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      image: "https://i.pinimg.com/736x/4e/79/6c/4e796c5b6d568c9c0426d175ec2a120c.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 2,
      name: t("categories.items.fashion.name"),
      count: getUMKMByCategory(categoriesData[1]).length,
      icon: ShoppingBag,
      description: t("categories.items.fashion.description"),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      image: "https://i.pinimg.com/1200x/15/09/be/1509bef8db025bc59797be9648989a1c.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 3,
      name: t("categories.items.services.name"),
      count: getUMKMByCategory(categoriesData[2]).length,
      icon: Wrench,
      description: t("categories.items.services.description"),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      image: "https://i.pinimg.com/736x/2d/d3/79/2dd379968693700ec12af8f1974b491e.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 4,
      name: t("categories.items.health.name"),
      count: getUMKMByCategory(categoriesData[3]).length,
      icon: Heart,
      description: t("categories.items.health.description"),
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
      image: "https://i.pinimg.com/736x/17/f4/5d/17f45db9cd9938c75370719e5d96df27.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 5,
      name: t("categories.items.technology.name"),
      count: getUMKMByCategory(categoriesData[4]).length,
      icon: Monitor,
      description: t("categories.items.technology.description"),
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
      image: "https://i.pinimg.com/736x/c8/7d/c7/c87dc716059603feb54ba4c3d1fe7e57.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 6,
      name: t("categories.items.transportation.name"),
      count: getUMKMByCategory(categoriesData[5]).length,
      icon: Truck,
      description: t("categories.items.transportation.description"),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      image: "https://i.pinimg.com/1200x/64/ac/75/64ac757a814b7c07d8e8189696448bf0.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 7,
      name: t("categories.items.education.name"),
      count: getUMKMByCategory(categoriesData[6]).length,
      icon: GraduationCap,
      description: t("categories.items.education.description"),
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
      image: "https://i.pinimg.com/736x/d4/19/13/d41913a1f61c46ada0920df5b047e5ef.jpg",
      imageCredit: "Image from Pinterest"
    },
    {
      id: 8,
      name: t("categories.items.retail.name"),
      count: getUMKMByCategory(categoriesData[7]).length,
      icon: Store,
      description: t("categories.items.retail.description"),
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
      image: "https://i.pinimg.com/1200x/b9/c2/b2/b9c2b2b2faf76e3d86c0bbe7a5622d2a.jpg",
      imageCredit: "Image from Pinterest"
    }
  ];

  return (
    <LazySection 
      animationType="slideLeft" 
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50/30 via-white to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 dark:text-white mb-4">
            {t("categories.title")}{" "}
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              {t("categories.subtitle")}
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-primary-700 dark:text-primary-300" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              ꦗꦼꦭꦗꦲꦶ ꦏꦠꦼꦒꦺꦴꦂꦶ
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("categories.description")}
          </p>
        </div>

        {/* Bento Grid Categories */}
        <BentoGrid className="mb-12">
          {categoryItems.map((category, i) => (
            <BentoGridItem
              key={category.id}
              title={category.name}
              description={`${category.description} - ${category.count} ${t("categories.umkmLabel")}`}
              header={
                <div className="relative w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20`} />
                  <div className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                    {category.imageCredit}
                  </div>
                </div>
              }
              icon={<category.icon className="h-4 w-4 text-neutral-500" />}
              className={
                i === 0 || i === 1 ? "md:col-span-2" : // Baris pertama: 2 item besar
                i === 6 || i === 7 ? "md:col-span-2" : // Baris terakhir: 2 item besar
                ""
              }
            />
          ))}
        </BentoGrid>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            as={Link}
            to="/direktori"
            className="bg-gradient-to-r from-primary-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-8"
            endContent={<ChevronRight className="w-4 h-4" />}
          >
            {t("categories.viewAll")}
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-[0.02]">
            <div className="w-48 sm:w-96 h-48 sm:h-96 bg-gradient-conic from-primary-200 via-secondary-200 to-primary-200 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </LazySection>
  );
}