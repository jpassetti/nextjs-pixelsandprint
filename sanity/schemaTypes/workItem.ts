import { defineField, defineType } from "sanity";

export const workItem = defineType({
 name: "workItem",
 title: "Work Item (Timeline)",
 type: "document",
 fields: [
  defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),

  defineField({
   name: "year",
   title: "Workshop Year",
   type: "reference",
   to: [{ type: "workshopYear" }],
   validation: (r) => r.required(),
  }),

  defineField({
   name: "client",
   title: "Client",
   type: "reference",
   to: [{ type: "client" }],
  }),

  defineField({
   name: "category",
   title: "Category",
   type: "string",
   options: {
    list: [
     { title: "Branding", value: "branding" },
     { title: "Logo", value: "logo" },
     { title: "Web", value: "web" },
     { title: "Motion", value: "motion" },
     { title: "Print", value: "print" },
     { title: "Other", value: "other" },
    ],
   },
  }),

  defineField({ name: "teamName", title: "Team Name", type: "string" }),

  defineField({
   name: "timelineDate",
   title: "Timeline Date",
   description: "Used to place this item on the timeline (can be workshop day or a publish date)",
   type: "datetime",
  }),

  defineField({ name: "orderRank", title: "Order Rank", type: "number" }),

  defineField({ name: "externalUrl", title: "External URL", type: "url" }),

  defineField({ name: "description", title: "Description", type: "text" }),

  defineField({
   name: "assets",
   title: "Assets",
   type: "array",
   of: [
    {
     type: "image",
     options: { hotspot: true },
     fields: [
      defineField({ name: "alt", title: "Alt Text", type: "string" }),
      defineField({ name: "caption", title: "Caption", type: "string" }),
     ],
    },
   ],
  }),
 ],
 preview: {
  select: {
   title: "title",
   year: "year.year",
   media: "assets.0",
  },
  prepare({ title, year, media }) {
   return { title, subtitle: year ? String(year) : undefined, media };
  },
 },
});
