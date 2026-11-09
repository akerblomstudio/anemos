import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { btn, DevNote } from "./ui";

const field = "mt-2 block w-full min-h-12 rounded-sm border-2 border-input bg-card px-4 py-3 text-base focus:border-charcoal";

export function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label} {optional && <span className="font-normal text-muted-foreground">(valfritt)</span>}
      </label>
      {children}
      {error && <p id={`${id}-fel`} className="mt-2 text-sm font-semibold text-destructive">⚠ {error}</p>}
    </div>
  );
}

type Errors = Record<string, string>;

function useForm(required: Record<string, string>) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "notConnected">("idle");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs: Errors = {};
    for (const [k, msg] of Object.entries(required)) if (!String(data.get(k) ?? "").trim()) errs[k] = msg;
    const email = String(data.get("epost") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) errs.epost = "Skriv en giltig e-postadress, till exempel namn@exempel.se.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // Ingen mottagare är ansluten – visa aldrig ett falskt "skickat".
    if (!site.formsConnected) setStatus("notConnected");
  }
  const a = (k: string) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-fel` : undefined });
  return { errors, status, onSubmit, a };
}

function NotConnected({ show }: { show: boolean }) {
  return (
    <div aria-live="polite">
      {show && (
        <p className="border-l-4 border-coral bg-card p-4">
          Formuläret är inte anslutet ännu, så inget har skickats. Försök gärna igen senare.
        </p>
      )}
    </div>
  );
}

export const requestTypes = [
  "Lokal eller studio",
  "Teknik eller digitala verktyg",
  "Arrangemang eller kulturproduktion",
  "Projekt eller samarbete",
  "Utbildning eller workshop",
  "Ideellt engagemang",
  "Jag vet inte ännu – jag vill prata om en idé",
];

export function IdeaForm() {
  const f = useForm({ namn: "Fyll i ditt namn.", epost: "Fyll i din e-postadress.", typ: "Välj vad din förfrågan gäller.", beskrivning: "Beskriv kort din idé eller förfrågan." });
  return (
    <form noValidate onSubmit={f.onSubmit} className="space-y-6">
      <DevNote>Formuläret saknar mottagare. Anslut det innan lansering (sätt formsConnected i föreningsuppgifterna).</DevNote>
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="namn" label="Namn" error={f.errors.namn}><input id="namn" name="namn" autoComplete="name" className={field} {...f.a("namn")} /></Field>
        <Field id="epost" label="E-post" error={f.errors.epost}><input id="epost" name="epost" type="email" autoComplete="email" className={field} {...f.a("epost")} /></Field>
      </div>
      <fieldset {...f.a("typ")}>
        <legend className="font-semibold">Vad gäller din idé eller förfrågan?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {requestTypes.map((t) => (
            <label key={t} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border-2 border-input bg-card px-4 py-2 has-[:checked]:border-charcoal has-[:checked]:bg-sage">
              <input type="radio" name="typ" value={t} className="h-4 w-4 accent-charcoal" /> {t}
            </label>
          ))}
        </div>
        {f.errors.typ && <p id="typ-fel" className="mt-2 text-sm font-semibold text-destructive">⚠ {f.errors.typ}</p>}
      </fieldset>
      <Field id="beskrivning" label="Kort beskrivning" error={f.errors.beskrivning}><textarea id="beskrivning" name="beskrivning" rows={5} className={field} {...f.a("beskrivning")} /></Field>
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="period" label="Önskad tidsperiod" optional><input id="period" name="period" className={field} /></Field>
        <Field id="lank" label="Länk till projekt eller arbetsprov" optional><input id="lank" name="lank" type="url" className={field} /></Field>
      </div>
      <p className="text-sm text-muted-foreground">En förfrågan är början på en dialog. Den innebär inte en bekräftad bokning eller ett beslutat samarbete.</p>
      <button type="submit" className={btn({ variant: "coral" })}>Skicka förfrågan</button>
      <NotConnected show={f.status === "notConnected"} />
    </form>
  );
}

export function ContactForm() {
  const f = useForm({ namn: "Fyll i ditt namn.", epost: "Fyll i din e-postadress.", amne: "Skriv ett ämne.", meddelande: "Skriv ditt meddelande." });
  return (
    <form noValidate onSubmit={f.onSubmit} className="space-y-6">
      <DevNote>Kontaktformuläret saknar mottagare och behöver anslutas innan lansering.</DevNote>
      <Field id="namn" label="Namn" error={f.errors.namn}><input id="namn" name="namn" autoComplete="name" className={field} {...f.a("namn")} /></Field>
      <Field id="epost" label="E-post" error={f.errors.epost}><input id="epost" name="epost" type="email" autoComplete="email" className={field} {...f.a("epost")} /></Field>
      <Field id="amne" label="Ämne" error={f.errors.amne}><input id="amne" name="amne" className={field} {...f.a("amne")} /></Field>
      <Field id="meddelande" label="Meddelande" error={f.errors.meddelande}><textarea id="meddelande" name="meddelande" rows={6} className={field} {...f.a("meddelande")} /></Field>
      <button type="submit" className={btn()}>Skicka meddelande</button>
      <NotConnected show={f.status === "notConnected"} />
    </form>
  );
}

export function MembershipInterest() {
  const f = useForm({ namn: "Fyll i ditt namn.", epost: "Fyll i din e-postadress." });
  return (
    <form noValidate onSubmit={f.onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="m-namn" label="Namn" error={f.errors.namn}><input id="m-namn" name="namn" autoComplete="name" className={field} {...f.a("namn")} /></Field>
        <Field id="m-epost" label="E-post" error={f.errors.epost}><input id="m-epost" name="epost" type="email" autoComplete="email" className={field} {...f.a("epost")} /></Field>
      </div>
      <p className="text-sm">En intresseanmälan är inte ett godkänt eller betalt medlemskap. Föreningen återkommer med information.</p>
      <button type="submit" className={btn({ variant: "dark" })}>Anmäl intresse för medlemskap</button>
      <NotConnected show={f.status === "notConnected"} />
    </form>
  );
}
