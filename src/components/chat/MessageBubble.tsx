// Message Bubble Component
import type { Message } from "@/types/chat.types";
import { UMKMCard } from "./UMKMCard";
import { User } from "lucide-react";
import OptimizedMaskot from "../OptimizedMaskot";

interface MessageBubbleProps {
  message: Message;
  onQuickReply: (reply: string) => void;
}

export const MessageBubble = ({ message, onQuickReply }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200`}
    >
      {/* Avatar - Assistant only */}
      {isAssistant && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 p-0.5 shadow-md">
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            <OptimizedMaskot className="w-8 h-8" />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[75%]`}>
        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-br-md"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md"
          }`}
        >
          {/* Message Text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* UMKM Cards */}
          {message.umkm_cards && message.umkm_cards.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.umkm_cards.map((card) => (
                <UMKMCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Replies */}
        {message.quick_replies && message.quick_replies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.quick_replies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => onQuickReply(reply)}
                className="text-xs px-4 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all font-medium shadow-sm hover:shadow-md"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {/* Avatar - User only */}
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-md">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
};