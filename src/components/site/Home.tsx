"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  ChevronDown,
  Check,
  Globe,
  MousePointer2,
  Send,
  Heart,
} from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import InvitationCard from "@/components/invitation/InvitationCard";
import PreviewModal from "@/components/invitation/PreviewModal";
import { Mandala, Lotus, Floral } from "@/components/invitation/Motifs";
import Gallery from "./Gallery";
import Reveal from "./Reveal";
export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <main id="main">
      <section className="home-hero">
        <div className="hero-left">
          <Reveal>
            <p className="eyebrow">
              <span className="little-line" /> WEDDING INVITATIONS, REIMAGINED
            </p>
            <h1>
              Before the vows,
              <br />a beautiful
              <br />
              <em>beginning.</em>
              <span className="heading-star">✧</span>
            </h1>
            <p className="hero-description">
              An invitation that feels like you. Thoughtfully crafted,
              <br className="desktop-break" /> beautifully animated, and rooted
              in a little island magic.
            </p>
            <div className="hero-buttons">
              <Link className="button" href="/templates">
                Find your invitation <ArrowUpRight size={17} />
              </Link>
              <button
                className="hero-play"
                onClick={() => setPreview(TEMPLATES[0].id)}
              >
                <span>
                  <Play size={12} fill="currentColor" />
                </span>
                Experience a little magic
              </button>
            </div>
            <div className="hero-footnote">
              <span>CRAFTED IN SRI LANKA</span>
              <i>✦</i>
              <span>MADE FOR YOUR FOREVER</span>
            </div>
          </Reveal>
        </div>
        <div className="hero-art">
          <Mandala className="hero-back-mandala" />
          <span className="hero-art-caption">
            a love story, brought to life
          </span>
          <div className="hero-card-shadow" />
          <div className="hero-back-card">
            <InvitationCard template={TEMPLATES[1]} hero />
          </div>
          <button
            className="hero-front-card"
            onClick={() => setPreview(TEMPLATES[0].id)}
            aria-label="Experience the Lotus Reverie invitation"
          >
            <InvitationCard template={TEMPLATES[0]} hero />
            <span className="hero-open-seal">
              <Lotus />
            </span>
          </button>
          <span className="hero-touch-note">
            <MousePointer2 size={15} /> Tap to fall in love
          </span>
          <span className="hero-number">01 / THE SIGNATURE SERIES</span>
          <Floral className="hero-edge-flower" />
        </div>
        <a href="#collection" className="hero-scroll">
          <ChevronDown size={14} /> SCROLL TO DISCOVER
        </a>
      </section>
      <div className="heritage-ribbon">
        <span>Small details. Lasting impressions.</span>
        <i>✧</i>
        <span>27 distinct animated designs</span>
        <i>✧</i>
        <span>Your language. Your love story.</span>
        <i>✧</i>
        <span>A little island soul</span>
        <i>✧</i>
      </div>
      <Gallery />
      <section className="signature-editorial section-pad">
        <div className="signature-editorial-art">
          <img
            src="/images/heritage-tuskers.webp"
            alt="Original watercolour illustration of Sri Lankan ceremonial tuskers, lotus blossoms and Kandyan architecture"
            loading="lazy"
          />
          <div>
            <span>THE WEDDING OF</span>
            <h3>
              Nethmi
              <br />
              <i>&</i>
              <br />
              Sanuja
            </h3>
            <p>12 · 06 · 2027</p>
          </div>
        </div>
        <Reveal className="signature-editorial-copy">
          <p className="eyebrow">
            THE SIGNATURE EXPERIENCE <span>✧</span>
          </p>
          <h2>
            More than an invitation.
            <br />
            <em>A moment to remember.</em>
          </h2>
          <p>
            A lotus slowly unfolds. Golden doors open. A little piece of Ceylon
            comes to life. Our Signature collection turns your first hello into
            something your guests will feel.
          </p>
          <p>
            Six thoughtfully composed designs, inspired by the art, landscapes
            and celebrations of our island.
          </p>
          <div className="editorial-checks">
            <span>
              <Check size={14} /> Distinctive opening reveals
            </span>
            <span>
              <Check size={14} /> A full, immersive invitation
            </span>
            <span>
              <Check size={14} /> Your details, beautifully woven in
            </span>
          </div>
          <Link className="button light" href="/templates?collection=signature">
            Discover Signature <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
      <section className="process-section section-pad" id="our-process">
        <Reveal>
          <p className="eyebrow">FROM YOUR HEART TO THEIR SCREEN</p>
          <h2>
            A little simple.
            <br />
            <em>A lot of special.</em>
          </h2>
        </Reveal>
        <div className="process-grid">
          {[
            {
              n: "01",
              icon: Heart,
              title: "Find your feeling",
              text: "Browse the collection. Open a few invitations. Save the ones that make your heart say yes.",
            },
            {
              n: "02",
              icon: MousePointer2,
              title: "Make it your story",
              text: "Add your names, your date, your place and a little of your love story. Watch it come to life.",
            },
            {
              n: "03",
              icon: Send,
              title: "Send a little love",
              text: "Preview your invitation, copy your personal link and share it with the people who mean the most.",
            },
          ].map(({ n, icon: Icon, title, text }) => (
            <Reveal key={n}>
              <div className="process-step">
                <span>{n}</span>
                <Icon size={25} strokeWidth={1} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="cultural-note section-pad">
        <Reveal>
          <Lotus />
          <p className="eyebrow">OUR ISLAND. YOUR INSPIRATION.</p>
          <h2>
            Some things are too beautiful
            <br />
            <em>to leave in the past.</em>
          </h2>
          <p>
            The curves of a liya vela. The grace of a tusker. The quiet beauty
            of a lotus in bloom.
            <br />
            We bring a little of our heritage into a new way of celebrating
            love.
          </p>
          <div className="culture-tags">
            <span>Lotus & liya vela</span>
            <i>✦</i>
            <span>Kandyan artistry</span>
            <i>✦</i>
            <span>Island landscapes</span>
            <i>✦</i>
            <span>Modern romance</span>
          </div>
        </Reveal>
      </section>
      <section className="faq-section section-pad">
        <div>
          <p className="eyebrow">A FEW LITTLE ANSWERS</p>
          <h2>
            Wondering
            <br />
            <em>about something?</em>
          </h2>
        </div>
        <div>
          {[
            [
              "Can I experience an invitation before choosing?",
              "Absolutely. Every design opens into an interactive preview. Tap its seal, explore the story, test the music and see the full invitation.",
            ],
            [
              "Can I add our names and wedding details?",
              "Yes. Open the studio to change names, dates, time, venue, guest greeting, story and introductory message. You can save your draft on your device and export its configuration.",
            ],
            [
              "Are Sinhala and Tamil supported?",
              "The invitation interface includes English, Sinhala and Tamil. Names and personal messages support Unicode, so you can write your own text in your language. A fluent speaker should review your final wording.",
            ],
            [
              "How do sharing and RSVPs work in this project?",
              "The studio creates a link containing your text details. Once you host the project, that link opens your personalised invitation. RSVP responses in this edition are a browser-local demo; a shared database and delivery service must be connected before collecting real guest responses.",
            ],
            [
              "Can we use our own photographs?",
              "You can add a portrait in the studio and save it in your local draft or exported design file. To make photographs visible in a shared link, add hosted photo storage and replace the sample gallery images.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-cta">
        <Floral />
        <p className="eyebrow">EVERY FOREVER STARTS SOMEWHERE</p>
        <h2>
          Yours starts with
          <br />
          <em>a beautiful invitation.</em>
        </h2>
        <Link className="button" href="/templates">
          Let’s find your beginning <ArrowUpRight size={16} />
        </Link>
        <p>No rush. Fall in love with a design first.</p>
        <Floral />
      </section>
      {preview && (
        <PreviewModal templateId={preview} onClose={() => setPreview(null)} />
      )}
    </main>
  );
}
