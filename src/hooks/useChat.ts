// Custom hook for chat state management
import { useState, useCallback, useEffect, useRef } from "react";
import type { Message, ChatState } from "@/types/chat.types";

const STORAGE_KEY = "lokalku_chat_sabi";
const MAX_MESSAGES = 50;
const MAX_MESSAGES_PER_SESSION = 20;

export const useChat = () => {
  const [state, setState] = useState<ChatState>(() => {
    // Load from sessionStorage
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          messages: parsed.messages || [],
          isOpen: false,
          isTyping: false,
          messageCount: parsed.messageCount || 0,
        };
      } catch (e) {
        console.error("Failed to parse chat state:", e);
      }
    }
    return {
      messages: [],
      isOpen: false,
      isTyping: false,
      messageCount: 0,
    };
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save to sessionStorage whenever messages change
  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages: state.messages.slice(-MAX_MESSAGES),
        messageCount: state.messageCount,
      })
    );
  }, [state.messages, state.messageCount]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    if (state.isOpen) {
      scrollToBottom();
    }
  }, [state.messages, state.isOpen, scrollToBottom]);

  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const openChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage].slice(-MAX_MESSAGES),
      messageCount: message.role === "user" ? prev.messageCount + 1 : prev.messageCount,
    }));
  }, []);

  const setTyping = useCallback((isTyping: boolean) => {
    setState(prev => ({ ...prev, isTyping }));
  }, []);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isOpen: false,
      isTyping: false,
      messageCount: 0,
    });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const canSendMessage = state.messageCount < MAX_MESSAGES_PER_SESSION;
  const isNearLimit = state.messageCount >= MAX_MESSAGES_PER_SESSION - 2;

  // Get conversation history for API context (last 10 messages)
  const getConversationHistory = useCallback((): string[] => {
    return state.messages
      .slice(-10)
      .map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`);
  }, [state.messages]);

  return {
    ...state,
    messagesEndRef,
    toggleChat,
    openChat,
    closeChat,
    addMessage,
    setTyping,
    clearChat,
    canSendMessage,
    isNearLimit,
    getConversationHistory,
    scrollToBottom,
  };
};
