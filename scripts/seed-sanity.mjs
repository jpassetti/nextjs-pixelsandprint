import fs from "node:fs";
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

const VIMEO_DEFAULT = "https://player.vimeo.com/video/891992135?h=2882ad0be1";
const DEFAULT_FORM_EMBED =
  "https://docs.google.com/forms/d/e/1FAIpQLScb53d4l8dp-rSpLwotZRsPlSgPKkWQ1-MZq7cl7CBLVtmZ-A/viewform?embedded=true";

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function newKey(prefix = "k") {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
}

function publicFileToAbsolute(publicPath) {
  const rel = publicPath.startsWith("/") ? publicPath.slice(1) : publicPath;
  return path.join(process.cwd(), "public", rel);
}

function isUploadableImage(fileOrUrl) {
  const lower = fileOrUrl.toLowerCase();
  return lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp") || lower.endsWith(".avif");
}

async function uploadImageFromPublic(publicPath, filenameHint) {
  const abs = publicFileToAbsolute(publicPath);
  if (!fs.existsSync(abs)) return null;
  if (!isUploadableImage(abs)) return null;

  const stream = fs.createReadStream(abs);
  const filename = filenameHint || path.basename(abs);
  const asset = await client.assets.upload("image", stream, { filename });
  return asset;
}

async function uploadImageFromUrl(url, filenameHint) {
  if (!isUploadableImage(url)) return null;

  const res = await fetch(url);
  if (!res.ok) return null;
  const arrayBuffer = await res.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);

  const filename = filenameHint || url.split("/").pop() || "remote-image";
  const asset = await client.assets.upload("image", buf, { filename });
  return asset;
}

async function ensureDoc(doc) {
  const existing = await client.getDocument(doc._id);
  if (existing) {
    return existing;
  }
  return client.create(doc);
}

function pickYearFromStart(start) {
  return Number.parseInt(start.slice(0, 4), 10);
}

// ---- Legacy data (lifted from lib/api.js) ----

const workshopDatesByYear = {
  2023: "March 2-4, 2023",
  2024: "Feb. 22-24, 2024",
  2025: "Feb. 6-8, 2025",
};

