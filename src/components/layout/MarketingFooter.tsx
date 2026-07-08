"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function MarketingFooter() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:flex md:items-center md:justify-between lg:px-8">
        
        {/* Left Side Logo & Copy */}
        <div className="flex flex-col gap-4 md:order-1 md:mt-0">
          <Link href="/" onClick={handleScrollToTop} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-[#e59500] flex items-center justify-center font-bold text-sm text-white shadow-sm shadow-amber-500/20">
              O
            </div>
            <div>
              <h1 className="font-bold text-xs tracking-wider uppercase text-zinc-900 leading-none mb-0.5">
                Original Forgrey
              </h1>
              <span className="text-[9px] text-zinc-400 font-semibold tracking-wider uppercase">
                Creator Studio
              </span>
            </div>
          </Link>
          <p className="text-xs text-zinc-400 max-w-sm">
            &copy; {new Date().getFullYear()} Original Forgrey. All rights reserved. Upload photos and transform them into gorgeous, custom physical prints shipped worldwide.
          </p>
        </div>

        {/* Right Side Links & CTA */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:order-2 md:mt-0">
          <Link href="/privacy" className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors">
            Terms of Service
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-[#e59500] hover:bg-[#cc8500] text-white font-semibold rounded-xl shadow-md shadow-amber-500/10">
              Start Creating
            </Button>
          </Link>
        </div>

      </div>
    </footer>
  );
}
