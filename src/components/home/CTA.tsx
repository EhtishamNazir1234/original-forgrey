"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 sm:px-8 relative z-10 text-center">
        <div className="bg-gradient-to-br from-[#4d3305] to-[#201502] border border-amber-950/20 rounded-[40px] p-8 sm:p-12 md:p-16 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-amber-200/80 max-w-lg mx-auto font-light leading-relaxed">
            Upload your photos today and watch AI transform them into museum-quality physical prints. Free worldwide shipping included.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-[#e59500] hover:bg-[#cc8500] text-white font-bold rounded-2xl px-10 shadow-lg shadow-amber-500/15 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
