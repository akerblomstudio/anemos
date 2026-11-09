import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { btn, Eyebrow } from "@/components/site/ui";
import { categories, formatDate, getEvent } from "@/content/events";
import { site } from "@/content/site";

export const Route = createFileRoute("/program/$slug")({
  loader: ({ params }) => {
    const e = getEvent(params.slug);
    if (!e) throw notFound();
    return e;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.title} – Anemos` : "Programpunkt – Anemos";
    const d = loaderData?.summary ?? "Programpunkt hos Anemos i Malmö.";
    return {
      meta: [
        { title: t }, { name: "description", content: d },
        { property: "og:title", content: t }, { property: "og:description", content: d },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24">
      <h1 className="text-5xl font-extrabold">Programpunkten finns inte</h1>
      <Link to="/program" className="mt-6 inline-block underline">Till programmet</Link>
    </div>
  ),
  component: EventPage,
});

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-4">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold">{children}</dd>
    </div>
  );
}

function EventPage() {
  const e = Route.useLoaderData();
  return (
    <article className="container-page grid gap-12 py-16 md:grid-cols-12">
      <div className="md:col-span-7">
        <Link to="/program" className="text-sm font-semibold underline underline-offset-4">← Programmet</Link>
        <Eyebrow className="mt-8">{categories[e.category]}{e.demo ? " · Exempeldata" : ""}</Eyebrow>
        <h1 className="mt-4 text-5xl font-extrabold md:text-7xl">{e.title}</h1>
        {e.image && <img src={e.image} alt={e.imageAlt ?? ""} className="mt-10 aspect-video w-full object-cover" />}
        <div className="mt-10 space-y-4 text-lg">{e.description.map((p, i) => <p key={i}>{p}</p>)}</div>
      </div>
      <aside className="md:col-span-4 md:col-start-9">
        <dl className="bg-sage p-6">
          <Row label="När">{formatDate(e.start)}{e.end && ` – ${formatDate(e.end)}`}</Row>
          <Row label="Plats">{e.location}</Row>
          {e.performers?.length ? <Row label="Medverkande">{e.performers.join(", ")}</Row> : null}
          {e.price && <Row label="Pris">{e.price}</Row>}
          {e.ageLimit && <Row label="Åldersgräns">{e.ageLimit}</Row>}
          {e.accessibility && <Row label="Tillgänglighet">{e.accessibility}</Row>}
        </dl>
        {e.ticketUrl && <a href={e.ticketUrl} className={btn({ variant: "coral" }) + " mt-6 w-full"}>Biljetter och anmälan</a>}
        <p className="mt-6 text-sm">
          Frågor? {e.contact ?? site.email ? <a className="underline" href={`mailto:${e.contact ?? site.email}`}>{e.contact ?? site.email}</a> : <Link to="/kontakt" className="underline">Kontakta oss</Link>}
        </p>
      </aside>
    </article>
  );
}
