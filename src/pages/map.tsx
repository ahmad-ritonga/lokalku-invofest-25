import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  Button,
  Input,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Spinner
} from "@heroui/react";
import {
  Navigation,
  Phone,
  Star,
  MapPin,
  Search,
  Filter,
  X,
  Eye,
  Locate,
  List,
  Clock,
  Layers,
  Mountain,
  Satellite,
  Map as MapIcon,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/navbar";
import { getUMKMForMap, categories } from "@/data/umkm-data";

// Type untuk UMKM dengan koordinat dalam format [lng, lat]
interface UMKMForMap {
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
  coordinates: [number, number]; // [lng, lat]
  phone?: string;
  address: string;
}

// Google Maps API Key & Map ID
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "your_google_maps_api_key_here";
const GOOGLE_MAPS_MAP_ID = "7ae59d30616b9f915b176e75";

// Purwokerto city center coordinates
const PURWOKERTO_CENTER = { 
  lat: -7.421389,
  lng: 109.234439
};

// Banyumas region bounds
const BANYUMAS_BOUNDS = {
  north: -7.2514,
  south: -7.6194,
  east: 109.4542,
  west: 108.6547
};

// Google Maps Component
interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers: UMKMForMap[];
  onMarkerClick: (umkm: UMKMForMap) => void;
  userLocation?: [number, number];
  mapType: string;
  is3DEnabled: boolean;
  isDarkMode: boolean;
}

// Map type options
const mapTypes = [
  { key: "roadmap", label: "Peta", icon: MapIcon },
  { key: "satellite", label: "Satelit", icon: Satellite },
  { key: "hybrid", label: "Hybrid", icon: Layers },
  { key: "terrain", label: "Terrain", icon: Mountain }
];

// Google Maps dark mode styles
const darkModeStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

