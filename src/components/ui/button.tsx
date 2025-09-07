"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-teal-500 text-white hover:bg-teal-400 dark:bg-teal-500 dark:hover:bg-teal-400",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
        ghost: "bg-transparent hover:bg-zinc-100/5",
        outline:
          "border border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-100/5",
        destructive:
          "bg-red-500 text-white hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400",
        gradient:
          "text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 hover:from-teal-400 hover:via-cyan-400 hover:to-indigo-400 shadow-[0_0_0_1px_rgba(20,184,166,0.3),0_8px_30px_rgba(45,212,191,0.15)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
