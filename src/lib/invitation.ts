import {
  defaultDetails,
  InvitationDetails,
  WeddingTemplate,
} from "@/data/templates";
export function readDetails(
  t: WeddingTemplate,
  params: URLSearchParams,
): InvitationDetails {
  const base = defaultDetails(t);
  for (const k of [
    "bride",
    "groom",
    "venue",
    "guest",
    "message",
    "story",
    "familyFirst", "familySecond", "contactFirst", "contactSecond",
  ] as const) {
    const v = params.get(k);
    if (v) base[k] = v.slice(0, k === "story" || k === "message" ? 1500 : 160);
  }
  const d = params.get("date");
  if (
    d &&
    /^\d{4}-\d{2}-\d{2}$/.test(d) &&
    !isNaN(new Date(d).getTime()) &&
    new Date(d).toISOString().slice(0, 10) === d
  )
    base.date = d;
  const time = params.get("time");
  if (time && /^([01]\d|2[0-3]):[0-5]\d$/.test(time)) base.time = time;
  const lang = params.get("language");
  if (lang === "en" || lang === "si" || lang === "ta") base.language = lang;
  const soundtrack = params.get("soundtrack");
  if (["chimes","poruwa","romance","reception","silent"].includes(soundtrack || "")) base.soundtrack = soundtrack as InvitationDetails["soundtrack"];
  const music = params.get("musicUrl");
  if (music && (/^https:\/\//.test(music) || /^\/audio\/[a-zA-Z0-9_./-]+$/.test(music))) base.musicUrl = music.slice(0,1200);
  return base;
}
export function invitationUrl(t: WeddingTemplate, d: InvitationDetails) {
  const q = new URLSearchParams();
  for (const k of [
    "bride",
    "groom",
    "date",
    "time",
    "venue",
    "guest",
    "message",
    "story",
    "language",
  ] as const)
    q.set(k, d[k]);
  for (const key of ["familyFirst","familySecond","contactFirst","contactSecond"] as const) if (d[key]) q.set(key,d[key]!);
  if (d.soundtrack) q.set("soundtrack", d.soundtrack);
  if (d.musicUrl && !d.musicUrl.startsWith("data:") && !d.musicUrl.startsWith("blob:")) q.set("musicUrl",d.musicUrl);
  return `${window.location.origin}/invitation/${t.id}?${q.toString()}`;
}
export function downloadText(
  text: string,
  name: string,
  type = "application/json",
) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const escapeIcs = (s: string) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
export function saveCalendar(d: InvitationDetails, occasion = "Wedding") {
  const start = new Date(`${d.date}T${d.time}:00+05:30`);
  const end = new Date(start.getTime() + 4 * 3600000);
  const stamp = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  downloadText(
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//VELORA//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Date.now().toString(36)}@velora`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${escapeIcs(d.bride + (d.groom ? " & " + d.groom : "") + " — " + occasion)}`,
      `LOCATION:${escapeIcs(d.venue)}`,
      "END:VEVENT",
      "END:VCALENDAR",
      "",
    ].join("\r\n"),
    "velora-save-the-date.ics",
    "text/calendar",
  );
}
