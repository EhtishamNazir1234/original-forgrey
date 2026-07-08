"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import dashboardImg from "@/assets/homePage/dashboard.png";

export function Hero() {
  const handleScrollToHowItWorks = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const elem = document.getElementById("how-it-works");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fcebd4] via-[#fdf6eb] to-white pt-36 pb-20 lg:pt-48 lg:pb-32">

      {/* Background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center relative z-10 flex flex-col items-center">

        {/* Main Headings */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-950 max-w-4xl leading-[1.1] animate-slide-up">
          Turn Your Photos <br />
          Into Original Art
        </h1>
        <p className="mt-6 text-base sm:text-lg text-zinc-500 font-medium leading-relaxed">
          Upload any photo and watch AI transform it into gallery-worthy artwork. Choose from stunning art<br/> styles, then order museum-quality prints delivered to your door.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/login">
            <Button size="lg" className="bg-[#e59500] hover:bg-[#cc8500] text-black font-semibold rounded-xl px-8 shadow-lg shadow-amber-500/15 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Start creating free
            </Button>
          </Link>
          <Button
            onClick={handleScrollToHowItWorks}
            variant="outline"
            size="lg"
            className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 font-bold rounded-2xl px-8"
          >
            See how it works
          </Button>
        </div>

        <Image
          src={dashboardImg}
          alt="Creator Studio Dashboard"
          className="w-full h-auto"
          priority
        />

      </div>
    </section>
  );
}
