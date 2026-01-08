import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Stable identifier used by events (e.g., 'nh1-101-102', 'legal-sea-foods', 'tba').",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "building",
      title: "Building",
      type: "string",
    }),
    defineField({
      name: "room",
      title: "Room",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      slug: "slug",
      building: "building",
      room: "room",
    },
    prepare({ title, slug, building, room }) {
      const parts = [room, building].filter(Boolean).join(" · ");
      return {
        title: title || slug || "Location",
        subtitle: [slug, parts].filter(Boolean).join(" — "),
      };
    },
  },
});
