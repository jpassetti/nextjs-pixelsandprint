import { defineField, defineType } from "sanity";

export const client = defineType({
 name: "client",
 title: "Client / Organization",
 type: "document",
 fields: [
  defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
  defineField({ name: "url", title: "Website", type: "url" }),
  defineField({
   name: "logo",
   title: "Logo",
   type: "image",
   options: { hotspot: true },
   fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
  }),
  defineField({ name: "description", title: "Description", type: "text" }),
 ],
 preview: {
  select: { title: "name", media: "logo" },
 },
});
