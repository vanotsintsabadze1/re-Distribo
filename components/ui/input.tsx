import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-[.6rem] text-red-500 uppercase font-medium tracking-wider">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
