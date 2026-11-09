import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro, DevNote } from "@/components/site/ui";
import { EmptyProgram, EventRow } from "@/components/site/EventCard";
import { categories, getEvents, isUpcoming, type CategoryKey } from "@/content/events";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/program/")({
  head: () => meta("Program – Anemos", "Livemusik, scenkonst, konstnärliga möten och workshops med Anemos i Malmö."),
  component: Program,
});

function Program() {
  const events = getEvents();
  const [cat, setCat] = useState<CategoryKey | "alla">("alla");
  const [tab, setTab] = useState<"kommande" | "tidigare">("kommande");
  const used = (Object.keys(categories) as CategoryKey[]).filter((k) => events.some((e) => e.category === k));
  const list = events
    .filter((e) => (tab === "kommande" ? isUpcoming(e) : !isUpcoming(e)))
    .filter((e) => cat === "alla" || e.category === cat);
  if (tab === "tidigare") list.reverse();

  const chip = (active: boolean) => cn("min-h-11 rounded-full border-2 border-charcoal px-4 text-sm font-semibold", active ? "bg-charcoal text-bone" : "hover:bg-sage");

  return (
    <>
      <PageIntro eyebrow="Program" title="Vad händer?" lead="Annonserade konserter, framträdanden, möten och workshops som du kan uppleva eller delta i." />
      <section className="container-page">
        {events.some((e) => e.demo) && <div className="mb-6"><DevNote>Exempeldata visas här men döljs på den publika sidan.</DevNote></div>}
        {events.length > 0 && (
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div role="group" aria-label="Tid" className="flex gap-2">
              {(["kommande", "tidigare"] as const).map((t) => (
                <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)} className={chip(tab === t)}>
                  {t === "kommande" ? "Kommande" : "Tidigare"}
                </button>
              ))}
            </div>
            {used.length > 1 && (
              <div role="group" aria-label="Filtrera efter kategori" className="flex flex-wrap gap-2">
                <button aria-pressed={cat === "alla"} onClick={() => setCat("alla")} className={chip(cat === "alla")}>Alla</button>
                {used.map((k) => (
                  <button key={k} aria-pressed={cat === k} onClick={() => setCat(k)} className={chip(cat === k)}>{categories[k]}</button>
                ))}
              </div>
            )}
          </div>
        )}
        {list.length ? list.map((e) => <EventRow key={e.slug} e={e} />) : tab === "tidigare" ? <p className="py-10 text-lg">Inga tidigare arrangemang att visa ännu.</p> : <EmptyProgram />}
      </section>
    </>
  );
}
