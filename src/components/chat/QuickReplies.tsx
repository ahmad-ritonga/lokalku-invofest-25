// Quick Replies Component
interface QuickRepliesProps {
  replies: string[];
  onReply: (reply: string) => void;
}

export const QuickReplies = ({ replies, onReply }: QuickRepliesProps) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide">
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onReply(reply)}
          className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-700 border border-primary-200 dark:border-primary-800 rounded-full hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};
