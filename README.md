# VELORA — Signature films v4.0

27 active invitation designs: 6 curated Signature and 21 Editions. 63 repeated variants were removed from the gallery and studio. Historical invitation URLs remain available through ARCHIVED_TEMPLATES.

## Start
Extract the entire ZIP into a fresh folder. Use Node.js 22 or newer. On Windows run START-WINDOWS.cmd, or run:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Next.js 16.4.3 and exact dependencies are locked. Bundled fonts do not require remote font services.

```bash
npm run typecheck
npm run build
npm run check
npm start
```

The ZIP includes a production out/ folder. Deploy its contents to static hosting, or connect the source to Vercel with npm run build. The live Vercel site is not changed by downloading this archive: replace the repository files and redeploy.

## Collection changes
The first gallery row deliberately mixes satin stationery, Kandyan palace gates, a garden portrait and a flight passport. The following designs include an embossed teal envelope, pearl lace, vintage postcard, editorial type, Nikah lanterns, lotus, chapel doors, the uploaded Kandyan animated car, botanical foliage, temple garlands, Sinhala paper, reception lights, anniversary album, birthday confetti, velvet homecoming and Mehendi linework. Existing Signature layouts remain.

The celebration renderer now uses separate artwork branches and layout-specific typography, openings and document order. The universal scrollwork frame and shared mandala were removed. Only the selected lotus treatment retains that visual direction. This is an original VELORA adaptation of the references, not an import of Eventoura or Invitation.lk source, videos or artwork.

Tradition and occasion filters, favourites, live personalisation, calendar export, gallery controls and music are retained. Three original instrumentals are bundled. Add licensed Sinhala songs using a hosted HTTPS URL or a file in public/audio; local audio and photo uploads stay in drafts/JSON exports and are excluded from guest links.

## Edit
- src/data/templates.ts: active curated IDs, image overrides and ARCHIVED_TEMPLATES.
- src/data/celebrations.ts: underlying design configurations, including historical variants.
- src/components/invitation/celebrations/CelebrationExperience.tsx: 16 distinct artwork branches and document arrangements.
- src/app/celebrations.css: visual layouts and opening transitions.
- src/components/invitation/signature/: existing ten Signature experiences.
- public/templates/kandyan-vintage-ride/: supplied animated invitation and local compiled utilities.
- docs/TEMPLATE-CATALOGUE.csv and REMOVED-VARIANTS.csv: current selection and archived variants.

RSVP is a browser-local demo, not a production guest database. Shared links include text and hosted music URLs, not hosted private records or uploaded media. Accounts, checkout, message delivery and shared RSVP collection require a backend. Check sample prices, religious wording and asset rights before commercial launch.


## v3.1 — two reference-focused invitations
Royal Blue Seal (`/invitation/midnight-acanthus/`) and Kandyan Garden (`/invitation/golden-portrait/`) now use `src/components/invitation/reference/ReferenceExperience.tsx` and `src/app/reference.css`. They replace their earlier generic celebration renditions, so the collection remains 27.

Royal Blue Seal has a luminous heart seal, timed envelope/letter reveal with a skip control, blue/ivory inner paper, arch portrait and script names. Kandyan Garden has a traditional Nilame/osariya portrait cover, zoom reveal, gold floral inner paper, decorative type and olive controls. Both include families, when/where, countdown, calendar links, an illustrated five-part story, agenda derived from ceremony time, gallery lightbox, attire palette, directions, a demo seating search, local RSVP, optional call links and browser-local wishes.

Family names and phone numbers are editable under Your story and included in shared invitation URLs. Seating records are configured in `demoSeats` on each template; try Demo Guest. All text, portraits and records are samples. No reference-site forms or guest services are called.

These are independently coded visual reconstructions. The four cover/paper images are newly generated original artwork, not Eventoura assets. CSS animation replaces the source’s video sequence. Gallery assets also differ. It is not a pixel-identical export of the two references.


## v4.0 final refinements
Signature is explicitly limited to Royal Blue Seal, Kandyan Garden, Lotus Heirloom, Pearl & Beeralu, Celestial Vows and Kandyan Vintage Ride. Earlier simpler designs are Editions, without a Signature badge.

The first-screen preview width bug was caused by a floating music button beside an overflow-contained section. Music controls no longer float; preview containers provide their own width/height context, and first-screen type/portrait/spacing adapt to the phone. The fix applies to the gallery modal and studio.

Three actual H.264 MP4s are bundled under public/videos: royal-opening.mp4, pearl-opening.mp4 and lotus-opening.mp4. Each is seven seconds, muted, plays inline and advances on completion. Skip and playback-error continue controls are included; reduced-motion visitors skip the film. These are original composited films made from project artwork, not copied reference-site films or AI-generated live footage. They do not bake in couple names. Optional authoring script: scripts/render-opening-films.py (requires Pillow and FFmpeg; not needed to run the site).

Lotus Heirloom and Pearl & Beeralu have dedicated couture layouts, replacing the older generic lotus/lace renderers. Lotus includes Sinhala/English switching, two family columns, mandala/lotus artwork, couple illustration, events, gallery, venue, sticky section navigation and local RSVP. Pearl uses new original dimensional Beeralu envelope/inner-paper artwork, a pearl monogram, calligraphy, countdown, events, gallery, venue and guest-count RSVP.

Implementation: src/components/invitation/couture/, src/app/couture.css, src/app/preview-fixes.css. Reference reconstructions remain original adaptations; asset compositions, filmed motion and some typography/content differ from Eventoura and Invitation.lk. No accounts, payments or shared RSVP backend are supplied.
