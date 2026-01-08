import { defineField, defineType } from "sanity";

export const sponsor = defineType({
 name: "sponsor",
 title: "Sponsor",
 type: "document",
 fields: [
  defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
  defineField({ name: "url", title: "URL", type: "url" }),
  defineField({
   name: "logo",
   title: "Logo",
   type: "image",
   options: { hotspot: true },
   fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
  }),
 ],
 preview: {
  select: { title: "name", media: "logo" },
 },
});
