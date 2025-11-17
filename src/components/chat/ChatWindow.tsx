// Chat Window Component
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import type { Message } from "@/types/chat.types";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickReply: (reply: string) => void;
  onMinimize: () => void;
  onClose: () => void;
  disabled?: boolean;
}

export const ChatWindow = ({
  messages,
  isTyping,
  onSendMessage,
  onQuickReply,
  onMinimize,
  onClose,
  disabled = false,
}: ChatWindowProps) => {
  return (
    <div className="fixed z-50 
                    top-20 bottom-4 
                    right-4 
                    w-[calc(100vw-2rem)] 
                    h-auto
                    max-w-[420px] 
                    max-h-[calc(100vh-6rem)]
                    sm:top-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[600px]
                    bg-white dark:bg-gray-800 
                    rounded-2xl shadow-2xl 
                    flex flex-col 
                    animate-slide-up
                    border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <ChatHeader onMinimize={onMinimize} onClose={onClose} />

      {/* Messages */}
      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        onQuickReply={onQuickReply}
      />

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={disabled || isTyping} />
    </div>
  );
};