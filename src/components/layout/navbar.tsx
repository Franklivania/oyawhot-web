"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Modal, ModalContent, ModalHeader } from "../ui/modal";
import { useMemo, useState } from "react";
import { detectOS, type OSDevice } from "@/lib/detect-os";
import { DownloadModalContent } from "./download-modal-content";

// update to proper ones later
const STORE_LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.oyawhot.app",
  ios: "https://apps.apple.com/app/id0000000000",
} as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const device = useMemo<OSDevice>(() => detectOS().device, []);

  const handleDownload = () => {
    setIsOpen(true);
  };

  return (
    <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/30 px-6 py-8">
      <Link href="/">
        <Image src="/logo.svg" alt="Oyawhot Logo" width={100} height={100} />
      </Link>

      <aside>
        <Button onClick={handleDownload}>
          Download App
        </Button>
      </aside>

      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        size="lg"
        closeButton
        ariaLabel="Download Oyawhot App"
      >
        <ModalHeader className="text-white">
          <h2 className="text-2xl">Download Oyawhot</h2>
          <p className="mt-2 text-sm font-normal text-white/80">
            Get the best experience on mobile.
          </p>
        </ModalHeader>
        <ModalContent className="pb-8">
          <DownloadModalContent
            device={device}
            androidUrl={STORE_LINKS.android}
            iosUrl={STORE_LINKS.ios}
          />
        </ModalContent>
      </Modal>
    </header>
  );
}
