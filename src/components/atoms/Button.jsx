import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/25 focus:ring-primary glow-button",
      secondary: "bg-surface text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-gray-500",
      accent: "bg-accent text-black hover:bg-amber-400 focus:ring-accent",
      ghost: "text-gray-300 hover:text-white hover:bg-surface focus:ring-gray-500",
      platform: "text-white font-semibold hover:transform hover:scale-105 transition-all duration-200 platform-badge"
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl"
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;