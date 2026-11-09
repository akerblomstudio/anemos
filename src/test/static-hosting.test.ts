import { describe, expect, it } from "vitest";
import { staticStartOptions } from "../../vite.config";

describe("GitHub Pages static configuration", () => {
  it("does not schedule a nonexistent SPA shell", () => {
    expect(staticStartOptions.spa.enabled).toBe(false);
  });

  it("prerenders every public static route, including the homepage", () => {
    expect(staticStartOptions.pages.map((page) => page.path)).toEqual([
      "/", "/program", "/skapa-med-oss", "/om-anemos", "/kontakt", "/integritet",
    ]);
    expect(staticStartOptions.prerender.enabled).toBe(true);
  });

  it("fails on missing pages instead of ignoring failed prerenders", () => {
    expect(staticStartOptions.prerender.failOnError).toBe(true);
  });
});