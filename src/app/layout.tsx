import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import "./signature.css";
import "./celebrations.css";
import "./reference.css";
import "./couture.css";
import "./preview-fixes.css";
import { WeddingProvider } from "@/context/WeddingContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: { default: "VELORA — A beautiful beginning", template: "%s | VELORA" },
  description:
    "Wedding invitations, beautifully brought to life. Discover 27 distinct animated designs, including 6 Signature invitations inspired by Sri Lankan heritage, lotus blooms, tuskers and timeless romance.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WeddingProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </WeddingProvider>
      </body>
    </html>
  );
}
