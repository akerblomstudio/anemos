import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-kultur.jpg";
import skapa from "@/assets/skapa.jpg";
import { btn, Eyebrow } from "@/components/site/ui";
import { EmptyProgram, EventRow } from "@/components/site/EventCard";
import { getEvents, isUpcoming } from "@/content/events";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("Anemos – utrymme för kultur i Malmö", "Livemusik, scenkonst och konstnärliga möten i Malmö. Upplev kultur, utveckla idéer och skapa tillsammans med Anemos."),
  component: Index,
});

const ideas = ["Utveckla en konstnärlig idé", "Undersöka behov av lokal eller teknik", "Hitta ett sammanhang för ditt skapande", "Föreslå ett arrangemang", "Inleda ett kulturprojekt eller samarbete"];

function Index() {
  const upcoming = getEvents().filter((e) => isUpcoming(e)).slice(0, 3);
  return (
    <>
      <section className="container-page grid gap-10 pb-16 pt-12 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-7 md:pt-8">
          <Eyebrow>Kultur i Malmö</Eyebrow>
          <h1 className="mt-6 text-6xl font-extrabold md:text-8xl lg:text-9xl">
            Utrymme för kultur. <span className="text-sage-deep">Plats för fler.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl">
            Anemos är ett kultursammanhang i Malmö för livemusik, scenkonst och konstnärliga möten. Vi vill göra det lättare att uppleva kultur, utveckla idéer och skapa tillsammans.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/program" className={btn({ variant: "coral" })}>Se programmet</Link>
            <Link to="/skapa-med-oss" className={btn({ variant: "outline" })}>Skapa med oss</Link>
          </div>
        </div>
        <figure className="relative md:col-span-5 md:mt-24">
          <div aria-hidden className="absolute -left-6 -top-6 h-full w-full bg-sage" />
          <img src={hero} width={1600} height={1104} alt="Illustrativ bild: publik i olika åldrar lyssnar på en akustisk spelning i ett varmt rum" className="relative aspect-[4/5] w-full object-cover" />
          <figcaption className="relative mt-3 text-xs text-muted-foreground">Illustrativ bild</figcaption>
        </figure>
      </section>

      <section aria-labelledby="pa-gang" className="container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="pa-gang" className="text-5xl font-extrabold md:text-7xl">På gång</h2>
          <Link to="/program" className="font-semibold underline decoration-coral decoration-2 underline-offset-4">Hela programmet</Link>
        </div>
        {upcoming.length ? upcoming.map((e) => <EventRow key={e.slug} e={e} />) : <EmptyProgram />}
      </section>

      <section className="container-page grid gap-0 py-16 md:grid-cols-2">
        <div className="bg-midnight p-10 text-ivory md:p-14">
          <p className="eyebrow text-sage">01</p>
          <h2 className="mt-4 text-4xl font-extrabold md:text-6xl">Upplev kultur</h2>
          <p className="mt-6 max-w-md text-ivory/85">Livemusik, scenkonst, framträdanden och andra kulturella möten – för dig som vill lyssna, se, delta och vara med.</p>
          <Link to="/program" className="mt-8 inline-block font-semibold text-sage underline underline-offset-4">Utforska programmet</Link>
        </div>
        <div className="bg-sage p-10 md:mt-16 md:p-14">
          <p className="eyebrow">02</p>
          <h2 className="mt-4 text-4xl font-extrabold md:text-6xl">Skapa med oss</h2>
          <p className="mt-6 max-w-md">Har du en idé du vill utveckla? Vi undersöker resurser och möjligheter och genomför kultur tillsammans.</p>
          <Link to="/skapa-med-oss" className="mt-8 inline-block font-semibold underline decoration-coral decoration-2 underline-offset-4">Utforska möjligheterna</Link>
        </div>
      </section>

      <section className="container-page grid items-center gap-12 py-16 md:grid-cols-12">
        <img src={skapa} width={1408} height={1008} loading="lazy" alt="Illustrativ bild: händer skissar idéer tillsammans vid ett bord" className="aspect-[4/3] w-full object-cover md:col-span-6" />
        <div className="md:col-span-6">
          <Eyebrow>Från idé till kulturmöte</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold md:text-6xl">Har du något som vill ta plats?</h2>
          <p className="mt-6">Anemos kan vara en ingång för dig som vill:</p>
          <ul className="mt-4 space-y-2">
            {ideas.map((i) => (
              <li key={i} className="flex gap-3"><span aria-hidden className="text-coral">→</span>{i}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Vi lovar inte allt – men vi lyssnar och undersöker vad som är möjligt.</p>
          <Link to="/skapa-med-oss" hash="formular" className={btn({ variant: "coral" }) + " mt-8"}>Dela din idé</Link>
        </div>
      </section>

      <section className="border-y-2 border-midnight">
        <div className="container-page grid gap-8 py-20 md:grid-cols-12">
          <h2 className="text-4xl font-extrabold md:col-span-4 md:text-5xl">Om Anemos</h2>
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-display text-2xl font-medium leading-snug md:text-3xl">
              Vi tror att kultur är något man både upplever och skapar. Anemos är ett öppet sammanhang i Malmö – för människor i olika åldrar och med olika bakgrunder, fritt från partipolitik och religion.
            </p>
            <Link to="/om-anemos" className="mt-8 inline-block font-semibold underline decoration-coral decoration-2 underline-offset-4">Lär känna Anemos</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="delaktig" className="container-page py-20">
        <h2 id="delaktig" className="text-5xl font-extrabold md:text-7xl">Bli delaktig</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="border-l-4 border-sage pl-6">
            <h3 className="text-3xl font-bold">Bli medlem</h3>
            <p className="mt-3 max-w-md">Bli en del av gemenskapen och var med och forma Anemos.</p>
            <Link to="/om-anemos" hash="medlemskap" className="mt-6 inline-block font-semibold underline decoration-coral decoration-2 underline-offset-4">Bli medlem</Link>
          </div>
          <div className="border-l-4 border-coral pl-6">
            <h3 className="text-3xl font-bold">Bidra med tid och idéer</h3>
            <p className="mt-3 max-w-md">Vill du engagera dig ideellt eller har du en tanke om något vi kan göra? Hör av dig.</p>
            <Link to="/skapa-med-oss" hash="formular" className="mt-6 inline-block font-semibold underline decoration-coral decoration-2 underline-offset-4">Dela en idé</Link>
          </div>
        </div>
      </section>
    </>
  );
}
