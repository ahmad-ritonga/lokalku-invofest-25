// Centralized UMKM Data for LokalKU Application
// This file contains all UMKM data used across the application to ensure consistency

export interface UMKM {
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
  coordinates: { lat: number; lng: number };
  phone?: string;
  address: string;
  tags?: string[];
  isNew?: boolean;
  isTrending?: boolean;
}

export interface UMKMDetail extends UMKM {
  slug: string;
  nextStatusChange: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  twitter?: string;
  images: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  facilities: string[];
  payments: string[];
  products: Product[];
  services?: string[];
  reviews: any[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  ingredients?: string[];
  category: string;
}

// Main UMKM Dataset
export const umkmData: UMKM[] = [
  {
    id: "1",
    name: "Warung Sate Pak Kumis",
    category: "Makanan & Minuman",
    location: "Purwokerto Utara",
    distance: "2.5 km",
    rating: 4.8,
    reviewCount: 124,
    description: "Sate kambing dan ayam dengan bumbu kacang khas Banyumas yang gurih dan lezat",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    coordinates: { lat: -7.4204, lng: 109.2344 },
    phone: "+62812345678",
    address: "Jl. Gatot Subroto No. 45, Purwokerto Utara"
  },
  {
    id: "2",
    name: "Batik Gumelem Asli",
    category: "Fashion",
    location: "Purwokerto Selatan",
    distance: "1.8 km",
    rating: 4.9,
    reviewCount: 89,
    description: "Batik khas Banyumas dengan motif tradisional dan modern berkualitas tinggi",
    image: "https://batikgumelem.com/images/dashboard_banner_image.png",
    status: "open",
    priceRange: "$$$",
    isFavorite: true,
    coordinates: { lat: -7.4298, lng: 109.2411 },
    phone: "+62856789012",
    address: "Jl. Jenderal Sudirman No. 234, Purwokerto Selatan"
  },
  {
    id: "3",
    name: "Getuk Goreng Bu Tini",
    category: "Makanan & Minuman",
    location: "Sokaraja",
    distance: "3.2 km",
    rating: 4.7,
    reviewCount: 156,
    description: "Getuk goreng tradisional dengan berbagai topping dan rasa yang menggugah selera",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
    status: "closed",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4558, lng: 109.2756 },
    phone: "+62878901234",
    address: "Jl. Overste Isdiman No. 89, Sokaraja"
  },
  {
    id: "4",
    name: "Kopi Gunung Slamet",
    category: "Kafe & Resto",
    location: "Purwokerto Barat",
    distance: "4.1 km",
    rating: 4.6,
    reviewCount: 203,
    description: "Kopi arabika premium dari lereng Gunung Slamet dengan cita rasa yang khas",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    coordinates: { lat: -7.4191, lng: 109.2189 },
    isFavorite: false,
    phone: "+62821234567",
    address: "Jl. HR Bunyamin No. 156, Purwokerto Barat"
  },
  {
    id: "5",
    name: "Salon Cantik Ayu",
    category: "Kecantikan",
    location: "Purwokerto Timur",
    distance: "2.9 km",
    rating: 4.5,
    reviewCount: 67,
    description: "Layanan perawatan kecantikan lengkap dengan teknisi berpengalaman",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    coordinates: { lat: -7.4252, lng: 109.2489 },
    phone: "+62813456789",
    address: "Jl. Veteran No. 78, Purwokerto Timur"
  },
  {
    id: "6",
    name: "Mendoan Cokro Kembang",
    category: "Makanan & Minuman",
    location: "Banyumas",
    distance: "5.3 km",
    rating: 4.9,
    reviewCount: 298,
    description: "Mendoan tempe khas Banyumas yang renyah dan gurih dengan sambal kacang",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$",
    isFavorite: true,
    coordinates: { lat: -7.4689, lng: 109.2978 },
    phone: "+62857890123",
    address: "Jl. Raya Banyumas-Purwokerto, Banyumas"
  },
  {
    id: "7",
    name: "Bengkel Motor Jaya Abadi",
    category: "Otomotif & Jasa",
    location: "Purwokerto Selatan",
    distance: "3.7 km",
    rating: 4.4,
    reviewCount: 92,
    description: "Bengkel motor terpercaya dengan teknisi berpengalaman dan spare part original",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    coordinates: { lat: -7.4356, lng: 109.2445 },
    phone: "+62818-7890-1234",
    address: "Jl. Gatot Subroto No. 156, Purwokerto Selatan"
  },
  {
    id: "8",
    name: "Lanting Bu Narti",
    category: "Makanan & Minuman",
    location: "Cilongok",
    distance: "6.2 km",
    rating: 4.7,
    reviewCount: 134,
    description: "Lanting khas Banyumas dengan rasa gurih dan tekstur yang renyah",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4567, lng: 109.1876 },
    phone: "+62819-8901-2345",
    address: "Jl. Raya Cilongok No. 78, Cilongok"
  },
  {
    id: "9",
    name: "Toko Kelontong Sari Rejeki",
    category: "Retail",
    location: "Purwokerto Utara",
    distance: "1.2 km",
    rating: 4.3,
    reviewCount: 45,
    description: "Toko kelontong lengkap dengan berbagai kebutuhan sehari-hari dan harga terjangkau",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4189, lng: 109.2356 },
    phone: "+62821-9876-5432",
    address: "Jl. Ahmad Yani No. 123, Purwokerto Utara"
  },
  {
    id: "10",
    name: "Minimarket Berkah Jaya",
    category: "Retail",
    location: "Purwokerto Selatan",
    distance: "2.1 km",
    rating: 4.4,
    reviewCount: 67,
    description: "Minimarket modern dengan produk lengkap dan pelayanan 24 jam",
    image: "https://i.pinimg.com/736x/77/16/09/771609319be2d6911a2a0193b490405a.jpg",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    coordinates: { lat: -7.4312, lng: 109.2423 },
    phone: "+62822-1234-5678",
    address: "Jl. Soedirman No. 89, Purwokerto Selatan"
  },
  {
    id: "11",
    name: "Warung Sembako Ibu Siti",
    category: "Retail",
    location: "Banyumas",
    distance: "4.8 km",
    rating: 4.2,
    reviewCount: 32,
    description: "Warung sembako tradisional dengan harga bersahabat dan pelayanan ramah",
    image: "https://i.pinimg.com/1200x/61/be/cf/61becf0909c62bec3681488197cfca47.jpg",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4678, lng: 109.2987 },
    phone: "+62823-4567-8901",
    address: "Jl. Raya Banyumas No. 45, Banyumas"
  }
];

