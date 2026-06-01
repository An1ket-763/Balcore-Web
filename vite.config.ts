import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const syncSocialImageWithIcon = () => ({
  name: "sync-social-image-with-icon",
  transformIndexHtml: {
    order: "post" as const,
    handler(html: string) {
      const iconHref = html.match(/<link rel="icon"[^>]* href="([^"]+)"/)?.[1];

      if (!iconHref) return html;

      return html.replace(
        /(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+(" \/>)/g,
        `$1${iconHref}$2`,
      );
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), syncSocialImageWithIcon()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