const coaches = [
  // 2023
  {
    year: 2023,
    nameFirst: "Naotaka",
    nameLast: "Minami",
    title: "Creative",
    companyName: "Parliament",
    companyUrl: "https://www.linkedin.com/in/naotaka-minami-08432488",
    role: "motion",
    headshotPath: "/images/coaches/naotaka-minami.jpg",
    headshotAlt: "Naotaka Minami",
  },
  {
    year: 2023,
    nameFirst: "Kevin",
    nameLast: "Camelo",
    title: "Visual Designer",
    companyName: "IBM",
    companyUrl: "https://www.kevmelo.com",
    role: "uiux",
    headshotPath: "/images/coaches/kevin-camelo.jpg",
    headshotAlt: "Kevin Camelo",
  },
  {
    year: 2023,
    nameFirst: "Jody",
    nameLast: "Sugrue",
    title: "Creative Leader",
    companyName: "Website",
    companyUrl: "https://www.therealjodysugrue.com",
    role: "motion",
    headshotPath: "/images/coaches/jody-sugrue.jpg",
    headshotAlt: "Jody Sugrue",
  },
  {
    year: 2023,
    nameFirst: "Sarah",
    nameLast: "Alread",
    title: "Digital Product Director",
    companyName: "Gartner",
    companyUrl: "https://www.linkedin.com/in/sarah-alread-717956129",
    role: "uiux",
    headshotPath: "/images/coaches/sarah-alread.jpg",
    headshotAlt: "Sarah Alread",
  },
  {
    year: 2023,
    nameFirst: "Seth",
    nameLast: "Gitner",
    title: "Associate Professor",
    companyName: "Newhouse School",
    companyUrl: "https://newhouse.syr.edu/people/seth-gitner",
    role: "uiux",
    headshotPath: "/images/coaches/seth-gitner.jpg",
    headshotAlt: "Seth Gitner",
  },

  // 2024
  {
    year: 2024,
    nameFirst: "Jared",
    nameLast: "Novack",
    title: "Co-Founder",
    companyName: "Upstatement",
    companyUrl: "https://upstatement.com/",
    role: "uiux",
    headshotPath: "/images/coaches/jared-novack.jpg",
    headshotAlt: "Jared Novack",
  },
  {
    year: 2024,
    nameFirst: "Emily",
    nameLast: "Slack",
    title: "Senior User Experience Designer",
    companyName: "Rev",
    companyUrl: "https://www.linkedin.com/in/emily-slack",
    role: "uiux",
    headshotPath: "/images/coaches/emily-slack.jpg",
    headshotAlt: "Emily Slack",
  },
  {
    year: 2024,
    nameFirst: "G",
    nameLast: "Williams",
    title: "CEO, Founder",
    companyName: "Grova Creative",
    companyUrl: "https://grova.com/",
    role: "print",
    headshotPath: "/images/coaches/g-williams.jpg",
    headshotAlt: "G Williams",
  },
  {
    year: 2024,
    nameFirst: "Scott",
    nameLast: "McNany",
    title: "Creative Director",
    companyName: "Pinckney Hugo Group",
    companyUrl: "https://www.linkedin.com/in/scott-mcnany-a4a0335/",
    role: "print",
    headshotPath: "/images/coaches/scott-mcnany.jpg",
    headshotAlt: "Scott McNany",
  },
  {
    year: 2024,
    nameFirst: "Drew",
    nameLast: "Jordan",
    title: "Motion Design, Graphics, and Creative Visuals Specialist",
    companyName: "The New York Times",
    companyUrl: "https://www.nytimes.com/by/drew-jordan",
    role: "motion",
    headshotPath: "/images/coaches/drew-jordan.jpg",
    headshotAlt: "Drew Jordan",
  },
  {
    year: 2024,
    nameFirst: "Conner",
    nameLast: "Lee",
    title: "Motion Graphics Designer",
    companyName: "Blue Chalk Media",
    companyUrl: "https://bluechalk.com/",
    role: "motion",
    headshotPath: "/images/coaches/conner-lee.jpg",
    headshotAlt: "Conner Lee",
  },
  {
    year: 2024,
    nameFirst: "Amanda McCoy",
    nameLast: "Bast",
    title: "3D & Immersive Product Designer",
    companyName: "Adobe",
    companyUrl: "https://www.linkedin.com/in/mccoybast",
    role: "immersive",
    headshotPath: "/images/coaches/amanda-mccoy-bast.jpg",
    headshotAlt: "Amanda McCoy Bast",
  },

  // 2025
  {
    year: 2025,
    nameFirst: "Akshay",
    nameLast: "Ram",
    title: "Product Manager",
    companyName: "Adobe",
    companyUrl: "https://bio.site/akshayram",
    role: "print",
    headshotPath: "/images/coaches/akshay-ram.jpg",
    headshotAlt: "Akshay Ram",
  },
  {
    year: 2025,
    nameFirst: "Jordan",
    nameLast: "Schnitzer",
    title: "Product Designer",
    companyName: "Zappos",
    companyUrl: "http://jordanschnitzerdesigns.com",
    role: "uiux",
    headshotPath: "/images/coaches/jordan-schnitzer.jpg",
    headshotAlt: "Jordan Schnitzer",
  },
  {
    year: 2025,
    nameFirst: "Nathaly",
    nameLast: "Flores",
    title: "Motion Design & Creative Performance Manager",
    companyName: "Sirius XM",
    companyUrl: "https://www.nathalyflores.com",
    role: "motion",
    headshotPath: "/images/coaches/nathaly-flores.jpg",
    headshotAlt: "Nathaly Flores",
  },
  {
    year: 2025,
    nameFirst: "Jacqueline",
    nameLast: "Simpson",
    title: "Senior Graphic Designer",
    companyName: "Nexstar Media Group",
    companyUrl: "https://jacquelineesimpson.com",
    role: "print",
    headshotPath: "/images/coaches/jacqueline-simpson.jpg",
    headshotAlt: "Jacqueline",
  },
  {
    year: 2025,
    nameFirst: "Mike",
    nameLast: "Schnaidt",
    title: "Creative Director",
    companyName: "Fast Company",
    companyUrl: "http://www.mikeschnaidt.com",
    role: "print",
    headshotPath: "/images/coaches/mike-schnaidt.jpg",
    headshotAlt: "Mike Schnaidt",
  },
  {
    year: 2025,
    nameFirst: "Jeremy",
    nameLast: "Walker",
    title: "Freelance Motion Designer",
    companyName: "Mariola",
    companyUrl: "http://www.mariola.media",
    role: "immersive",
    headshotPath: "/images/coaches/jeremy-walker.jpg",
    headshotAlt: "Jeremy Walker",
  },
  {
    year: 2025,
    nameFirst: "Libby",
    nameLast: "Stankaitis",
    title: "Senior Designer",
    companyName: "Disney+",
    companyUrl: "http://libbystankaitis.com",
    role: "print",
    headshotPath: "/images/coaches/libby-stankaitis.jpg",
    headshotAlt: "Libby Stankaitis",
  },
  {
    year: 2025,
    nameFirst: "Josh",
    nameLast: "Klenert",
    title: "Senior Manager",
    companyName: "Workflow Design Studio",
    companyUrl: "http://joshklenert.com",
    role: "uiux",
    headshotPath: "/images/coaches/josh-klenert.jpg",
    headshotAlt: "Josh Klenert",
  },
  {
    year: 2025,
    nameFirst: "Marina",
    nameLast: "Antonowicz",
    title: "Senior Motion Designer",
    companyName: "NBCUniversal",
    companyUrl: "https://www.manto.media",
    role: "motion",
    headshotPath: "/images/coaches/marina-antonowicz.jpg",
    headshotAlt: "Marina Antonowicz",
  },
];

