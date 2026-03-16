"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { OSDevice } from "@/lib/detect-os";
import { cn } from "@/lib/utils";

type DownloadModalContentProps = {
  device: OSDevice;
  androidUrl: string;
  iosUrl: string;
  className?: string;
};

function getQrSrc(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    url
  )}`;
}

function openExternal(url: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function StoreCard({
  title,
  description,
  buttonLabel,
  url,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  url: string;
}) {
  return (
    <Card className="flex h-full flex-col text-white" shadowOffset={6}>
      <CardHeader className="pb-2">
        <h3 className="text-lg">{title}</h3>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center gap-4 pb-6 text-center">
        <p className="text-sm text-white/80">{description}</p>
        <div className="rounded-3xl border-4 border-primary-dark bg-white p-3">
          <Image
            src={getQrSrc(url)}
            alt={`${title} QR code`}
            width={140}
            height={140}
            className="h-36 w-36 rounded-xl"
            unoptimized
          />
        </div>
        <Button onClick={() => openExternal(url)} className="mt-1 w-full text-sm">
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export function DownloadModalContent({
  device,
  androidUrl,
  iosUrl,
  className,
}: DownloadModalContentProps) {
  if (device === "android") {
    return (
      <div className={cn("space-y-4 text-center text-white", className)}>
        <p className="text-base text-white/90">
          Download Oyawhot directly from Google Play.
        </p>
        <div className="mx-auto w-max">
          <Button onClick={() => openExternal(androidUrl)}>Get it on Play Store</Button>
        </div>
      </div>
    );
  }

  if (device === "ios") {
    return (
      <div className={cn("space-y-4 text-center text-white", className)}>
        <p className="text-base text-white/90">
          Download Oyawhot directly from the App Store.
        </p>
        <div className="mx-auto w-max">
          <Button onClick={() => openExternal(iosUrl)}>Download on App Store</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6 text-white", className)}>
      <p className="text-center text-sm text-white/85">
        Install Oyawhot on your phone by clicking a store button
        or scanning a QR code.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StoreCard
          title="Google Play"
          description="Android devices"
          buttonLabel="Open Play Store"
          url={androidUrl}
        />
        <StoreCard
          title="Apple App Store"
          description="iPhone and iPad"
          buttonLabel="Open App Store"
          url={iosUrl}
        />
      </div>
    </div>
  );
}
