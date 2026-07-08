"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqItems = [
    {
      q: "How does the AI art generator work?",
      a: "Simply upload your photo to the Creator Studio dashboard. Our custom neural style transfer models process the shapes, lighting, and edges of your image and redraw them using custom artistic textures, colors, and brushstrokes in real time.",
    },
    {
      q: "What print options do you offer?",
      a: "We print exclusively on museum-quality matte paper (80lb / 250gsm) using archival giclée pigment inks. This creates a thick, textured finish that prevents reflection and keeps details sharp and vibrant for decades.",
    },
    {
      q: "How long does shipping take?",
      a: "Production and quality checking take 2 to 3 business days. Free standard shipping is fully tracked and takes between 5 to 10 business days depending on your country. We safely package all prints in heavy-duty cardboard tubes.",
    },
    {
      q: "Do I own the rights to the AI art?",
      a: "Yes. You receive full commercial ownership and reproduction rights for any digital canvas generated inside your Creator Studio. You are free to frame, replicate, upload, or sell your art commercially.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
            Have questions? We've got answers. Contact support if you need more help.
          </p>
        </div>

        {/* FAQs Accordion Accordions */}
        <div className="mx-auto mt-16 max-w-2xl flex flex-col gap-4">
          {faqItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="border border-zinc-150 rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-zinc-900 text-sm md:text-base transition-colors hover:bg-zinc-50 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[200px] border-t border-zinc-100" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-xs md:text-sm text-zinc-500 leading-relaxed font-light bg-zinc-50/50">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
