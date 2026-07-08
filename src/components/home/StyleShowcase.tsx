"use client";

import { useState } from "react";

export function StyleShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", name: "All Styles" },
    { id: "sketch", name: "Sketch" },
    { id: "pop-art", name: "Pop Art" },
    { id: "oil-paint", name: "Oil Paint" },
  ];

  const artworks = [
    {
      id: 1,
      title: "Pencil Sketch Classic",
      style: "sketch",
      styleLabel: "Classic Sketch",
      image: "/art_pencil_sketch.png",
    },
    {
      id: 2,
      title: "Neon Pop Art Burst",
      style: "pop-art",
      styleLabel: "Pop Art Painting",
      image: "/art_pop_art.png",
    },
    {
      id: 3,
      title: "Archival Oil Canvas",
      style: "oil-paint",
      styleLabel: "Textured Oil",
      image: "/art_oil_paint.png",
    },
    {
      id: 4,
      title: "Graphite Outline Portrait",
      style: "sketch",
      styleLabel: "Classic Sketch",
      image: "/art_pencil_sketch.png",
    },
    {
      id: 5,
      title: "Vintage Screenprint",
      style: "pop-art",
      styleLabel: "Pop Art Painting",
      image: "/art_pop_art.png",
    },
    {
      id: 6,
      title: "Impressionist Oil Stroke",
      style: "oil-paint",
      styleLabel: "Textured Oil",
      image: "/art_oil_paint.png",
    },
  ];

  const filteredArtworks =
    activeTab === "all"
      ? artworks
      : artworks.filter((item) => item.style === activeTab);

  return (
    <section id="showcase" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Style Showcase
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
            Choose from a wide variety of premium AI artistic styles tailored to your taste.
          </p>
        </div>

        {/* Style Tabs */}
        <div className="mt-10 flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-zinc-950 text-white shadow-md shadow-zinc-950/10"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Art Grid */}
        <div className="mx-auto mt-12 max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h4 className="font-bold text-zinc-900 text-sm leading-snug">
                  {art.title}
                </h4>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                  {art.styleLabel}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
