import { Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

// Critical pages - loaded immediately
import IndexPage from "@/pages/index";
import NotFound from "@/pages/NotFound";

// Non-critical pages - lazy loaded
const DocsPage = lazy(() => import("@/pages/docs"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const BlogPage = lazy(() => import("@/pages/blog"));
const AboutPage = lazy(() => import("@/pages/about"));
const DirectoryPage = lazy(() => import("@/pages/directory"));
const DirectoryCategoriesPage = lazy(() => import("@/pages/directory-categories"));
const DirectoryLatestPage = lazy(() => import("@/pages/directory-latest"));
const DetailPage = lazy(() => import("@/pages/detail"));
const FavoritesPage = lazy(() => import("@/pages/favorites"));
const MapPage = lazy(() => import("@/pages/map"));
const MapNearbyPage = lazy(() => import("@/pages/map-nearby"));
const FAQPage = lazy(() => import("@/pages/faq"));
const TermsPage = lazy(() => import("@/pages/syarat"));
const PrivacyPage = lazy(() => import("@/pages/privasi"));

// Lazy load chat widget for non-map pages
const ChatWidget = lazy(() => import("@/components/chat/ChatWidget"));

import { PageLoader } from "@/components/ui/loader";
import { usePageLoader } from "@/hooks/usePageLoader";

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const location = useLocation();
  const { isLoading } = usePageLoader();
  const isMapPage = location.pathname === "/peta";

  return (
    <>
      {/* Page Loader */}
      <AnimatePresence>
        {isLoading && <PageLoader />}
      </AnimatePresence>

      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <DocsPage />
          </Suspense>
        } path="/docs" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <PricingPage />
          </Suspense>
        } path="/pricing" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <BlogPage />
          </Suspense>
        } path="/blog" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <AboutPage />
          </Suspense>
        } path="/about" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <DirectoryPage />
          </Suspense>
        } path="/direktori" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <DirectoryCategoriesPage />
          </Suspense>
        } path="/direktori/kategori" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <DirectoryLatestPage />
          </Suspense>
        } path="/direktori/terbaru" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <FavoritesPage />
          </Suspense>
        } path="/favorit" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <DetailPage />
          </Suspense>
        } path="/detail/:category/:slug" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <MapPage />
          </Suspense>
        } path="/peta" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <MapNearbyPage />
          </Suspense>
        } path="/peta/terdekat" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <FAQPage />
          </Suspense>
        } path="/faq" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <TermsPage />
          </Suspense>
        } path="/syarat" />
        <Route element={
          <Suspense fallback={<PageLoadingFallback />}>
            <PrivacyPage />
          </Suspense>
        } path="/privasi" />
        <Route element={<NotFound />} path="*" />
      </Routes>

      {/* Chat Widget - Only load on non-map pages */}
      {!isMapPage && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
      
      {/* Vercel Analytics */}
      <Analytics />
    </>
  );
}

export default App;
