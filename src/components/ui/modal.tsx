"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@/components/icons/close";
import { cn } from "@/lib/utils";

type ModalStyle = {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

export const DEFAULT_MODAL_STYLE: Required<ModalStyle> = {
  bgColor: "var(--primary-alpha)",
  borderColor: "var(--primary-dark)",
  textColor: "var(--foreground)",
};

const MODAL_SIZE_CLASS: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export type ModalProps = {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  modalStyle?: ModalStyle;
  closeButton?: boolean;
  closeButtonAriaLabel?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  ariaLabel?: string;
  overlayClassName?: string;
  className?: string;
  portalTarget?: HTMLElement | null;
};

export function Modal({
  open,
  onOpenChange,
  children,
  size = "md",
  modalStyle,
  closeButton = true,
  closeButtonAriaLabel = "Close modal",
  closeOnEscape = true,
  closeOnOverlayClick = true,
  ariaLabel = "Modal",
  overlayClassName,
  className,
  portalTarget,
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  const mergedStyle = React.useMemo(
    () => ({
      ...DEFAULT_MODAL_STYLE,
      ...modalStyle,
    }),
    [modalStyle]
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEscape, onOpenChange, open]);

  React.useEffect(() => {
    if (!open || typeof document === "undefined") {
      return;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  if (!mounted || !open) {
    return null;
  }

  const target = portalTarget ?? document.body;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6",
        "bg-black/60 backdrop-blur-[1px]",
        overlayClassName
      )}
      onMouseDown={() => {
        if (closeOnOverlayClick) {
          onOpenChange(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={cn(
          "relative w-full rounded-4xl border-4",
          "max-h-[calc(100dvh-4rem)] overflow-y-auto",
          MODAL_SIZE_CLASS[size],
          className
        )}
        style={{
          backgroundColor: mergedStyle.bgColor,
          borderColor: mergedStyle.borderColor,
          color: mergedStyle.textColor,
          boxShadow: `0 10px 0 ${mergedStyle.borderColor}`,
        }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {closeButton ? (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label={closeButtonAriaLabel}
            className={cn(
              "absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-4",
              "transition duration-150 ease-out",
              "hover:-translate-y-0.5 hover:brightness-[0.98]",
              "active:translate-y-0.5 active:brightness-[0.95]",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-blue/50"
            )}
            style={{
              backgroundColor: "var(--mustard)",
              borderColor: "var(--mustard-dark)",
              color: "var(--brown)",
              boxShadow: "0 6px 0 var(--mustard-dark)",
            }}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        ) : null}

        {children}
      </div>
    </div>,
    target
  );
}

export type ModalSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pb-6 pt-6 sm:px-8 sm:pt-8",
        "text-xl font-semibold",
        "border-b",
        className
      )}
      {...props}
    />
  )
);

ModalHeader.displayName = "ModalHeader";

export const ModalContent = React.forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-2 sm:px-8", className)} {...props} />
  )
);

ModalContent.displayName = "ModalContent";

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-end gap-3 px-6 pb-6 pt-4 sm:px-8 sm:pb-8",
        className
      )}
      {...props}
    />
  )
);

ModalFooter.displayName = "ModalFooter";
