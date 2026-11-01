import { TEMPLATES, ARCHIVED_TEMPLATES } from "@/data/templates";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import InvitationPage from "@/components/invitation/InvitationPage";
export function generateStaticParams() {
  return [...TEMPLATES,...ARCHIVED_TEMPLATES].map((t) => ({ slug: t.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = [...TEMPLATES,...ARCHIVED_TEMPLATES].find((t) => t.id === slug);
  return {
    title: t ? `${t.name} — Wedding invitation` : "Invitation not found",
    robots: { index: false, follow: false },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = [...TEMPLATES,...ARCHIVED_TEMPLATES].find((t) => t.id === slug);
  if (!t) notFound();
  return (
    <main id="main" className="full-invitation">
      <Suspense
        fallback={
          <p className="invitation-loading">Preparing a beautiful beginning…</p>
        }
      >
        <InvitationPage template={t} />
      </Suspense>
    </main>
  );
}
