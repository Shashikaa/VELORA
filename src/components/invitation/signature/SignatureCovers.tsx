"use client";
import { useState } from "react";
import { displayDate, SignatureKind } from "@/data/templates";
import {
  Plane,
  Car,
  Bow,
  Palace,
  Lotus,
  Mandala,
  Tusker,
  Peacock,
  Floral,
} from "./Illustrations";
import type { SignatureProps } from "./types";
import { words } from "../InvitationShared";
export function CoverArtwork({ kind }: { kind: SignatureKind }) {
  switch (kind) {
    case "lotus":
      return (
        <>
          <Mandala className="lotus-orbit" />
          <Lotus className="lotus-emblem" />
          <div className="gold-leaf-frame" />
        </>
      );
    case "palace":
      return (
        <>
          <Palace />
          <div className="gate-leaf left">
            <Mandala />
          </div>
          <div className="gate-leaf right">
            <Mandala />
          </div>
        </>
      );
    case "procession":
      return (
        <>
          <div className="lantern-line">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="procession-row">
            <Tusker />
            <Tusker />
            <Tusker />
          </div>
        </>
      );
    case "peacock":
      return (
        <>
          <Peacock className="cover-peacock" />
          <div className="peacock-eye">✧</div>
        </>
      );
    case "flight":
      return (
        <>
          <img
            className="sig-cover-photo"
            src="/images/signature-colombo-night.webp"
            alt=""
          />
          <div className="cabin-window">
            <span>
              THE WORLD BELOW.
              <br />A LIFETIME AHEAD.
            </span>
          </div>
          <Plane className="cover-plane" />
        </>
      );
    case "manuscript":
      return (
        <>
          <div className="manuscript-roller top" />
          <div className="manuscript-roller bottom" />
          <div className="script-lines">
            dearest you,
            <br />
            some stories are written
            <br />
            in the stars.
            <br />
            ours begins here.
          </div>
        </>
      );
    case "botanical":
      return (
        <>
          <div className="botanical-wreath">
            <Floral />
            <Floral />
          </div>
          <div className="vellum-sheet left" />
          <div className="vellum-sheet right" />
        </>
      );
    case "lace":
      return (
        <>
          <img
            className="sig-lace-texture"
            src="/images/signature-beeralu-lace.webp"
            alt=""
          />
          <div className="lace-flap" />
          <div className="pearl-thread">
            {Array.from({ length: 30 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        </>
      );
    case "roadtrip":
      return (
        <>
          <div className="embossed-florals">
            <Floral />
            <Floral />
          </div>
          <div className="ribbon-band" />
          <Bow />
          <div className="cover-road-car">
            <Car />
          </div>
        </>
      );
    case "garden":
      return (
        <>
          <div className="garden-gate left">
            <Floral />
          </div>
          <div className="garden-gate right">
            <Floral />
          </div>
          <div className="garden-gate-arch" />
        </>
      );
  }
}
export default function SignatureCover({
  template: t,
  details: d,
  opening,
  onOpen,
}: {
  template: SignatureProps["template"];
  details: SignatureProps["details"];
  opening: boolean;
  onOpen: () => void;
}) {
  const kind = t.signature!;
  const w = words[d.language];
  return (
    <div
      className={`sig-cover sig-cover-${kind} ${opening ? "opening" : ""}`}
      data-opening={kind}
    >
      <CoverArtwork kind={kind} />
      <div className="sig-cover-type">
        <span className="sig-kicker">
          {kind === "flight"
            ? "VELORA AIR / FLIGHT TO FOREVER"
            : kind === "roadtrip"
              ? "A POSTCARD FROM OUR HEARTS"
              : kind === "manuscript"
                ? "A LETTER FOR YOU"
                : kind === "garden"
                  ? "YOU ARE CORDIALLY INVITED"
                  : w.invited}
        </span>
        <h1>
          {d.bride}
          <i>{kind === "flight" ? "×" : "&"}</i>
          {d.groom}
        </h1>
        <p>{displayDate(d.date)}</p>
        {kind === "flight" && (
          <div className="cover-boarding">
            <span>CMB</span>
            <Plane />
            <span>LOVE</span>
          </div>
        )}
        <button
          className={`sig-open-button ${kind === "lace" ? "pearl-seal" : ""}`}
          onClick={onOpen}
          disabled={opening}
          aria-label={w.open}
        >
          {kind === "lace" ? (
            <span className="pearl-monogram">
              {d.bride[0]}
              <i>&</i>
              {d.groom[0]}
            </span>
          ) : kind === "roadtrip" ? (
            <span className="ribbon-action">Untie the ribbon</span>
          ) : kind === "flight" ? (
            <>
              <Plane />
              <span>Begin our journey</span>
            </>
          ) : kind === "manuscript" ? (
            <span>Unroll our story ↓</span>
          ) : kind === "garden" ? (
            <span>Enter our garden →</span>
          ) : kind === "procession" ? (
            <span>Light the celebration ✧</span>
          ) : kind === "palace" ? (
            <span>Open the golden gates</span>
          ) : kind === "peacock" ? (
            <span>Unfurl our story ✧</span>
          ) : kind === "botanical" ? (
            <span>Lift the veil ↓</span>
          ) : (
            <>
              <Lotus />
              <span>Unfold our invitation</span>
            </>
          )}
        </button>
        <small>
          {opening
            ? "A beautiful beginning…"
            : kind === "lace"
              ? "Tap the pearl to break the seal"
              : t.signatureOpening}
        </small>
      </div>
      <div className="signature-cover-footer">
        <span>AN INVITATION FOR {d.guest}</span>
        <span>VELORA / SIGNATURE</span>
      </div>
    </div>
  );
}
