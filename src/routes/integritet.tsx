import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, DevNote } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/integritet")({
  head: () => meta("Integritet – Anemos", "Så hanterar Anemos uppgifter som lämnas via webbplatsen."),
  component: () => (
    <>
      <PageIntro eyebrow="Integritet" title="Integritet" lead="Vi samlar bara in de uppgifter som behövs för att besvara det du skriver till oss. Webbplatsen använder inga spårnings- eller marknadsföringskakor." />
      <div className="container-page max-w-2xl"><DevNote>Fullständig integritetsinformation ska färdigställas före lansering.</DevNote></div>
    </>
  ),
});
