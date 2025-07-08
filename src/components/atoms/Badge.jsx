import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-700 text-gray-300",
      primary: "bg-primary text-white",
      secondary: "bg-surface text-gray-300",
      accent: "bg-accent text-black",
      netflix: "bg-netflix text-white",
      prime: "bg-prime text-white",
      disney: "bg-disney text-white",
      hulu: "bg-hulu text-black",
      hbo: "bg-hbo text-white",
      apple: "bg-apple text-white",
      paramount: "bg-paramount text-white",
      peacock: "bg-peacock text-white"
    };

    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-200",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;