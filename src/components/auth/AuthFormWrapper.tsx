import Image from "next/image";
import React from "react";
import { GoogleLogo } from "@/assets/icons/svgs";

interface AuthFormWrapperProps {
  title: string;
  subtitle: React.ReactNode;
  error?: string | null;
  success?: string | null;
  loading: boolean;
  onGoogleLogin: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthFormWrapper({
  title,
  subtitle,
  error,
  success,
  loading,
  onGoogleLogin,
  onSubmit,
  submitButtonText,
  footer,
  children,
}: AuthFormWrapperProps) {
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
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/30 to-black/10 flex flex-col justify-end px-[18px] pb-[24px] pt-[18px] text-white">
          <h1 className="text-xl md:text-xl lg:text-3xl font-normal leading-tight mb-4 tracking-tight">
            Turn Your Photos Into Original Art
          </h1>
          <p className="text-white/80 text-[10.5px]">
            Upload any photo and watch AI transform it into gallery-worthy
            artwork. Museum-quality prints shipped worldwide.
          </p>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-12 py-8 h-full">
        <div className="max-w-[400px] mx-auto w-full">
          <h2 className="text-3xl font-semibold text-black">{title}</h2>
          <div className="mb-8">{subtitle}</div>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 text-sm text-green-600 bg-green-50 rounded-xl border border-green-100">
              {success}
            </div>
          )}

          <button
            onClick={onGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors text-sm font-medium mb-6 cursor-pointer shadow-sm"
          >
            <GoogleLogo className="w-5 h-5" />
            Continue with Google
          </button>

          <form onSubmit={onSubmit} className="space-y-5">
            {children}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e59500] hover:bg-[#cc8500] active:bg-[#b37400] text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-amber-500/10 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Loading..." : submitButtonText}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
