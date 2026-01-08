import path from "node:path";

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load local env files for non-Next scripts
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing env: NEXT_PUBLIC_SANITY_DATASET");
if (!token) throw new Error("Missing env: SANITY_API_WRITE_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/**
 * This list mirrors the legacy locations in lib/schedule.ts.
 * Keep slugs stable: schedule events reference these.
 */
const locations = [
  { name: "TBA", slug: "tba", building: null, room: null },
  { name: "Classroom", slug: "nh1-212", building: "Newhouse 1", room: "212" },
  { name: "Classroom and Zoom", slug: "nh1-212-zoom", building: "Newhouse 1", room: "212" },
  { name: "Lecture Hall", slug: "nh1-101", building: "Newhouse 1", room: "101" },
  { name: "Lecture Hall", slug: "nh1-102", building: "Newhouse 1", room: "102" },
  { name: "Lecture Halls", slug: "nh1-101-102", building: "Newhouse 1", room: "101/102" },
  { name: "Collaborative Media Lab", slug: "collaborative-media-lab", building: "Newhouse 3", room: "253" },
  { name: "Larry Kramer War Room", slug: "war-room", building: "Newhouse 3", room: "252" },
  { name: "Tirico Classroom", slug: "tirico-classroom", building: "Newhouse 3", room: "250" },
  { name: "Levine Conference Room", slug: "levine-conference-room", building: "Newhouse 3", room: "463" },
  { name: "I3 Center", slug: "i-3-center", building: "Newhouse 3", room: "432/434" },
  { name: "Legal Sea Foods Dining Room", slug: "legal-sea-foods", building: "Newhouse 3", room: "Food.com" },
  { name: "Halmi Screening Room", slug: "halmi-screening-room", building: "Newhouse 3", room: "141" },
  { name: "Halmi Screening Room", slug: "nh3-141", building: "Newhouse 3", room: "141" },
  { name: "Time Warner Conference Room", slug: "time-warner-conference-room", building: "Newhouse 3", room: "327" },
  { name: "Various rooms", slug: "nh3-rooms", building: "Newhouse 3", room: null },
  { name: "Lobby", slug: "nh3-lobby", building: "Newhouse 3", room: null },
  { name: "Lobby", slug: "nh1-lobby", building: "Newhouse 1", room: null },
];

async function ensureLocationDocs() {
  const idBySlug = new Map();

  for (const loc of locations) {
    const id = `location.${loc.slug}`;
    const existing = await client.getDocument(id);

    if (!existing) {
      await client.create({
        _id: id,
        _type: "location",
        name: loc.name,
        slug: loc.slug,
        building: loc.building,
        room: loc.room,
      });
      console.log(`✓ created location: ${loc.slug}`);
    } else {
      console.log(`↷ location exists: ${loc.slug}`);
    }

    idBySlug.set(loc.slug, id);
  }

  return idBySlug;
}

function backfillEventLocations(scheduleEvents, locationIdBySlug) {
  if (!Array.isArray(scheduleEvents)) return { scheduleEvents, changed: false };

  let changed = false;
  const next = scheduleEvents.map((event) => {
    if (!event || typeof event !== "object") return event;

    // already set
    if (event.location && event.location._ref) return event;

    const slug = event.locationSlug;
    if (!slug || typeof slug !== "string") return event;

    const refId = locationIdBySlug.get(slug);
    if (!refId) return event;

    changed = true;
    return {
      ...event,
      location: { _type: "reference", _ref: refId },
    };
  });

  return { scheduleEvents: next, changed };
}

async function main() {
  console.log(`Backfilling Locations + event.location references in dataset '${dataset}'...`);

  const locationIdBySlug = await ensureLocationDocs();

  const years = await client.fetch(
    `*[_type == "workshopYear"]{_id, year, scheduleEvents} | order(year asc)`
  );

  let patched = 0;
  for (const doc of years) {
    const { _id, year } = doc;

    const backfilled = backfillEventLocations(doc.scheduleEvents, locationIdBySlug);
    if (!backfilled.changed) {
      console.log(`↷ ${_id} (${year ?? "?"}): ok`);
      continue;
    }

    await client
      .patch(_id)
      .set({ scheduleEvents: backfilled.scheduleEvents })
      .commit({ autoGenerateArrayKeys: false });

    patched += 1;
    console.log(`✓ ${_id} (${year ?? "?"}): patched scheduleEvents.location`);
  }

  console.log(`Done. Patched ${patched}/${years.length} workshopYear docs.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
