// Föreningsuppgifter. Fyll endast i bekräftade uppgifter – tomma fält döljs på sidan.
export const site = {
  name: "Anemos",
  city: "Malmö",
  email: "" as string, // t.ex. "hej@..." när den är bekräftad
  social: [] as { label: string; url: string }[],
  membership: {
    confirmed: false, // sätt true och fyll i villkor när medlemsprocessen är fastställd
    terms: [] as string[],
  },
  documents: [] as { title: string; url: string }[], // endast godkända handlingar
  // Formulär är inte anslutna till någon mottagare ännu.
  formsConnected: false,
};

export const nav = [
  { to: "/program", label: "Program" },
  { to: "/skapa-med-oss", label: "Skapa med oss" },
  { to: "/om-anemos", label: "Om Anemos" },
  { to: "/kontakt", label: "Kontakt" },
] as const;
