import { Link } from "@tanstack/react-router";
import { categories, formatDate, type ProgramEvent } from "@/content/events";

export function EventRow({ e }: { e: ProgramEvent }) {
  return (
    <article className="group grid gap-4 border-t-2 border-midnight py-8 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <p className="font-display text-xl font-bold">{formatDate(e.start)}</p>
        <p className="mt-1 text-muted-foreground">{e.location}</p>
      </div>
      <div className="md:col-span-6">
        <p className="eyebrow text-sage-deep">
          {categories[e.category]} {e.demo && <span className="ml-2 bg-pink px-2 py-0.5 text-midnight">Exempeldata</span>}
        </p>
        <h3 className="mt-2 text-3xl font-extrabold md:text-4xl">
          <Link to="/program/$slug" params={{ slug: e.slug }} className="hover:text-sage-deep">{e.title}</Link>
        </h3>
        <p className="mt-3 max-w-xl">{e.summary}</p>
      </div>
      <div className="md:col-span-3">
        {e.image ? (
          <img src={e.image} alt={e.imageAlt ?? ""} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div aria-hidden className="wind-line aspect-[4/3] w-full bg-sage" />
        )}
        <Link to="/program/$slug" params={{ slug: e.slug }} className="mt-3 inline-block font-semibold underline decoration-coral decoration-2 underline-offset-4">
          Mer information<span className="sr-only"> om {e.title}</span>
        </Link>
      </div>
    </article>
  );
}

export function EmptyProgram() {
  return (
    <div className="relative overflow-hidden border-2 border-midnight bg-sage p-10 md:p-16">
      <div aria-hidden className="wind-line absolute inset-y-0 right-0 w-1/3 opacity-60" />
      <p className="relative max-w-2xl font-display text-3xl font-bold md:text-5xl">
        Nya kulturmöten tar form. Här hittar du nästa programpunkt när den är klar.
      </p>
    </div>
  );
}
