// Main Chat Widget Component - SABI AI
import { useCallback, useEffect } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";
import { useChat } from "@/hooks/useChat";
import { useGemini } from "@/hooks/useGemini";
import { getUMKMById } from "@/data/umkm-data";
import type { UMKMCard } from "@/types/chat.types";

export const ChatWidget = () => {
  const {
    messages,
    isOpen,
    isTyping,
    canSendMessage,
    isNearLimit,
    toggleChat,
    closeChat,
    addMessage,
    setTyping,
    getConversationHistory,
  } = useChat();

  const { sendMessage: sendToGemini, error: geminiError } = useGemini();

  // Handle sending user message
  const handleSendMessage = useCallback(
    async (userMessage: string) => {
      // Check rate limit
      if (!canSendMessage) {
        addMessage({
          role: "assistant",
          content:
            "Maaf, Anda sudah mencapai batas maksimal 20 pesan per sesi. Silakan refresh halaman untuk memulai percakapan baru. 😊",
        });
        return;
      }

      // Warn if near limit
      if (isNearLimit) {
        const remaining = 20 - messages.filter((m) => m.role === "user").length;
        addMessage({
          role: "assistant",
          content: `⚠️ Anda tinggal ${remaining} pesan lagi dalam sesi ini.`,
        });
      }

      // Add user message
      addMessage({
        role: "user",
        content: userMessage,
      });

      // Show typing indicator
      setTyping(true);

      try {
        // Get conversation history
        const history = getConversationHistory();

        // Get user location (optional)
        const userLocation = undefined;

        // Send to Gemini
        const response = await sendToGemini(userMessage, history, userLocation);

        // Process response
        let assistantMessage = response.message;
        let umkmCards: UMKMCard[] = [];

        // If response has UMKM cards, enrich them with full data
        if (response.umkm_cards && response.umkm_cards.length > 0) {
          umkmCards = response.umkm_cards
            .map((card) => {
              // Validate card
              if (!card || !card.id) {
                console.warn("Invalid UMKM card:", card);
                return null;
              }

              // Get full data
              const fullData = getUMKMById(card.id);
              
              if (fullData) {
                return {
                  id: card.id,
                  name: card.name || fullData.name,
                  category: card.category || fullData.category,
                  location: card.location || fullData.location,
                  rating: card.rating || fullData.rating,
                  image: fullData.image,
                  distance: card.distance || fullData.distance,
                  priceRange: fullData.priceRange,
                } as UMKMCard;
              } else {
                console.warn(`UMKM ${card.id} not found`);
                return {
                  id: card.id,
                  name: card.name || "UMKM",
                  category: card.category || "Lainnya",
                  location: card.location || "Banyumas",
                  rating: card.rating || 0,
                  image: "/assets/images/placeholder-umkm.svg",
                  distance: card.distance,
                  priceRange: undefined,
                } as UMKMCard;
              }
            })
            .filter((card): card is UMKMCard => card !== null);
        }

        // Add assistant message
        addMessage({
          role: "assistant",
          content: assistantMessage,
          umkm_cards: umkmCards.length > 0 ? umkmCards : undefined,
          quick_replies: response.quick_replies,
        });
      } catch (error: any) {
        console.error("Chat error:", error);
        addMessage({
          role: "assistant",
          content: error.message || "Maaf, terjadi kesalahan. Coba lagi ya! 🙏",
          quick_replies: ["Coba lagi"],
        });
      } finally {
        setTyping(false);
      }
    },
    [
      canSendMessage,
      isNearLimit,
      messages,
      addMessage,
      setTyping,
      getConversationHistory,
      sendToGemini,
    ]
  );

  // Handle quick reply
  const handleQuickReply = useCallback(
    (reply: string) => {
      handleSendMessage(reply);
    },
    [handleSendMessage]
  );

  // Show error if Gemini API fails
  useEffect(() => {
    if (geminiError) {
      console.error("Gemini error:", geminiError);
    }
  }, [geminiError]);

  return (
    <>
      {!isOpen && (
        <ChatButton onClick={toggleChat} hasNotification={false} />
      )}

      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onQuickReply={handleQuickReply}
          onMinimize={closeChat}
          onClose={closeChat}
          disabled={!canSendMessage}
        />
      )}
    </>
  );
};

export default ChatWidget;