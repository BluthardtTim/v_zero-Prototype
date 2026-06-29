# Space Images

Drop image files into this folder (or `chat/` for avatars and chat thumbnails) to replace
the coloured placeholder tiles the model uses when no real photo is available.

The renderer resolves filenames automatically — no code changes needed, only the file and
the correct `thumbnail` / `sender_avatar` field on the matching event in `events.ts`.
After editing `events.ts`, re-seed the affected event IDs:

```
npm run seed -- <event_id> <event_id> ...
```

---

## How references work

| Sentinel in the generated tree | Resolves to | Field in `events.ts` |
|---|---|---|
| `"photo:scape_site_panorama.png"` | `/images/scape_site_panorama.png` | `raw_ref.thumbnail` |
| `"avatar:thomas.jpg"` | `/images/chat/thomas.jpg` | `raw_ref.sender_avatar` |
| `"photo:chat/capri_selfie.jpg"` | `/images/chat/capri_selfie.jpg` | `raw_ref.chat_thumbnail` |

---

## Projekt Scape — Besucherpavillon

### Site photo — already wired up

Add the `thumbnail` field to the event's `raw_ref` in `events.ts`, then drop the file here.
The event `scape_photo_site` already has `thumbnail: "scape_site_panorama.png"` set.

| Filename | Content |
|---|---|
| `scape_site_panorama.png` | Panoramic site photo of the hillside near Ravensburg — wide landscape view showing the proposed pavilion location, open sky, natural vegetation |

### Sketch images — need `thumbnail` field added first

These three events currently have no `thumbnail` in `events.ts`. Add the field, then
drop the matching file here, then re-seed.

```ts
// example: in events.ts, find the event and add thumbnail to raw_ref
raw_ref: {
  type: "sketch",
  title: "Lageplan — Konzeptskizze Standort",
  thumbnail: "scape_sketch_lageplan.png"   // ← add this line
}
```

| Filename | Event ID | Content |
|---|---|---|
| `scape_sketch_lageplan.png` | `scape_sketch_lageplan` | Hand sketch: site plan of the hillside showing the pavilion footprint, east ramp access, viewing direction arrow, surrounding vegetation zone |
| `scape_sketch_perspektive.png` | `scape_sketch_perspektive` | Hand sketch: exterior perspective of the pavilion — larch wood deck, Cortenstahl columns, cantilevered viewing platform extending over the slope |
| `scape_sketch_schnitt.png` | `scape_sketch_schnitt` | Hand sketch: cross-section B-B through the pavilion — ground profile of the hillside, column positions, cantilever length, interior room height |

---

## Projekt Hoffmann — Einfamilienhaus Starnberg

### Sketch images — need `thumbnail` field added first

Same as above: add `thumbnail` to the `raw_ref` of each event, drop the file here, re-seed.

| Filename | Event ID | Content |
|---|---|---|
| `hoffmann_sketch_grundriss.png` | `project_sketch_grundriss` | Hand sketch: ground floor plan — living room, kitchen, bedroom zones, enlarged south-facing windows marked at 2.40 m, staircase position |
| `hoffmann_sketch_fassade.png` | `project_sketch_fassade` | Hand sketch: south elevation — brick (Klinker) facade in warm sandstone tone, window arrangement, roof pitch, garage below terrace |
| `hoffmann_sketch_schnitt.png` | `project_sketch_schnitt` | Hand sketch: section A-A through the building — roof structure, basement on the sloped plot (Hanggrundstück), floor-to-floor heights |

---

## Avatar photos — `public/images/chat/`

Profile photos go into the `chat/` subfolder. Add `sender_avatar` to the matching
chat event's `raw_ref`, then re-seed.

```ts
raw_ref: {
  type: "chat_message",
  sender: "Thomas Weiß",
  sender_avatar: "thomas.jpg",   // ← add this line
  ...
}
```

### Projekt Scape team

| Filename | Person | Role |
|---|---|---|
| `thomas.jpg` | Thomas Weiß | Tragwerksplaner (structural engineer) |
| `karin.jpg` | Karin Vogel | Landschaftsarchitektin (landscape architect) |
| `anna_lenz.jpg` | Prof. Dr. Anna Lenz | Direktorin Lenz Stiftung (client) |

### Projekt Hoffmann team

| Filename | Person | Role |
|---|---|---|
| `lisa.jpg` | Lisa Kraft | Architektin (project architect) |
| `stefan.jpg` | Stefan Berger | Tragwerksplaner (structural engineer) |

### Already present

| Filename | Person |
|---|---|
| `mia.jpg` | Mia Schulz |
| `lukas.jpg` | Lukas Brenner |
| `nina.jpg` | Nina Berger |
| `felix.jpg` | Felix Wagner |
| `ben.jpg` | Ben Richter |
| `jonas.jpg` | Jonas Müller |

---

## Chat thumbnail images — `public/images/chat/`

These appear as inline image attachments inside `MessageThreadRow` components.
Add `chat_thumbnail` to the matching chat event's `raw_ref`, then re-seed.

| Filename | Event ID | Content |
|---|---|---|
| `capri_selfie.jpg` | `chats_boat_capri_plan` | Group selfie on the boat heading to Capri, Blue Grotto in the background |
| `dinner_view.jpg` | `chats_dinner_reservation` | View from the table at Trattoria da Vincenzo, Positano terrace at dusk |