const sponsorsByYear = {
  2024: [
    {
      name: "Grova Creative",
      url: "https://grova.com",
      // remote SVG - seed script will try, but may skip
      logoUrl: "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/Grova_logo_full_Color-01.svg",
      alt: "Grova Creative",
    },
    {
      name: "Insomnia Cookies",
      url: "https://insomniacookies.com/",
      logoUrl: "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/insominacookies.png",
      alt: "Insomnia Cookies",
    },
    {
      name: "Moo, Inc.",
      url: "https://www.moo.com/us/",
      logoUrl: "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/moo-inc-logo-vector.svg",
      alt: "Moo, Inc.",
    },
    {
      name: "Sticker Mule",
      url: "https://www.stickermule.com",
      logoUrl: "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/sticker-mule-logo-light-bg.svg",
      alt: "Sticker Mule",
    },
    {
      name: "Tiny Fish Printing",
      url: "https://www.tinyfishprinting.com/",
      logoUrl: "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/tiny-fish-logo.svg",
      alt: "Tiny Fish Printing",
    },
  ],
  2025: [
    {
      name: "Tiny Fish Printing",
      url: "https://www.tinyfishprinting.com/",
      logoUrl: "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/tiny-fish-logo.svg",
      alt: "Tiny Fish Printing",
    },
    {
      name: "Baghdad Restaurant",
      url: "https://www.baghdadcny.com/",
      logoPublicPath: "/sponsors/baghdad-restaurant-syracuse.png",
      alt: "Baghdad Restaurant",
    },
    {
      name: "Newhouse School",
      url: "https://newhouse.syracuse.edu",
      logoPublicPath: "/sponsors/newhouse-school-logo--secondary.svg",
      alt: "Newhouse School",
    },
    {
      name: "appeThaizing",
      url: "https://www.appethaizing.com/",
      logoPublicPath: "/sponsors/appethaizing-syracuse.jpg",
      alt: "appeThaizing",
    },
    {
      name: "Collegetown Bagels",
      url: "https://www.collegetownbagels.com/",
      logoPublicPath: "/sponsors/collegetown-bagels-syracuse.png",
      alt: "Collegetown Bagels",
    },
    {
      name: "GD USA",
      url: "https://gdusa.com/",
      logoPublicPath: "/sponsors/gd-usa.jpg",
      alt: "GD USA",
    },
    {
      name: "Ansun Graphics",
      url: "https://ansungraphics.com/",
      logoPublicPath: "/sponsors/ansun-graphics-syracuse.jpg",
      alt: "Ansun Graphics",
    },
  ],
};

