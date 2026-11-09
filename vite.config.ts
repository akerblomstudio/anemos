// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static export for GitHub Pages: run with STATIC_EXPORT=1.
// The custom domain serves the site at its root: BASE_PATH=/.
const isStatic = process.env["STATIC_EXPORT"] === "1";
const base = process.env["BASE_PATH"] ?? "/";

// GitHub Pages serves 404.html for unknown URLs (e.g. /program/<slug>). It redirects to the
// site root as ?/<path>; a script in __root.tsx restores the real URL before the app starts.
const keepSegments = base.split("/").filter(Boolean).length;
const spaFallback = `<!doctype html><html><head><meta charset="utf-8"><title>Anemos</title><script>
var l=window.location,k=${keepSegments};
l.replace(l.protocol+'//'+l.hostname+(l.port?':'+l.port:'')+l.pathname.split('/').slice(0,1+k).join('/')+'/?/'+
l.pathname.slice(1).split('/').slice(k).join('/').replace(/&/g,'~and~')+(l.search?'&'+l.search.slice(1).replace(/&/g,'~and~'):'')+l.hash);
</script></head><body></body></html>`;

const staticRoutes = ["/", "/program", "/skapa-med-oss", "/om-anemos", "/kontakt", "/integritet"];

// Every public page is rendered to its own HTML file. The existing GitHub Pages
// 404 redirect restores other URLs through index.html, so no SPA shell is needed.
// SPA mode schedules maskPath as a prerender request; /__shell is not a route.
export const staticStartOptions = {
  server: { entry: "server" },
  spa: { enabled: false },
  pages: staticRoutes.map((path) => ({ path })),
  prerender: {
    enabled: true,
    autoStaticPathsDiscovery: false,
    crawlLinks: false,
    failOnError: true,
  },
};

export default defineConfig(
  isStatic
    ? {
        nitro: false,
        vite: {
          base,
          plugins: [
            {
              name: "github-pages-404",
              apply: "build",
              generateBundle() {
                if (this.environment?.name !== "client") return;
                this.emitFile({ type: "asset", fileName: "404.html", source: spaFallback });
              },
            },
          ],
        },
        tanstackStart: staticStartOptions,
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
