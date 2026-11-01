"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Music2,
  VolumeX,
  ChevronDown,
  Check,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import {
  WeddingTemplate,
  InvitationDetails,
  displayDate,
} from "@/data/templates";
import { useWedding } from "@/context/WeddingContext";
import { MotifArt, Mandala, Lotus, Floral, Tusker } from "./Motifs";
import { themeStyle } from "./InvitationCard";
import SignatureScene from "./SignatureScene";
import CoutureExperience from "./couture/CoutureExperience";
import ReferenceExperience from "./reference/ReferenceExperience";
import CelebrationExperience from "./celebrations/CelebrationExperience";
import UploadedInvitation from "./UploadedInvitation";
import SignatureExperience from "./signature/SignatureExperience";
import { Countdown, useMusic, words } from "./InvitationShared";
import { saveCalendar } from "@/lib/invitation";
function ClassicExperience({
  template: t,
  details: d,
  startOpen = false,
}: {
  template: WeddingTemplate;
  details: InvitationDetails;
  startOpen?: boolean;
}) {
  const [opened, setOpened] = useState(startOpen),
    [opening, setOpening] = useState(false),
    [attend, setAttend] = useState(true),
    [sent, setSent] = useState(false);
  const { addResponse } = useWedding();
  const reduce = useReducedMotion();
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playing, toggle } = useMusic(d.musicUrl, d.soundtrack);
  const w = words[d.language];
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(
    () => () => {
      if (openingTimer.current) clearTimeout(openingTimer.current);
    },
    [],
  );
  const open = () => {
    if (opening) return;
    setOpening(true);
    openingTimer.current = setTimeout(
      () => setOpened(true),
      reduce ? 30 : 1700,
    );
  };
  const reveal = {
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1 },
  };
  return (
    <div
      ref={scroll}
      className={`invitation-shell scene-${t.motif} ${opened ? "is-open" : "is-closed"}`}
      style={themeStyle(t)}
      lang={d.language}
    >
      <div className="invite-utilities">
        <button
          className="music-button"
          onClick={() => void toggle()}
          aria-label={
            playing ? "Pause invitation music" : "Play invitation music"
          }
          title="Original instrumental chimes"
        >
          {playing ? <Music2 size={16} /> : <VolumeX size={16} />}
          <span>{playing ? "Music on" : "Music off"}</span>
        </button>
      </div>
      <AnimatePresence>
        {!opened && (
          <motion.div
            className={`opening-cover opening-${t.opening} ${opening ? "is-opening" : ""}`}
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="cover-half left" />
            <div className="cover-half right" />
            <div className="opening-orbits">
              <Mandala />
              <Mandala />
            </div>
            {t.artwork && <img className="cover-art" src={t.artwork} alt="" />}
            <div className="cover-content">
              <span className="eyebrow">{w.invited}</span>
              <MotifArt motif={t.motif} className="cover-motif" />
              <h1>
                {d.bride}
                <i>&</i>
                {d.groom}
              </h1>
              <p>{displayDate(d.date)}</p>
              <button
                className="wax-seal"
                onClick={open}
                disabled={opening}
                aria-label={w.open}
              >
                <span>
                  {d.bride.slice(0, 1)}
                  <i>&</i>
                  {d.groom.slice(0, 1)}
                </span>
              </button>
              <button
                className="cover-open-text"
                onClick={open}
                disabled={opening}
              >
                {opening ? "A beautiful beginning…" : w.open}
                <span>↓</span>
              </button>
              <small>For {d.guest}</small>
            </div>
            <div className="opening-petals">
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} style={{ "--petal": i } as React.CSSProperties} />
              ))}
            </div>
            <div className="cover-footer">
              VELORA <span>✦</span> A LITTLE LOVE, BEAUTIFULLY SENT
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {opened && (
        <div className="invitation-document">
          <section className="invite-hero" id="invitation-top">
            {t.artwork ? (
              <img
                className="invite-hero-art"
                src={t.artwork}
                alt="Watercolour Sri Lankan ceremonial tuskers among lotus flowers"
              />
            ) : (
              <>
                <div className="hero-ornaments">
                  <Floral />
                  <Floral />
                </div>
                <Mandala className="invite-hero-mandala" />
              </>
            )}
            {t.premium && <SignatureScene motif={t.motif} />}
            <div className="floating-petals" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} style={{ "--petal": i } as React.CSSProperties} />
              ))}
            </div>
            <motion.div {...reveal} className="invite-hero-copy">
              <MotifArt motif={t.motif} className="invite-crest" />
              <p className="eyebrow">{w.together}</p>
              <p className="invite-wedding-label">{w.wedding}</p>
              <h1>
                {d.bride}
                <i>&</i>
                {d.groom}
              </h1>
              <div className="ornament-rule">✦</div>
              <p className="invite-date">{displayDate(d.date)}</p>
              <p className="invite-venue-name">{d.venue}</p>
              <a href="#invitation-story" className="invite-scroll">
                <span>{w.scroll}</span>
                <ChevronDown size={17} />
              </a>
            </motion.div>
          </section>
          <section className="invite-section invite-intro">
            <motion.div {...reveal}>
              <Lotus className="section-lotus" />
              <p className="invitation-guest">Dearest {d.guest},</p>
              <p className="invite-message">{d.message}</p>
              <p className="eyebrow">{w.date}</p>
              <Countdown date={d.date} time={d.time} />
              <button className="invite-button" onClick={() => saveCalendar(d)}>
                <CalendarDays size={15} /> Save the date
              </button>
              <span className="timezone-note">
                All event times are in Sri Lanka (UTC+05:30).
              </span>
            </motion.div>
          </section>
          <section
            className="invite-section invite-story"
            id="invitation-story"
          >
            <motion.div {...reveal}>
              <span className="eyebrow">OUR STORY</span>
              <h2>{w.story}</h2>
              <div className="story-art">
                {d.photo ? (
                  <img src={d.photo} alt={`${d.bride} and ${d.groom}`} />
                ) : t.motif === "elephant" || t.motif === "perahera" ? (
                  <>
                    <Tusker />
                    <Tusker />
                  </>
                ) : (
                  <img
                    src="/images/mandalaa-couple-art.webp"
                    alt="Illustration of a couple in traditional Kandyan wedding attire"
                  />
                )}
              </div>
              <p>{d.story}</p>
              <div className="story-milestones">
                <div>
                  <span>01</span>
                  <strong>A little hello</strong>
                </div>
                <div>
                  <span>02</span>
                  <strong>A beautiful yes</strong>
                </div>
                <div>
                  <span>03</span>
                  <strong>Our forever</strong>
                </div>
              </div>
            </motion.div>
          </section>
          <section
            className="invite-section invite-events"
            id="invitation-events"
          >
            <motion.div {...reveal}>
              <span className="eyebrow">CELEBRATE WITH US</span>
              <h2>{w.day}</h2>
              <p>{displayDate(d.date)}</p>
              <div className="event-item">
                <MotifArt motif={t.motif} />
                <div>
                  <h3>{t.ceremony}</h3>
                  <p>
                    {new Date(
                      `${d.date}T${d.time}:00+05:30`,
                    ).toLocaleTimeString("en-GB", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Colombo",
                    })}
                  </p>
                  <p>{d.venue}</p>
                </div>
              </div>
              <div className="event-item">
                <Lotus />
                <div>
                  <h3>A celebration of love</h3>
                  <p>Reception to follow</p>
                  <p>Good company, joyful hearts & beautiful memories.</p>
                </div>
              </div>
            </motion.div>
          </section>
          <section
            className="invite-section invite-gallery"
            id="invitation-gallery"
          >
            <motion.div {...reveal}>
              <span className="eyebrow">MOMENTS TO TREASURE</span>
              <h2>{w.gallery}</h2>
              <div className="invite-photo-grid">
                <img
                  src={d.photo || "/images/mandalaa-couple-art.webp"}
                  alt={d.photo ? "Our portrait" : "Illustrated wedding couple"}
                  loading="lazy"
                />
                <img
                  src={t.image}
                  alt="Wedding celebration inspiration"
                  loading="lazy"
                />
                <img
                  src="/images/mandalaa-gallery-bridge.webp"
                  alt="A romantic island setting"
                  loading="lazy"
                />
              </div>
              <small className="demo-photo-caption">
                {d.photo
                  ? "Your portrait with inspiration imagery"
                  : "Illustrative sample imagery · your photographs will belong here"}
              </small>
            </motion.div>
          </section>
          <section
            className="invite-section invite-location"
            id="invitation-venue"
          >
            <motion.div {...reveal}>
              <MapPin className="location-pin" />
              <span className="eyebrow">THE VENUE</span>
              <h2>{w.venue}</h2>
              <h3>{d.venue}</h3>
              <p>{displayDate(d.date)} · Sri Lanka</p>
              <a
                className="invite-button"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.venue)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </section>
          <section className="invite-section invite-rsvp" id="invitation-rsvp">
            <motion.div {...reveal}>
              <span className="eyebrow">KINDLY RESPOND</span>
              <h2>{w.rsvp}</h2>
              {sent ? (
                <div className="rsvp-success" role="status">
                  <Check size={28} />
                  <h3>
                    {attend
                      ? "We can’t wait to celebrate with you."
                      : "You’ll be with us in spirit."}
                  </h3>
                  <p>Your demo response is saved on this device.</p>
                  <button className="text-link" onClick={() => setSent(false)}>
                    Send another response
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    addResponse({
                      templateId: t.id,
                      name: String(data.get("name")).trim(),
                      attending: attend,
                      guests: attend ? Number(data.get("guests")) : 0,
                      note: String(data.get("note") || ""),
                    });
                    setSent(true);
                  }}
                >
                  <label>
                    Your full name
                    <input
                      required
                      name="name"
                      minLength={2}
                      maxLength={100}
                      placeholder="How should we save your seat?"
                    />
                  </label>
                  <div
                    className="attendance-choice"
                    role="group"
                    aria-label="Attendance"
                  >
                    <button
                      type="button"
                      aria-pressed={attend}
                      className={attend ? "selected" : ""}
                      onClick={() => setAttend(true)}
                    >
                      Joyfully accept
                    </button>
                    <button
                      type="button"
                      aria-pressed={!attend}
                      className={!attend ? "selected" : ""}
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
                      rows={2}
                      maxLength={500}
                      placeholder="A wish for the happy couple…"
                    />
                  </label>
                  <button className="invite-button" type="submit">
                    Send demo RSVP <Heart size={14} />
                  </button>
                  <p className="demo-note">
                    Sample invitation. Responses stay in this browser; no
                    message is sent to the couple.
                  </p>
                </form>
              )}
            </motion.div>
          </section>
          <section className="invite-section invite-closing">
            <MotifArt motif={t.motif} />
            <p>{w.blessing}</p>
            <h2>
              {d.bride} <i>&</i> {d.groom}
            </h2>
            <span>{displayDate(d.date)}</span>
            <div className="invite-made">
              A BEAUTIFUL BEGINNING BY <a href="/">VELORA</a>
            </div>
          </section>
          <nav className="invite-nav" aria-label="Invitation sections">
            <a href="#invitation-top">Home</a>
            <a href="#invitation-events">The day</a>
            <a href="#invitation-gallery">Moments</a>
            <a href="#invitation-venue">Venue</a>
            <a href="#invitation-rsvp">RSVP</a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default function InvitationExperience(props: {
  template: WeddingTemplate;
  details: InvitationDetails;
  startOpen?: boolean;
}) {
  if (props.template.couture) return <CoutureExperience {...props} />;
  if (props.template.referenceExperience) return <ReferenceExperience {...props} />;
  if (props.template.celebrationLayout) return <CelebrationExperience {...props} />;
  if (props.template.embeddedTemplate) return <UploadedInvitation {...props} />;
  return props.template.signature ? (
    <SignatureExperience {...props} />
  ) : (
    <ClassicExperience {...props} />
  );
}
