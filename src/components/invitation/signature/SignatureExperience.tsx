"use client";
import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import type { SignatureProps } from "./types";
import { useMusic } from "../InvitationShared";
import { themeStyle } from "../theme";
import { HEROES } from "./SignatureHeroes";
import SignatureCover from "./SignatureCovers";
import {
  SignatureDate,
  SignatureStory,
  SignatureEvents,
  SignatureGallery,
  SignatureVenue,
  SignatureReply,
} from "./SignatureSections";
import {
  Lotus,
  Plane,
  Car,
  Floral,
  Palace,
  Peacock,
  Mandala,
} from "./Illustrations";
import { displayDate, SignatureKind } from "@/data/templates";
const sectionOrders: Record<SignatureKind, string[]> = {
  lotus: ["date", "story", "events", "gallery", "venue", "reply"],
  palace: ["story", "events", "date", "venue", "gallery", "reply"],
  procession: ["story", "date", "events", "gallery", "venue", "reply"],
  peacock: ["story", "gallery", "date", "events", "venue", "reply"],
  flight: ["date", "story", "events", "gallery", "venue", "reply"],
  manuscript: ["story", "date", "gallery", "events", "venue", "reply"],
  botanical: ["story", "date", "gallery", "events", "venue", "reply"],
  lace: ["date", "events", "story", "gallery", "venue", "reply"],
  roadtrip: ["date", "story", "gallery", "events", "venue", "reply"],
  garden: ["story", "events", "gallery", "date", "venue", "reply"],
};
export default function SignatureExperience(
  props: SignatureProps & { startOpen?: boolean },
) {
  const { template: t, details: d, startOpen = false } = props;
  const kind = t.signature!;
  const [opened, setOpened] = useState(startOpen),
    [opening, setOpening] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playing, toggle } = useMusic(d.musicUrl, d.soundtrack);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  const open = () => {
    if (opening) return;
    setOpening(true);
    timeout.current = setTimeout(
      () => setOpened(true),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 20
        : kind === "flight" || kind === "roadtrip"
          ? 2100
          : 1500,
    );
  };
  const Hero = HEROES[kind];
  const ClosingArt =
    kind === "flight"
      ? Plane
      : kind === "roadtrip"
        ? Car
        : kind === "palace"
          ? Palace
          : kind === "peacock"
            ? Peacock
            : kind === "manuscript"
              ? Mandala
              : kind === "garden" || kind === "botanical"
                ? Floral
                : Lotus;
  const sections: Record<string, React.ReactNode> = {
    date: <SignatureDate {...props} />,
    story: <SignatureStory {...props} />,
    events: <SignatureEvents {...props} />,
    gallery: <SignatureGallery {...props} />,
    venue: <SignatureVenue {...props} />,
    reply: <SignatureReply {...props} />,
  };
  return (
    <div
      className={`invitation-shell signature-shell sig-${kind} ${opened ? "is-open" : "is-closed"}`}
      style={themeStyle(t)}
      lang={d.language}
      data-signature-layout={kind}
    >
      <div className="invite-utilities">
        <button
          className="music-button"
          onClick={() => void toggle()}
          aria-label={
            playing ? "Pause invitation music" : "Play invitation music"
          }
        >
          {playing ? <Music2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
      {!opened ? (
        <SignatureCover
          template={t}
          details={d}
          opening={opening}
          onOpen={open}
        />
      ) : (
        <div className="signature-document">
          <Hero {...props} />
          {sectionOrders[kind].map((section) => (
            <div key={section} data-signature-section={section}>
              {sections[section]}
            </div>
          ))}
          <section className="sig-panel sig-closing">
            <ClosingArt />
            <span className="sig-kicker">THIS IS JUST THE BEGINNING</span>
            <h2>
              {d.bride}
              <i>&</i>
              {d.groom}
            </h2>
            <p>{displayDate(d.date)}</p>
            <a href="/" className="sig-brand">
              A LITTLE LOVE, BEAUTIFULLY SENT<span>VELORA</span>
            </a>
          </section>
          <nav className="signature-nav" aria-label="Invitation sections">
            <a href="#invitation-top">Home</a>
            <a href="#invitation-story">Our story</a>
            <a href="#invitation-events">The day</a>
            <a href="#invitation-venue">Venue</a>
            <a href="#invitation-rsvp">RSVP</a>
          </nav>
        </div>
      )}
    </div>
  );
}
