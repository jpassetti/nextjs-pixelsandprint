import { defineField, defineType, type SanityDocument } from "sanity";
import EasternDateTimeInput from "../components/EasternDateTimeInput";

export const workshopYear = defineType({
 name: "workshopYear",
 title: "Workshop Year",
 type: "document",
 fieldsets: [
  {
   name: "legacy",
   title: "Legacy",
   options: { collapsible: true, collapsed: true },
  },
 ],
 fields: [
  defineField({
   name: "year",
   title: "Year",
   type: "number",
   validation: (rule) => rule.required().min(2015).max(2100),
  }),
  defineField({
   name: "slug",
   title: "Slug",
   type: "slug",
   options: {
        source: (doc: SanityDocument) => {
         const year = (doc as unknown as { year?: number }).year;
         return typeof year === "number" ? String(year) : "";
        },
   },
   validation: (rule) => rule.required(),
  }),

  defineField({
   name: "overviewDatesLabel",
   title: "Overview Dates Label",
   description: "Shown in the hero section (e.g., 'Feb. 6-8, 2025')",
   type: "string",
  }),
  defineField({
   name: "welcomeKicker",
   title: "Welcome Kicker",
   description: "Small line above the main headline.",
   type: "string",
   initialValue: "A design workshop for",
  }),
  defineField({
   name: "welcomeHighlight",
   title: "Welcome Highlight",
   description: "Highlighted word/phrase in the headline.",
   type: "string",
   initialValue: "social impact.",
  }),
  defineField({
   name: "welcomeBody",
   title: "Welcome Body",
   description: "Short intro paragraph shown under the dates.",
   type: "text",
   rows: 2,
   initialValue:
    "Workshop is limited to students in the graphic design program at the Newhouse School.",
  }),
  defineField({
   name: "welcomeCtaLabel",
   title: "Welcome CTA Label",
   type: "string",
   initialValue: "Register now",
  }),
  defineField({
   name: "welcomeCtaEnabled",
   title: "Show Welcome CTA",
   type: "boolean",
   initialValue: true,
  }),
  defineField({
   name: "workshopDatesLabel",
   title: "Workshop Dates Label",
   description: "Used in the About section sentence (e.g., 'Feb. 6-8, 2025')",
   type: "string",
  }),

  defineField({
   name: "registrationFormUrl",
   title: "Registration Form URL",
   type: "url",
  }),

  defineField({
   name: "pageSections",
   title: "Page Sections",
   description: "Drag/drop to reorder sections, toggle to hide sections.",
   type: "array",
   of: [
    {
     type: "object",
     name: "welcomeSection",
     title: "Welcome Slide",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
     ],
     preview: {
      select: { enabled: "enabled" },
      prepare({ enabled }) {
       return { title: "Welcome Slide", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
    {
     type: "object",
     name: "aboutSection",
     title: "About Information",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
     ],
     preview: {
      select: { enabled: "enabled" },
      prepare({ enabled }) {
       return { title: "About Information", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
    {
     type: "object",
     name: "scheduleSection",
     title: "Schedule",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
     ],
     preview: {
      select: { enabled: "enabled" },
      prepare({ enabled }) {
       return { title: "Schedule", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
    {
     type: "object",
     name: "coachesSection",
     title: "Coaches",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
     ],
     preview: {
      select: { enabled: "enabled" },
      prepare({ enabled }) {
       return { title: "Coaches", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
    {
     type: "object",
     name: "sponsorsSection",
     title: "Sponsors",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
     ],
     preview: {
      select: { enabled: "enabled" },
      prepare({ enabled }) {
       return { title: "Sponsors", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
    {
     type: "object",
     name: "registerSection",
     title: "Register (Embed)",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: false }),
      defineField({ name: "title", title: "Title", type: "string", initialValue: "Register" }),
      defineField({
       name: "formUrl",
       title: "Form URL Override",
       description: "Optional: override the year’s Registration Form URL for this section.",
       type: "url",
      }),
      defineField({
       name: "height",
       title: "Embed Height (px)",
       type: "number",
       initialValue: 1800,
      }),
     ],
     preview: {
      select: { enabled: "enabled" },
      prepare({ enabled }) {
       return { title: "Register (Embed)", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
    {
     type: "object",
     name: "timelineSection",
     title: "Timeline",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: false }),
      defineField({
       name: "mode",
       title: "Display Mode",
       type: "string",
       initialValue: "link",
       options: {
        list: [
         { title: "Link to timeline page", value: "link" },
         { title: "Inline (future)", value: "inline" },
        ],
        layout: "radio",
       },
      }),
      defineField({
       name: "linkLabel",
       title: "Link Label",
       type: "string",
       initialValue: "View the work timeline",
      }),
     ],
     preview: {
      select: { enabled: "enabled", mode: "mode" },
      prepare({ enabled, mode }) {
       const shown = enabled === false ? "Hidden" : "Shown";
       return { title: "Timeline", subtitle: `${shown}${mode ? ` · ${mode}` : ""}` };
      },
     },
    },
    {
     type: "object",
     name: "customSection",
     title: "Custom Content",
     fields: [
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
      defineField({ name: "title", title: "Title", type: "string" }),
      defineField({
       name: "body",
       title: "Body",
       type: "array",
        of: [
         {
          type: "block",
          styles: [
           { title: "Normal", value: "normal" },
           { title: "H2", value: "h2" },
           { title: "H3", value: "h3" },
           { title: "H4", value: "h4" },
           { title: "Quote", value: "blockquote" },
          ],
          marks: {
           decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Code", value: "code" },
           ],
           annotations: [
            {
             name: "link",
             type: "object",
             title: "Link",
             fields: [
              {
          name: "href",
          type: "url",
          title: "URL",
            validation: (r) => r.required(),
              },
             ],
            },
            {
             name: "buttonLink",
             type: "object",
             title: "Button Link",
             fields: [
              {
          name: "href",
          type: "url",
          title: "URL",
            validation: (r) => r.required(),
              },
              {
          name: "variant",
          type: "string",
          title: "Variant",
          options: {
           list: [
            { title: "Default", value: "default" },
            { title: "Primary", value: "primary" },
           ],
           layout: "radio",
          },
          initialValue: "primary",
              },
              {
          name: "newTab",
          type: "boolean",
          title: "Open in new tab",
          initialValue: true,
              },
             ],
            },
           ],
          },
         },
        ],
      }),
     ],
     preview: {
      select: { title: "title", enabled: "enabled" },
      prepare({ title, enabled }) {
       return { title: title || "Custom Content", subtitle: enabled === false ? "Hidden" : "Shown" };
      },
     },
    },
   ],
   initialValue: [
    { _type: "welcomeSection", enabled: true },
    { _type: "aboutSection", enabled: true },
    { _type: "scheduleSection", enabled: true },
    { _type: "coachesSection", enabled: true },
    { _type: "sponsorsSection", enabled: true },
    { _type: "registerSection", enabled: false },
    { _type: "timelineSection", enabled: false, mode: "link", linkLabel: "View the work timeline" },
   ],
   validation: (rule) =>
    rule.custom((sections) => {
     if (!Array.isArray(sections)) return true;

     const singletonTypes = new Set([
      "welcomeSection",
      "aboutSection",
      "scheduleSection",
      "coachesSection",
      "sponsorsSection",
      "registerSection",
      "timelineSection",
     ]);

     const seen: Record<string, number> = {};
     for (const s of sections) {
      if (!s || typeof s !== "object") continue;
      const t = (s as { _type?: string })._type;
      if (!t) continue;
      if (!singletonTypes.has(t)) continue;
      seen[t] = (seen[t] ?? 0) + 1;
     }

     const duplicates = Object.entries(seen)
      .filter(([, count]) => count > 1)
      .map(([t]) => t);
     if (duplicates.length === 0) return true;
     return `Duplicate sections not allowed: ${duplicates.join(", ")}`;
    }),
  }),

  defineField({
   name: "aboutVideoUrl",
   title: "About Video URL",
   description: "Vimeo embed URL (or other iframe-compatible URL)",
   type: "url",
  }),
  defineField({
   name: "aboutBody",
   title: "About Body",
   type: "array",
    of: [
     {
      type: "block",
      styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "Quote", value: "blockquote" },
      ],
      marks: {
      decorators: [
       { title: "Strong", value: "strong" },
       { title: "Emphasis", value: "em" },
       { title: "Code", value: "code" },
      ],
      annotations: [
       {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
        {
         name: "href",
         type: "url",
         title: "URL",
              validation: (r) => r.required(),
        },
        ],
       },
       {
        name: "buttonLink",
        type: "object",
        title: "Button Link",
        fields: [
        {
         name: "href",
         type: "url",
         title: "URL",
              validation: (r) => r.required(),
        },
        {
         name: "variant",
         type: "string",
         title: "Variant",
         options: {
          list: [
          { title: "Default", value: "default" },
          { title: "Primary", value: "primary" },
          ],
          layout: "radio",
         },
         initialValue: "primary",
        },
        {
         name: "newTab",
         type: "boolean",
         title: "Open in new tab",
         initialValue: true,
        },
        ],
       },
      ],
      },
     },
    ],
  }),

  defineField({
   name: "coaches",
   title: "Coaches",
   type: "array",
   of: [{ type: "reference", to: [{ type: "coach" }] }],
  }),

  defineField({
   name: "sponsors",
   title: "Sponsors",
   type: "array",
   of: [{ type: "reference", to: [{ type: "sponsor" }] }],
  }),

  defineField({
   name: "scheduleDays",
   title: "Schedule Days",
   type: "array",
   of: [
    {
     type: "object",
     name: "scheduleDay",
     fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
      defineField({ name: "slug", title: "Slug", type: "string", validation: (r) => r.required() }),
        defineField({
         name: "start",
         title: "Start",
         type: "datetime",
         components: { input: EasternDateTimeInput },
         validation: (r) => r.required(),
        }),
        defineField({
         name: "end",
         title: "End",
         type: "datetime",
         components: { input: EasternDateTimeInput },
         validation: (r) => r.required(),
        }),
      defineField({ name: "order", title: "Order", type: "number" }),
     ],
     preview: {
      select: { title: "title", subtitle: "slug" },
     },
    },
   ],
  }),

  defineField({
   name: "scheduleEvents",
   title: "Schedule Events",
   type: "array",
   of: [
    {
     type: "object",
     name: "scheduleEvent",
       fieldsets: [{ name: "legacy", title: "Legacy" }],
     fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
      defineField({ name: "slug", title: "Slug", type: "string", validation: (r) => r.required() }),
        defineField({
         name: "start",
         title: "Start",
         type: "datetime",
         components: { input: EasternDateTimeInput },
         validation: (r) => r.required(),
        }),
        defineField({
         name: "end",
         title: "End",
         type: "datetime",
         components: { input: EasternDateTimeInput },
        }),
      defineField({
       name: "daySlug",
       title: "Day Slug",
       description: "Must match one of the Schedule Day slugs above",
       type: "string",
       validation: (r) => r.required(),
      }),
       defineField({
        name: "location",
        title: "Location",
        description: "Pick from the managed Locations list.",
        type: "reference",
        to: [{ type: "location" }],
       }),
      defineField({
       name: "locationSlug",
       title: "Location Slug",
       description: "Matches a known room slug (e.g., 'nh1-101-102', 'legal-sea-foods')",
       type: "string",
        fieldset: "legacy",
      }),
     ],
     preview: {
       select: { title: "title", day: "daySlug", locationSlug: "locationSlug", locationName: "location.name" },
       prepare({ title, day, locationSlug, locationName }) {
        return {
          title,
          subtitle: [day, locationName || locationSlug].filter(Boolean).join(" — "),
        };
       },
     },
    },
   ],
  }),
 ],
 preview: {
  select: { title: "year", subtitle: "overviewDatesLabel" },
  prepare({ title, subtitle }) {
   return { title: title ? String(title) : "Workshop Year", subtitle };
  },
 },
});
