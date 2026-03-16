"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CardStyle = {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

export const DEFAULT_CARD_STYLE: Required<CardStyle> = {
  bgColor: "var(--primary-light)",
  borderColor: "var(--primary-dark)",
  textColor: "var(--foreground)",
};

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  cardStyle?: CardStyle;
  shadowOffset?: number;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, cardStyle, shadowOffset = 8, style, ...props }, ref) => {
    const mergedStyle = {
      ...DEFAULT_CARD_STYLE,
      ...cardStyle,
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-4xl border-4", className)}
        style={{
          backgroundColor: mergedStyle.bgColor,
          borderColor: mergedStyle.borderColor,
          color: mergedStyle.textColor,
          boxShadow: `0 ${shadowOffset}px 0 ${mergedStyle.borderColor}`,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export type CardSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pb-3 pt-6 sm:px-8 sm:pt-8", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-2 pb-12 sm:px-8", className)}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 px-6 pb-6 pt-4 sm:px-8 sm:pb-8",
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";
