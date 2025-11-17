// Chat Messages Component
import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat.types";
import { MessageBubble } from "./MessageBubble";
import { WelcomeMessage } from "./WelcomeMessage";
import { TypingIndicator } from "./TypingIndicator";
import OptimizedMaskot from "../OptimizedMaskot";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onQuickReply: (reply: string) => void;
}

export const ChatMessages = ({
  messages,
  isTyping,
  onQuickReply,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="p-4 space-y-4">
        {/* Welcome message if no messages */}
        {messages.length === 0 && (
          <WelcomeMessage onQuickReply={onQuickReply} />
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <div key={message.id}>
            <MessageBubble
              message={message}
              onQuickReply={onQuickReply}
            />
            
            {/* Add spacing between different senders */}
            {index < messages.length - 1 && 
             messages[index].role !== messages[index + 1].role && (
              <div className="h-2" />
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <OptimizedMaskot size="sm" />
                </div>
              </div>
            <TypingIndicator />
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};