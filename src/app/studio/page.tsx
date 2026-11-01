import { Suspense } from "react";
import Studio from "@/components/site/Studio";
export const metadata = { title: "Your invitation studio" };
export default function Page() {
  return (
    <Suspense
      fallback={
        <main id="main" className="section-pad">
          Preparing your studio…
        </main>
      }
    >
      <Studio />
    </Suspense>
  );
}
