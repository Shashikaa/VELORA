"use client";
import { useEffect, useRef } from "react";
import { useWedding } from "@/context/WeddingContext";
import type { WeddingTemplate, InvitationDetails } from "@/data/templates";
/** Isolates the uploaded invitation's DOM and compiled utilities from the site. */
export default function UploadedInvitation({ template, details, startOpen = false }: { template: WeddingTemplate; details: InvitationDetails; startOpen?: boolean }) {
  const { addResponse } = useWedding();
  const frame = useRef<HTMLIFrameElement>(null);
  const sync = () => frame.current?.contentWindow?.postMessage({type: "velora-details", details, startOpen}, window.location.origin);
  useEffect(sync, [details, startOpen]);
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "velora-rsvp" && typeof event.data.name === "string") addResponse({templateId: template.id, name: event.data.name.slice(0,200), attending: Boolean(event.data.attending), guests: event.data.attending ? Math.min(10, Math.max(1, Number(event.data.guests) || 1)) : 0, note: String(event.data.note || "").slice(0,2000)});
      if (event.data?.type === "velora-escape") document.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", bubbles: true}));
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [addResponse, template.id]);
  return <iframe ref={frame} className="uploaded-invitation" src={template.embeddedTemplate} title={`${template.name} — interactive invitation`} onLoad={sync} allow="autoplay" />;
}
