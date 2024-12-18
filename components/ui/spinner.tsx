import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | number;
  color?: string;
  width?: number | string;
  height?: number | string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", color = "text-primary", width, height, className, ...props }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const sizeClass = typeof size === "string" ? sizeClasses[size] : "";

  return (
    <div
      className={cn("flex items-center justify-center", width ? `w-[${width}px]` : "w-full", height ? `h-[${height}px]` : "h-full", className)}
      {...props}
    >
      <Loader2
        className={cn("animate-spin", color, sizeClass, typeof size === "number" ? `w-[${size}px] h-[${size}px]` : "")}
        style={typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : undefined}
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
