import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Couples Connect",
    short_name: "CouplesConnect",
    description: "A multi-platform app for couples to organize daily life and strengthen their relationship",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f43f5e",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

