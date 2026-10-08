import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CeylonSpicer | Authentic Sri Lankan Recipes",
    short_name: "CeylonSpicer",
    description:
      "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
    start_url: "/",
    display: "standalone",
    background_color: "#fce9c0",
    theme_color: "#8b9572",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
