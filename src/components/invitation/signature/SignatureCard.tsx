"use client";
import type { WeddingTemplate } from "@/data/templates";
import { themeStyle } from "../theme";
import { CoverArtwork } from "./SignatureCovers";
import { Plane, Car, Lotus, Palace, Floral, Mandala } from "./Illustrations";
export default function SignatureCard({
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
  const kind = t.signature!;
  const first = bride || t.couple[0],
    second = groom || t.couple[1];
  return (
    <div
      className={`art-card signature-card sig-thumb-${kind} ${hero ? "art-hero" : ""}`}
      style={themeStyle(t)}
      data-signature-thumbnail={kind}
    >
      <CoverArtwork kind={kind} />
      {kind === "roadtrip" && (
        <img
          className="thumb-road-art"
          src="/images/signature-coastal-road.webp"
          alt=""
        />
      )}
      <div className="signature-thumb-type">
        <span className="thumb-kicker">
          {kind === "flight"
            ? "VELORA AIR / CMB → LOVE"
            : kind === "manuscript"
              ? "A LETTER FOR YOU"
              : kind === "roadtrip"
                ? "GREETINGS FROM OUR FOREVER"
                : kind === "lace"
                  ? "TOGETHER WITH OUR FAMILIES"
                  : kind === "procession"
                    ? "THE NIGHT BELONGS TO LOVE"
                    : "THE WEDDING OF"}
        </span>
        {kind === "manuscript" && (
          <div className="thumb-editorial">
            To love,
            <br />
            and all its
            <br />
            <i>adventures.</i>
          </div>
        )}
        {kind === "procession" && (
          <div className="thumb-editorial">
            A thousand
            <br />
            <i>little lights.</i>
          </div>
        )}
        {kind === "garden" && (
          <div className="thumb-editorial">
            Garden
            <br />
            <i>of us.</i>
          </div>
        )}
        {kind === "botanical" && (
          <img
            className="thumb-botanical-portrait"
            src="/images/mandalaa-couple-art.webp"
            alt=""
          />
        )}
        {kind === "lace" && (
          <div className="thumb-pearl-monogram">
            {first[0]}
            <i>&</i>
            {second[0]}
          </div>
        )}
        <span className="thumb-names">
          {first}
          <i>&</i>
          {second}
        </span>
        <span className="thumb-date">12 · JUNE · 2027</span>
        {kind === "flight" && <Plane />}
        {kind === "roadtrip" && <Car />}
      </div>
      <span className="thumb-edition">{t.premium ? "VELORA / SIGNATURE" : "VELORA / EDITION"}</span>
    </div>
  );
}
