// Chat Type Definitions for SABI AI

export interface UMKMCard {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  reason?: string;
  image?: string;
  distance?: string;
  priceRange?: "$" | "$$" | "$$$";
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  umkm_cards?: UMKMCard[];
  quick_replies?: string[];
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  messageCount: number;
}

export interface GeminiResponse {
  message: string;
  umkm_cards?: UMKMCard[];
  quick_replies?: string[];
}
