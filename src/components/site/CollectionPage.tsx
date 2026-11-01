"use client";
import { useSearchParams } from "next/navigation";
import Gallery from "./Gallery";
export default function CollectionPage() {
  const q = useSearchParams();
  const collection = q.get("collection") || "all";
  return (
    <main id="main" className="collection-page">
      <h1 className="sr-only">The VELORA invitation collection</h1>
      <Gallery key={collection} full initialCollection={collection} />
    </main>
  );
}
