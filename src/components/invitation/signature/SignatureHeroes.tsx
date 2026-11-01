"use client";
import { useState } from "react";
import { displayDate } from "@/data/templates";
import {
  Plane,
  Car,
  Palace,
  Lotus,
  Mandala,
  Tusker,
  Peacock,
  Floral,
  Palm,
} from "./Illustrations";
import type { SignatureProps } from "./types";
import { words } from "../InvitationShared";
function Names({
  details: d,
  inline = false,
}: {
  details: SignatureProps["details"];
  inline?: boolean;
}) {
  return (
    <h1 className={inline ? "sig-names inline" : "sig-names"}>
      <span>{d.bride}</span>
      <i>&</i>
      <span>{d.groom}</span>
    </h1>
  );
}
function DateLine({ details: d }: { details: SignatureProps["details"] }) {
  return (
    <p className="sig-date-line">
      {displayDate(d.date)}
      <span>{d.venue}</span>
    </p>
  );
}
export function LotusHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero lotus-folio">
      <Mandala className="folio-crown" />
      <p className="sig-kicker">{words[d.language].together}</p>
      <div className="lotus-family-layout">
        <div>
          <span>WITH EVERY BLESSING</span>
          <p>
            Two families.
            <br />
            One beautiful beginning.
          </p>
        </div>
        <Lotus />
        <div>
          <span>WITH ALL OUR LOVE</span>
          <p>
            We invite you
            <br />
            to be part of our story.
          </p>
        </div>
      </div>
      <Names details={d} inline />
      <img
        className="lotus-couple"
        src={d.photo || "/images/mandalaa-couple-art.webp"}
        alt="An illustrated Kandyan wedding couple"
      />
      <DateLine details={d} />
      <div className="folio-flourish">❦</div>
    </section>
  );
}
export function PalaceHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero palace-arrival">
      <div className="palace-arch-border" />
      <span className="sig-kicker">THE GATES OPEN TO OUR FOREVER</span>
      <Names details={d} />
      <Palace />
      <DateLine details={d} />
      <div className="palace-tuskers">
        <Tusker />
        <Tusker />
      </div>
    </section>
  );
}
export function ProcessionHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero procession-poster">
      <span className="sig-kicker">THE NIGHT BELONGS TO LOVE</span>
      <div className="poster-headline">
        A thousand
        <br />
        <em>little lights.</em>
      </div>
      <div className="poster-date">
        {new Date(d.date + "T12:00:00").getDate()}
        <span>
          {new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", {
            month: "long",
          })}
        </span>
      </div>
      <div className="poster-couple">
        <Names details={d} inline />
        <span>invite you to celebrate</span>
      </div>
      <div className="night-procession">
        <Tusker />
        <Tusker />
        <Tusker />
      </div>
      <p>{d.venue}</p>
      <div className="night-lights">
        {Array.from({ length: 20 }, (_, i) => (
          <i
            key={i}
            style={{ left: `${i * 5}%`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </section>
  );
}
export function PeacockHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero mayura-portrait">
      <div className="mayura-title">
        MAYURA
        <br />
        <i>a celebration of two souls</i>
      </div>
      <Peacock className="mayura-fan" />
      <div className="mayura-medallion">
        <span className="sig-kicker">THE WEDDING OF</span>
        <Names details={d} />
      </div>
      <DateLine details={d} />
    </section>
  );
}
export function FlightHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero flight-arrival">
      <img
        src="/images/signature-colombo-night.webp"
        alt="Original painted Colombo skyline at blue hour"
      />
      <div className="flight-vignette" />
      <div className="airline-header">
        <span>VELORA AIR</span>
        <span>EST. FOREVER</span>
      </div>
      <div className="flight-hero-title">
        <span className="sig-kicker">OUR NEXT DESTINATION</span>
        <h2>
          A lifetime.
          <br />
          <em>Together.</em>
        </h2>
        <Names details={d} inline />
        <DateLine details={d} />
      </div>
      <Plane className="arrival-plane" />
      <span className="arrival-coordinate">CMB · 06°55′N 79°51′E</span>
    </section>
  );
}
export function ManuscriptHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero manuscript-letter">
      <span className="letter-edition">NO. 01 / A LOVE THAT LASTS</span>
      <span className="letter-date">{displayDate(d.date)}</span>
      <div className="manuscript-heading">
        To love,
        <br />
        and all its
        <br />
        <em>adventures.</em>
      </div>
      <div className="manuscript-address">
        <p>Dearest {d.guest},</p>
        <p>{d.message}</p>
        <Names details={d} inline />
      </div>
      <span className="manuscript-seal">
        {d.bride[0]}
        <i>&</i>
        {d.groom[0]}
      </span>
      <div className="letter-bottom">
        SIGNED WITH LOVE <span>❦</span> SEALED FOR ALWAYS
      </div>
    </section>
  );
}
export function BotanicalHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero botanical-editorial">
      <div className="botanical-side-label">
        MOONLIT ARALIYA / A LOVE IN BLOOM
      </div>
      <div className="portrait-oval">
        <Floral />
        <img
          src={d.photo || "/images/mandalaa-couple-art.webp"}
          alt="The wedding couple"
        />
        <Floral />
      </div>
      <span className="sig-kicker">AN INTIMATE CELEBRATION</span>
      <Names details={d} inline />
      <DateLine details={d} />
      <p className="botanical-handwriting">
        some things were always meant to bloom
      </p>
    </section>
  );
}
export function LaceHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero lace-letterhead">
      <img
        className="lace-paper-edge"
        src="/images/signature-beeralu-lace.webp"
        alt=""
      />
      <div className="lace-monogram">
        <span>{d.bride[0]}</span>
        <i>&</i>
        <span>{d.groom[0]}</span>
      </div>
      <p>{words[d.language].together}</p>
      <p className="lace-letter-small">
        REQUEST THE PLEASURE OF YOUR COMPANY
        <br />
        AT THE WEDDING OF
      </p>
      <Names details={d} inline />
      <div className="lace-date">
        <span>
          {new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", {
            weekday: "long",
          })}
        </span>
        <strong>{new Date(d.date + "T12:00:00").getDate()}</strong>
        <span>
          {new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <p>{d.venue}</p>
      <div className="lace-tassel">✧</div>
    </section>
  );
}
export function RoadtripHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero roadtrip-arrival">
      <img
        src="/images/signature-coastal-road.webp"
        alt="Original watercolour of a winding Sri Lankan coastal road"
      />
      <div className="roadtrip-postmark">
        CEYLON
        <br />
        <span>WITH LOVE</span>
        <i>✧</i>
      </div>
      <div className="roadtrip-title">
        <span className="sig-kicker">THE SCENIC ROUTE TO FOREVER</span>
        <h2>
          Let’s go
          <br />
          <em>somewhere beautiful.</em>
        </h2>
        <Names details={d} inline />
      </div>
      <Car className="arrival-car" />
      <div className="roadtrip-destination">
        <span>DESTINATION / {d.venue}</span>
        <strong>{displayDate(d.date)}</strong>
      </div>
    </section>
  );
}
export function GardenHero({ details: d }: SignatureProps) {
  return (
    <section id="invitation-top" className="sig-hero secret-garden">
      <Floral className="garden-vine left" />
      <Floral className="garden-vine right" />
      <span className="sig-kicker">AN INVITATION TO OUR</span>
      <h2>
        Garden
        <br />
        <em>of us.</em>
      </h2>
      <div className="garden-name-plaque">
        <Names details={d} inline />
        <p>{d.message}</p>
      </div>
      <div className="garden-time-card">
        <span>ONE BEAUTIFUL DAY</span>
        <strong>{displayDate(d.date)}</strong>
        <span>{d.venue}</span>
      </div>
      <Lotus className="garden-pond" />
    </section>
  );
}
export const HEROES = {
  lotus: LotusHero,
  palace: PalaceHero,
  procession: ProcessionHero,
  peacock: PeacockHero,
  flight: FlightHero,
  manuscript: ManuscriptHero,
  botanical: BotanicalHero,
  lace: LaceHero,
  roadtrip: RoadtripHero,
  garden: GardenHero,
};
