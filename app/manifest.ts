import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "Trades Abroad", short_name: "Trades Abroad", description: "International opportunities for skilled trades professionals.", start_url: "/", display: "standalone", background_color: "#080B09", theme_color: "#080B09" };
}
