// Chat Input Component
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@heroui/react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  onSend,
  disabled = false,
  placeholder = "Tanya SABI AI...",
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Type your message to SABI AI"
        />
        <Button
          isIconOnly
          color="primary"
          size="lg"
          onPress={handleSend}
          isDisabled={!input.trim() || disabled}
          className="rounded-full w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white shadow-lg disabled:bg-gray-300 disabled:text-gray-500"
          aria-label="Send message"
          title="Send message"
        >
          <Send className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
