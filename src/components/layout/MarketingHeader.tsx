"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isOpaque = isScrolled || mobileMenuOpen;

  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Gallery", href: "#showcase" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faqs" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isOpaque
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="font-extrabold text-base tracking-wider uppercase text-zinc-950">
            ORIGINAL FORGREY
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/login" className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors">
            Log in
          </Link>
          <Link href="/login">
            <Button className="bg-[#e59500] hover:bg-[#cc8500] text-black font-semibold rounded-xl shadow-md shadow-amber-500/10 px-5 py-2.5 text-xs">
              Start creating free
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-zinc-100 my-2" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors py-2 block">
              Log in
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#e59500] hover:bg-[#cc8500] text-black font-bold rounded-full py-3 justify-center">
                Start creating free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
