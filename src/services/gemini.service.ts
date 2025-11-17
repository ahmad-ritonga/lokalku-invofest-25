// Gemini AI Service for SABI AI
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GeminiResponse } from "@/types/chat.types";
import { umkmData } from "@/data/umkm-data";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY not found in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// System prompt for SABI AI
const getSystemPrompt = () => {
  const umkmDataString = JSON.stringify(umkmData, null, 2);
  
  return `Anda adalah SABI AI (Sahabat Bisnis), asisten virtual LokalKu - direktori UMKM Banyumas & Purwokerto.

TUGAS UTAMA:
- Bantu user menemukan UMKM dari database berdasarkan: budget, lokasi, kategori, rating, status buka
- Jawab pertanyaan spesifik tentang UMKM: jam buka, fasilitas, pembayaran, kontak, alamat
- Berikan rekomendasi 2-4 UMKM dengan alasan singkat dan jelas
- Ramah, helpful, gunakan Bahasa Indonesia casual tapi sopan
- Sertakan informasi: rating, lokasi, kisaran harga saat merekomendasikan

GAYA KOMUNIKASI:
- Seperti sahabat bisnis yang helpful dan ramah
- Gunakan emoji 1-2 per respons untuk friendly tone
- Jawaban singkat dan jelas (maksimal 4 kalimat)
- Panggil user dengan 'Anda' atau 'kamu' (sesuai konteks)
- Hindari bahasa terlalu formal atau kaku

JIKA TIDAK TAHU JAWABANNYA:
- Jujur bilang tidak tahu atau data tidak tersedia
- Tawarkan alternatif atau saran lain
- Jangan membuat informasi yang tidak ada di database

DATA UMKM TERSEDIA:
${umkmDataString}

FORMAT RESPONSE:

Untuk rekomendasi UMKM, return JSON:
{
  "message": "Text penjelasan dengan emoji",
  "umkm_cards": [
    {
      "id": "1",
      "name": "Warung Sate Pak Kumis",
      "category": "Makanan & Minuman",
      "rating": 4.8,
      "location": "Purwokerto Utara",
      "reason": "Sate kambing enak, harga terjangkau, rating tinggi"
    }
  ],
  "quick_replies": ["Lihat menu", "Cari tempat lain", "Info kontak"]
}

Untuk pertanyaan info/umum, return plain text dengan emoji yang sesuai.

CONTOH QUERY & RESPONSE:

User: "Cari kopi enak di Purwokerto"
Assistant: {
  "message": "☕ Ini rekomendasi kopi enak di Purwokerto untuk Anda!",
  "umkm_cards": [
    {
      "id": "4",
      "name": "Kopi Gunung Slamet",
      "category": "Kafe & Resto",
      "rating": 4.6,
      "location": "Purwokerto Barat",
      "reason": "Kopi arabika premium dari Gunung Slamet, tempat nyaman, WiFi gratis"
    }
  ],
  "quick_replies": ["Info jam buka", "Lihat menu", "Cari kafe lain"]
}

User: "Warung Sate Pak Kumis buka jam berapa?"
Assistant: "Warung Sate Pak Kumis buka setiap hari! 🕐 Senin-Kamis & Minggu: 10:00-22:00 WIB. Jumat-Sabtu: 10:00-23:00 WIB. Yuk mampir! 😊"

User: "Makanan murah budget 30rb"
Assistant: {
  "message": "💰 Ada beberapa pilihan enak dengan budget 30rb-an!",
  "umkm_cards": [
    {
      "id": "3",
      "name": "Getuk Goreng Bu Tini",
      "category": "Makanan & Minuman",
      "rating": 4.7,
      "location": "Sokaraja",
      "reason": "Getuk goreng dengan berbagai topping, harga mulai 15rb"
    },
    {
      "id": "6",
      "name": "Mendoan Cokro Kembang",
      "category": "Makanan & Minuman",
      "rating": 4.9,
      "location": "Banyumas",
      "reason": "Mendoan khas Banyumas yang legendaris, paket lengkap 30rb"
    }
  ],
  "quick_replies": ["Info lokasi", "Lihat menu lain", "Cari kategori lain"]
}

PENTING:
- Selalu gunakan data dari database yang tersedia
- Jangan membuat informasi fiktif
- Kalau user tanya UMKM tertentu, cari berdasarkan nama (case-insensitive, partial match OK)
- Prioritaskan UMKM dengan rating tinggi dan status "open"
- Berikan maksimal 4 rekomendasi UMKM per response
- Quick replies harus relevan dengan konteks percakapan`;
};

