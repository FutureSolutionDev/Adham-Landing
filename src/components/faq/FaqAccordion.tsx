"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/api/adham";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-primary/10 bg-white/90 shadow-[0_8px_30px_rgba(45,55,72,0.06)]"
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-primary sm:text-base"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.QuestionEn}</span>
              <span
                className="shrink-0 text-lg leading-none text-copper"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-primary/10 px-5 py-4">
                <p className="text-sm leading-relaxed text-primary/85">
                  {item.AnswerEn}
                </p>
                {item.Answer && item.Answer !== item.AnswerEn && (
                  <p
                    className="mt-3 border-t border-primary/10 pt-3 font-serif text-sm leading-relaxed text-primary/70"
                    dir="rtl"
                  >
                    {item.Answer}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
