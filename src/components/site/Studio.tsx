"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  RotateCcw,
  Save,
  Upload,
  Smartphone,
  Monitor,
  ArrowLeft,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { TEMPLATES, defaultDetails, InvitationDetails } from "@/data/templates";
import { readDetails, invitationUrl, downloadText } from "@/lib/invitation";
import InvitationExperience from "@/components/invitation/InvitationExperience";
export default function Studio() {
  const search = useSearchParams();
  const initial =
    TEMPLATES.find((t) => t.id === search.get("template")) || TEMPLATES[0];
  const [id, setId] = useState(initial.id);
  const t = TEMPLATES.find((t) => t.id === id)!;
  const [d, setD] = useState<InvitationDetails>(() =>
      readDetails(initial, new URLSearchParams(search.toString())),
    ),
    [tab, setTab] = useState("details"),
    [key, setKey] = useState(0),
    [opened, setOpened] = useState(false),
    [wide, setWide] = useState(false),
    [notice, setNotice] = useState(""),
    [link, setLink] = useState("");
  const upload = useRef<HTMLInputElement>(null);
  const update = (k: keyof InvitationDetails, v: string) => {
    setD((p) => ({ ...p, [k]: v }));
    setLink("");
  };
  const copy = async () => {
    const url = invitationUrl(t, d);
    setLink(url);
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Your invitation link is copied.");
    } catch {
      setNotice("Select and copy your invitation link below.");
    }
  };
  const save = () => {
    try {
      localStorage.setItem(
        "velora-draft",
        JSON.stringify({ templateId: id, details: d }),
      );
      setNotice("Your draft is saved on this device.");
    } catch {
      setNotice(
        "This device has no space for the portrait. Export the design file to keep it.",
      );
    }
  };
  const load = () => {
    try {
      const data = JSON.parse(localStorage.getItem("velora-draft") || "null");
      if (!data || !TEMPLATES.some((t) => t.id === data.templateId)) {
        setNotice("There is no saved draft on this device yet.");
        return;
      }
      const selected = TEMPLATES.find((t) => t.id === data.templateId)!;
      setId(data.templateId);
      setD({ ...defaultDetails(selected), ...data.details });
      setKey((k) => k + 1);
      setNotice("Your saved draft is ready.");
    } catch {
      setNotice(
        "We could not open that draft. Please use your exported design file.",
      );
    }
  };
  return (
    <main id="main" className="studio-page section-pad">
      <div className="studio-heading">
        <div>
          <p className="eyebrow">THE VELORA STUDIO</p>
          <h1>
            A little more <em>you.</em>
          </h1>
          <p>Your story, your details, your beautiful beginning.</p>
        </div>
        <Link href="/templates" className="text-link">
          <ArrowLeft size={14} /> Back to collection
        </Link>
      </div>
      <div className="studio-layout">
        <section className="studio-editor">
          <div
            className="studio-tabs"
            role="group"
            aria-label="Editor sections"
          >
            {[
              ["details", "The details"],
              ["story", "Your story"],
              ["share", "Save & share"],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                aria-pressed={tab === k}
                className={tab === k ? "selected" : ""}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="studio-form">
            {tab === "details" && (
              <>
                <p className="eyebrow">01 / SET THE SCENE</p>
                <h2>Let’s make it yours.</h2>
                <label>
                  Choose your invitation
                  <select
                    value={id}
                    onChange={(e) => {
                      const next = TEMPLATES.find(
                        (t) => t.id === e.target.value,
                      )!;
                      setId(next.id);
                      setKey((k) => k + 1);
                      setLink("");
                      setD((p) => ({
                        ...p,
                        venue: p.venue === t.location ? next.location : p.venue,
                      }));
                    }}
                  >
                    {TEMPLATES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.premium ? "✧ " : ""}
                        {t.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="form-row">
                  <label>
                    {t.occasion === "Birthday" ? "Celebrant’s name" : "First partner’s name"}
                    <input
                      required
                      maxLength={50}
                      value={d.bride}
                      onChange={(e) => update("bride", e.target.value)}
                    />
                  </label>
                  <label>
                    {t.occasion === "Birthday" ? "Co-host (optional)" : "Second partner’s name"}
                    <input
                      required
                      maxLength={50}
                      value={d.groom}
                      onChange={(e) => update("groom", e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    {t.occasion && t.occasion !== "Wedding" ? "Celebration date" : "The wedding date"}
                    <input
                      type="date"
                      required
                      value={d.date}
                      onChange={(e) => {
                        if (e.target.value) update("date", e.target.value);
                      }}
                    />
                  </label>
                  <label>
                    {t.occasion && t.occasion !== "Wedding" ? "Celebration time (Sri Lanka)" : "Ceremony time (Sri Lanka)"}
                    <input
                      type="time"
                      required
                      value={d.time}
                      onChange={(e) => {
                        if (e.target.value) update("time", e.target.value);
                      }}
                    />
                  </label>
                </div>
                <label>
                  The venue
                  <input
                    maxLength={160}
                    value={d.venue}
                    onChange={(e) => update("venue", e.target.value)}
                  />
                </label>
                <label>
                  Invitation language
                  <select
                    value={d.language}
                    onChange={(e) => update("language", e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="si">සිංහල · Sinhala</option>
                    <option value="ta">தமிழ் · Tamil</option>
                  </select>
                </label>
                <p className="field-hint">
                  Section headings change language. Write your personal message
                  in your own words.
                </p>
                <button
                  className="button"
                  onClick={() => {
                    setTab("story");
                    setOpened(true);
                    setKey((k) => k + 1);
                  }}
                >
                  Add a little of your story <ArrowUpRight size={15} />
                </button>
              </>
            )}
            {tab === "story" && (
              <>
                <p className="eyebrow">02 / FROM THE HEART</p>
                <h2>The words that matter.</h2>
                <label>
                  Addressed to
                  <input
                    maxLength={160}
                    value={d.guest}
                    onChange={(e) => update("guest", e.target.value)}
                    placeholder="Mr. & Mrs. Perera"
                  />
                </label>
                <label>
                  Your invitation message
                  <textarea
                    rows={4}
                    maxLength={1500}
                    value={d.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </label>
                <label>
                  {t.occasion === "Birthday" ? "Your celebration story" : "Your love story"}
                  <textarea
                    rows={5}
                    maxLength={1500}
                    value={d.story}
                    onChange={(e) => update("story", e.target.value)}
                  />
                </label>
                {t.referenceExperience && <><label>First partner’s family<input maxLength={160} value={d.familyFirst || ""} onChange={e=>update("familyFirst",e.target.value)} placeholder="Family names (optional)"/></label><label>Second partner’s family<input maxLength={160} value={d.familySecond || ""} onChange={e=>update("familySecond",e.target.value)} placeholder="Family names (optional)"/></label><label>First partner’s contact<input type="tel" maxLength={25} value={d.contactFirst || ""} onChange={e=>update("contactFirst",e.target.value)}/></label><label>Second partner’s contact<input type="tel" maxLength={25} value={d.contactSecond || ""} onChange={e=>update("contactSecond",e.target.value)}/></label></>}
                <label>Invitation soundtrack
                  <select aria-label="Invitation soundtrack" value={d.soundtrack || "chimes"} onChange={e=>update("soundtrack",e.target.value)}>
                    <option value="chimes">Gentle chimes</option><option value="poruwa">Poruwa Morning · original instrumental</option><option value="romance">Ceylon Romance · original instrumental</option><option value="reception">Island Reception · original instrumental</option><option value="silent">No music</option>
                  </select>
                </label>
                <label>Your licensed Sinhala song or other recording
                  <input type="text" placeholder="https://your-site.com/song.mp3 or /audio/song.mp3" value={d.musicUrl?.startsWith("data:") ? "" : d.musicUrl || ""} onChange={e=>update("musicUrl",e.target.value)}/>
                </label>
                <label className="photo-upload"><Upload size={20}/><span>Upload your song<small>MP3, WAV or OGG · up to 2 MB · local preview</small></span><input type="file" accept="audio/mpeg,audio/wav,audio/ogg,.mp3,.wav,.ogg" onChange={e=>{
                  const f=e.target.files?.[0];if(!f)return;
                  if(f.size>2*1024*1024 || !/\.(mp3|wav|ogg)$/i.test(f.name)){setNotice("Choose an MP3, WAV or OGG under 2 MB.");return;}
                  const reader=new FileReader();reader.onload=()=>update("musicUrl",String(reader.result));reader.readAsDataURL(f);
                }}/></label>
                {d.musicUrl && <button className="text-link" onClick={()=>update("musicUrl","")}>Remove custom song</button>}
                <p className="field-hint">Use a recording you have permission to share. Uploaded audio stays in your draft and exported design file. For guest links, use a hosted HTTPS song URL or put the recording in public/audio. Guests tap Music to play.</p>
                <label className="photo-upload">
                  <Upload size={20} />
                  <span>
                    {d.photo ? "Change your portrait" : "Add your portrait"}
                    <small>JPG, PNG or WebP · up to 2 MB</small>
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      if (
                        f.size > 2 * 1024 * 1024 ||
                        !["image/jpeg", "image/png", "image/webp"].includes(
                          f.type,
                        )
                      ) {
                        setNotice("Choose a JPG, PNG or WebP under 2 MB.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = () =>
                        update("photo", String(reader.result));
                      reader.readAsDataURL(f);
                    }}
                  />
                </label>
                {d.photo && (
                  <button
                    className="text-link"
                    onClick={() => setD((p) => ({ ...p, photo: undefined }))}
                  >
                    Remove portrait
                  </button>
                )}
                <p className="field-hint">
                  Your portrait is kept in your local draft and exported file.
                  Shared links include text and hosted song URLs. Local portraits and audio uploads stay in your draft or exported file.
                </p>
                <button className="button" onClick={() => setTab("share")}>
                  Ready for a little love? <ArrowUpRight size={15} />
                </button>
              </>
            )}
            {tab === "share" && (
              <>
                <p className="eyebrow">03 / BEAUTIFULLY SENT</p>
                <h2>
                  A beautiful beginning,
                  <br />
                  <em>ready to keep.</em>
                </h2>
                <p>
                  Save your draft, take your design file with you, or create a
                  personal invitation link.
                </p>
                <div className="share-actions">
                  <button
                    className="button"
                    onClick={() => void copy()}
                    disabled={
                      !d.bride.trim() || (t.occasion !== "Birthday" && !d.groom.trim()) || !d.venue.trim()
                    }
                  >
                    <Copy size={16} /> Copy invitation link
                  </button>
                  <button
                    className="button outline"
                    onClick={() =>
                      window.open(
                        invitationUrl(t, d),
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <ArrowUpRight size={16} /> Open full invitation
                  </button>
                  <button className="button outline" onClick={save}>
                    <Save size={16} /> Save draft on this device
                  </button>
                  <button className="button outline" onClick={load}>
                    <RotateCcw size={16} /> Load saved draft
                  </button>
                  <button
                    className="button outline"
                    onClick={() =>
                      downloadText(
                        JSON.stringify(
                          { version: 1, templateId: id, details: d },
                          null,
                          2,
                        ),
                        `velora-${id}.json`,
                      )
                    }
                  >
                    <Download size={16} /> Export design file
                  </button>
                  <button
                    className="text-link"
                    onClick={() => upload.current?.click()}
                  >
                    <Upload size={14} /> Import a VELORA design file
                  </button>
                  <input
                    ref={upload}
                    type="file"
                    accept="application/json,.json"
                    hidden
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      try {
                        if (f.size > 4 * 1024 * 1024) throw Error();
                        const config = JSON.parse(await f.text());
                        const template = TEMPLATES.find(
                          (t) => t.id === config.templateId,
                        );
                        if (
                          config.version !== 1 ||
                          !template ||
                          !config.details
                        )
                          throw Error();
                        const clean = readDetails(
                          template,
                          new URLSearchParams(config.details),
                        );
                        if (
                          typeof config.details.photo === "string" &&
                          /^data:image\/(jpeg|png|webp);base64,/.test(
                            config.details.photo,
                          )
                        )
                          clean.photo = config.details.photo;
                        if (typeof config.details.musicUrl === "string" && /^data:audio\/(mpeg|mp3|wav|x-wav|ogg);base64,/.test(config.details.musicUrl)) clean.musicUrl = config.details.musicUrl;
                        setId(template.id);
                        setD(clean);
                        setKey((k) => k + 1);
                        setLink("");
                        setNotice("Your design file is ready to edit.");
                      } catch {
                        setNotice("Please choose a valid VELORA design file.");
                      }
                    }}
                  />
                </div>
                {link && (
                  <label>
                    Your personal invitation link
                    <textarea
                      readOnly
                      rows={3}
                      value={link}
                      onFocus={(e) => e.target.select()}
                    />
                  </label>
                )}
                <div className="studio-honesty">
                  <Heart size={18} />
                  <p>
                    Links work from the address where this project is hosted.
                    This edition is a showcase and customiser. Real guest RSVP
                    collection, accounts, photo hosting and checkout need a
                    connected backend.
                  </p>
                </div>
              </>
            )}
            {notice && (
              <div className="studio-notice" role="status">
                <Check size={15} />
                {notice}
                <button
                  aria-label="Dismiss notification"
                  onClick={() => setNotice("")}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </section>
        <section
          className={`studio-preview ${wide ? "wide" : ""}`}
          aria-label="Live invitation preview"
        >
          <div className="studio-preview-toolbar">
            <span>
              <i /> LIVE PREVIEW
            </span>
            <div>
              <button
                onClick={() => setWide(!wide)}
                aria-label={wide ? "Phone preview" : "Wide preview"}
              >
                {wide ? <Smartphone size={16} /> : <Monitor size={16} />}
              </button>
              <button
                onClick={() => {
                  setOpened(false);
                  setKey((k) => k + 1);
                }}
                aria-label="Replay invitation opening"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          <div className="studio-phone">
            <div className="phone-top">
              <span>9:41</span>
              <i />
              <span>••• ▰</span>
            </div>
            <div className="studio-preview-screen">
              <InvitationExperience
                key={`${id}-${key}`}
                template={t}
                details={d}
                startOpen={opened}
              />
            </div>
            <div className="phone-bottom" />
          </div>
          <p>Tap the seal. Scroll to explore. Make yourself at home.</p>
        </section>
      </div>
    </main>
  );
}
