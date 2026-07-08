import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen w-full bg-white flex flex-col md:flex-row font-sans p-[10px] overflow-hidden">
      {/* Left Side: Artwork Poster */}
      <div className="h-full aspect-[720/994] rounded-[20px] overflow-hidden relative bg-neutral-950">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
        <Image
          src="/assets/image.png"
          alt="Artwork"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/30 to-black/10 flex flex-col justify-end p-[24px] text-white">
          <h1 className="text-xl md:text-xl lg:text-3xl font-normal leading-tight mb-4 tracking-tight">
            Turn Your Photos Into Original Art
          </h1>
          <p className="text-white/80 text-[10.5px]">
            Upload any photo and watch AI transform it into gallery-worthy
            artwork. Museum-quality prints shipped worldwide.
          </p>
        </div>
      </div>

      {/* Right Side: Form Content Wrapper */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-12 py-8 h-full">
        <div className="max-w-[400px] mx-auto w-full">{children}</div>
      </div>
    </div>
  );
}
