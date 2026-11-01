"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  X,
  ArrowUpRight,
  RotateCcw,
  Smartphone,
  Monitor,
  Heart,
} from "lucide-react";
import { TEMPLATES, defaultDetails } from "@/data/templates";
import InvitationExperience from "./InvitationExperience";
import { useWedding } from "@/context/WeddingContext";
export default function PreviewModal({
  templateId,
  onClose,
}: {
  templateId: string;
  onClose: () => void;
}) {
  const t = TEMPLATES.find((t) => t.id === templateId)!;
  const [wide, setWide] = useState(false),
    [key, setKey] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const { favorites, toggleFavorite } = useWedding();
  useEffect(() => {
    const last = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = Array.from(
          root.current?.querySelectorAll<HTMLElement>(
            "button:not(:disabled),a[href],input,select,textarea",
          ) || [],
        ).filter((el) => el.offsetParent !== null);
        const first = elements[0],
          last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", listener);
      last?.focus();
    };
  }, [onClose]);
  return createPortal(
    <div
      className="preview-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={root}
        className={`preview-dialog ${wide ? "wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        <aside className="preview-info">
          <button ref={close} className="preview-close" onClick={onClose}>
            <X size={17} /> Back to collection
          </button>
          <p className="eyebrow">
            {t.premium ? "VELORA SIGNATURE" : "THE CLASSIC COLLECTION"}
          </p>
          <h2 id="preview-title">{t.name}</h2>
          <p>{t.subtitle}</p>
          <div className="preview-detail">
            <span>THE INSPIRATION</span>
            <strong>{t.category}</strong>
            <span>THE OPENING</span>
            <strong>
              {t.signatureOpening
                ? t.signatureOpening
                : t.opening === "bloom"
                  ? "An unfolding bloom"
                  : t.opening === "doors"
                    ? "A grand entrance"
                    : t.opening === "envelope"
                      ? "Sealed with love"
                      : t.opening === "scroll"
                        ? "An unrolling manuscript"
                        : t.opening === "curtain"
                          ? "The curtain rises"
                          : "A gentle unveiling"}
            </strong>
          </div>
          <p className="preview-instruction">
            {t.signatureOpening || "Tap the seal to open."}
            <br />
            Scroll to discover the whole story.
          </p>
          <div className="preview-controls">
            <button
              aria-label="Phone preview"
              aria-pressed={!wide}
              onClick={() => setWide(false)}
            >
              <Smartphone size={17} />
            </button>
            <button
              aria-label="Wide preview"
              aria-pressed={wide}
              onClick={() => setWide(true)}
            >
              <Monitor size={17} />
            </button>
            <button
              aria-label="Replay opening"
              onClick={() => setKey((k) => k + 1)}
            >
              <RotateCcw size={17} />
            </button>
            <button
              aria-label={
                favorites.includes(t.id) ? "Unsave design" : "Save design"
              }
              aria-pressed={favorites.includes(t.id)}
              onClick={() => toggleFavorite(t.id)}
            >
              <Heart
                size={17}
                fill={favorites.includes(t.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <Link className="button" href={`/studio?template=${t.id}`}>
            Make it yours <ArrowUpRight size={15} />
          </Link>
          <Link
            className="text-link"
            href={`/invitation/${t.id}`}
            target="_blank"
          >
            Open full invitation <ArrowUpRight size={13} />
          </Link>
          <span className="preview-demo-label">
            Illustrative sample · no purchase required
          </span>
        </aside>
        <div className="preview-device">
          <div className="phone-top">
            <span>9:41</span>
            <i />
            <span>••• ▰</span>
          </div>
          <div className="preview-screen">
            <InvitationExperience
              key={key}
              template={t}
              details={defaultDetails(t)}
            />
          </div>
          <div className="phone-bottom" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
