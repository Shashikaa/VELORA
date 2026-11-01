import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
const require = createRequire(import.meta.url),
  ts = require("typescript");
function load(path, extra = {}) {
  const module = { exports: {} };
  vm.runInNewContext(
    ts.transpileModule(readFileSync(path, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    {
      exports: module.exports,
      module,
      require,
      Intl,
      Date,
      URLSearchParams,
      ...extra,
    },
  );
  return module.exports;
}
const data = load("src/data/templates.ts", {require: id => id === "./celebrations" ? load("src/data/celebrations.ts") : require(id)});
const { TEMPLATES, defaultDetails } = data;
assert.equal(TEMPLATES.length, 27);
assert.equal(TEMPLATES.filter((t) => t.premium).length, 6);
assert.equal(new Set(TEMPLATES.map((t) => t.id)).size, 27);
assert.equal(new Set(TEMPLATES.map((t) => t.opening)).size, 6);
assert.equal(new Set(TEMPLATES.map((t) => t.category)).size, 5);
for (const t of TEMPLATES) {
  assert.match(t.id, /^[a-z0-9-]+$/);
  for (const img of [t.image, t.artwork, t.signatureArt, t.coverImage].filter(Boolean))
    assert.ok(existsSync("public" + img), `${t.id}: missing ${img}`);
  for (const color of [t.paper, t.ink, t.gold])
    assert.match(color, /^#[0-9a-f]{6}$/i);
}
let downloaded = "";
const functions = load("src/lib/invitation.ts", {
  require: (id) => (id === "@/data/templates" ? data : require(id)),
  window: { location: { origin: "https://velora.example" } },
  crypto: { randomUUID: () => "test-event" },
  URL: {
    createObjectURL: (blob) => {
      downloaded = blob.text;
      return "blob:test";
    },
    revokeObjectURL: () => {},
  },
  Blob: class {
    constructor(parts) {
      this.text = parts.join("");
    }
  },
  document: { createElement: () => ({ click() {} }) },
  setTimeout: () => 0,
});
const d = {
  ...defaultDetails(TEMPLATES[0]),
  bride: "අමායා & Love",
  guest: "Mr. & Mrs. Perera",
  venue: "Kandy, Hall; Ballroom",
  photo: "data:image/png;base64,local-only",
};
const url = new URL(functions.invitationUrl(TEMPLATES[0], d));
assert.equal(url.searchParams.get("bride"), d.bride);
assert.equal(url.searchParams.get("guest"), d.guest);
assert.equal(url.searchParams.has("photo"), false);
const parsed = functions.readDetails(TEMPLATES[0], url.searchParams);
assert.equal(parsed.bride, d.bride);
assert.equal(
  functions.readDetails(
    TEMPLATES[0],
    new URLSearchParams("date=2027-02-31&time=30:00"),
  ).date,
  defaultDetails(TEMPLATES[0]).date,
);
functions.saveCalendar(d);
assert.ok(downloaded.includes("DTSTART:20270612T040000Z"));
assert.ok(downloaded.includes("DTEND:20270612T080000Z"));
assert.ok(downloaded.includes("LOCATION:Kandy\\, Hall\\; Ballroom"));
assert.ok(downloaded.endsWith("END:VCALENDAR\r\n"));
if (existsSync("out/invitation")) {
  const built = readdirSync("out/invitation", { withFileTypes: true }).filter(
    (d) => d.isDirectory(),
  ).length;
  assert.equal(built, 90);
  for (const t of TEMPLATES)
    assert.ok(existsSync(`out/invitation/${t.id}/index.html`));
  console.log("Static routes: all 90 invitation pages present.");
}
console.log(
  "PASS: 27 curated designs, 6 Signature, six opening engines, five collections, all assets, Unicode sharing, date validation and Sri Lanka timezone calendar export.",
);

const fontCss = readFileSync("src/app/fonts.css", "utf8");
assert.ok(
  !readFileSync("src/app/globals.css", "utf8").includes("@fontsource/"),
);
for (const match of fontCss.matchAll(/url\(["']?(\/fonts\/[^)"']+)["']?\)/g))
  assert.ok(
    existsSync("public" + match[1]),
    `Missing bundled font: ${match[1]}`,
  );
console.log(
  "PASS: local font assets exist and no Fontsource package imports remain.",
);

const signatures = TEMPLATES.filter((t) => t.signature);
assert.equal(new Set(signatures.map((t) => t.signature)).size, 10);
assert.equal(new Set(signatures.map((t) => t.signatureOpening)).size, 10);
assert.equal(TEMPLATES.filter(t=>t.premium).length,6);
console.log(
  "PASS: Original layout identities retained; six premium designs are explicitly curated.",
);

const uploaded = TEMPLATES.find(t => t.id === "kandyan-vintage-ride");
assert.ok(uploaded?.premium && existsSync("public" + uploaded.embeddedTemplate + "index.html"));

assert.equal(TEMPLATES.filter(t => t.celebrationLayout).length,16);
assert.equal(new Set(TEMPLATES.filter(t => t.celebrationLayout).map(t => t.celebrationLayout)).size,16);
for (const faith of data.TRADITIONS) assert.ok(TEMPLATES.some(t => t.traditions.includes(faith)), faith);
for (const occasion of data.OCCASIONS) assert.ok(TEMPLATES.some(t => t.occasion === occasion), occasion);
const musicDetails = functions.readDetails(TEMPLATES[0],new URLSearchParams({musicUrl:"https://example.com/song.mp3",soundtrack:"poruwa"}));
assert.equal(musicDetails.musicUrl,"https://example.com/song.mp3");
assert.equal(functions.readDetails(TEMPLATES[0],new URLSearchParams({musicUrl:"javascript:alert(1)"})).musicUrl,undefined);
assert.ok(!functions.invitationUrl(TEMPLATES[0],{...defaultDetails(TEMPLATES[0]),musicUrl:"data:audio/mpeg;base64,AAA"}).includes("data%3A"));
console.log("PASS: 16 distinct celebrations across 16 layouts, five tradition filters, seven occasion filters and safe shared audio URLs.");

assert.equal(data.ARCHIVED_TEMPLATES.length,63);
assert.equal(new Set([...TEMPLATES,...data.ARCHIVED_TEMPLATES].map(t=>t.id)).size,90);

const references=TEMPLATES.filter(t=>t.referenceExperience);
assert.equal(references.length,2);
for(const kind of ['royal','garden']) for(const part of ['cover','paper']) assert.ok(existsSync(`public/images/reference-${kind}-${part}.webp`));
const personalised=functions.readDetails(references[0],new URLSearchParams({familyFirst:'Family One',contactFirst:'+94770000000'}));
assert.equal(personalised.familyFirst,'Family One');
assert.equal(new URL(functions.invitationUrl(references[0],personalised)).searchParams.get('contactFirst'),'+94770000000');
console.log('PASS: dedicated royal/garden experiences, four local artworks and family/contact sharing.');

assert.equal(TEMPLATES.filter(t=>t.couture).length,2);
assert.equal(TEMPLATES.filter(t=>t.openingVideo).length,3);
for(const t of TEMPLATES.filter(t=>t.openingVideo)){const file=readFileSync('public'+t.openingVideo);assert.ok(file.length>10000);assert.ok(file.subarray(0,64).includes(Buffer.from('ftyp')));}
console.log('PASS: six curated Signature designs, two couture experiences and three bundled MP4 openings.');