// Detailed UMKM Database for detail pages
export const umkmDatabase: Record<string, UMKMDetail> = {
  "1": {
    ...umkmData[0],
    slug: "warung-sate-pak-kumis",
    nextStatusChange: "22:00",
    whatsapp: "+62812345678",
    instagram: "@satepakkumis",
    facebook: "Sate Pak Kumis Official",
    images: [
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "10:00-22:00",
      tuesday: "10:00-22:00",
      wednesday: "10:00-22:00",
      thursday: "10:00-22:00",
      friday: "10:00-23:00",
      saturday: "10:00-23:00",
      sunday: "10:00-22:00"
    },
    facilities: ["Parkir", "Toilet", "Area Makan", "Tempat Cuci Tangan"],
    payments: ["Cash", "QRIS", "GoPay", "OVO"],
    products: [
      {
        id: 1,
        name: "Sate Kambing",
        price: "Rp 45.000",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=400&fit=crop",
        description: "Sate kambing pilihan dengan bumbu kacang khas Banyumas",
        ingredients: ["Daging kambing muda", "Bumbu kacang", "Kecap manis", "Bawang merah goreng", "Lontong"],
        category: "Sate"
      },
      {
        id: 2,
        name: "Sate Ayam",
        price: "Rp 30.000",
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=400&fit=crop",
        description: "Sate ayam empuk dengan bumbu kacang yang gurih",
        ingredients: ["Ayam kampung", "Bumbu kacang", "Kecap manis", "Bawang merah", "Lontong"],
        category: "Sate"
      },
      {
        id: 3,
        name: "Sate Usus",
        price: "Rp 25.000",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
        description: "Sate usus ayam yang renyah dan gurih",
        ingredients: ["Usus ayam", "Bumbu rempah", "Kecap", "Cabai rawit"],
        category: "Sate"
      }
    ],
    services: ["Dine In", "Take Away", "Delivery (via GoFood & GrabFood)"],
    reviews: []
  },
  "2": {
    ...umkmData[1],
    slug: "batik-gumelem-asli",
    nextStatusChange: "21:00",
    whatsapp: "+62856789012",
    instagram: "@batikgumelem",
    facebook: "Batik Gumelem Official",
    email: "info@batikgumelem.com",
    images: [
      "https://batikgumelem.com/storage/products/kembang_asem.jpeg",
      "https://batikgumelem.com/storage/products/rujak_senthe.jpeg",
      "https://batikgumelem.com/storage/products/gajah_uling.jpeg",
      "https://batikgumelem.com/storage/products/parang_angkrik.jpeg"
    ],
    hours: {
      monday: "08:00-21:00",
      tuesday: "08:00-21:00",
      wednesday: "08:00-21:00",
      thursday: "08:00-21:00",
      friday: "08:00-21:00",
      saturday: "08:00-22:00",
      sunday: "09:00-20:00"
    },
    facilities: ["AC", "Fitting Room", "Parkir", "WiFi", "Photo Spot"],
    payments: ["Cash", "Debit Card", "Credit Card", "QRIS", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Batik Tulis Gumelem Premium",
        price: "Rp 850.000",
        image: "https://batikgumelem.com/storage/products/kembang_asem.jpeg",
        description: "Batik tulis halus dengan motif khas Gumelem",
        ingredients: ["Kain katun premium", "Pewarna alami", "Malam berkualitas", "Dikerjakan oleh pengrajin berpengalaman"],
        category: "Batik Tulis"
      },
      {
        id: 2,
        name: "Batik Cap Modern",
        price: "Rp 250.000",
        image: "https://batikgumelem.com/storage/products/rujak_senthe.jpeg",
        description: "Batik cap dengan motif kontemporer untuk anak muda",
        ingredients: ["Kain katun", "Pewarna reaktif", "Motif modern", "Finishing rapih"],
        category: "Batik Cap"
      },
      {
        id: 3,
        name: "Kemeja Batik Pria",
        price: "Rp 350.000",
        image: "https://batikgumelem.com/storage/products/gajah_uling.jpeg",
        description: "Kemeja batik pria ready to wear dengan cutting modern",
        ingredients: ["Batik cap premium", "Kancing branded", "Jahitan presisi", "Furing halus"],
        category: "Ready to Wear"
      },
      {
        id: 4,
        name: "Dress Batik Wanita",
        price: "Rp 450.000",
        image: "https://batikgumelem.com/storage/products/parang_angkrik.jpeg",
        description: "Dress batik elegan untuk wanita dengan desain eksklusif",
        ingredients: ["Batik tulis kombinasi", "Resleting jepang", "Furing satin", "Model eksklusif"],
        category: "Ready to Wear"
      }
    ],
    services: ["Custom Order", "Kursus Membatik", "Wholesale", "Export"],
    reviews: []
  },
  "3": {
    ...umkmData[2],
    slug: "getuk-goreng-bu-tini",
    nextStatusChange: "15:00",
    whatsapp: "+62878901234",
    instagram: "@getukbutini",
    images: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "15:00-21:00",
      tuesday: "15:00-21:00",
      wednesday: "15:00-21:00",
      thursday: "15:00-21:00",
      friday: "15:00-22:00",
      saturday: "14:00-22:00",
      sunday: "14:00-21:00"
    },
    facilities: ["Parkir Motor", "Area Tunggu", "WiFi"],
    payments: ["Cash", "QRIS"],
    products: [
      {
        id: 1,
        name: "Getuk Goreng Original",
        price: "Rp 15.000",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
        description: "Getuk goreng original tanpa topping, renyah dan manis",
        ingredients: ["Singkong pilihan", "Gula pasir", "Garam", "Minyak goreng"],
        category: "Original"
      },
      {
        id: 2,
        name: "Getuk Goreng Coklat Keju",
        price: "Rp 20.000",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop",
        description: "Getuk goreng dengan topping coklat dan keju parut",
        ingredients: ["Getuk singkong", "Saus coklat", "Keju cheddar parut", "Meses coklat"],
        category: "Special"
      },
      {
        id: 3,
        name: "Getuk Goreng Green Tea",
        price: "Rp 22.000",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
        description: "Getuk goreng dengan saus green tea dan toping oreo",
        ingredients: ["Getuk singkong", "Saus green tea", "Oreo hancur", "Susu kental manis"],
        category: "Special"
      },
      {
        id: 4,
        name: "Getuk Goreng Strawberry",
        price: "Rp 20.000",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        description: "Getuk goreng dengan saus strawberry segar",
        ingredients: ["Getuk singkong", "Saus strawberry", "Potongan strawberry", "Whipped cream"],
        category: "Special"
      }
    ],
    services: ["Take Away", "Pre Order untuk acara"],
    reviews: []
  },
  "4": {
    ...umkmData[3],
    slug: "kopi-gunung-slamet",
    nextStatusChange: "23:00",
    whatsapp: "+62821234567",
    instagram: "@kopigunslamet",
    facebook: "Kopi Gunung Slamet",
    email: "hello@kopigunslamet.com",
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "07:00-23:00",
      tuesday: "07:00-23:00",
      wednesday: "07:00-23:00",
      thursday: "07:00-23:00",
      friday: "07:00-00:00",
      saturday: "08:00-00:00",
      sunday: "08:00-23:00"
    },
    facilities: ["WiFi", "AC", "Colokan", "Toilet", "Parkir", "Smoking Area", "Non-Smoking Area"],
    payments: ["Cash", "Debit Card", "Credit Card", "QRIS", "GoPay", "OVO", "DANA", "ShopeePay"],
    products: [
      {
        id: 1,
        name: "Arabica V60",
        price: "Rp 28.000",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop",
        description: "Single origin arabica Gunung Slamet diseduh dengan V60",
        ingredients: ["Biji kopi arabika Slamet", "Air mineral 93°C", "Metode V60 pour over"],
        category: "Manual Brew"
      },
      {
        id: 2,
        name: "Cappuccino",
        price: "Rp 25.000",
        image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=400&fit=crop",
        description: "Espresso dengan steamed milk dan foam yang creamy",
        ingredients: ["Double shot espresso", "Susu fresh milk", "Foam halus", "Latte art"],
        category: "Espresso Based"
      },
      {
        id: 3,
        name: "Kopi Susu Gula Aren",
        price: "Rp 22.000",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        description: "Kopi susu dengan gula aren yang manis legit",
        ingredients: ["Kopi robusta lokal", "Susu murni", "Gula aren asli", "Es batu"],
        category: "Signature"
      },
      {
        id: 4,
        name: "Matcha Latte",
        price: "Rp 28.000",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
        description: "Matcha premium dengan susu yang creamy",
        ingredients: ["Matcha powder Jepang", "Susu fresh milk", "Simple syrup", "Es batu"],
        category: "Non Coffee"
      }
    ],
    services: ["Dine In", "Take Away", "Delivery", "Coffee Beans Retail"],
    reviews: []
  },
  "5": {
    ...umkmData[4],
    slug: "salon-cantik-ayu",
    nextStatusChange: "20:00",
    whatsapp: "+62813456789",
    instagram: "@saloncantikay",
    facebook: "Salon Cantik Ayu",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "09:00-20:00",
      tuesday: "09:00-20:00",
      wednesday: "09:00-20:00",
      thursday: "09:00-20:00",
      friday: "09:00-20:00",
      saturday: "09:00-21:00",
      sunday: "10:00-18:00"
    },
    facilities: ["AC", "WiFi", "Ruang Tunggu", "Parkir", "Toilet", "Musik"],
    payments: ["Cash", "Debit Card", "QRIS", "GoPay", "OVO"],
    products: [
      {
        id: 1,
        name: "Creambath + Hair Spa",
        price: "Rp 75.000",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop",
        description: "Perawatan rambut intensif dengan creambath dan hair spa",
        ingredients: ["Creambath serum", "Hair spa treatment", "Hair mask", "Hair tonic", "Blow dry"],
        category: "Hair Treatment"
      },
      {
        id: 2,
        name: "Facial Acne Treatment",
        price: "Rp 150.000",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop",
        description: "Perawatan wajah khusus untuk kulit berjerawat",
        ingredients: ["Deep cleansing", "Ekstraksi komedo", "Masker anti acne", "Serum jerawat", "Sunscreen"],
        category: "Facial Treatment"
      },
      {
        id: 3,
        name: "Smoothing Rambut",
        price: "Rp 450.000",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
        description: "Smoothing untuk rambut lurus berkilau natural",
        ingredients: ["Smoothing cream premium", "Treatment serum", "Hair tonic", "Vitamin rambut", "Styling"],
        category: "Hair Styling"
      },
      {
        id: 4,
        name: "Manicure + Pedicure",
        price: "Rp 85.000",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop",
        description: "Perawatan kuku tangan dan kaki lengkap",
        ingredients: ["Nail soak", "Cuticle care", "Nail polish", "Hand & foot massage", "Nail art (optional)"],
        category: "Nail Care"
      }
    ],
    services: ["Hair Treatment", "Facial", "Makeup", "Nail Care", "Waxing", "Eyelash Extension"],
    reviews: []
  },
  "6": {
    ...umkmData[5],
    slug: "mendoan-cokro-kembang",
    nextStatusChange: "21:00",
    whatsapp: "+62857890123",
    instagram: "@mendoancokro",
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563379091339-03b87f96ab88?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "06:00-21:00",
      tuesday: "06:00-21:00",
      wednesday: "06:00-21:00",
      thursday: "06:00-21:00",
      friday: "06:00-21:00",
      saturday: "06:00-22:00",
      sunday: "06:00-21:00"
    },
    facilities: ["Parkir Luas", "Tempat Makan", "Mushola", "Toilet"],
    payments: ["Cash", "QRIS"],
    products: [
      {
        id: 1,
        name: "Mendoan Tempe Original",
        price: "Rp 15.000",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop",
        description: "Mendoan tempe khas Banyumas yang renyah dan gurih",
        ingredients: ["Tempe segar", "Tepung bumbu khas", "Daun bawang", "Kacang tanah cincang", "Minyak goreng"],
        category: "Mendoan"
      },
      {
        id: 2,
        name: "Mendoan Isi",
        price: "Rp 20.000",
        image: "https://images.unsplash.com/photo-1563379091339-03b87f96ab88?w=400&h=400&fit=crop",
        description: "Mendoan dengan isian daging cincang pedas",
        ingredients: ["Tempe segar", "Daging ayam cincang", "Bumbu rempah", "Cabai rawit", "Tepung krispy"],
        category: "Mendoan"
      },
      {
        id: 3,
        name: "Paket Mendoan + Sambal Kacang",
        price: "Rp 22.000",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=400&fit=crop",
        description: "Paket mendoan dengan sambal kacang dan lalapan",
        ingredients: ["Mendoan tempe 10 potong", "Sambal kacang spesial", "Cabai rawit", "Timun segar"],
        category: "Paket"
      },
      {
        id: 4,
        name: "Paket Lengkap Mendoan",
        price: "Rp 30.000",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop",
        description: "Paket mendoan dengan nasi dan teh hangat",
        ingredients: ["Nasi putih", "Mendoan 12 potong", "Sambal kacang", "Lalapan", "Teh hangat"],
        category: "Paket"
      }
    ],
    services: ["Dine In", "Take Away", "Catering untuk acara"],
    reviews: []
  },
  "7": {
    ...umkmData[6],
    slug: "bengkel-motor-jaya-abadi",
    nextStatusChange: "17:00",
    whatsapp: "+62818-7890-1234",
    instagram: "@bengkeljayaabadi",
    images: [
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-17:00",
      saturday: "08:00-16:00",
      sunday: "Tutup"
    },
    facilities: ["Parkir Luas", "Ruang Tunggu", "WiFi", "Toilet", "Mushola"],
    payments: ["Cash", "QRIS", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Service Rutin Motor",
        price: "Rp 50.000",
        image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=400&fit=crop",
        description: "Service rutin motor meliputi ganti oli dan tune up",
        ingredients: ["Oli mesin berkualitas", "Filter oli", "Busi", "Pemeriksaan menyeluruh"],
        category: "Service"
      },
      {
        id: 2,
        name: "Ganti Ban Motor",
        price: "Rp 150.000",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        description: "Penggantian ban motor dengan ban berkualitas",
        ingredients: ["Ban motor original", "Pentil baru", "Balancing roda", "Garansi 6 bulan"],
        category: "Spare Part"
      }
    ],
    services: ["Service Motor", "Ganti Spare Part", "Tune Up", "Ganti Oli", "Emergency Service"],
    reviews: []
  },
  "8": {
    ...umkmData[7],
    slug: "lanting-bu-narti",
    nextStatusChange: "20:00",
    whatsapp: "+62819-8901-2345",
    instagram: "@lantingbunarti",
    images: [
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "14:00-20:00",
      tuesday: "14:00-20:00",
      wednesday: "14:00-20:00",
      thursday: "14:00-20:00",
      friday: "14:00-21:00",
      saturday: "13:00-21:00",
      sunday: "13:00-20:00"
    },
    facilities: ["Parkir Motor", "Area Makan", "WiFi"],
    payments: ["Cash", "QRIS"],
    products: [
      {
        id: 1,
        name: "Lanting Original",
        price: "Rp 12.000",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop",
        description: "Lanting khas Banyumas yang renyah dan gurih",
        ingredients: ["Tepung beras", "Kelapa parut", "Garam", "Minyak goreng"],
        category: "Lanting"
      },
      {
        id: 2,
        name: "Lanting Pedas",
        price: "Rp 15.000",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
        description: "Lanting dengan bumbu pedas yang menggigit",
        ingredients: ["Tepung beras", "Cabai rawit", "Bawang putih", "Garam", "Minyak goreng"],
        category: "Lanting"
      }
    ],
    services: ["Take Away", "Delivery Area Cilongok"],
    reviews: []
  },
  "9": {
    ...umkmData[8],
    slug: "toko-kelontong-sari-rejeki",
    nextStatusChange: "21:00",
    whatsapp: "+62821-9876-5432",
    instagram: "@tokosarirejeki",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604719312566-878b6d57b6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "06:00-21:00",
      tuesday: "06:00-21:00",
      wednesday: "06:00-21:00",
      thursday: "06:00-21:00",
      friday: "06:00-21:00",
      saturday: "06:00-22:00",
      sunday: "07:00-21:00"
    },
    facilities: ["Parkir Motor", "AC", "WiFi"],
    payments: ["Cash", "QRIS", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Paket Sembako Lengkap",
        price: "Rp 150.000",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
        description: "Paket sembako lengkap untuk kebutuhan sehari-hari",
        ingredients: ["Beras 5kg", "Minyak goreng 2L", "Gula pasir 1kg", "Telur 1kg", "Mie instan 10 bungkus"],
        category: "Paket Sembako"
      },
      {
        id: 2,
        name: "Snack & Minuman",
        price: "Rp 5.000 - 25.000",
        image: "https://images.unsplash.com/photo-1604719312566-878b6d57b6c3?w=400&h=400&fit=crop",
        description: "Berbagai macam snack dan minuman",
        ingredients: ["Keripik", "Biskuit", "Permen", "Minuman ringan", "Air mineral"],
        category: "Snack & Minuman"
      }
    ],
    services: ["Retail", "Grosir", "Delivery Sekitar"],
    reviews: []
  },
  "10": {
    ...umkmData[9],
    slug: "minimarket-berkah-jaya",
    nextStatusChange: "24 Jam",
    whatsapp: "+62822-1234-5678",
    instagram: "@minimarketberkah",
    facebook: "Minimarket Berkah Jaya",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604719312566-878b6d57b6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "24 Jam",
      tuesday: "24 Jam",
      wednesday: "24 Jam",
      thursday: "24 Jam",
      friday: "24 Jam",
      saturday: "24 Jam",
      sunday: "24 Jam"
    },
    facilities: ["AC", "CCTV", "Parkir Luas", "ATM", "WiFi"],
    payments: ["Cash", "Debit Card", "Credit Card", "QRIS", "GoPay", "OVO", "DANA"],
    products: [
      {
        id: 1,
        name: "Produk Segar",
        price: "Rp 3.000 - 50.000",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        description: "Sayuran, buah-buahan, dan produk segar lainnya",
        ingredients: ["Sayuran segar", "Buah-buahan", "Daging", "Ikan", "Telur"],
        category: "Produk Segar"
      },
      {
        id: 2,
        name: "Kebutuhan Rumah Tangga",
        price: "Rp 2.000 - 100.000",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
        description: "Berbagai kebutuhan rumah tangga dan peralatan",
        ingredients: ["Sabun", "Deterjen", "Shampo", "Pasta gigi", "Peralatan dapur"],
        category: "Rumah Tangga"
      },
      {
        id: 3,
        name: "Makanan & Minuman",
        price: "Rp 1.000 - 30.000",
        image: "https://images.unsplash.com/photo-1604719312566-878b6d57b6c3?w=400&h=400&fit=crop",
        description: "Makanan ringan, minuman, dan kebutuhan konsumsi",
        ingredients: ["Snack", "Minuman", "Roti", "Susu", "Kopi instan"],
        category: "F&B"
      }
    ],
    services: ["24 Hour Service", "ATM", "Top Up Pulsa", "Bayar Tagihan"],
    reviews: []
  },
  "11": {
    ...umkmData[10],
    slug: "warung-sembako-ibu-siti",
    nextStatusChange: "20:00",
    whatsapp: "+62823-4567-8901",
    images: [
      "https://images.unsplash.com/photo-1604719312566-878b6d57b6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    ],
    hours: {
      monday: "06:00-20:00",
      tuesday: "06:00-20:00",
      wednesday: "06:00-20:00",
      thursday: "06:00-20:00",
      friday: "06:00-20:00",
      saturday: "06:00-21:00",
      sunday: "07:00-19:00"
    },
    facilities: ["Parkir Motor", "Tempat Duduk"],
    payments: ["Cash", "QRIS"],
    products: [
      {
        id: 1,
        name: "Beras Berkualitas",
        price: "Rp 12.000/kg",
        image: "https://images.unsplash.com/photo-1604719312566-878b6d57b6c3?w=400&h=400&fit=crop",
        description: "Beras lokal berkualitas dengan harga terjangkau",
        ingredients: ["Beras lokal", "Kualitas premium", "Bersih dan wangi"],
        category: "Sembako"
      },
      {
        id: 2,
        name: "Bumbu Dapur Lengkap",
        price: "Rp 2.000 - 15.000",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
        description: "Berbagai bumbu dapur dan rempah-rempah",
        ingredients: ["Bawang merah", "Bawang putih", "Cabai", "Jahe", "Kunyit"],
        category: "Bumbu"
      }
    ],
    services: ["Retail", "Grosir Kecil", "Antar Pesanan"],
    reviews: []
  }
};

