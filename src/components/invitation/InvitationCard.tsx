"use client";
import { CoutureCard } from "./couture/CoutureExperience";
import { ReferenceCard } from "./reference/ReferenceExperience";
import { CelebrationCard } from "./celebrations/CelebrationExperience";
import SignatureCard from "./signature/SignatureCard";
import { CSSProperties } from "react";
import { WeddingTemplate } from "@/data/templates";
import { MotifArt, Mandala, Lotus, Floral } from "./Motifs";
export { themeStyle } from "./theme";
import { themeStyle } from "./theme";
export default function InvitationCard({
  template: t,
  bride,
  groom,
  hero = false,
}: {
  template: WeddingTemplate;
  bride?: string;
  groom?: string;
  hero?: boolean;
}) {
  if (t.couture) return <CoutureCard template={t} bride={bride} groom={groom} hero={hero} />;
  if (t.referenceExperience) return <ReferenceCard template={t} bride={bride} groom={groom} hero={hero} />;
  if (t.celebrationLayout) return <CelebrationCard template={t} bride={bride} groom={groom} hero={hero} />;
  if (t.embeddedTemplate) return (
    <div className={`art-card uploaded-card ${hero ? "art-hero" : ""}`} style={themeStyle(t)} data-signature-thumbnail="kandyan-vintage-ride">
      <img src={t.image} alt="Kandyan couple in a vintage car at sunset" />
      <div><span>THE KANDYAN WEDDING OF</span><strong>{bride || t.couple[0]} <i>&</i> {groom || t.couple[1]}</strong><span>VELORA / SIGNATURE</span></div>
    </div>
  );
  if (t.signature)
    return (
      <SignatureCard template={t} bride={bride} groom={groom} hero={hero} />
    );
  return (
    <div
      className={`art-card art-${t.motif} ${hero ? "art-hero" : ""}`}
      style={themeStyle(t)}
    >
      <div className="paper-grain" />
      {t.artwork ? (
        <img className="card-heritage" src={t.artwork} alt="" />
      ) : (
        <>
          <Floral className="card-floral left" />
          <Floral className="card-floral right" />
        </>
      )}
      <div className="card-frame" />
      <Mandala className="card-mandala" />
      <div className="card-type">
        <span className="card-eyebrow">THE WEDDING OF</span>
        <MotifArt motif={t.motif} className="card-motif" />
        <span className="card-names">
          {bride || t.couple[0]}
          <i>&</i>
          {groom || t.couple[1]}
        </span>
        <span className="card-date">12 · JUNE · 2027</span>
        <span className="card-invite">A beautiful beginning</span>
      </div>
      <Lotus className="card-bottom-lotus" />
      {t.motif === "moon" && <div className="card-stars">✧　·　✦　·　✧</div>}
    </div>
  );
}
