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

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\(.*?\)/g, "")
    .replace(/&/g, "and")
    .replace(/\+/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stableKey(prefix, unique) {
  const hash = crypto.createHash("sha1").update(String(unique)).digest("hex").slice(0, 16);
  return `${prefix}_${hash}`;
}

function toIsoEST(dateYmd, time24h) {
  // February in Syracuse is EST (UTC-05:00)
  return `${dateYmd}T${time24h}:00-05:00`;
}

function parseLocation(raw) {
  if (!raw) return null;
  const text = String(raw).trim();
  if (!text) return null;

  const normalized = text.toLowerCase();

  // Known aliases → existing seeded slugs
  if (normalized === "nh3 141" || normalized === "nh3\u00a0141" || normalized.includes("nh3 141")) {
    return { name: "Halmi Screening Room", slug: "nh3-141", building: "Newhouse 3", room: "141" };
  }
  if (normalized.includes("nh1") && normalized.includes("lobby")) {
    return { name: "Lobby", slug: "nh1-lobby", building: "Newhouse 1", room: null };
  }
  if (normalized.includes("lobby") && normalized.includes("nh3")) {
    return { name: "Lobby", slug: "nh3-lobby", building: "Newhouse 3", room: null };
  }
  if (normalized.includes("legal") && normalized.includes("sea")) {
    return { name: "Legal Sea Foods Dining Room", slug: "legal-sea-foods", building: "Newhouse 3", room: "Food.com" };
  }

  // New locations we expect for 2026
  if (normalized === "photo studio") {
    return { name: "Photo Studio", slug: "photo-studio", building: null, room: null };
  }
  if (normalized.includes("garage") && normalized.includes("agency")) {
    return { name: "Garage + Agency", slug: "garage-and-agency", building: null, room: null };
  }

  // Parse patterns like "Miron Room NH1 303"
  const nhRoomMatch = text.match(/\bNH\s*([1-9])\s*(\d{3})\b/i);
  if (nhRoomMatch) {
    const buildingNum = nhRoomMatch[1];
    const room = nhRoomMatch[2];
    const building = `Newhouse ${buildingNum}`;

    const namePart = text.replace(nhRoomMatch[0], "").replace(/\|/g, "").trim();
    const baseName = namePart || `Room ${room}`;
    const slug = slugify(`${baseName} nh${buildingNum} ${room}`);

    return {
      name: baseName,
      slug,
      building,
      room,
    };
  }

  // Fallback: create a location from raw text
  return { name: text, slug: slugify(text), building: null, room: null };
}

async function ensureLocationRef(location) {
  if (!location?.slug) return null;
  const id = `location.${location.slug}`;

  const existing = await client.getDocument(id);
  if (!existing) {
    await client.create({
      _id: id,
      _type: "location",
      name: location.name || location.slug,
      slug: location.slug,
      building: location.building ?? null,
      room: location.room ?? null,
    });
    console.log(`✓ created location: ${location.slug}`);
  } else {
    console.log(`↷ location exists: ${location.slug}`);
  }

  return {
    _type: "reference",
    _ref: id,
  };
}

const YEAR = 2026;
const YEAR_SLUG = "2026";
const DATES_LABEL = "Feb. 12-14, 2026";
const REGISTRATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSft6WVlukurk8td5ZrhRXFn29GIX72xgf5rKUTcHlWSG01ovg/viewform?embedded=true";
const REGISTRATION_FORM_HEIGHT = 3811;

const scheduleDays = [
  {
    title: "Thursday",
    slug: "thursday",
    start: toIsoEST("2026-02-12", "18:00"),
    end: toIsoEST("2026-02-12", "23:00"),
    order: 1,
  },
  {
    title: "Friday",
    slug: "friday",
    start: toIsoEST("2026-02-13", "10:00"),
    end: toIsoEST("2026-02-13", "23:00"),
    order: 2,
  },
  {
    title: "Saturday",
    slug: "saturday",
    start: toIsoEST("2026-02-14", "10:00"),
    end: toIsoEST("2026-02-14", "21:00"),
    order: 3,
  },
];

const scheduleEventsRaw = [
  // Thursday
  {
    daySlug: "thursday",
    dayShort: "thu",
    title: "Student Check-in",
    start: toIsoEST("2026-02-12", "18:00"),
    end: toIsoEST("2026-02-12", "18:45"),
    locationText: "Photo Studio",
  },
  {
    daySlug: "thursday",
    dayShort: "thu",
    title: "Workshop Kick-off",
    start: toIsoEST("2026-02-12", "18:45"),
    end: toIsoEST("2026-02-12", "19:00"),
    locationText: "NH3 141",
  },
  {
    daySlug: "thursday",
    dayShort: "thu",
    title: "Client + Coach Intros",
    start: toIsoEST("2026-02-12", "19:00"),
    end: toIsoEST("2026-02-12", "20:00"),
    locationText: "NH3 141",
  },
  {
    daySlug: "thursday",
    dayShort: "thu",
    title: "Branding Crit",
    start: toIsoEST("2026-02-12", "20:00"),
    end: toIsoEST("2026-02-12", "21:00"),
    locationText: "NH3 141",
  },
  {
    daySlug: "thursday",
    dayShort: "thu",
    title: "Team Brainstorming",
    start: toIsoEST("2026-02-12", "21:00"),
    end: toIsoEST("2026-02-12", "23:00"),
    locationText: "",
  },

  // Friday
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Logo DEADLINE + Group MTG",
    start: toIsoEST("2026-02-13", "10:00"),
    end: toIsoEST("2026-02-13", "10:30"),
    locationText: "NH3 141",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Logo Client Presentation",
    start: toIsoEST("2026-02-13", "10:30"),
    end: toIsoEST("2026-02-13", "11:00"),
    locationText: "NH3 141",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Group Photo",
    start: toIsoEST("2026-02-13", "11:00"),
    end: toIsoEST("2026-02-13", "11:15"),
    locationText: "NH1 lobby",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Team Meetings",
    start: toIsoEST("2026-02-13", "11:15"),
    end: toIsoEST("2026-02-13", "12:00"),
    locationText: "Garage + Agency",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Yoga for Designers",
    start: toIsoEST("2026-02-13", "11:30"),
    end: toIsoEST("2026-02-13", "12:00"),
    locationText: "Miron Room NH1 303",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Lunch",
    start: toIsoEST("2026-02-13", "12:00"),
    end: toIsoEST("2026-02-13", "13:00"),
    locationText: "Legal Seafood (food.com)",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Work with teams",
    start: toIsoEST("2026-02-13", "13:00"),
    end: toIsoEST("2026-02-13", "18:00"),
    locationText: "Garage + Agency",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Dinner",
    start: toIsoEST("2026-02-13", "18:00"),
    end: toIsoEST("2026-02-13", "19:00"),
    locationText: "Legal Seafood (food.com)",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Group Presentations + Crit",
    start: toIsoEST("2026-02-13", "19:00"),
    end: toIsoEST("2026-02-13", "20:00"),
    locationText: "NH3 141",
  },
  {
    daySlug: "friday",
    dayShort: "fri",
    title: "Team Meetings + Homework",
    start: toIsoEST("2026-02-13", "20:00"),
    end: "",
    locationText: "",
  },

  // Saturday
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Group Meeting",
    start: toIsoEST("2026-02-14", "10:00"),
    end: toIsoEST("2026-02-14", "10:30"),
    locationText: "NH3 141",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Team Meetings",
    start: toIsoEST("2026-02-14", "10:30"),
    end: toIsoEST("2026-02-14", "12:00"),
    locationText: "Garage + Agency",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Lunch",
    start: toIsoEST("2026-02-14", "12:00"),
    end: toIsoEST("2026-02-14", "13:00"),
    locationText: "Legal Seafood (food.com)",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Work with your teams",
    start: toIsoEST("2026-02-14", "13:00"),
    end: toIsoEST("2026-02-14", "18:00"),
    locationText: "Garage + Agency",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Gallery DEADLINE – for final presentation",
    start: toIsoEST("2026-02-14", "15:00"),
    end: "",
    locationText: "",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "DEADLINE! Submit final work on drive",
    start: toIsoEST("2026-02-14", "18:00"),
    end: "",
    locationText: "",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Dinner",
    start: toIsoEST("2026-02-14", "18:00"),
    end: toIsoEST("2026-02-14", "19:00"),
    locationText: "Legal Seafood room (food.com)",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Final Client Presentation",
    start: toIsoEST("2026-02-14", "19:00"),
    end: toIsoEST("2026-02-14", "20:00"),
    locationText: "NH3 141",
  },
  {
    daySlug: "saturday",
    dayShort: "sat",
    title: "Dessert + Team Photos",
    start: toIsoEST("2026-02-14", "20:00"),
    end: "",
    locationText: "Lobby of NH3",
  },
];

