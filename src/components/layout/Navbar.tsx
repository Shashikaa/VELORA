"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Heart, Menu, X } from "lucide-react";
import { useWedding } from "@/context/WeddingContext";
export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { favorites } = useWedding();
  if (path.startsWith("/invitation/")) return null;
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="VELORA home">
        VELORA<span>A LITTLE LOVE. BEAUTIFULLY SENT.</span>
      </Link>
      <nav
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        <Link
          onClick={() => setOpen(false)}
          className={path === "/templates" ? "active" : ""}
          href="/templates"
        >
          The collection
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href="/templates?collection=signature"
        >
          Signature <span className="tiny-star">✧</span>
        </Link>
        <Link onClick={() => setOpen(false)} href="/#our-process">
          Our process
        </Link>
        <Link onClick={() => setOpen(false)} href="/pricing">
          Pricing
        </Link>
      </nav>
      <div className="nav-actions">
        <Link
          href="/templates?collection=saved"
          aria-label={`Saved designs (${favorites.length})`}
          className="icon-button"
        >
          <Heart size={18} />
          {favorites.length > 0 && (
            <span className="favorite-count">{favorites.length}</span>
          )}
        </Link>
        <Link className="button small nav-cta" href="/studio">
          Create your invitation <ArrowUpRight size={15} />
        </Link>
        <button
          className="icon-button mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
