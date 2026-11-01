"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WeddingTemplate } from "@/data/templates";
import { readDetails } from "@/lib/invitation";
import InvitationExperience from "./InvitationExperience";
export default function InvitationPage({
  template: t,
}: {
  template: WeddingTemplate;
}) {
  const p = useSearchParams();
  const personalised = p.has("bride");
  const d = readDetails(t, new URLSearchParams(p.toString()));
  return (
    <>
      <div className="invitation-page-tools">
        <Link href="/templates">
          <ArrowLeft size={14} />
          <span>Collection</span>
        </Link>
        {!personalised && (
          <>
            <span className="sample-banner">SAMPLE INVITATION</span>
            <Link href={`/studio?template=${t.id}`}>
              Make it yours <ArrowUpRight size={14} />
            </Link>
          </>
        )}
      </div>
      <InvitationExperience template={t} details={d} />
    </>
  );
}
