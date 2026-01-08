import path from "node:path";
import crypto from "node:crypto";

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

function newKey(prefix = "k") {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
}

function ensureKeys(items, prefix) {
  if (!Array.isArray(items)) return { items, changed: false };

  let changed = false;
  const next = items.map((item) => {
    if (item && typeof item === "object" && !item._key) {
      changed = true;
      return { ...item, _key: newKey(prefix) };
    }
    return item;
  });

  return { items: next, changed };
}

async function main() {
  console.log(`Backfilling missing _key values in dataset '${dataset}'...`);

  const docs = await client.fetch(
    `*[_type == "workshopYear"]{
      _id,
      year,
      coaches,
      sponsors,
      scheduleDays,
      scheduleEvents
    } | order(year asc)`
  );

  let patched = 0;
  for (const doc of docs) {
    const { _id, year } = doc;

    const coaches = ensureKeys(doc.coaches, "coach");
    const sponsors = ensureKeys(doc.sponsors, "sponsor");
    const scheduleDays = ensureKeys(doc.scheduleDays, "day");
    const scheduleEvents = ensureKeys(doc.scheduleEvents, "event");

    const hasChanges =
      coaches.changed ||
      sponsors.changed ||
      scheduleDays.changed ||
      scheduleEvents.changed;

    if (!hasChanges) {
      console.log(`↷ ${_id} (${year ?? "?"}): ok`);
      continue;
    }

    let patch = client.patch(_id);
    if (coaches.changed) patch = patch.set({ coaches: coaches.items });
    if (sponsors.changed) patch = patch.set({ sponsors: sponsors.items });
    if (scheduleDays.changed) patch = patch.set({ scheduleDays: scheduleDays.items });
    if (scheduleEvents.changed) patch = patch.set({ scheduleEvents: scheduleEvents.items });

    await patch.commit({ autoGenerateArrayKeys: false });

    patched += 1;
    console.log(`✓ ${_id} (${year ?? "?"}): patched missing _key values`);
  }

  console.log(`Done. Patched ${patched}/${docs.length} workshopYear docs.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
