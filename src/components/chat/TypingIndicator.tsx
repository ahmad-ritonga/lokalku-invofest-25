// Typing Indicator Component - Redesigned
export const TypingIndicator = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full animate-bounce" 
             style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full animate-bounce" 
             style={{ animationDelay: '200ms', animationDuration: '1s' }}></div>
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full animate-bounce" 
             style={{ animationDelay: '400ms', animationDuration: '1s' }}></div>
      </div>
    </div>
  );
};