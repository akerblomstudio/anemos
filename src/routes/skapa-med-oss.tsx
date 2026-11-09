import { createFileRoute, Link } from "@tanstack/react-router";
import skapa from "@/assets/skapa.jpg";
import { PageIntro } from "@/components/site/ui";
import { IdeaForm } from "@/components/site/forms";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/skapa-med-oss")({
  head: () => meta("Skapa med oss – Anemos", "Har du en idé, ett projekt eller något du vill utveckla? Berätta för Anemos så undersöker vi möjligheterna tillsammans."),
  component: Skapa,
});

// Bekräftade resurser läggs till här när de finns. Tom lista = förfrågningsbaserat innehåll.
const confirmedResources: { title: string; text: string }[] = [];

const areas = [
  {
    n: "A", title: "Lokal & teknik", tone: "bg-sage",
    items: ["Lokal", "Studio", "Arbetsplats", "Teknisk utrustning", "Digitala verktyg för skapande och kulturprojekt"],
    lead: "Berätta vad du behöver för ditt skapande, så undersöker vi möjligheterna.",
  },
  {
    n: "B", title: "Produktion & projekt", tone: "bg-pink",
    items: ["Kulturproduktion och arrangemang", "Gemensamma kulturprojekt", "Projektutveckling och samordning", "Projektledning och produktionsstöd", "Administration, rådgivning och praktiskt stöd", "Digitala lösningar som stödjer ett kulturprojekt"],
    lead: "Vill du genomföra ett arrangemang eller utveckla ett kulturprojekt? Berätta om idén och vilket stöd eller samarbete du söker.",
  },
  {
    n: "C", title: "Utbildning & kunskapsutbyte", tone: "bg-midnight text-ivory",
    items: ["Workshops", "Utbildningar", "Erfarenhetsutbyte", "Lärande i gemensamma kulturprojekt", "Samarbeten med studieförbund och andra kulturaktörer"],
    lead: "Har du något att lära ut, eller vill du lära dig något tillsammans med andra? Föreslå en workshop eller ett utbyte.",
  },
];

function Skapa() {
  return (
    <>
      <PageIntro eyebrow="Skapa med oss" title="Vad vill du skapa?" lead="Har du en idé, ett projekt eller något du vill utveckla? Hör av dig så undersöker vi vilka möjligheter som finns att ta nästa steg tillsammans." />
      <div className="container-page">
        <p className="max-w-2xl text-muted-foreground">Du behöver inte veta om du söker en lokal, en producent eller en samarbetspartner. Börja med idén – resten tar vi reda på tillsammans.</p>
      </div>

      <section aria-label="Områden" className="container-page mt-16 space-y-6">
        {areas.map((a, i) => (
          <div key={a.n} className={`${a.tone} grid gap-8 border-2 border-midnight p-8 md:grid-cols-12 md:p-12 ${i === 1 ? "md:ml-16" : i === 2 ? "md:mr-16" : ""}`}>
            <div className="md:col-span-5">
              <p className="font-display text-7xl font-extrabold opacity-40" aria-hidden>{a.n}</p>
              <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">{a.title}</h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg font-semibold">{a.lead}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {a.items.map((it) => <li key={it} className="flex gap-2"><span aria-hidden className="text-coral">●</span>{it}</li>)}
              </ul>
              {a.n === "A" && confirmedResources.length > 0 && (
                <ul className="mt-6 space-y-2">{confirmedResources.map((r) => <li key={r.title}><strong>{r.title}</strong> – {r.text}</li>)}</ul>
              )}
              {a.n === "C" && (
                <p className="mt-6 text-sm">Annonserade workshops och utbildningar hittar du i <Link to="/program" className="underline decoration-coral decoration-2 underline-offset-4">programmet</Link>.</p>
              )}
            </div>
          </div>
        ))}
      </section>

      <section id="formular" aria-labelledby="formular-rubrik" className="container-page mt-24 grid scroll-mt-24 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 id="formular-rubrik" className="text-4xl font-extrabold md:text-6xl">Berätta om din idé</h2>
          <p className="mt-6">Ett formulär för allt – lokal, teknik, produktion, samarbete, utbildning eller ideellt engagemang.</p>
          <img src={skapa} loading="lazy" width={1408} height={1008} alt="Illustrativ bild: skisser och färgprover på ett arbetsbord" className="mt-8 hidden aspect-square w-full object-cover md:block" />
        </div>
        <div className="md:col-span-7 md:col-start-6"><IdeaForm /></div>
      </section>
    </>
  );
}
