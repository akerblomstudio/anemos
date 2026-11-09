import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";

export const btn = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
  {
    variants: {
      variant: {
        coral: "bg-coral text-charcoal hover:bg-charcoal hover:text-bone",
        dark: "bg-charcoal text-bone hover:bg-sage hover:text-charcoal",
        outline: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone",
      },
    },
    defaultVariants: { variant: "dark" },
  },
);
export type BtnVariant = VariantProps<typeof btn>["variant"];

export function Logo() {
  return (
    <Link to="/" className="font-display text-2xl font-extrabold tracking-tight" aria-label="Anemos – till startsidan">
      anemos<span className="text-coral" aria-hidden>.</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <a href="#innehall" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-bone">
        Hoppa till innehållet
      </a>
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Huvudmeny" className="hidden md:block">
          <ul className="flex gap-8 text-sm font-semibold">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="py-2 hover:text-sage-deep" activeProps={{ className: "underline decoration-coral decoration-2 underline-offset-8" }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className="min-h-12 px-2 text-sm font-semibold md:hidden" aria-expanded={open} aria-controls="mobilmeny" onClick={() => setOpen(!open)}>
          {open ? "Stäng" : "Meny"}
        </button>
      </div>
      {open && (
        <nav id="mobilmeny" aria-label="Huvudmeny" className="border-t border-border md:hidden">
          <ul className="container-page py-2">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl font-bold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-charcoal text-bone">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-5xl font-extrabold md:text-7xl">anemos<span className="text-coral">.</span></p>
          <p className="mt-4 max-w-sm text-bone/80">Utrymme för kultur – på scen, i skapandet och i mötet mellan människor. {site.city}.</p>
        </div>
        <nav aria-label="Sidfot" className="md:col-span-3">
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-sage">{n.label}</Link></li>
            ))}
            <li><Link to="/om-anemos" hash="medlemskap" className="hover:text-sage">Bli medlem</Link></li>
          </ul>
        </nav>
        <div className="space-y-3 md:col-span-4">
          {site.email && <p><a className="hover:text-sage" href={`mailto:${site.email}`}>{site.email}</a></p>}
          {site.social.map((s) => (
            <p key={s.url}><a className="hover:text-sage" href={s.url}>{s.label}</a></p>
          ))}
          <p className="text-bone/80">Malmö</p>
          <p><Link to="/integritet" className="hover:text-sage">Integritet</Link></p>
        </div>
      </div>
    </footer>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-coral" />
      {children}
    </p>
  );
}

export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="container-page pb-12 pt-16 md:pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-5xl text-5xl font-extrabold md:text-8xl">{title}</h1>
      {lead && <p className="mt-8 max-w-2xl text-lg md:text-xl">{lead}</p>}
    </section>
  );
}

export function DevNote({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null;
  return (
    <p role="note" className="border-2 border-dashed border-coral bg-card px-4 py-3 text-sm">
      <strong>Utvecklingsläge:</strong> {children}
    </p>
  );
}