const days = [
  { year: 2023, title: "Thursday", slug: "thursday", start: "2023-03-02T00:00-0500", end: "2023-03-02T23:59:59-0500" },
  { year: 2023, title: "Friday", slug: "friday", start: "2023-03-03T00:00-0500", end: "2023-03-03T23:59:59-0500" },
  { year: 2023, title: "Saturday", slug: "saturday", start: "2023-03-04T00:00-0500", end: "2023-03-04T23:59:59-0500" },

  { year: 2024, title: "Thursday", slug: "thursday", start: "2024-02-22T00:00-0500", end: "2024-02-22T23:59:59-0500" },
  { year: 2024, title: "Friday", slug: "friday", start: "2024-02-23T00:00-0500", end: "2024-02-23T23:59:59-0500" },
  { year: 2024, title: "Saturday", slug: "saturday", start: "2024-02-24T00:00-0500", end: "2024-02-24T23:59:59-0500" },

  { year: 2025, title: "Thursday", slug: "thursday", start: "2025-02-06T00:00-0500", end: "2025-02-06T23:59:59-0500" },
  { year: 2025, title: "Friday", slug: "friday", start: "2025-02-07T00:00-0500", end: "2025-02-07T23:59:59-0500" },
  { year: 2025, title: "Saturday", slug: "saturday", start: "2025-02-08T00:00-0500", end: "2025-02-08T23:59:59-0500" },
];