// Chat with Gemini
export const chatWithGemini = async (
  userMessage: string,
  conversationHistory: string[] = [],
  userLocation?: { lat: number; lng: number }
): Promise<GeminiResponse> => {
  try {
    // Use gemini-2.5-flash (stable version, fast and efficient)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });

    // Build context with system prompt and history
    const systemPrompt = getSystemPrompt();
    const context = [
      systemPrompt,
      ...conversationHistory,
      `User: ${userMessage}`
    ].join("\n\n");

    // Add user location context if available
    const locationContext = userLocation 
      ? `\n\nUser location: Lat ${userLocation.lat}, Lng ${userLocation.lng}. Prioritize nearby UMKM.`
      : "";

    const result = await model.generateContent(context + locationContext);
    const response = await result.response;
    const text = response.text();

    // Try to parse as JSON first
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as GeminiResponse;
        return parsed;
      }
    } catch (e) {
      // Not JSON, return as plain text
    }

    // Return as plain text message
    return {
      message: text.trim(),
      umkm_cards: [],
      quick_replies: []
    };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Handle specific errors
    if (error.message?.includes("quota")) {
      throw new Error("SABI sedang istirahat sebentar. Coba lagi dalam beberapa menit ya! 😊");
    }
    
    if (error.message?.includes("API key")) {
      throw new Error("Ada masalah dengan konfigurasi SABI. Hubungi administrator.");
    }

    throw new Error("Maaf, SABI sedang bermasalah. Coba lagi ya! 🙏");
  }
};

// Process user query to extract intent
export const processQuery = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  const intent = {
    type: "general" as "recommendation" | "info" | "general",
    category: null as string | null,
    location: null as string | null,
    priceRange: null as "$" | "$$" | "$$$" | null,
    status: null as "open" | "closed" | null,
    umkmName: null as string | null,
  };

  // Check if asking about specific UMKM
  const umkmNames = umkmData.map(u => u.name.toLowerCase());
  const mentionedUMKM = umkmNames.find(name => 
    lowerQuery.includes(name.toLowerCase()) || 
    name.toLowerCase().includes(lowerQuery)
  );
  
  if (mentionedUMKM) {
    intent.type = "info";
    intent.umkmName = mentionedUMKM;
    return intent;
  }

  // Check for recommendation keywords
  if (
    lowerQuery.includes("cari") || 
    lowerQuery.includes("rekomendasi") ||
    lowerQuery.includes("ada apa") ||
    lowerQuery.includes("suggest") ||
    lowerQuery.includes("pengen")
  ) {
    intent.type = "recommendation";
  }

  // Extract category
  if (lowerQuery.includes("kopi") || lowerQuery.includes("cafe") || lowerQuery.includes("kafe")) {
    intent.category = "Kafe & Resto";
  } else if (lowerQuery.includes("makan") || lowerQuery.includes("food") || lowerQuery.includes("kuliner")) {
    intent.category = "Makanan & Minuman";
  } else if (lowerQuery.includes("batik") || lowerQuery.includes("baju") || lowerQuery.includes("fashion")) {
    intent.category = "Fashion";
  } else if (lowerQuery.includes("salon") || lowerQuery.includes("cantik") || lowerQuery.includes("kecantikan")) {
    intent.category = "Kecantikan";
  } else if (lowerQuery.includes("bengkel") || lowerQuery.includes("motor") || lowerQuery.includes("otomotif")) {
    intent.category = "Otomotif & Jasa";
  }

  // Extract location
  if (lowerQuery.includes("purwokerto utara")) intent.location = "Purwokerto Utara";
  else if (lowerQuery.includes("purwokerto selatan")) intent.location = "Purwokerto Selatan";
  else if (lowerQuery.includes("purwokerto barat")) intent.location = "Purwokerto Barat";
  else if (lowerQuery.includes("purwokerto timur")) intent.location = "Purwokerto Timur";
  else if (lowerQuery.includes("sokaraja")) intent.location = "Sokaraja";
  else if (lowerQuery.includes("banyumas")) intent.location = "Banyumas";
  else if (lowerQuery.includes("cilongok")) intent.location = "Cilongok";

  // Extract price range
  if (lowerQuery.includes("murah") || lowerQuery.includes("budget") || lowerQuery.includes("hemat")) {
    intent.priceRange = "$";
  } else if (lowerQuery.includes("mahal") || lowerQuery.includes("premium") || lowerQuery.includes("mewah")) {
    intent.priceRange = "$$$";
  }

  // Extract status
  if (lowerQuery.includes("buka") || lowerQuery.includes("open")) {
    intent.status = "open";
  }

  return intent;
};
