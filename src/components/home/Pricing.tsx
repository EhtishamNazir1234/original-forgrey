"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Ideal for trying out our AI generation styles.",
      features: [
        "2 free artwork generations",
        "Standard-resolution previews",
        "Digital download copy only",
        "Standard customer support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium Creator",
      price: "$129",
      description: "Perfect for printing and owning physical masterpieces.",
      features: [
        "Unlimited artwork generations",
        "Ultra-high resolution downloads",
        "1x Museum-quality physical print included",
        "Free worldwide shipping with tracking",
        "Full commercial rights ownership",
        "24/7 Priority VIP support",
      ],
      cta: "Order Now",
      popular: true,
    },
  ];

  const sizePricing = [
    { size: "8 × 10 in", type: "Premium Matte Paper", shipping: "Free Worldwide", price: "$29" },
    { size: "12 × 18 in", type: "Premium Matte Paper", shipping: "Free Worldwide", price: "$49" },
    { size: "18 × 24 in", type: "Premium Matte Paper", shipping: "Free Worldwide", price: "$69" },
    { size: "24 × 36 in", type: "Premium Matte Paper", shipping: "Free Worldwide", price: "$89" },
  ];

  return (
    <section id="pricing" className="py-24 bg-zinc-50 border-t border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
            Create online for free, or order stunning physical wall art prints for your home.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                plan.popular
                  ? "bg-[#121324] text-white border-transparent shadow-xl relative"
                  : "bg-white text-zinc-900 border-zinc-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-4 rounded-full">
                  Recommended
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold leading-none">{plan.name}</h3>
                <p className={`mt-2 text-xs leading-relaxed ${plan.popular ? "text-slate-400" : "text-zinc-500"}`}>
                  {plan.description}
                </p>

                {/* Price block */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className={`text-xs ${plan.popular ? "text-slate-400" : "text-zinc-500"}`}>
                      / one-time
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className={`h-px my-6 ${plan.popular ? "bg-white/10" : "bg-zinc-100"}`} />

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.popular ? "bg-amber-500/20 text-amber-400" : "bg-amber-500/10 text-amber-600"
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link href="/login">
                  <Button
                    className={`w-full py-3.5 rounded-xl font-bold justify-center transition-all ${
                      plan.popular
                        ? "bg-[#e59500] hover:bg-[#cc8500] text-white"
                        : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Print Size Pricing Table */}
        <div className="mx-auto mt-20 max-w-3xl bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest text-center mb-6">
            A la Carte Print Sizing
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-500">
              <thead>
                <tr className="border-b border-zinc-100 pb-2">
                  <th className="pb-3 font-bold text-zinc-950">Dimensions</th>
                  <th className="pb-3 font-bold text-zinc-950">Print Media</th>
                  <th className="pb-3 font-bold text-zinc-950">Shipping</th>
                  <th className="pb-3 font-bold text-zinc-950 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {sizePricing.map((item) => (
                  <tr key={item.size} className="hover:bg-zinc-50/50">
                    <td className="py-3.5 font-bold text-zinc-900">{item.size}</td>
                    <td className="py-3.5">{item.type}</td>
                    <td className="py-3.5 font-medium text-emerald-600">{item.shipping}</td>
                    <td className="py-3.5 font-bold text-zinc-900 text-right">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
