"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-dark px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
          Sorry, you&apos;re at the wrong place, let&apos;s take you home
        </h1>

        <Button onClick={() => router.push("/")}>Take Me Home</Button>
      </div>
    </main>
  );
}
