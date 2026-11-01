"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lotus } from "@/components/invitation/Motifs";
export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/invitation/")) return null;
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="wordmark" href="/">
            VELORA
          </Link>
          <p>
            Rooted in tradition.
            <br />
            Made for your kind of forever.
          </p>
        </div>
        <Lotus className="footer-lotus" />
        <div className="footer-links">
          <Link href="/templates">The collection</Link>
          <Link href="/templates?collection=signature">
            Signature invitations
          </Link>
          <Link href="/studio">Invitation studio</Link>
          <Link href="/rsvp-hub">My demo responses</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} VELORA. Made with love in Sri Lanka.
        </span>
        <span>Thoughtfully digital. Beautifully personal.</span>
      </div>
    </footer>
  );
}
