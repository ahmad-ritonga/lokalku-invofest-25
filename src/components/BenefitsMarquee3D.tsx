import { 
  ShieldCheckIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";
import { useLanguage } from "@/contexts/LanguageContext";

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
}

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  return (
    <div
      className={cn(
        "relative h-auto w-64 sm:w-72 lg:w-80 cursor-pointer overflow-hidden rounded-3xl",
        "bg-white/95 dark:bg-gray-800/95",
        "backdrop-blur-xl",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]",
        "dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
        "hover:shadow-[0_20px_60px_0_rgba(0,0,0,0.25)]",
        "dark:hover:shadow-[0_20px_60px_0_rgba(0,0,0,0.7)]",
        "hover:scale-[1.05] hover:-translate-y-2",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "group/card",
        "border border-gray-100/50 dark:border-gray-700/50",
        "will-change-transform"
      )}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="relative p-6 sm:p-8 z-10">
        {/* Icon with floating effect */}
        <div className={cn(
          "w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-2xl p-3 sm:p-4",
          "transition-transform duration-500 ease-out",
          "group-hover/card:scale-110 group-hover/card:-rotate-6",
          "shadow-xl group-hover/card:shadow-2xl",
          `bg-gradient-to-br ${benefit.gradient}`
        )}>
          <benefit.icon className="w-full h-full text-white drop-shadow-lg" />
        </div>

        {/* Content */}
        <h3 className={cn(
          "text-lg sm:text-xl font-bold font-display mb-2 sm:mb-3",
          "text-gray-900 dark:text-white",
          "group-hover/card:scale-[1.02] transition-transform duration-300"
        )}>
          {benefit.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-medium line-clamp-3">
          {benefit.description}
        </p>
      </div>

      {/* Decorative gradient orb - lebih subtle */}
      <div 
        className={cn(
          "absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20",
          "group-hover/card:opacity-40 transition-opacity duration-500",
          `bg-gradient-to-br ${benefit.gradient}`
        )}
      />
    </div>
  );
};

export default function BenefitsMarquee3D() {
  const { t } = useLanguage();
  
  const benefits: Benefit[] = [
    {
      icon: ShieldCheckIcon,
      title: t("whyChoose.features.verified.title"),
      description: t("whyChoose.features.verified.description"),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      icon: MapPinIcon,
      title: t("whyChoose.features.location.title"),
      description: t("whyChoose.features.location.description"),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: StarIcon,
      title: t("whyChoose.features.reviews.title"),
      description: t("whyChoose.features.reviews.description"),
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
      icon: ClockIcon,
      title: t("whyChoose.features.realtime.title"),
      description: t("whyChoose.features.realtime.description"),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      icon: UserGroupIcon,
      title: t("whyChoose.features.community.title"),
      description: t("whyChoose.features.community.description"),
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
    },
    {
      icon: HeartIcon,
      title: t("whyChoose.features.support.title"),
      description: t("whyChoose.features.support.description"),
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
    }
  ];

  const firstCol = benefits.slice(0, 2);
  const secondCol = benefits.slice(2, 4);
  const thirdCol = benefits.slice(4, 6);

  return (
    <>
      {/* Mobile: Horizontal Marquee */}
      <div className="block lg:hidden relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/30 via-white/50 to-blue-50/30 dark:from-gray-900/30 dark:via-gray-800/50 dark:to-gray-900/30 py-8">
        <Marquee repeat={3} className="[--duration:35s] [--gap:1.5rem]">
          {benefits.map((benefit, idx) => (
            <BenefitCard key={`mobile-${idx}`} benefit={benefit} />
          ))}
        </Marquee>
        
        {/* Mobile Gradient Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/90 dark:from-gray-900/90 to-transparent transition-colors duration-0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/90 dark:from-gray-900/90 to-transparent transition-colors duration-0" />
      </div>

      {/* Desktop: 3D Vertical Marquee */}
      <div className="hidden lg:flex relative h-[600px] w-full flex-row items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/30 via-white/50 to-blue-50/30 dark:from-gray-900/30 dark:via-gray-800/50 dark:to-gray-900/30 [perspective:1200px] will-change-transform">
        <div
          className="flex flex-row items-center gap-8"
          style={{
            transform:
              "translateX(-60px) translateY(20px) translateZ(-180px) rotateX(25deg) rotateY(-15deg) rotateZ(8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <Marquee vertical repeat={4} className="[--duration:30s] [--gap:2rem]">
            {firstCol.map((benefit, idx) => (
              <BenefitCard key={`col1-${idx}`} benefit={benefit} />
            ))}
          </Marquee>
          
          <Marquee reverse vertical repeat={4} className="[--duration:35s] [--gap:2rem]">
            {secondCol.map((benefit, idx) => (
              <BenefitCard key={`col2-${idx}`} benefit={benefit} />
            ))}
          </Marquee>
          
          <Marquee vertical repeat={4} className="[--duration:28s] [--gap:2rem]">
            {thirdCol.map((benefit, idx) => (
              <BenefitCard key={`col3-${idx}`} benefit={benefit} />
            ))}
          </Marquee>
        </div>
        
        {/* Desktop Gradient Overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/90 dark:from-gray-900/90 to-transparent transition-colors duration-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 dark:from-gray-900/90 to-transparent transition-colors duration-0" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/70 dark:from-gray-900/70 to-transparent transition-colors duration-0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/70 dark:from-gray-900/70 to-transparent transition-colors duration-0" />
      </div>
    </>
  );
}
