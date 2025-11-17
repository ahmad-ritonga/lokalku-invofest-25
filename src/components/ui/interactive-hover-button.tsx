import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {/* Background circle that expands on hover */}
      <div className="absolute inset-0 rounded-full bg-white scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100 origin-left"></div>
      
      {/* Original content */}
      <div className="flex items-center gap-2 relative z-10 transition-all duration-300 ease-in-out group-hover:translate-x-12 group-hover:opacity-0">
        <div className="bg-current h-2 w-2 rounded-full"></div>
        <span className="inline-block">
          {children}
        </span>
      </div>
      
      {/* Hover content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 translate-x-12 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 text-gray-900">
        <span>{children}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </button>
  );
}