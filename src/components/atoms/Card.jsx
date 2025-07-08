import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-xl border border-gray-800 bg-gradient-surface shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;