async function main() {
  console.log(`Seeding ${YEAR_SLUG} schedule into dataset '${dataset}'...`);

  // Ensure locations exist first
  const locationRefBySlug = new Map();

  for (const raw of scheduleEventsRaw) {
    const loc = parseLocation(raw.locationText);
    if (!loc?.slug) continue;
    if (locationRefBySlug.has(loc.slug)) continue;

    const ref = await ensureLocationRef(loc);
    if (ref) locationRefBySlug.set(loc.slug, ref);
  }

  const scheduleDaysWithKeys = scheduleDays.map((d) => ({
    _key: stableKey("day", `${YEAR_SLUG}|${d.slug}`),
    title: d.title,
    slug: d.slug,
    start: d.start,
    end: d.end,
    order: d.order,
  }));

  const scheduleEvents = scheduleEventsRaw.map((e) => {
    const baseSlug = slugify(e.title);
    const slug = `${e.dayShort}-${baseSlug}`;
    const loc = parseLocation(e.locationText);
    const locSlug = loc?.slug || "";

    const event = {
      _key: stableKey("event", `${YEAR_SLUG}|${e.daySlug}|${slug}|${e.start}`),
      title: e.title,
      slug,
      start: e.start,
      daySlug: e.daySlug,
      ...(e.end ? { end: e.end } : {}),
      ...(locSlug ? { locationSlug: locSlug } : {}),
      ...(locSlug && locationRefBySlug.get(locSlug) ? { location: locationRefBySlug.get(locSlug) } : {}),
    };

    return event;
  });

  const docId = `workshopYear.${YEAR_SLUG}`;
  const existing = await client.getDocument(docId);

  if (!existing) {
    await client.create({
      _id: docId,
      _type: "workshopYear",
      year: YEAR,
      slug: { _type: "slug", current: YEAR_SLUG },
      overviewDatesLabel: DATES_LABEL,
      workshopDatesLabel: DATES_LABEL,
      registrationFormUrl: REGISTRATION_FORM_URL,
      scheduleDays: scheduleDaysWithKeys,
      scheduleEvents,
      pageSections: [
        { _key: stableKey("section", `${YEAR_SLUG}|welcome`), _type: "welcomeSection", enabled: true },
        { _key: stableKey("section", `${YEAR_SLUG}|about`), _type: "aboutSection", enabled: true },
        { _key: stableKey("section", `${YEAR_SLUG}|schedule`), _type: "scheduleSection", enabled: true },
        { _key: stableKey("section", `${YEAR_SLUG}|coaches`), _type: "coachesSection", enabled: true },
        { _key: stableKey("section", `${YEAR_SLUG}|sponsors`), _type: "sponsorsSection", enabled: true },
        {
          _key: stableKey("section", `${YEAR_SLUG}|register`),
          _type: "registerSection",
          enabled: false,
          formUrl: REGISTRATION_FORM_URL,
          height: REGISTRATION_FORM_HEIGHT,
        },
        {
          _key: stableKey("section", `${YEAR_SLUG}|timeline`),
          _type: "timelineSection",
          enabled: false,
          mode: "link",
          linkLabel: "View the work timeline",
        },
      ],
    });

    console.log(`✓ created ${docId}`);
  } else {
    await client
      .patch(docId)
      .set({
        overviewDatesLabel: DATES_LABEL,
        workshopDatesLabel: DATES_LABEL,
        registrationFormUrl: REGISTRATION_FORM_URL,
        scheduleDays: scheduleDaysWithKeys,
        scheduleEvents,
      })
      .commit({ autoGenerateArrayKeys: false });

    console.log(`✓ updated ${docId}`);
  }

  console.log(`Done. Seeded ${scheduleDaysWithKeys.length} days and ${scheduleEvents.length} events for ${YEAR_SLUG}.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
