import Gallery from "@/components/site/Gallery";
import { Suspense } from "react";
import CollectionPage from "@/components/site/CollectionPage";
export const metadata = {
  title: "The collection — 27 distinct animated wedding & celebration invitations",
};
export default function Templates() {
  return (
    <Suspense
      fallback={
        <main id="main">
          <Gallery full />
        </main>
      }
    >
      <CollectionPage />
    </Suspense>
  );
}
