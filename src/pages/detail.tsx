import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Phone,
  Clock,
  CreditCard,
  Globe,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
  X as XIcon,
  Eye,
  Instagram,
  Facebook,
  Mail,
  Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import DefaultLayout from "@/layouts/default";
import { UMKMDetail, Product, umkmDatabase } from "@/data/umkm-data";

// Product Modal Component
function ProductModal({ 
  product, 
  umkm,
  isOpen, 
  onClose 
}: { 
  product: Product | null;
  umkm: UMKMDetail | null;
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-playfair">{product.name}</h3>
          <p className="text-primary-600 font-semibold text-lg">{product.price}</p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
            </div>

            {product.ingredients && (
              <div>
                <h4 className="font-semibold mb-2">Komposisi / Bahan</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Kategori:</strong> {product.category}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Tutup
          </Button>
          <Button 
            color="success"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            onPress={() => {
              if (umkm?.whatsapp) {
                const message = `Halo, saya tertarik dengan ${product.name} (${product.price})`;
                window.open(`https://wa.me/${umkm.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
              }
              onClose();
            }}
          >
            Pesan Sekarang
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function DetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const [umkm, setUmkm] = useState<UMKMDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (slug) {
      const match = slug.match(/-(\d+)$/);
      const extractedId = match ? match[1] : null;
      
      if (extractedId && umkmDatabase[extractedId]) {
      const data = umkmDatabase[extractedId];
        setUmkm(data);
      } else {
        setUmkm(null);
      }
    }
  }, [category, slug]);

  // Share functionality
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.log('Error copying link:', error);
    }
  };

  const handleShareToSocial = (platform: string) => {
    if (!umkm) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Lihat ${umkm.name} - ${umkm.description.substring(0, 100)}...`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we'll copy the link
        handleCopyLink();
        alert('Link telah disalin! Buka Instagram dan paste link di story atau post Anda.');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCall = () => {
    if (umkm?.phone) {
      window.location.href = `tel:${umkm.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (umkm?.whatsapp) {
      const message = `Halo, saya tertarik dengan ${umkm.name}`;
      window.open(`https://wa.me/${umkm.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleDirections = () => {
    if (umkm?.coordinates) {
      const { lat, lng } = umkm.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  if (!umkm) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">UMKM Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-4">UMKM yang Anda cari tidak tersedia</p>
            <Button color="primary" onPress={() => navigate('/direktori')}>
              Kembali ke Direktori
            </Button>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Toast Notification for Link Copied */}
        <AnimatePresence>
          {linkCopied && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] px-4 py-3 bg-green-600 text-white rounded-lg shadow-lg flex items-center gap-2"
            >
              <LinkIcon size={18} />
              <span className="font-medium">Link berhasil disalin!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumbs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Beranda
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <Link to="/direktori" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Direktori
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-900 dark:text-white font-medium truncate">{umkm.name}</span>
            </nav>
          </div>
        </div>

        {/* Header with Back Button */}
        <div className="sticky top-16 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button
                isIconOnly
                variant="light"
                onPress={() => navigate(-1)}
              >
                <ArrowLeft size={20} />
              </Button>
              
              <div className="flex items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                    >
                      <Share2 size={20} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Share options">
                    <DropdownItem
                      key="copy"
                      startContent={<LinkIcon size={16} />}
                      onPress={handleCopyLink}
                    >
                      Salin Link
                    </DropdownItem>
                    <DropdownItem
                      key="facebook"
                      startContent={<Facebook size={16} />}
                      onPress={() => handleShareToSocial('facebook')}
                    >
                      Bagikan ke Facebook
                    </DropdownItem>
                    <DropdownItem
                      key="twitter"
                      startContent={<XIcon size={16} />}
                      onPress={() => handleShareToSocial('twitter')}
                    >
                      Bagikan ke X
                    </DropdownItem>
                    <DropdownItem
                      key="instagram"
                      startContent={<Instagram size={16} />}
                      onPress={() => handleShareToSocial('instagram')}
                    >
                      Bagikan ke Instagram
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button
                  isIconOnly
                  variant="light"
                  color={isFavorite ? "danger" : "default"}
                  onPress={() => setIsFavorite(!isFavorite)}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            className="aspect-video max-h-[500px]"
          >
            {umkm.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${umkm.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-2">
                      {umkm.name}
                    </h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{umkm.rating}</span>
                        <span className="text-gray-500">({umkm.reviewCount} ulasan)</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{umkm.category}</span>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    umkm.status === 'open' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {umkm.status === 'open' ? 'Buka' : 'Tutup'}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {umkm.description}
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={16} />
                  <span>
                    {umkm.status === 'open' ? 'Tutup' : 'Buka'} pukul {umkm.nextStatusChange}
                  </span>
                </div>
              </div>

              {/* Products/Menu */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-playfair font-bold mb-4">
                  {umkm.category.includes('Salon') || umkm.category.includes('Kecantikan') 
                    ? 'Layanan Kami' 
                    : umkm.category.includes('Fashion') || umkm.category.includes('Batik')
                    ? 'Produk Kami'
                    : 'Menu'}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {umkm.products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                          <Eye size={14} />
                          <span>Lihat</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <p className="text-primary-600 dark:text-primary-400 font-semibold">
                          {product.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Services */}
              {umkm.services && umkm.services.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-playfair font-bold mb-4">Layanan</h2>
                  <div className="flex flex-wrap gap-2">
                    {umkm.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Operating Hours */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-playfair font-bold mb-4">Jam Operasional</h2>
                <div className="space-y-3">
                  {Object.entries(umkm.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="capitalize text-gray-600 dark:text-gray-300">
                        {day === 'monday' ? 'Senin' : 
                         day === 'tuesday' ? 'Selasa' :
                         day === 'wednesday' ? 'Rabu' :
                         day === 'thursday' ? 'Kamis' :
                         day === 'friday' ? 'Jumat' :
                         day === 'saturday' ? 'Sabtu' : 'Minggu'}
                      </span>
                      <span className="font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Info */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-playfair font-bold mb-4">Hubungi Kami</h2>
                
                <div className="space-y-3">
                  <Button
                    color="primary"
                    className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold"
                    startContent={<MapPin size={18} />}
                    onPress={handleDirections}
                  >
                    Petunjuk Arah
                  </Button>
                  
                  <Button
                    color="success"
                    className="w-full text-white"
                    startContent={<MessageCircle size={18} />}
                    onPress={handleWhatsApp}
                  >
                    WhatsApp
                  </Button>
                  
                  <Button
                    variant="bordered"
                    className="w-full"
                    startContent={<Phone size={18} />}
                    onPress={handleCall}
                  >
                    Telepon
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Alamat</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{umkm.address}</p>
                      <p className="text-sm text-gray-500 mt-1">{umkm.distance} dari lokasi Anda</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Telepon</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{umkm.phone}</p>
                    </div>
                  </div>

                  {/* Social Media & Copy Link */}
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium mb-2">Media Sosial </p>
                      <div className="flex flex-wrap gap-2">
                        {umkm.instagram && (
                          <a
                            href={`https://instagram.com/${umkm.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-80 transition"
                            title="Instagram"
                          >
                            <Instagram size={18} />
                          </a>
                        )}
                        {umkm.facebook && (
                          <a
                            href={`https://facebook.com/${umkm.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-600 text-white rounded-lg hover:opacity-80 transition"
                            title="Facebook"
                          >
                            <Facebook size={18} />
                          </a>
                        )}
                        {umkm.twitter && (
                          <a
                            href={`https://x.com/${umkm.twitter.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black text-white rounded-lg hover:opacity-80 transition"
                            title="Twitter/X"
                          >
                            <XIcon size={18} />
                          </a>
                        )}
                        {umkm.email && (
                          <a
                            href={`mailto:${umkm.email}`}
                            className="p-2 bg-gray-600 text-white rounded-lg hover:opacity-80 transition"
                            title="Email"
                          >
                            <Mail size={18} />
                          </a>
                        )}
                        
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Kisaran Harga</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{umkm.priceRange}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-playfair font-bold mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 gap-3">
                  {umkm.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary-600 rounded-full" />
                      <span className="text-gray-700 dark:text-gray-300">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-playfair font-bold mb-4">Metode Pembayaran</h2>
                <div className="flex flex-wrap gap-2">
                  {umkm.payments.map((payment, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {payment}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Detail Modal */}
        <ProductModal
          product={selectedProduct}
          umkm={umkm}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </DefaultLayout>
  );
}