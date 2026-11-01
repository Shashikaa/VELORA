"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Search,
  SlidersHorizontal,
  X,
  Play,
} from "lucide-react";
import { CATEGORIES, TEMPLATES, TRADITIONS, OCCASIONS } from "@/data/templates";
import { useWedding } from "@/context/WeddingContext";
import InvitationCard from "@/components/invitation/InvitationCard";
import PreviewModal from "@/components/invitation/PreviewModal";
import Reveal from "./Reveal";
export default function Gallery({
  full = false,
  initialCollection = "all",
}: {
  full?: boolean;
  initialCollection?: string;
}) {
  const [category, setCategory] = useState("All designs"),
    [collection, setCollection] = useState(initialCollection),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState("curated"),
    [limit, setLimit] = useState(full ? 12 : 8),
    [preview, setPreview] = useState<string | null>(null);
  const [tradition, setTradition] = useState("All traditions"), [occasion, setOccasion] = useState("All occasions");
  const { favorites, toggleFavorite } = useWedding();
  const filtered = useMemo(() => {
    const result = TEMPLATES.filter(
      (t) =>
        (category === "All designs" || t.category === category) &&
        (tradition === "All traditions" || t.traditions?.some(value => value === tradition)) &&
        (occasion === "All occasions" || t.occasion === occasion) &&
        (collection !== "signature" || t.premium) &&
        (collection !== "classic" || !t.premium) &&
        (collection !== "celebrations" || Boolean(t.celebrationLayout)) &&
        (collection !== "saved" || favorites.includes(t.id)) &&
        `${t.name} ${t.subtitle} ${t.category} ${t.motif} ${t.opening} ${t.traditions?.join(" ")} ${t.occasion}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "classic")
      result.sort((a, b) => Number(a.premium) - Number(b.premium));
    return result;
  }, [category, collection, query, sort, favorites, tradition, occasion]);
  return (
    <section className="collection section-pad" id="collection">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE VELORA COLLECTION</p>
            <h2>
              A little tradition.
              <br />A lot of <em>you.</em>
            </h2>
          </div>
          <p>
            For the romantics, the old souls, the island hearts.
            <br />
            Find an invitation that tells your story.
          </p>
        </div>
      </Reveal>
      <div className="gallery-tools">
        <div className="collection-tabs" role="group" aria-label="Collection">
          {[
            ["all", "All invitations", TEMPLATES.length],
            ["signature", "Signature", TEMPLATES.filter(t => t.premium).length],
            ["classic", "Editions", TEMPLATES.filter(t => !t.premium).length],
            ["saved", "Saved", favorites.length],
          ].map(([id, label, count]) => (
            <button
              key={id}
              className={collection === id ? "selected" : ""}
              onClick={() => {
                setCollection(String(id));
                setLimit(full ? 12 : 8);
              }}
              aria-pressed={collection === id}
            >
              {id === "signature" && <span>✧ </span>}
              {label}
              <small>{count}</small>
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={16} />
          <input
            type="search"
            aria-label="Search invitations"
            placeholder="Find your perfect design…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(TEMPLATES.length);
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </label>
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label="Invitation style"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setLimit(full ? 12 : 8);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="celebration-filters">
        <label>Tradition<select aria-label="Filter by tradition" value={tradition} onChange={e=>{setTradition(e.target.value);setLimit(TEMPLATES.length);}}><option>All traditions</option>{TRADITIONS.map(value=><option key={value}>{value}</option>)}</select></label>
        <label>Occasion<select aria-label="Filter by occasion" value={occasion} onChange={e=>{setOccasion(e.target.value);setLimit(TEMPLATES.length);}}><option>All occasions</option>{OCCASIONS.map(value=><option key={value}>{value}</option>)}</select></label>
        {(tradition !== "All traditions" || occasion !== "All occasions") && <button onClick={()=>{setTradition("All traditions");setOccasion("All occasions");}}>Clear occasion & tradition</button>}
      </div>
      <div className="results-bar">
        <span>{filtered.length} thoughtfully crafted designs</span>
        <label>
          <SlidersHorizontal size={13} />
          <select
            aria-label="Sort invitations"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="curated">Curated for you</option>
            <option value="name">Name: A to Z</option>
            <option value="classic">Classic first</option>
          </select>
        </label>
      </div>
      <div className="template-grid">
        {filtered.slice(0, limit).map((t, i) => (
          <Reveal
            key={t.id}
            delay={Math.min((i % 4) * 0.06, 0.18)}
            className="template-item"
          >
            <article>
              <div className={`template-stage stage-${t.motif}`}>
                <button
                  className="preview-surface"
                  onClick={() => setPreview(t.id)}
                  aria-label={`Preview ${t.name}`}
                >
                  <InvitationCard template={t} />
                  <span className="preview-hover">
                    <Play size={14} fill="currentColor" /> Experience the
                    invitation
                  </span>
                </button>
                {t.premium && (
                  <span className="signature-badge">✧ SIGNATURE</span>
                )}
                <button
                  className={`save-design ${favorites.includes(t.id) ? "is-saved" : ""}`}
                  onClick={() => toggleFavorite(t.id)}
                  aria-label={`${favorites.includes(t.id) ? "Unsave" : "Save"} ${t.name}`}
                  aria-pressed={favorites.includes(t.id)}
                >
                  <Heart
                    size={16}
                    fill={favorites.includes(t.id) ? "currentColor" : "none"}
                  />
                </button>
                <span className="motion-label">
                  <span />{" "}
                  {t.signatureOpening
                    ? t.signatureOpening
                    : t.opening === "bloom"
                      ? "Petal reveal"
                      : t.opening === "doors"
                        ? "Opening doors"
                        : t.opening === "curtain"
                          ? "Curtain reveal"
                          : t.opening === "scroll"
                            ? "Unrolling story"
                            : t.opening === "envelope"
                              ? "Wax seal opening"
                              : "Soft reveal"}
                </span>
              </div>
              <div className="template-description">
                <div>
                  <h3>
                    <button onClick={() => setPreview(t.id)}>{t.name}</button>
                  </h3>
                  <p>{t.subtitle}</p>
                </div>
                <button
                  className="template-arrow"
                  onClick={() => setPreview(t.id)}
                  aria-label={`Open ${t.name}`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="template-meta">
                <span>{t.category}</span>
                <div className="palette-dots" aria-label="Design palette">
                  {[t.ink, t.gold, t.paper].map((color, j) => (
                    <i key={j} style={{ background: color }} />
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Heart size={27} />
          <h3>
            {collection === "saved"
              ? "Your favourites belong here."
              : "A different kind of forever?"}
          </h3>
          <p>
            {collection === "saved"
              ? "Tap the heart on a design to keep it close."
              : "Try another style or a different search."}
          </p>
          <button
            className="button outline"
            onClick={() => {
              setQuery("");
              setCategory("All designs");
              setCollection("all");
              setTradition("All traditions");setOccasion("All occasions");
            }}
          >
            Explore all designs <ArrowRight size={16} />
          </button>
        </div>
      )}
      {filtered.length > limit && (
        <div className="gallery-more">
          <button
            className="button outline"
            onClick={() => setLimit((p) => Math.min(p + 12, TEMPLATES.length))}
          >
            Discover more designs <ArrowRight size={16} />
          </button>
          <span>
            Showing {Math.min(limit, filtered.length)} of {filtered.length}
          </span>
          {limit < filtered.length - 12 && (
            <button className="text-link" onClick={() => setLimit(TEMPLATES.length)}>
              View all {filtered.length}
            </button>
          )}
        </div>
      )}
      {!full && (
        <div className="collection-endnote">
          <span>YOUR LOVE HAS ITS OWN STYLE. YOUR INVITATION SHOULD TOO.</span>
          <Link href="/templates">
            Explore the entire collection <ArrowRight size={16} />
          </Link>
        </div>
      )}
      {preview && (
        <PreviewModal templateId={preview} onClose={() => setPreview(null)} />
      )}
    </section>
  );
}
