# Pixels & Print (Next.js + Sanity)

This site is a Next.js (App Router) frontend backed by a Sanity.io CMS.

## Setup

1) Install deps

- `npm install`

2) Configure env

- Copy `.env.local.example` → `.env.local`
- Fill in:
	- `NEXT_PUBLIC_SANITY_PROJECT_ID`
	- `NEXT_PUBLIC_SANITY_DATASET`
	- `NEXT_PUBLIC_SANITY_API_VERSION`
	- (optional) `SANITY_API_READ_TOKEN` (if dataset is private)
	- (optional) `SANITY_API_WRITE_TOKEN` (only needed for seeding)

3) Run dev

- `npm run dev`

## Sanity Studio

Studio is embedded in the Next app at:

- `http://localhost:3000/studio`

Schemas live in:

- `sanity/schemaTypes/*`

## Seeding

To populate Sanity from the legacy hardcoded data in the repo (coaches/sponsors/schedule for 2023–2025):


## Fixing “Missing keys” warnings in Studio

If you seeded data via the API client (or imported JSON) and see Studio warnings like “Some items in the list are missing their keys”, it means array items are missing `_key`.

Run:

- `npm run fix:sanity-keys`

This script is safe and idempotent: it only patches `workshopYear` arrays that are missing `_key` values.

## Managed Locations (dropdown for schedule events)

Schedule events support a managed `location` dropdown backed by `location` documents.

- Manage locations in Studio via the new **Locations** section.
- In a workshop year’s **Schedule Events**, prefer the **Location** reference field.

To backfill existing seeded events (that only have `locationSlug`) and create the default location docs:

- `npm run backfill:sanity-locations`

## Per-year Page Sections (stack / ordering)

Each `workshopYear` has a **Page Sections** array that controls the order of sections on the year page (drag/drop) and whether sections are shown.

To add the default stack to existing workshop years:

- `npm run backfill:sanity-page-sections`

## Content model (high level)

- **Workshop Year** (`workshopYear`): year slug (e.g. `2026`), dates labels, registration URL, schedule days/events, and references to coaches/sponsors.
- **Coach** (`coach`): name, role, company, headshot.
- **Sponsor** (`sponsor`): name, url, logo.
- **Client / Organization** (`client`): the year’s client.
- **Work Item** (`workItem`): timeline entries (assets, category, team, date) linked to a year.

## Routes

- `/:year` (e.g. `/2026`) renders that year from Sanity.
- `/:year/register` embeds the per-year registration form URL from Sanity.
- `/:year/work` is a starter “timeline” view driven by Sanity `workItem` docs.