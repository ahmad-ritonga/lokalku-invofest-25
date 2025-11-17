import DefaultLayout from "@/layouts/default";
import HeroSection from "@/components/hero-section";
import FeaturedUMKMSection from "@/components/featured-umkm-section";
import CategoriesSection from "@/components/categories-section";
import WhyChooseSection from "@/components/why-choose-section";
import Footer from "@/components/footer";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <HeroSection />
      <FeaturedUMKMSection />
      <CategoriesSection />
      <WhyChooseSection />
      <Footer />
    </DefaultLayout>
  );
}
