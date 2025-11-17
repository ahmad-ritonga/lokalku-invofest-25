// Chat Button Component

interface ChatButtonProps {
  onClick: () => void;
  hasNotification?: boolean;
}

export const ChatButton = ({ onClick, hasNotification = false }: ChatButtonProps) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      <button
        onClick={onClick}
        className="relative w-24 h-24 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Open SABI AI Chat"
      >
        {/* Mascot Icon - Bigger size */}
        <img
          src="/assets/images/maskot.webp"
          alt="Chat dengan SABI AI"
          className="w-24 h-24 object-contain drop-shadow-2xl hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "/assets/images/maskot.webp";
          }}
        />

        {/* Notification Badge */}
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse z-10"></div>
        )}

        {/* Subtle Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </button>

      {/* Tooltip - "Chat SABI AI" on hover - positioned to the left */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:-translate-x-1 pointer-events-none z-[70]">
        <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          Chat SABI AI
          {/* Tooltip Arrow pointing right */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-gray-900 dark:border-l-white"></div>
        </div>
      </div>
    </div>
  );
};