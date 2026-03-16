"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonStyle = {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

const DEFAULT_BUTTON_STYLE: Required<ButtonStyle> = {
  bgColor: "var(--mustard)",
  borderColor: "var(--mustard-dark)",
  textColor: "var(--brown)",
};

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "style"
> & {
  buttonStyle?: ButtonStyle;
  style?: React.CSSProperties;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, buttonStyle, children, style, ...props }, ref) => {
    const mergedStyle = {
      ...DEFAULT_BUTTON_STYLE,
      ...buttonStyle,
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex min-h-14 items-center justify-center rounded-[2.25rem] border-4 px-12 py-3",
          "text-xl leading-none font-black tracking-tight",
          "transition duration-150 ease-out",
          "hover:-translate-y-0.5 hover:brightness-[0.98]",
          "active:translate-y-0.5 active:brightness-[0.95]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-blue/50",
          "disabled:pointer-events-none disabled:opacity-60",
          className
        )}
        style={{
          backgroundColor: mergedStyle.bgColor,
          borderColor: mergedStyle.borderColor,
          color: mergedStyle.textColor,
          boxShadow: `0 8px 0 ${mergedStyle.borderColor}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, DEFAULT_BUTTON_STYLE };
