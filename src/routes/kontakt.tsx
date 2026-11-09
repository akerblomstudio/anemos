import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/ui";
import { ContactForm } from "@/components/site/forms";
import { site } from "@/content/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/kontakt")({
  head: () => meta("Kontakt – Anemos", "Hör av dig till Anemos i Malmö."),
  component: Kontakt,
});

function Kontakt() {
  return (
    <>
      <PageIntro eyebrow="Kontakt" title="Hör av dig." lead="Vi finns i Malmö. Skriv till oss så svarar vi så snart vi kan." />
      <section className="container-page grid gap-12 md:grid-cols-12">
        <div className="space-y-8 md:col-span-4">
          <div className="space-y-4">
            {site.emails.map((e) => (
              <div key={e.address}>
                <p className="font-semibold">{e.label}</p>
                <p className="font-display text-2xl font-bold"><a href={`mailto:${e.address}`} className="underline">{e.address}</a></p>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-sage pl-5">
            <p className="font-semibold">Har du en idé eller ett projekt?</p>
            <Link to="/skapa-med-oss" hash="formular" className="mt-1 inline-block underline decoration-coral decoration-2 underline-offset-4">Skapa med oss</Link>
          </div>
          <div className="border-l-4 border-sage pl-5">
            <p className="font-semibold">Frågor om medlemskap?</p>
            <Link to="/om-anemos" hash="medlemskap" className="mt-1 inline-block underline decoration-coral decoration-2 underline-offset-4">Bli medlem</Link>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6"><ContactForm /></div>
      </section>
    </>
  );
}
