import type { CSSProperties } from "react";
import type { WeddingTemplate } from "@/data/templates";
export function themeStyle(t: WeddingTemplate): CSSProperties {
  return {
    "--paper": t.paper,
    "--ink": t.ink,
    "--gold": t.gold,
  } as CSSProperties;
}