// Helper functions for data manipulation
export const getUMKMById = (id: string): UMKM | undefined => {
  return umkmData.find(umkm => umkm.id === id);
};

export const getUMKMDetailById = (id: string): UMKMDetail | undefined => {
  return umkmDatabase[id];
};

export const getUMKMByCategory = (category: string): UMKM[] => {
  if (category === "Semua" || category === "All") {
    return umkmData;
  }
  return umkmData.filter(umkm => umkm.category === category);
};

export const getUMKMByLocation = (location: string): UMKM[] => {
  if (location === "Semua" || location === "All") {
    return umkmData;
  }
  return umkmData.filter(umkm => umkm.location === location);
};

export const getUMKMByStatus = (status: "open" | "closed" | "all"): UMKM[] => {
  if (status === "all") {
    return umkmData;
  }
  return umkmData.filter(umkm => umkm.status === status);
};

export const searchUMKM = (query: string): UMKM[] => {
  const lowercaseQuery = query.toLowerCase();
  return umkmData.filter(umkm => 
    umkm.name.toLowerCase().includes(lowercaseQuery) ||
    umkm.description.toLowerCase().includes(lowercaseQuery) ||
    umkm.category.toLowerCase().includes(lowercaseQuery) ||
    umkm.location.toLowerCase().includes(lowercaseQuery)
  );
};

// Categories and locations for filters
export const categories = [
  "Semua",
  "Makanan & Minuman",
  "Fashion",
  "Kafe & Resto",
  "Kecantikan",
  "Otomotif & Jasa",
  "Retail"
];

export const locations = [
  "Semua",
  "Purwokerto Utara",
  "Purwokerto Selatan",
  "Purwokerto Barat",
  "Purwokerto Timur",
  "Sokaraja",
  "Banyumas",
  "Cilongok"
];

// Map-specific data transformations
export const getUMKMForMap = (): Array<Omit<UMKM, 'coordinates'> & { coordinates: [number, number] }> => {
  return umkmData.map(umkm => ({
    ...umkm,
    coordinates: [umkm.coordinates.lng, umkm.coordinates.lat] as [number, number]
  }));
};

export const getNearbyUMKM = (userLocation: [number, number], radiusKm: number = 5): UMKM[] => {
  return umkmData.filter(umkm => {
    const distance = calculateDistance(
      userLocation[1], userLocation[0],
      umkm.coordinates.lat, umkm.coordinates.lng
    );
    return distance <= radiusKm;
  });
};

// Distance calculation helper
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}