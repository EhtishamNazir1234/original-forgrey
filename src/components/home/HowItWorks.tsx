"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HowItWorks() {
  const steps = [
    {
      id: "Step 1",
      title: "Upload Photo",
      description: "Select any portrait, landscape, or pet photo from your device.",
    },
    {
      id: "Step 2",
      title: "Select Style",
      description: "Choose from Pop Art, Pencil Sketch, Oil Painting, and more.",
    },
    {
      id: "Step 3",
      title: "Preview",
      description: "Watch our custom AI model render the masterpiece in real time.",
    },
    {
      id: "Step 4",
      title: "Order Print",
      description: "Receive museum-quality physical prints shipped worldwide.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Steps list */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                How it Works
              </h2>
              <p className="mt-4 text-sm text-zinc-400 font-medium leading-relaxed max-w-md">
                Turn your digital memories into physical gallery pieces in four straightforward steps.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col gap-1 transition-all hover:bg-white/10"
                >
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    {step.id}
                  </span>
                  <h3 className="font-bold text-sm text-white">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mt-0.5">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Link href="/login">
                <Button className="bg-[#e59500] hover:bg-[#cc8500] text-white font-bold rounded-xl px-6 shadow-lg shadow-amber-500/10">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-zinc-300 hover:text-white font-semibold">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: AI Scan Face Mockup */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[30px] overflow-hidden border border-white/10 shadow-2xl group bg-neutral-900">
              
              {/* Floating scanner effect */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-[bounce_5s_infinite_linear] z-20 pointer-events-none" />

              {/* Scanning visual matrix dots overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.15)_1px,transparent_1px)] [background-size:16px_16px] z-10" />

              {/* Face image with overlay scan gradient */}
              <img
                src="/assets/image.png"
                alt="AI Scanning Portrait"
                className="object-cover w-full h-full opacity-70 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Glowing card border overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-neutral-950/10 flex flex-col justify-end p-6 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase leading-none">
                    AI Rendering Engine Active
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-2">
                  Pop Art Sketch Transfer
                </h4>
                <p className="text-[10.5px] text-zinc-400 mt-1 font-light leading-relaxed">
                  Mapping facial structures and texture fields using custom deep neural network layers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
