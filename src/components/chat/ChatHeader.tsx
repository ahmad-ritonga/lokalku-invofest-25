// Chat Header Component
import { ChevronDown, X } from "lucide-react";
import { Button } from "@heroui/react";
import OptimizedMaskot from "../OptimizedMaskot";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export const ChatHeader = ({ onMinimize, onClose }: ChatHeaderProps) => {
  return (
    <div className="h-16 bg-gradient-to-r from-primary-600 to-orange-500 px-4 flex items-center justify-between rounded-t-2xl">
      {/* Left: Avatar and Name */}
      <div className="flex items-center space-x-3">
        <OptimizedMaskot size="md" className="w-12 h-12" priority />
        <div>
          <h3 className="font-display font-bold text-white text-base">
            SABI AI
          </h3>
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/90">Online</span>
          </div>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-1">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onMinimize}
          className="text-white hover:bg-white/20"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
