import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function injectHtmlBase() {
  const base = process.env.VITE_BASE_URL;
  if (!base || base === "/") {
    return { name: "inject-html-base-skip" };
  }
  const href = base.endsWith("/") ? base : `${base}/`;
  return {
    name: "inject-html-base",
    transformIndexHtml(html) {
      if (/<base\s/i.test(html)) return html;
      return html.replace(/<head(\s[^>]*)?>/i, `<head$1>\n  <base href="${href}">`);
    },
  };
}

function faviconNo404() {
  const handler = (req, res, next) => {
    const url = req.url?.split("?")[0] ?? "";
    if (url === "/favicon.ico") {
      res.statusCode = 204;
      res.end();
      return;
    }
    next();
  };
  return {
    name: "favicon-no-404",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_URL || "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        services: resolve(__dirname, "services.html"),
      },
    },
  },
  plugins: [
    injectHtmlBase(),
    faviconNo404(),
    {
      name: "copy-site-js",
      closeBundle() {
        const from = path.join(__dirname, "js", "site.js");
        const to = path.join(__dirname, "dist", "js", "site.js");
        if (fs.existsSync(from)) {
          fs.mkdirSync(path.dirname(to), { recursive: true });
          fs.copyFileSync(from, to);
        }
      },
    },
  ],
});