// Events lifted from lib/api.js (2023-2025)
const events = [
  // 2023
  { title: "Coaches Kick-off Meeting", slug: "coaches-kick-off-meeting", start: "2023-03-02T16:00-0500", end: "2023-03-02T17:00-0500", locationSlug: "levine-conference-room" },
  { title: "Coaches dinner", slug: "coaches-dinner", start: "2023-03-02T17:00-0500", end: "2023-03-02T18:30-0500", locationSlug: "levine-conference-room" },
  { title: "Workshop Kick-off", slug: "workshop-kick-off", start: "2023-03-02T18:45-0500", end: "2023-03-02T19:00-0500", locationSlug: "i-3-center" },
  { title: "Client intro + Coaches intro", slug: "client-coaches-intro", start: "2023-03-02T19:00-0500", end: "2023-03-02T20:00-0500", locationSlug: "i-3-center" },
  { title: "Team Brainstorming", slug: "team-brainstorming", start: "2023-03-02T20:00-0500", end: null, locationSlug: "i-3-center" },
  { title: "Coaches meeting", slug: "coaches-meeting", start: "2023-03-03T09:30-0500", end: "2023-03-03T10:00-0500", locationSlug: "war-room" },
  { title: "Group Meeting", slug: "group-meeting", start: "2023-03-03T10:00-0500", end: "2023-03-03T10:30-0500", locationSlug: "tirico-classroom" },
  { title: "Client presentation and critique", slug: "client-presentation-and-critique", start: "2023-03-03T10:30-0500", end: "2023-03-03T11:00-0500", locationSlug: "tirico-classroom" },
  { title: "Team meetings / work time", slug: "team-meetings-work-time", start: "2023-03-03T11:00-0500", end: "2023-03-03T12:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Lunch", slug: "lunch", start: "2023-03-03T12:00-0500", end: "2023-03-03T13:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Work time", slug: "work-time", start: "2023-03-03T13:00-0500", end: "2023-03-03T17:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Team meetings", slug: "team-meetings-work-time", start: "2023-03-03T17:00-0500", end: "2023-03-03T18:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Dinner", slug: "dinner", start: "2023-03-03T17:00-0500", end: "2023-03-03T18:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Group presentation and critique", slug: "group-presentation-and-critique", start: "2023-03-03T19:00-0500", end: "2023-03-03T20:00-0500", locationSlug: "tirico-classroom" },
  { title: "Team meetings and homework assignments", slug: "team-meetings-and-homework-assignments", start: "2023-03-03T20:30-0500", end: "2023-03-03T21:30-0500", locationSlug: "tirico-classroom" },
  { title: "Work with your teams", slug: "work-with-your-teams", start: "2023-03-03T21:30-0500", end: null, locationSlug: "collaborative-media-lab" },
  { title: "Coaches meeting", slug: "coaches-meeting", start: "2023-03-04T09:30-0500", end: "2023-03-04T10:00-0500", locationSlug: "war-room" },
  { title: "Full group meeting", slug: "full-group-meeting", start: "2023-03-04T10:00-0500", end: "2023-03-04T10:30-0500", locationSlug: "tirico-classroom" },
  { title: "Team meetings / work time", slug: "team-meetings-work-time", start: "2023-03-04T10:30-0500", end: "2023-03-04T12:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Lunch", slug: "lunch", start: "2023-03-04T12:00-0500", end: "2023-03-04T13:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Work with your teams", slug: "work-with-your-teams", start: "2023-03-04T13:00-0500", end: "2023-03-04T18:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Deadline", slug: "deadline", start: "2023-03-04T18:00-0500", end: null, locationSlug: "collaborative-media-lab" },
  { title: "Dinner", slug: "dinner", start: "2023-03-04T17:00-0500", end: "2023-03-04T18:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Final presentation", slug: "final-presentation", start: "2023-03-04T19:00-0500", end: "2023-03-04T20:00-0500", locationSlug: "halmi-screening-room" },
  { title: "Dessert and workshop close", slug: "dessert-and-workshop-close", start: "2023-03-04T20:00-0500", end: "2023-03-04T20:30-0500", locationSlug: "legal-sea-foods" },

  // 2024
  { title: "Coaches Kick-off Meeting", slug: "coaches-kick-off-meeting", start: "2024-02-22T16:00-0500", end: "2024-02-22T17:00-0500", locationSlug: "time-warner-conference-room" },
  { title: "Coaches dinner", slug: "coaches-dinner", start: "2024-02-22T17:00-0500", end: "2024-02-22T18:30-0500", locationSlug: "time-warner-conference-room" },
  { title: "Workshop Kick-off", slug: "workshop-kick-off", start: "2024-02-22T18:45-0500", end: "2024-02-22T19:00-0500", locationSlug: "halmi-screening-room" },
  { title: "Client intro + Coaches intro", slug: "client-coaches-intro", start: "2024-02-22T19:00-0500", end: "2024-02-22T20:00-0500", locationSlug: "halmi-screening-room" },
  { title: "Team Brainstorming", slug: "team-brainstorming", start: "2024-02-22T20:00-0500", end: null, locationSlug: "nh3-rooms" },
  { title: "Coaches meeting", slug: "coaches-meeting", start: "2024-02-23T09:30-0500", end: "2024-02-23T10:00-0500", locationSlug: "war-room" },
  { title: "Group Meeting", slug: "group-meeting", start: "2024-02-23T10:00-0500", end: "2024-02-23T10:30-0500", locationSlug: "tirico-classroom" },
  { title: "Client presentation and critique", slug: "client-presentation-and-critique", start: "2024-02-23T10:30-0500", end: "2024-02-23T11:00-0500", locationSlug: "tirico-classroom" },
  { title: "Group photo", slug: "group-photo", start: "2024-02-23T11:00-0500", end: "2024-02-23T11:15-0500", locationSlug: "nh3-lobby" },
  { title: "Team meetings / work time", slug: "team-meetings-work-time", start: "2024-02-23T11:15-0500", end: "2024-02-23T12:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Lunch", slug: "lunch", start: "2024-02-23T12:00-0500", end: "2024-02-23T13:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Work time", slug: "work-time", start: "2024-02-23T13:00-0500", end: "2024-02-23T17:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Team meetings", slug: "team-meetings-work-time", start: "2024-02-23T17:00-0500", end: "2024-02-23T18:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Dinner", slug: "dinner", start: "2024-02-23T18:00-0500", end: "2024-02-23T19:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Group presentation and critique", slug: "group-presentation-and-critique", start: "2024-02-23T19:00-0500", end: "2024-02-23T20:00-0500", locationSlug: "tirico-classroom" },
  { title: "Team meetings and homework assignments", slug: "team-meetings-and-homework-assignments", start: "2024-02-23T20:30-0500", end: "2024-02-23T21:30-0500", locationSlug: "collaborative-media-lab" },
  { title: "Work with your teams", slug: "work-with-your-teams", start: "2024-02-23T21:30-0500", end: null, locationSlug: "collaborative-media-lab" },
  { title: "Coaches meeting", slug: "coaches-meeting", start: "2024-02-24T09:30-0500", end: "2024-02-24T10:00-0500", locationSlug: "war-room" },
  { title: "Full group meeting", slug: "full-group-meeting", start: "2024-02-24T10:00-0500", end: "2024-02-24T10:30-0500", locationSlug: "tirico-classroom" },
  { title: "Team meetings / work time", slug: "team-meetings-work-time", start: "2024-02-24T10:30-0500", end: "2024-02-24T12:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Lunch", slug: "lunch", start: "2024-02-24T12:00-0500", end: "2024-02-24T13:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Work with your teams", slug: "work-with-your-teams", start: "2024-02-24T13:00-0500", end: "2024-02-24T18:00-0500", locationSlug: "collaborative-media-lab" },
  { title: "Deadline", slug: "deadline", start: "2024-02-24T18:00-0500", end: null, locationSlug: "collaborative-media-lab" },
  { title: "Dinner", slug: "dinner", start: "2024-02-24T18:00-0500", end: "2024-02-24T19:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Final presentation", slug: "final-presentation", start: "2024-02-24T19:00-0500", end: "2024-02-24T20:00-0500", locationSlug: "halmi-screening-room" },
  { title: "Dessert and workshop close", slug: "dessert-and-workshop-close", start: "2024-02-24T20:00-0500", end: "2024-02-24T20:30-0500", locationSlug: "legal-sea-foods" },

  // 2025
  { title: "Branding Workshop", slug: "branding-workshop", start: "2025-02-06T09:30-0500", end: "2025-02-06T12:00-0500", locationSlug: "tba" },
  { title: "Workshop Kick-off", slug: "workshop-kick-off", start: "2025-02-06T18:45-0500", end: "2025-02-06T19:00-0500", locationSlug: "nh1-101-102" },
  { title: "Client Intro + Coaches Intros", slug: "client-coaches-intros", start: "2025-02-06T19:00-0500", end: "2025-02-06T20:00-0500", locationSlug: "nh1-101-102" },
  { title: "Team Brainstorming", slug: "team-brainstorming", start: "2025-02-06T20:00-0500", end: null, locationSlug: "nh1-101-102" },
  { title: "Group Meeting", slug: "group-meeting", start: "2025-02-07T10:00-0500", end: "2025-02-07T10:30-0500", locationSlug: "nh1-101" },
  { title: "Client Presentation and Critique", slug: "client-presentation-and-critique", start: "2025-02-07T10:30-0500", end: "2025-02-07T11:00-0500", locationSlug: "nh3-141" },
  { title: "Group Photo", slug: "group-photo", start: "2025-02-07T11:00-0500", end: "2025-02-07T11:15-0500", locationSlug: "nh1-lobby" },
  { title: "Team Meetings", slug: "team-meetings", start: "2025-02-07T11:15-0500", end: "2025-02-07T12:00-0500", locationSlug: "nh1-101-102" },
  { title: "Lunch", slug: "lunch", start: "2025-02-07T12:00-0500", end: "2025-02-07T13:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Work time", slug: "work-time", start: "2025-02-07T13:00-0500", end: "2025-02-07T17:00-0500", locationSlug: "nh1-101-102" },
  { title: "Team Meetings", slug: "team-meetings-work-time", start: "2025-02-07T17:00-0500", end: "2025-02-07T18:00-0500", locationSlug: "nh1-101-102" },
  { title: "Dinner", slug: "dinner", start: "2025-02-07T18:00-0500", end: "2025-02-07T19:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Group Presentations and Critique", slug: "group-presentations-and-critique", start: "2025-02-07T19:00-0500", end: "2025-02-07T20:00-0500", locationSlug: "nh3-141" },
  { title: "Team Meetings + Homework Assignments", slug: "team-meetings-homework-assignments", start: "2025-02-07T20:30-0500", end: "2025-02-07T21:30-0500", locationSlug: "nh1-101-102" },
  { title: "Work with your Teams", slug: "work-with-your-teams", start: "2025-02-07T21:30-0500", end: null, locationSlug: "nh1-101-102" },
  { title: "Full Group Meeting", slug: "full-group-meeting", start: "2025-02-08T10:00-0500", end: "2025-02-08T10:30-0500", locationSlug: "nh1-101" },
  { title: "Team Meetings / Work time", slug: "team-meetings-work-time", start: "2025-02-08T10:30-0500", end: null, locationSlug: "nh1-101-102" },
  { title: "Lunch", slug: "lunch", start: "2025-02-08T12:00-0500", end: "2025-02-08T13:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Work with your Teams", slug: "work-with-your-teams", start: "2025-02-08T13:00-0500", end: "2025-02-08T18:00-0500", locationSlug: "nh1-101-102" },
  { title: "Deadline", slug: "deadline", start: "2025-02-08T18:00-0500", end: null, locationSlug: null },
  { title: "Dinner", slug: "dinner", start: "2025-02-08T18:00-0500", end: "2025-02-08T19:00-0500", locationSlug: "legal-sea-foods" },
  { title: "Final Presentation", slug: "final-presentation", start: "2025-02-08T19:00-0500", end: "2025-02-08T20:00-0500", locationSlug: "nh3-141" },
  { title: "Dessert and Workshop close", slug: "dessert-and-workshop-close", start: "2025-02-08T20:00-0500", end: "2025-02-08T20:30-0500", locationSlug: "legal-sea-foods" },
];

