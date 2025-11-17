// UMKM Card Component for Chat
import { MapPin, Star, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import type { UMKMCard as UMKMCardType } from "@/types/chat.types";

interface UMKMCardProps {
  card: UMKMCardType;
}

export const UMKMCard = ({ card }: UMKMCardProps) => {
  // Create proper slug format for routing
  const categorySlug = card.category?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || 'umkm';
  const nameSlug = card.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const detailUrl = `/detail/${categorySlug}/${nameSlug}-${card.id}`;
  // Early return if card is undefined or invalid
  if (!card || !card.id) {
    console.warn("Invalid UMKM card data:", card);
    return null;
  }

  // Format price range
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

  // Default values for optional fields
  const image = card.image || "/assets/images/placeholder-umkm.svg";
  const rating = card.rating || 0;
  const distance = card.distance || null;
  const priceRange = card.priceRange || undefined;
  const category = card.category || "UMKM";
  const location = card.location || "Banyumas";

  return (
    <Link
      to={detailUrl}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 group"
    >
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={image}
            alt={card.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback image if load fails
              e.currentTarget.src = "/assets/images/placeholder-umkm.svg";
            }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-1 left-1">
            <span className="text-[9px] px-2 py-0.5 bg-primary-600/90 text-white rounded-full font-medium backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {card.name}
          </h4>

          {/* Rating & Location */}
          <div className="flex items-center gap-3 mb-1.5">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                {location}
              </span>
            </div>
          </div>

          {/* Distance & Price */}
          <div className="flex items-center gap-3">
            {distance && (
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {distance}
              </span>
            )}
            
            {priceRange && (
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {formatPriceRange(priceRange)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-500 transition-colors">
            <Navigation size={14} className="text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};