function GoogleMapComponent({ center, zoom, markers, onMarkerClick, userLocation, mapType, is3DEnabled, isDarkMode }: GoogleMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markersArray, setMarkersArray] = useState<google.maps.Marker[]>([]);
  const [hoveredUMKM, setHoveredUMKM] = useState<UMKMForMap | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const boundaryPolygonRef = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapId: GOOGLE_MAPS_MAP_ID,
        mapTypeId: "roadmap",
        restriction: {
          latLngBounds: BANYUMAS_BOUNDS,
          strictBounds: false,
        },
        minZoom: 10,
        maxZoom: 20,
        tilt: 0,
        heading: 0,
        gestureHandling: 'greedy',
        isFractionalZoomEnabled: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        rotateControl: false,
        rotateControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        styles: isDarkMode ? darkModeStyles : []
      });

      // Add Banyumas boundary polygon
      const banyumasBoundary = new google.maps.Polygon({
        paths: [
          { lat: BANYUMAS_BOUNDS.north, lng: BANYUMAS_BOUNDS.west },
          { lat: BANYUMAS_BOUNDS.north, lng: BANYUMAS_BOUNDS.east },
          { lat: BANYUMAS_BOUNDS.south, lng: BANYUMAS_BOUNDS.east },
          { lat: BANYUMAS_BOUNDS.south, lng: BANYUMAS_BOUNDS.west }
        ],
        strokeColor: isDarkMode ? "#f97316" : "#FF6B35",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: isDarkMode ? "#f97316" : "#FF6B35",
        fillOpacity: isDarkMode ? 0.15 : 0.1
      });
      banyumasBoundary.setMap(newMap);
      boundaryPolygonRef.current = banyumasBoundary;

      setMap(newMap);
    }
  }, [center, zoom, isDarkMode]);

  // Apply dark mode styles when theme changes
  useEffect(() => {
    if (map) {
      map.setOptions({
        styles: isDarkMode ? darkModeStyles : []
      });
      
      // Update boundary polygon colors
      if (boundaryPolygonRef.current) {
        boundaryPolygonRef.current.setOptions({
          strokeColor: isDarkMode ? "#f97316" : "#FF6B35",
          fillColor: isDarkMode ? "#f97316" : "#FF6B35",
          fillOpacity: isDarkMode ? 0.15 : 0.1
        });
      }
    }
  }, [map, isDarkMode]);

  // Update map type and reapply dark mode styles
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType as google.maps.MapTypeId);
      map.setOptions({
        styles: isDarkMode ? darkModeStyles : []
      });
    }
  }, [map, mapType, isDarkMode]);

  // Update 3D tilt and rotation controls
  useEffect(() => {
    if (map) {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom() || 15;
      
      if (is3DEnabled) {
        map.moveCamera({
          center: currentCenter,
          zoom: currentZoom < 17 ? 17 : currentZoom,
          tilt: 67.5,
          heading: 45
        });
      } else {
        map.moveCamera({
          center: currentCenter,
          zoom: currentZoom,
          tilt: 0,
          heading: 0
        });
      }
      
      map.setOptions({
        rotateControl: is3DEnabled,
        rotateControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        }
      });
    }
  }, [map, is3DEnabled]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersArray.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Add UMKM markers - coordinates adalah [lng, lat]
    markers.forEach((umkm) => {
      const marker = new google.maps.Marker({
        position: { lat: umkm.coordinates[1], lng: umkm.coordinates[0] },
        map,
        title: umkm.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 16 16 24 16 24s16-8 16-24C32 7.163 24.837 0 16 0z" fill="#ef4444"/>
              <circle cx="16" cy="16" r="8" fill="white"/>
              <path d="M16 10l-2 2h1v4h2v-4h1l-2-2z" fill="#ef4444"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 40),
          anchor: new google.maps.Point(16, 40),
        },
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        onMarkerClick(umkm);
      });

      marker.addListener('mouseover', (event: google.maps.MapMouseEvent) => {
        setHoveredUMKM(umkm);
        const domEvent = event.domEvent as MouseEvent | undefined;
        if (domEvent) {
          setHoverPosition({
            x: domEvent.clientX,
            y: domEvent.clientY
          });
        }
      });

      marker.addListener('mouseout', () => {
        setHoveredUMKM(null);
        setHoverPosition(null);
      });

      newMarkers.push(marker);
    });

    // Add user location marker if available
    if (userLocation) {
      const userMarker = new google.maps.Marker({
        position: { lat: userLocation[1], lng: userLocation[0] },
        map,
        title: "Lokasi Anda",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        },
      });
      newMarkers.push(userMarker);
    }

    setMarkersArray(newMarkers);

    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers, onMarkerClick, userLocation]);

  // Hover tooltip
  const HoverTooltip = () => {
    if (!hoveredUMKM || !hoverPosition) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: `${hoverPosition.x + 15}px`,
          top: `${hoverPosition.y - 10}px`
        }}
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 max-w-xs">
          <div className="flex items-start gap-3">
            <img
              src={hoveredUMKM.image}
              alt={hoveredUMKM.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                {hoveredUMKM.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Chip size="sm" variant="flat" color="primary" className="text-xs">
                  {hoveredUMKM.category}
                </Chip>
                <Chip
                  size="sm"
                  variant="flat"
                  color={hoveredUMKM.status === "open" ? "success" : "danger"}
                  className="text-xs"
                >
                  {hoveredUMKM.status === "open" ? "Buka" : "Tutup"}
                </Chip>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {hoveredUMKM.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({hoveredUMKM.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div ref={ref} className="w-full h-full" />
      <AnimatePresence>
        {hoveredUMKM && hoverPosition && <HoverTooltip />}
      </AnimatePresence>
    </>
  );
}

// Render function for Google Maps wrapper
const render = (status: Status): React.ReactElement => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat peta...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="w-full h-full flex items-center justify-center bg-red-50 dark:bg-red-900/20">
          <div className="text-center p-6">
            <div className="text-red-500 mb-4 flex justify-center">
              <MapPin size={48} />
            </div>
            <h3 className="font-playfair text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Gagal Memuat Peta
            </h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              Periksa koneksi internet atau API key Google Maps
            </p>
          </div>
        </div>
      );
    default:
      return <div className="w-full h-full" />;
  }
};

interface InfoWindowProps {
  umkm: UMKMForMap;
  onClose: () => void;
  onViewDetails: () => void;
}

