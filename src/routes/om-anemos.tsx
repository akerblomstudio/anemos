import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Eyebrow, DevNote } from "@/components/site/ui";
import { MembershipInterest } from "@/components/site/forms";
import { site } from "@/content/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/om-anemos")({
  head: () => meta("Om Anemos – kultur, gemenskap och medlemskap", "Varför Anemos finns, vad vi tror på och hur du kan bli en del av föreningen i Malmö."),
  component: Om,
});

const values = [
  { t: "Upplevt och skapat", d: "Kultur är något vi tar del av – och något vi gör själva. Anemos vill rymma båda." },
  { t: "Scen och möten", d: "Livemusik, scenkonst och konstnärliga möten är kärnan, med öppenhet för andra uttryck." },
  { t: "Tillsammans", d: "Delaktighet, samarbete och ömsesidigt stöd. Fler idéer blir verklighet när vi hjälps åt." },
  { t: "Öppet för alla", d: "Människor i olika åldrar och med olika bakgrunder är välkomna. Vi arbetar aktivt mot diskriminering." },
  { t: "Obundna", d: "Anemos är partipolitiskt och religiöst obundet." },
  { t: "I Malmö", d: "Vi finns i Malmö och vill bidra till stadens kulturliv." },
];

function Om() {
  return (
    <>
      <PageIntro eyebrow="Om Anemos" title="En öppen plats för kultur, möten och gemensamt skapande." lead="Anemos finns för att fler ska kunna uppleva kultur, utveckla sina idéer och skapa tillsammans med andra." />
      <section className="container-page grid gap-x-12 gap-y-12 py-12 md:grid-cols-3">
        {values.map((v, i) => (
          <div key={v.t} className={i % 3 === 1 ? "md:mt-12" : i % 3 === 2 ? "md:mt-24" : ""}>
            <p className="font-display text-sm font-bold text-sage-deep">0{i + 1}</p>
            <h2 className="mt-2 text-3xl font-extrabold">{v.t}</h2>
            <p className="mt-3">{v.d}</p>
          </div>
        ))}
      </section>

      <section id="medlemskap" aria-labelledby="medlem-rubrik" className="mt-16 scroll-mt-20 bg-sage">
        <div className="container-page grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Medlemskap</Eyebrow>
            <h2 id="medlem-rubrik" className="mt-4 text-5xl font-extrabold md:text-6xl">Bli en del av Anemos</h2>
            <p className="mt-6 text-lg">Som medlem blir du en del av en gemenskap där kultur skapas tillsammans – och du kan vara med och påverka vad Anemos blir.</p>
            {site.membership.confirmed && site.membership.terms.length > 0 ? (
              <ul className="mt-6 space-y-2">{site.membership.terms.map((t) => <li key={t}>{t}</li>)}</ul>
            ) : (
              <p className="mt-6">Medlemsprocessen håller på att tas fram. Anmäl ditt intresse så återkommer föreningen med information.</p>
            )}
          </div>
          <div className="bg-bone p-8 md:col-span-6 md:col-start-7">
            <MembershipInterest />
          </div>
        </div>
      </section>

      <section aria-labelledby="handlingar" className="container-page py-20">
        <h2 id="handlingar" className="text-3xl font-extrabold md:text-4xl">Föreningshandlingar</h2>
        {site.documents.length ? (
          <ul className="mt-6 space-y-2">{site.documents.map((d) => <li key={d.url}><a href={d.url} className="underline">{d.title}</a></li>)}</ul>
        ) : (
          <>
            <p className="mt-4 max-w-xl">Aktuella föreningshandlingar publiceras här när de är godkända.</p>
            <div className="mt-4 max-w-xl"><DevNote>Lägg endast till godkända handlingar under Anemos namn.</DevNote></div>
          </>
        )}
      </section>
    </>
  );
}
