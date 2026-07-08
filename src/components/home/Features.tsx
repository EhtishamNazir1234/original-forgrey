import { shiningStickIcon,globeIcon,museumIcon,artIcon } from "@/assets/icons/svgs";
export function Features() {
  const featuresList = [
    {
      name: "AI-Powered Creation",
      description:
        "Advanced AI models analyze your photo and reimagine it in any artistic style with remarkable detail.",
      icon: shiningStickIcon,
    },
    {
      name: "Museum-Quality Prints",
      description:
        "Premium archival papers, canvas, and metal prints that look stunning in any space.",
      icon: museumIcon,
    },
    {
      name: "Worldwide Shipping",
      description:
        "SPrinted locally and shipped to 30+ countries with professional fulfillment partners.",
      icon: globeIcon,
    },
    {
      name: "Your Art, Your Rights",
      description:
        "Every piece is uniquely generated for you. Download, print, and share as you wish.",
      icon: artIcon,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Art Made Personal!
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
            Original Forgery bridges the gap between your favorite photos and one-of-a-kind artwork. Powered by cutting-edge AI, we transform moments into masterpieces.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mx-auto mt-16 max-w-5xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuresList.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.name}
                className="bg-zinc-50 border border-zinc-100 rounded-3xl p-3 flex flex-col items-start gap-4 transition-all hover:shadow-lg hover:shadow-zinc-100/50 hover:bg-white"
              >
                {/* Number / Icon Badge */}
                <div className="flex justify-between items-center w-full">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <IconComponent />
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="font-bold text-zinc-900 text-sm leading-tight">
                    {feature.name}
                  </h3>
                  <p className="mt-2.5 text-xs text-zinc-500 font-medium leading-relaxed">
                    {feature.description}
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
