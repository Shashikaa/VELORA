"use client";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Check,
} from "lucide-react";
import { displayDate, InvitationDetails } from "@/data/templates";
import { useWedding } from "@/context/WeddingContext";
import { saveCalendar } from "@/lib/invitation";
import { Countdown, words } from "../InvitationShared";
import {
  Plane,
  Car,
  Palace,
  Lotus,
  Mandala,
  Tusker,
  Peacock,
  Floral,
  ScrollJourney,
} from "./Illustrations";
import type { SignatureProps } from "./types";
const portrait = "/images/mandalaa-couple-art.webp";
export function MonthGrid({ details: d }: { details: InvitationDetails }) {
  const date = new Date(d.date + "T12:00:00"),
    year = date.getFullYear(),
    month = date.getMonth(),
    first = new Date(year, month, 1).getDay(),
    count = new Date(year, month + 1, 0).getDate();
  return (
    <div className="signature-month">
      <p>
        {date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
      </p>
      <div className="month-grid">
        {"SMTWTFS".split("").map((x, i) => (
          <span className="weekday" key={"w" + i}>
            {x}
          </span>
        ))}
        {Array.from({ length: first }, (_, i) => (
          <span key={"b" + i} />
        ))}
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={i + 1 === date.getDate() ? "wedding-day" : ""}
          >
            {i + 1 === date.getDate() && <Heart size={27} strokeWidth={1} />}
            <i>{i + 1}</i>
          </span>
        ))}
      </div>
    </div>
  );
}
export function Postcard({ details: d }: { details: InvitationDetails }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      className={`signature-postcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      aria-pressed={flipped}
      aria-label={
        flipped ? "Show the postcard illustration" : "Turn over our postcard"
      }
    >
      <div className="postcard-front" aria-hidden={flipped}>
        <img src="/images/signature-coastal-road.webp" alt="" />
        <span>
          greetings from
          <br />
          <strong>
            {d.bride} & {d.groom}
          </strong>
        </span>
        <small>TURN ME OVER ↻</small>
      </div>
      <div className="postcard-back" aria-hidden={!flipped}>
        <div className="postcard-stamp">
          WITH
          <br />
          LOVE
          <br />♡
        </div>
        <p>Dear {d.guest},</p>
        <p>{d.message}</p>
        <span>
          {displayDate(d.date)}
          <br />
          {d.venue}
        </span>
        <strong>
          With love, {d.bride} & {d.groom}
        </strong>
      </div>
    </button>
  );
}
export function WeddingPassport({
  details: d,
}: {
  details: InvitationDetails;
}) {
  const [opened, setOpened] = useState(false);
  return (
    <div className={`wedding-passport ${opened ? "passport-open" : ""}`}>
      <button
        className="passport-cover"
        aria-expanded={opened}
        onClick={() => setOpened(!opened)}
      >
        <span>VELORA / CEYLON</span>
        <Plane />
        <h3>
          Wedding
          <br />
          <em>passport.</em>
        </h3>
        <p>
          {d.bride} & {d.groom}
        </p>
        <small>
          {opened ? "CLOSE TRAVEL DOCUMENT" : "OPEN YOUR TRAVEL DOCUMENT →"}
        </small>
      </button>
      {opened && (
        <div className="passport-spread">
          <div className="passport-photo">
            <img src={d.photo || portrait} alt="The wedding couple" />
            <span>LKA / LOVE</span>
          </div>
          <dl>
            <div>
              <dt>TRAVELLERS</dt>
              <dd>
                {d.bride} & {d.groom}
              </dd>
            </div>
            <div>
              <dt>DESTINATION</dt>
              <dd>{d.venue}</dd>
            </div>
            <div>
              <dt>DATE OF UNION</dt>
              <dd>{displayDate(d.date)}</dd>
            </div>
            <div>
              <dt>VALID UNTIL</dt>
              <dd>Forever, and a day</dd>
            </div>
          </dl>
          <div className="passport-mrz">
            {d.bride.toUpperCase().replace(/[^A-Z]/g, "")}&lt;&lt;
            {d.groom.toUpperCase().replace(/[^A-Z]/g, "")}
            &lt;&lt;TOGETHER&lt;FOREVER
          </div>
        </div>
      )}
    </div>
  );
}
export function SignatureDate(props: SignatureProps) {
  const { template: t, details: d } = props;
  const kind = t.signature!;
  if (kind === "flight")
    return (
      <section className="sig-panel flight-departure" id="invitation-date">
        <span className="sig-kicker">SCHEDULED DEPARTURE</span>
        <div className="airport-heading">
          <h2>
            Forever
            <br />
            is boarding.
          </h2>
          <Plane />
        </div>
        <Countdown date={d.date} time={d.time} />
        <div className="boarding-pass">
          <div>
            <span>FROM</span>
            <strong>CMB</strong>
            <small>OUR BEAUTIFUL ISLAND</small>
          </div>
          <Plane />
          <div>
            <span>TO</span>
            <strong>LOVE</strong>
            <small>A LIFETIME TOGETHER</small>
          </div>
          <footer>
            <span>{displayDate(d.date)}</span>
            <span>GATE / {d.time}</span>
            <span>SEAT / ♥</span>
          </footer>
        </div>
        <button className="sig-action" onClick={() => saveCalendar(d)}>
          <CalendarDays size={14} /> Add departure to calendar
        </button>
      </section>
    );
  if (kind === "roadtrip")
    return (
      <section className="sig-panel roadtrip-post-office" id="invitation-date">
        <span className="sig-kicker">SPECIAL DELIVERY / JUST FOR YOU</span>
        <h2>
          A postcard
          <br />
          <em>from our hearts.</em>
        </h2>
        <Postcard details={d} />
        <button className="sig-action" onClick={() => saveCalendar(d)}>
          <CalendarDays size={14} /> Keep this day free
        </button>
      </section>
    );
  if (kind === "lace" || kind === "botanical")
    return (
      <section
        className={`sig-panel date-keepsake ${kind === "lace" ? "scalloped-keepsake" : "botanical-keepsake"}`}
        id="invitation-date"
      >
        <span className="sig-kicker">A DAY WORTH KEEPING</span>
        <h2>
          Circle this
          <br />
          <em>little moment.</em>
        </h2>
        <MonthGrid details={d} />
        <Countdown date={d.date} time={d.time} />
        <button className="sig-action" onClick={() => saveCalendar(d)}>
          <CalendarDays size={14} /> Save our date
        </button>
      </section>
    );
  if (kind === "manuscript")
    return (
      <section className="sig-panel manuscript-date" id="invitation-date">
        <span className="sig-kicker">A NOTE IN THE MARGIN</span>
        <h2>
          {new Date(d.date + "T12:00:00").getDate()}
          <small>
            {new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </small>
        </h2>
        <p>
          Please keep this page
          <br />
          in your calendar.
        </p>
        <button className="sig-action" onClick={() => saveCalendar(d)}>
          Make a little note <CalendarDays size={14} />
        </button>
        <Countdown date={d.date} time={d.time} />
      </section>
    );
  return (
    <section
      className={`sig-panel signature-date-${kind}`}
      id="invitation-date"
    >
      {kind === "lotus" ? (
        <Lotus />
      ) : kind === "palace" ? (
        <Palace />
      ) : kind === "peacock" ? (
        <Peacock />
      ) : kind === "procession" ? (
        <div className="single-lantern" />
      ) : (
        <Floral />
      )}
      <span className="sig-kicker">{words[d.language].date}</span>
      <h2>
        {kind === "procession"
          ? "Until the lights come on."
          : kind === "garden"
            ? "A season for forever."
            : kind === "peacock"
              ? "A beautiful day awaits."
              : "The auspicious hour."}
      </h2>
      <div className="date-roundel">
        <strong>{new Date(d.date + "T12:00:00").getDate()}</strong>
        <span>
          {new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <Countdown date={d.date} time={d.time} />
      <button className="sig-action" onClick={() => saveCalendar(d)}>
        Save the date <CalendarDays size={14} />
      </button>
    </section>
  );
}
function FoldedLetter({ details: d }: { details: InvitationDetails }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`folded-love-letter ${open ? "unfolded" : ""}`}>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>FOR YOUR EYES, WITH LOVE</span>
        <h3>
          A little letter
          <br />
          <em>about us.</em>
        </h3>
        <span>{open ? "FOLD IT BACK ↑" : "UNFOLD OUR LETTER ↓"}</span>
      </button>
      {open && (
        <div className="letter-inside">
          <p>{d.story}</p>
          <span>Yours, in every chapter.</span>
          <strong>
            {d.bride} & {d.groom}
          </strong>
        </div>
      )}
    </div>
  );
}
export function SignatureStory({ template: t, details: d }: SignatureProps) {
  switch (t.signature) {
    case "lotus":
      return (
        <section className="sig-panel lotus-story" id="invitation-story">
          <div className="story-lotus-medallion">
            <Lotus />
          </div>
          <span className="sig-kicker">ROOTED IN LOVE / BLESSED BY FAMILY</span>
          <h2>
            Two hearts.
            <br />
            <em>One sacred beginning.</em>
          </h2>
          <p>{d.story}</p>
          <div className="lotus-family-names">
            <span>
              {d.bride}
              <small>WITH LOVE & GRATITUDE</small>
            </span>
            <Lotus />
            <span>
              {d.groom}
              <small>WITH EVERY BLESSING</small>
            </span>
          </div>
        </section>
      );
    case "palace":
      return (
        <section className="sig-panel palace-houses" id="invitation-story">
          <span className="sig-kicker">TWO FAMILIES, ONE CELEBRATION</span>
          <h2>
            Where our
            <br />
            <em>stories become one.</em>
          </h2>
          <div className="house-arches">
            <div>
              <Tusker />
              <h3>{d.bride}</h3>
              <p>A heart full of dreams.</p>
            </div>
            <div>
              <Tusker />
              <h3>{d.groom}</h3>
              <p>A lifetime to share them.</p>
            </div>
          </div>
          <p>{d.story}</p>
        </section>
      );
    case "procession":
      return (
        <section className="sig-panel night-story" id="invitation-story">
          <span className="sig-kicker">THE LIGHTS ALONG OUR WAY</span>
          <h2>
            A story,
            <br />
            <em>beautifully illuminated.</em>
          </h2>
          <div className="light-timeline">
            {[
              "A little spark",
              "A brighter kind of love",
              "A lifetime of light",
            ].map((x, i) => (
              <article key={x}>
                <i />
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>
                  {i === 1
                    ? d.story
                    : i === 0
                      ? "Every great story begins with a little hello."
                      : "And now, we light the next chapter together."}
                </p>
              </article>
            ))}
          </div>
        </section>
      );
    case "peacock":
      return (
        <section className="sig-panel mayura-story" id="invitation-story">
          <span className="sig-kicker">EVERY COLOUR OF OUR LOVE</span>
          <h2>
            A little extraordinary.
            <br />
            <em>Just like us.</em>
          </h2>
          <div className="mayura-story-orbits">
            <Mandala />
            <img src={d.photo || portrait} alt="The wedding couple" />
            <span>
              TOGETHER
              <br />
              IN EVERY SEASON
            </span>
          </div>
          <p>{d.story}</p>
        </section>
      );
    case "flight":
      return (
        <section className="sig-panel travel-document" id="invitation-story">
          <span className="sig-kicker">YOUR TRAVEL DOCUMENT</span>
          <h2>
            Cleared for
            <br />
            <em>a lifetime together.</em>
          </h2>
          <WeddingPassport details={d} />
          <p>{d.story}</p>
          <p className="sig-fine-print">
            A keepsake wedding document. Made for love, not for travel.
          </p>
          <ScrollJourney variant="flight" />
        </section>
      );
    case "manuscript":
      return (
        <section className="sig-panel manuscript-story" id="invitation-story">
          <span className="sig-kicker">CHAPTER ONE / DEAREST YOU</span>
          <FoldedLetter details={d} />
        </section>
      );
    case "botanical":
      return (
        <section className="sig-panel botanical-story" id="invitation-story">
          <div className="pressed-flower-photo">
            <img src={d.photo || portrait} alt="Our portrait" />
            <Floral />
            <span>US, IN FULL BLOOM</span>
          </div>
          <div>
            <span className="sig-kicker">OUR KIND OF ROMANCE</span>
            <h2>
              Gently,
              <br />
              <em>then all at once.</em>
            </h2>
            <p>{d.story}</p>
          </div>
        </section>
      );
    case "lace":
      return (
        <section className="sig-panel lace-story" id="invitation-story">
          <span className="sig-kicker">THREADS OF A BEAUTIFUL LIFE</span>
          <h2>
            Some things
            <br />
            <em>are woven to last.</em>
          </h2>
          <div className="lace-portrait">
            <img src={d.photo || portrait} alt="The wedding couple" />
          </div>
          <p>{d.story}</p>
          <p className="lace-signoff">
            {d.bride} & {d.groom}
          </p>
        </section>
      );
    case "roadtrip":
      return (
        <section className="sig-panel roadtrip-story" id="invitation-story">
          <span className="sig-kicker">OUR JOURNEY / THE LONG WAY HOME</span>
          <h2>
            Every turn
            <br />
            <em>led us to you.</em>
          </h2>
          <p>{d.story}</p>
          <p className="sig-fine-print">Scroll along the road with us.</p>
          <ScrollJourney />
        </section>
      );
    case "garden":
      return (
        <section className="sig-panel garden-story" id="invitation-story">
          <span className="sig-kicker">FROM A SEED TO FOREVER</span>
          <h2>
            Love grows
            <br />
            <em>in little moments.</em>
          </h2>
          <div className="garden-story-plots">
            {[
              ["The seed", "A little hello, and something quietly took root."],
              ["The bloom", d.story],
              [
                "The garden",
                "A life full of little moments, shared with the people we love.",
              ],
            ].map(([heading, body], i) => (
              <details key={heading} open={i === 1}>
                <summary>
                  <span>0{i + 1}</span>
                  <h3>{heading}</h3>
                  <Floral />
                </summary>
                <p>{body}</p>
              </details>
            ))}
          </div>
        </section>
      );
    default:
      return null;
  }
}
export function SignatureEvents({ template: t, details: d }: SignatureProps) {
  const time = new Date(`${d.date}T${d.time}:00+05:30`).toLocaleTimeString(
    "en-GB",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Colombo",
    },
  );
  if (t.signature === "flight")
    return (
      <section className="sig-panel flight-events" id="invitation-events">
        <span className="sig-kicker">TODAY’S DEPARTURES</span>
        <h2>
          A journey
          <br />
          <em>worth celebrating.</em>
        </h2>
        <div className="departures-board">
          <header>
            <span>TIME</span>
            <span>DESTINATION</span>
            <span>STATUS</span>
          </header>
          <div>
            <strong>{time}</strong>
            <span>{t.ceremony}</span>
            <i>BOARDING</i>
          </div>
          <div>
            <strong>AFTER</strong>
            <span>Celebration & reception</span>
            <i>ON TIME</i>
          </div>
          <div>
            <strong>ALWAYS</strong>
            <span>A lifetime together</span>
            <i>CONFIRMED</i>
          </div>
        </div>
        <p>
          {displayDate(d.date)}
          <br />
          {d.venue}
        </p>
      </section>
    );
  return (
    <section
      className={`sig-panel signature-events events-${t.signature}`}
      id="invitation-events"
    >
      <span className="sig-kicker">{words[d.language].day}</span>
      <h2>
        {t.signature === "procession"
          ? "Let the evening unfold."
          : t.signature === "roadtrip"
            ? "Your lovely little itinerary."
            : t.signature === "manuscript"
              ? "The particulars."
              : t.signature === "garden"
                ? "Meet us in the garden."
                : "The celebration."}
      </h2>
      <div className="signature-event-layout">
        <article>
          {t.signature === "roadtrip" ? (
            <Car />
          ) : t.signature === "palace" ? (
            <Palace />
          ) : t.signature === "peacock" ? (
            <Peacock />
          ) : (
            <Lotus />
          )}
          <span className="event-number">01</span>
          <h3>{t.ceremony}</h3>
          <strong>{time}</strong>
          <p>{displayDate(d.date)}</p>
          <p>{d.venue}</p>
        </article>
        <article>
          {t.signature === "roadtrip" ? (
            <Heart />
          ) : t.signature === "palace" ? (
            <Tusker />
          ) : (
            <Floral />
          )}
          <span className="event-number">02</span>
          <h3>To love & laughter</h3>
          <strong>RECEPTION TO FOLLOW</strong>
          <p>
            A joyful gathering.
            <br />A beautiful meal.
            <br />
            Memories to keep forever.
          </p>
        </article>
      </div>
    </section>
  );
}
export function SignatureGallery({ template: t, details: d }: SignatureProps) {
  const photos = [
    { src: d.photo || portrait, alt: "Our wedding portrait" },
    { src: t.image, alt: "Wedding celebration inspiration" },
    {
      src:
        t.signature === "roadtrip"
          ? "/images/signature-coastal-road.webp"
          : t.signature === "flight"
            ? "/images/signature-colombo-night.webp"
            : "/images/mandalaa-gallery-bridge.webp",
      alt: "An island setting",
    },
  ];
  const [index, setIndex] = useState(0);
  const strip = ["flight", "procession", "manuscript"].includes(t.signature!);
  return (
    <section
      className={`sig-panel signature-gallery gallery-${t.signature}`}
      id="invitation-gallery"
    >
      <span className="sig-kicker">
        {strip
          ? "THE REEL / OUR FAVOURITE FRAMES"
          : "A LITTLE ALBUM / FOR ALWAYS"}
      </span>
      <h2>
        {t.signature === "roadtrip"
          ? "Wish you were here."
          : t.signature === "flight"
            ? "A few captured coordinates."
            : t.signature === "lace"
              ? "Precious little moments."
              : "The moments we keep."}
      </h2>
      {strip ? (
        <>
          <div className="film-frame">
            <img src={photos[index].src} alt={photos[index].alt} />
            <span>FRAME / 0{index + 1}</span>
          </div>
          <div className="film-controls">
            <button
              aria-label="Previous photo"
              onClick={() => setIndex((index + 2) % 3)}
            >
              <ChevronLeft size={16} />
            </button>
            <span>0{index + 1} — 03</span>
            <button
              aria-label="Next photo"
              onClick={() => setIndex((index + 1) % 3)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      ) : (
        <div className="signature-photo-mosaic">
          {photos.map((p, i) => (
            <figure key={i}>
              <img src={p.src} alt={p.alt} loading="lazy" />
              <figcaption>
                {["a little love", "a beautiful day", "our kind of forever"][i]}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <span className="sig-fine-print">
        Illustrative sample imagery · make it yours with your photographs
      </span>
    </section>
  );
}
export function SignatureVenue({ template: t, details: d }: SignatureProps) {
  return (
    <section
      className={`sig-panel sig-venue venue-${t.signature}`}
      id="invitation-venue"
    >
      {t.signature === "flight" ? (
        <img
          className="venue-backdrop"
          src="/images/signature-colombo-night.webp"
          alt=""
        />
      ) : t.signature === "roadtrip" ? (
        <Car />
      ) : t.signature === "palace" ? (
        <Palace />
      ) : (
        <MapPin size={25} />
      )}
      <span className="sig-kicker">
        {t.signature === "flight"
          ? "FINAL DESTINATION"
          : t.signature === "roadtrip"
            ? "THE LAST TURN / THE FIRST CHAPTER"
            : words[d.language].venue}
      </span>
      <h2>{d.venue}</h2>
      <p>
        {displayDate(d.date)}
        <br />
        We’ll be waiting with the biggest smiles.
      </p>
      <a
        className="sig-action"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.venue)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Find your way here <ArrowRight size={14} />
      </a>
    </section>
  );
}
export function SignatureReply({ template: t, details: d }: SignatureProps) {
  const { addResponse } = useWedding();
  const [attend, setAttend] = useState(true),
    [sent, setSent] = useState(false);
  return (
    <section
      className={`sig-panel sig-reply invite-rsvp reply-${t.signature}`}
      id="invitation-rsvp"
    >
      <span className="sig-kicker">A LITTLE REPLY / A LOT OF JOY</span>
      <h2>{words[d.language].rsvp}</h2>
      {sent ? (
        <div className="signature-rsvp-success" role="status">
          <Check size={25} />
          <h3>
            {attend ? "We’ve saved your little seat." : "With you, in spirit."}
          </h3>
          <p>Your demo response is saved on this device.</p>
          <button className="sig-action" onClick={() => setSent(false)}>
            Send another response
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const name = String(form.get("name") || "").trim();
            if (name.length < 2) return;
            addResponse({
              templateId: t.id,
              name,
              attending: attend,
              guests: attend ? Number(form.get("guests")) : 0,
              note: String(form.get("note") || ""),
            });
            setSent(true);
          }}
        >
          <label>
            Your full name
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Your name, with love"
            />
          </label>
          <div
            className="attendance-choice"
            role="group"
            aria-label="Attendance"
          >
            <button
              type="button"
              className={attend ? "selected" : ""}
              aria-pressed={attend}
              onClick={() => setAttend(true)}
            >
              Joyfully accept
            </button>
            <button
              type="button"
              className={!attend ? "selected" : ""}
              aria-pressed={!attend}
              onClick={() => setAttend(false)}
            >
              Regretfully decline
            </button>
          </div>
          {attend && (
            <label>
              Number of guests, including you
              <select name="guests" defaultValue="1">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            A little note (optional)
            <textarea
              name="note"
              maxLength={500}
              rows={2}
              placeholder="A little wish for our forever…"
            />
          </label>
          <button className="sig-action" type="submit">
            Send demo RSVP <Heart size={13} />
          </button>
          <p className="demo-note">
            Sample invitation. Responses stay in this browser; no message is
            sent to the couple.
          </p>
        </form>
      )}
    </section>
  );
}
