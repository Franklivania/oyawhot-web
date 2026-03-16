import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import bgImage from "@/components/images/oyawhot-spiral.svg";

export default function Home() {
  return (
    <div className="relativew-full max-w-8xl mx-auto min-h-screen bg-primary-dark">
      <Image
        src={bgImage}
        alt="Oyawhot Spiral"
        className="absolute inset-0 object-cover"
        fill
      />
      <Navbar />

      <main className="relative w-full min-h-200 max-w-4xl flex flex-col gap-12 items-center justify-center mx-auto">
        <h1 className="h1 xl:text-6xl! text-center text-white">
          Join your mates <span className="text-sky-blue">worldwide</span> to
          play a game of whot
        </h1>

        <Button
        // buttonStyle={{
        //   bgColor: "var(--black)",
        //   borderColor: "var(--black-2)",
        //   textColor: "var(--background)",
        // }}
        >
          Download App
        </Button>
      </main>
    </div>
  );
}