function InfoWindow({ umkm, onClose, onViewDetails }: InfoWindowProps) {
  const formatPriceRange = (priceRange?: "$" | "$$" | "$$$") => {
    switch (priceRange) {
      case "$": return "Rp 10.000 - 25.000";
      case "$$": return "Rp 25.000 - 50.000";
      case "$$$": return "Rp 50.000 - 100.000";
      default: return "Harga bervariasi";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-0 shadow-lg max-w-sm">
        <CardBody className="p-0">
          <div className="relative h-32 overflow-hidden">
            <img
              src={umkm.image}
              alt={umkm.name}
              className="w-full h-full object-cover"
            />
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
              onPress={onClose}
            >
              <X size={16} />
            </Button>
            <Chip
              size="sm"
              variant="flat"
              color={umkm.status === "open" ? "success" : "danger"}
              className="absolute bottom-2 left-2"
            >
              <Clock size={12} className="mr-1" />
              {umkm.status === "open" ? "Buka" : "Tutup"}
            </Chip>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {umkm.name}
                </h3>
                <Chip size="sm" variant="flat" color="primary" className="mt-1">
                  {umkm.category}
                </Chip>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{umkm.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({umkm.reviewCount} ulasan)</span>
            </div>

            <div className="flex items-center gap-1 mb-2">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {umkm.location} • {umkm.distance}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {formatPriceRange(umkm.priceRange)}
            </p>

            <div className="flex gap-2">
              {umkm.phone && (
                <Button
                  size="sm"
                  variant="flat"
                  color="success"
                  startContent={<Phone size={14} />}
                  onPress={() => window.open(`tel:${umkm.phone}`, '_self')}
                >
                  Call
                </Button>
              )}
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Navigation size={14} />}
                onPress={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${umkm.coordinates[1]},${umkm.coordinates[0]}`;
                  window.open(url, '_blank');
                }}
              >
                Directions
              </Button>
              <Button
                size="sm"
                color="primary"
                startContent={<Eye size={14} />}
                onPress={onViewDetails}
              >
                Details
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// List Item Component
interface ListItemProps {
  umkm: UMKMForMap;
  onClick: () => void;
  onViewDetails: () => void;
}

function ListItem({ umkm, onClick, onViewDetails }: ListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <img
          src={umkm.image}
          alt={umkm.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-playfair font-semibold text-gray-900 dark:text-white truncate">
              {umkm.name}
            </h4>
            <Chip
              size="sm"
              variant="flat"
              color={umkm.status === "open" ? "success" : "danger"}
            >
              {umkm.status === "open" ? "Buka" : "Tutup"}
            </Chip>
          </div>
          
          <Chip size="sm" variant="flat" color="primary" className="mb-2">
            {umkm.category}
          </Chip>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{umkm.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({umkm.reviewCount})</span>
            <span className="text-xs text-gray-500">• {umkm.distance}</span>
          </div>

          <div className="flex gap-2">
            {umkm.phone && (
              <Button
                size="sm"
                variant="flat"
                color="success"
                startContent={<Phone size={12} />}
                onPress={() => {
                  window.open(`tel:${umkm.phone}`, '_self');
                }}
              >
                Call
              </Button>
            )}
            <Button
              size="sm"
              color="primary"
              startContent={<Eye size={12} />}
              onPress={() => {
                onViewDetails();
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Map Page Component
export default function MapPage() {
  const navigate = useNavigate();
  
  const [viewState, setViewState] = useState({
    longitude: PURWOKERTO_CENTER.lng,
    latitude: PURWOKERTO_CENTER.lat,
    zoom: 14
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedUMKM, setSelectedUMKM] = useState<UMKMForMap | null>(null);
  const [showListView, setShowListView] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMapType, setSelectedMapType] = useState<string>("roadmap");
  const [is3DMode, setIs3DMode] = useState(false);
  
  const mapData = getUMKMForMap();
  const categoryList = categories;
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const filteredUMKM = mapData.filter(umkm => {
    const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         umkm.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMarkerClick = useCallback((umkm: UMKMForMap) => {
    setSelectedUMKM(umkm);
    setViewState(prev => ({
      ...prev,
      longitude: umkm.coordinates[0],
      latitude: umkm.coordinates[1],
      zoom: Math.max(prev.zoom, 15)
    }));
  }, []);

  const getUserLocation = useCallback(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
          setViewState(prev => ({
            ...prev,
            longitude,
            latitude,
            zoom: 16
          }));
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleListItemClick = useCallback((umkm: UMKMForMap) => {
    handleMarkerClick(umkm);
    setShowListView(false);
  }, [handleMarkerClick]);

  const handleViewDetails = useCallback((umkm: UMKMForMap) => {
    navigate(`/detail/${umkm.id}`);
  }, [navigate]);

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  useEffect(() => {
    if (userLocation) {
      mapData.forEach(umkm => {
        const distance = calculateDistance(
          userLocation[1], userLocation[0],
          umkm.coordinates[1], umkm.coordinates[0]
        );
        umkm.distance = `${distance.toFixed(1)} km`;
      });
    }
  }, [userLocation, calculateDistance, mapData]);

  return (
    <>
      <Navbar />
      
      <div className="relative h-screen overflow-hidden">
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
          <GoogleMapComponent
            center={PURWOKERTO_CENTER}
            zoom={viewState.zoom}
            markers={filteredUMKM}
            onMarkerClick={handleMarkerClick}
            userLocation={userLocation || undefined}
            mapType={selectedMapType}
            is3DEnabled={is3DMode}
            isDarkMode={isDarkMode}
          />
        </Wrapper>

      <AnimatePresence>
        {selectedUMKM && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto w-full max-w-sm px-4">
            <InfoWindow
              umkm={selectedUMKM}
              onClose={() => setSelectedUMKM(null)}
              onViewDetails={() => handleViewDetails(selectedUMKM)}
            />
          </div>
        )}
      </AnimatePresence>

      <div className="fixed top-[94px] left-0 right-0 z-[90] px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-xl border-2 border-gray-300 dark:border-gray-600">
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Cari UMKM, kategori, atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search size={18} className="text-gray-500 dark:text-gray-400" />}
                className="flex-1"
                classNames={{
                  input: "bg-transparent text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                  inputWrapper: "bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-gray-600"
                }}
              />
              <Button
                isIconOnly
                variant="solid"
                color="primary"
                onPress={onOpen}
                className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-md"
              >
                <Filter size={18} className="text-white" />
              </Button>
            </div>

            <div className="relative -mx-3 sm:-mx-4">
              <div 
                className="flex gap-2 overflow-x-hidden px-3 sm:px-4 pb-3 flex-wrap"
                style={{ 
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#9ca3af #f3f4f6',
                  WebkitOverflowScrolling: 'touch',
                  msOverflowStyle: 'auto'
                }}
              >
                {categoryList.map((category) => (
                  <Chip
                    key={category}
                    variant={selectedCategory === category ? "solid" : "flat"}
                    color={selectedCategory === category ? "primary" : "default"}
                    className={`cursor-pointer transition-all flex-shrink-0 ${
                      selectedCategory === category
                        ? "bg-primary-600 dark:bg-primary-500 text-white shadow-md scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Chip>
                ))}
                <div className="flex-shrink-0 w-px" />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/95 dark:from-gray-800/95 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-4 z-10 flex flex-col gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              variant="solid"
              className="bg-white dark:bg-gray-800 backdrop-blur-md shadow-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:shadow-xl transition-all"
              startContent={
                React.createElement(
                  mapTypes.find(type => type.key === selectedMapType)?.icon || Layers,
                  { size: 16, className: "text-primary-600 dark:text-primary-400" }
                )
              }
              endContent={<ChevronDown size={14} className="text-gray-600 dark:text-gray-400" />}
            >
              {mapTypes.find(type => type.key === selectedMapType)?.label || "Peta"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Map Type"
            selectedKeys={[selectedMapType]}
            selectionMode="single"
            className="bg-white dark:bg-gray-800"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected) setSelectedMapType(selected as string);
            }}
          >
            {mapTypes.map((type) => (
              <DropdownItem
                key={type.key}
                startContent={<type.icon size={16} />}
                className="text-gray-900 dark:text-white"
              >
                {type.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Button
          size="sm"
          variant={is3DMode ? "solid" : "bordered"}
          color={is3DMode ? "primary" : "default"}
          className={`backdrop-blur-md shadow-lg border-2 font-medium transition-all hover:shadow-xl ${
            is3DMode 
              ? 'bg-primary-600 dark:bg-primary-500 border-primary-600 dark:border-primary-500 text-white' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white'
          }`}
          startContent={<Mountain size={16} />}
          onPress={() => setIs3DMode(!is3DMode)}
        >
          3D {is3DMode ? 'On' : 'Off'}
        </Button>
        
        <Button
          size="sm"
          color="primary"
          variant={showListView ? "solid" : "flat"}
          startContent={<List size={16} />}
          onPress={() => setShowListView(!showListView)}
          className={`backdrop-blur-md shadow-lg ${
            showListView
              ? 'bg-primary-600 dark:bg-primary-500'
              : 'bg-white/95 dark:bg-gray-900/95'
          }`}
        >
          {showListView ? "Sembunyikan" : "Daftar UMKM"}
        </Button>

        <Button
          size="sm"
          isIconOnly
          color="primary"
          variant="flat"
          isLoading={isLoading}
          onPress={getUserLocation}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
        >
          {!isLoading && <Locate size={16} />}
        </Button>
      </div>

      <AnimatePresence>
        {showListView && (
          <>
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="hidden lg:block absolute left-4 top-24 bottom-4 w-96 z-[100] pointer-events-auto"
            >
              <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
                <CardBody className="p-0">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair text-lg font-semibold">
                        UMKM Terdekat ({filteredUMKM.length})
                      </h3>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="z-[110] pointer-events-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        onPress={() => setShowListView(false)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence>
                      {filteredUMKM.map((umkm) => (
                        <ListItem
                          key={umkm.id}
                          umkm={umkm}
                          onClick={() => handleListItemClick(umkm)}
                          onViewDetails={() => handleViewDetails(umkm)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden absolute bottom-0 left-0 right-0 z-[100] max-h-[60vh] pointer-events-auto"
            >
              <Card className="rounded-t-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
                <CardBody className="p-0">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair text-lg font-semibold">
                        UMKM Terdekat ({filteredUMKM.length})
                      </h3>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="z-[110] pointer-events-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        onPress={() => setShowListView(false)}
                      >
                        <ChevronDown size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <AnimatePresence>
                      {filteredUMKM.map((umkm) => (
                        <ListItem
                          key={umkm.id}
                          umkm={umkm}
                          onClick={() => handleListItemClick(umkm)}
                          onViewDetails={() => handleViewDetails(umkm)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="md"
        scrollBehavior="inside"
        placement="center"
        classNames={{
          wrapper: "z-[100]",
          backdrop: "z-[99]",
          base: "bg-white dark:bg-gray-800",
          header: "border-b border-gray-200 dark:border-gray-700 px-5 py-4",
          body: "px-5 py-4",
          footer: "border-t border-gray-200 dark:border-gray-700 px-5 py-3"
        }}
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-playfair font-semibold text-gray-900 dark:text-white">
              Filter & Pengaturan
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Filter Kategori</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Pilih kategori untuk menyaring UMKM
                </p>
                <div className="flex flex-wrap gap-2">
                  {categoryList.map((category) => (
                    <Chip
                      key={category}
                      size="sm"
                      variant={selectedCategory === category ? "solid" : "flat"}
                      color={selectedCategory === category ? "primary" : "default"}
                      className={`cursor-pointer transition-all ${
                        selectedCategory === category
                          ? "bg-primary-600 dark:bg-primary-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-primary-700 dark:text-primary-300">
                      Total UMKM Ditampilkan
                    </p>
                    <p className="text-xl font-bold text-primary-900 dark:text-primary-100">
                      {filteredUMKM.length}
                    </p>
                  </div>
                  <div className="text-3xl">
                    🏪
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex gap-2">
                  <div className="text-xl flex-shrink-0">💡</div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-1.5">Tips Navigasi</h5>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Gunakan tombol <strong>kiri bawah</strong> untuk ubah tampilan peta</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Aktifkan <strong>3D</strong> untuk perspektif tiga dimensi</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Mode 3D: <strong>Shift+Drag</strong> untuk rotate, <strong>Ctrl+Drag</strong> untuk tilt</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Klik marker merah untuk detail UMKM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
    </>
  );
}