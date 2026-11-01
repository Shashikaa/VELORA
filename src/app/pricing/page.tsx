import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
export const metadata = { title: "A little something for every love story" };
export default function Pricing() {
  return (
    <main id="main" className="pricing-page section-pad">
      <div className="centered-heading">
        <p className="eyebrow">SOMETHING BEAUTIFUL, SIMPLY CHOSEN</p>
        <h1>
          Your forever.
          <br />
          <em>Your kind of invitation.</em>
        </h1>
        <p>Two collections. A world of little details.</p>
      </div>
      <div className="pricing-grid">
        {[
          {
            name: "Classic",
            amount: "5,000",
            desc: "Timeless details, a personal touch.",
            items: [
              "30 thoughtfully composed designs",
              "Animated opening reveal",
              "Personal names, date & venue",
              "Countdown & calendar download",
              "English, Sinhala & Tamil interface",
              "A personal invitation link",
            ],
            url: "/templates?collection=classic",
          },
          {
            name: "Signature",
            amount: "15,000",
            desc: "An invitation with a little more magic.",
            items: [
              "6 curated Signature designs",
              "Richly illustrated heritage scenes",
              "Immersive, themed opening animations",
              "Full story, moments & ceremony sections",
              "Live preview in the invitation studio",
              "All Classic design features",
            ],
            url: "/templates?collection=signature",
          },
        ].map((p) => (
          <article
            key={p.name}
            className={`pricing-card ${p.name === "Signature" ? "premium" : ""}`}
          >
            <p className="eyebrow">
              {p.name === "Signature"
                ? "✧ THE SIGNATURE EXPERIENCE"
                : "THE CLASSIC COLLECTION"}
            </p>
            <h2>{p.name}</h2>
            <p>{p.desc}</p>
            <div className="price">
              <span>LKR</span> {p.amount}
              <small>proposed starting price</small>
            </div>
            <ul>
              {p.items.map((i) => (
                <li key={i}>
                  <Check size={15} />
                  {i}
                </li>
              ))}
            </ul>
            <Link
              className={`button ${p.name === "Signature" ? "light" : "outline"}`}
              href={p.url}
            >
              Explore {p.name} <ArrowUpRight size={16} />
            </Link>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Indicative collection pricing for this project. There is no payment or
        checkout in this edition. Final services and prices can be set by VELORA
        before launch.
      </p>
      <section className="pricing-bottom">
        <h2>
          Start by falling in love
          <br />
          <em>with a design.</em>
        </h2>
        <Link className="text-link" href="/templates">
          Experience all 27 invitations <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
