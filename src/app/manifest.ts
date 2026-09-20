import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Creex",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    icons: [
      { src: "/img/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/img/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