function getDaysForYear(year) {
  return days
    .filter((d) => d.year === year)
    .map((d, idx) => ({
      _key: d.slug || newKey("day"),
      title: d.title,
      slug: d.slug,
      start: d.start,
      end: d.end,
      order: idx,
    }));
}

function getEventsForYear(year) {
  const yearEvents = events.filter((e) => pickYearFromStart(e.start) === year);
  const yearDays = getDaysForYear(year);

  const dayForEvent = (event) => {
    const match = yearDays.find((d) => event.start >= d.start && event.start <= d.end);
    return match?.slug || "thursday";
  };

  return yearEvents.map((e) => ({
    _key: `${slugify(e.slug)}_${slugify(e.start)}`.slice(0, 80) || newKey("event"),
    title: e.title,
    slug: e.slug,
    start: e.start,
    end: e.end,
    locationSlug: e.locationSlug,
    daySlug: dayForEvent(e),
  }));
}

async function seed() {
  console.log(`Seeding Sanity dataset '${dataset}' in project '${projectId}'...`);

  const years = [2023, 2024, 2025];

  // 1) Coaches (global docs, referenced by year)
  const coachIdsByYear = new Map();
  for (const coach of coaches) {
    const coachId = `coach.${coach.year}.${slugify(`${coach.nameFirst}-${coach.nameLast}`)}`;

    const existing = await client.getDocument(coachId);
    if (!existing) {
      let headshot = undefined;
      if (coach.headshotPath) {
        const asset = await uploadImageFromPublic(coach.headshotPath, path.basename(coach.headshotPath));
        if (asset) {
          headshot = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: coach.headshotAlt || `${coach.nameFirst} ${coach.nameLast}`,
          };
        }
      }

      await ensureDoc({
        _id: coachId,
        _type: "coach",
        nameFirst: coach.nameFirst,
        nameLast: coach.nameLast,
        title: coach.title,
        companyName: coach.companyName,
        companyUrl: coach.companyUrl,
        role: coach.role,
        headshot,
      });

      console.log(`✓ coach ${coach.year}: ${coach.nameFirst} ${coach.nameLast}`);
    }

    const ids = coachIdsByYear.get(coach.year) || [];
    ids.push(coachId);
    coachIdsByYear.set(coach.year, ids);
  }

  // 2) Sponsors
  const sponsorIdsByYear = new Map();
  for (const [yearStr, sponsors] of Object.entries(sponsorsByYear)) {
    const year = Number.parseInt(yearStr, 10);
    for (const sponsor of sponsors) {
      const sponsorId = `sponsor.${year}.${slugify(sponsor.name)}`;
      const existing = await client.getDocument(sponsorId);

      if (!existing) {
        let logo = undefined;

        // Prefer local public assets; else try remote (raster only)
        if (sponsor.logoPublicPath) {
          const asset = await uploadImageFromPublic(sponsor.logoPublicPath, path.basename(sponsor.logoPublicPath));
          if (asset) {
            logo = {
              _type: "image",
              asset: { _type: "reference", _ref: asset._id },
              alt: sponsor.alt || sponsor.name,
            };
          }
        } else if (sponsor.logoUrl) {
          try {
            const asset = await uploadImageFromUrl(sponsor.logoUrl, `${slugify(sponsor.name)}${path.extname(sponsor.logoUrl)}`);
            if (asset) {
              logo = {
                _type: "image",
                asset: { _type: "reference", _ref: asset._id },
                alt: sponsor.alt || sponsor.name,
              };
            }
          } catch {
            // best-effort
          }
        }

        await ensureDoc({
          _id: sponsorId,
          _type: "sponsor",
          name: sponsor.name,
          url: sponsor.url,
          logo,
        });

        console.log(`✓ sponsor ${year}: ${sponsor.name}`);
      }

      const ids = sponsorIdsByYear.get(year) || [];
      ids.push(sponsorId);
      sponsorIdsByYear.set(year, ids);
    }
  }

  // 3) Workshop years
  for (const year of years) {
    const yearId = `workshopYear.${year}`;
    const existing = await client.getDocument(yearId);
    if (existing) {
      console.log(`↷ year ${year} already exists, skipping`);
      continue;
    }

    const workshopDatesLabel = workshopDatesByYear[year] || "Dates to be announced";

    const scheduleDays = getDaysForYear(year);
    const scheduleEvents = getEventsForYear(year);

    await ensureDoc({
      _id: yearId,
      _type: "workshopYear",
      year,
      slug: { _type: "slug", current: String(year) },
      overviewDatesLabel: workshopDatesLabel,
      workshopDatesLabel,
      registrationFormUrl: DEFAULT_FORM_EMBED,
      aboutVideoUrl: VIMEO_DEFAULT,
      coaches: (coachIdsByYear.get(year) || []).map((id) => ({ _key: newKey("coach"), _type: "reference", _ref: id })),
      sponsors: (sponsorIdsByYear.get(year) || []).map((id) => ({ _key: newKey("sponsor"), _type: "reference", _ref: id })),
      scheduleDays,
      scheduleEvents,
    });

    console.log(`✓ workshopYear ${year} (${scheduleDays.length} days, ${scheduleEvents.length} events)`);
  }

  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
