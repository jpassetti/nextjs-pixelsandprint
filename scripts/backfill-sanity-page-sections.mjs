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

function defaultSections() {
  return [
    { _key: newKey("sec"), _type: "welcomeSection", enabled: true },
    { _key: newKey("sec"), _type: "aboutSection", enabled: true },
    { _key: newKey("sec"), _type: "scheduleSection", enabled: true },
    { _key: newKey("sec"), _type: "coachesSection", enabled: true },
    { _key: newKey("sec"), _type: "sponsorsSection", enabled: true },
    { _key: newKey("sec"), _type: "registerSection", enabled: false, title: "Register", height: 1800 },
    {
      _key: newKey("sec"),
      _type: "timelineSection",
      enabled: false,
      mode: "link",
      linkLabel: "View the work timeline",
    },
  ];
}

async function main() {
  console.log(`Backfilling pageSections for workshopYear docs in dataset '${dataset}'...`);

  const docs = await client.fetch(
    `*[_type == "workshopYear"]{_id, year, pageSections} | order(year asc)`
  );

  let patched = 0;
  for (const doc of docs) {
    const { _id, year } = doc;

    const existing = doc.pageSections;
    if (Array.isArray(existing) && existing.length > 0) {
      console.log(`↷ ${_id} (${year ?? "?"}): already has pageSections`);
      continue;
    }

    await client
      .patch(_id)
      .set({ pageSections: defaultSections() })
      .commit({ autoGenerateArrayKeys: false });

    patched += 1;
    console.log(`✓ ${_id} (${year ?? "?"}): set default pageSections`);
  }

  console.log(`Done. Patched ${patched}/${docs.length} workshopYear docs.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
