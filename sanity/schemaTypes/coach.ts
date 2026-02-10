import { defineField, defineType } from "sanity";

export const coach = defineType({
    name: "coach",
    title: "Coach",
    type: "document",
    fields: [
        defineField({ name: "nameFirst", title: "First Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "nameLast", title: "Last Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "title", title: "Title", type: "string" }),

        defineField({ name: "companyName", title: "Company Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "companyUrl", title: "Company URL", type: "url", validation: (r) => r.required() }),

        defineField({
            name: "role",
            title: "Role",
            type: "string",
            options: {
                list: [
                    { title: "UI/UX", value: "uiux" },
                    { title: "Motion", value: "motion" },
                    { title: "Print", value: "print" },
                    { title: "Immersive", value: "immersive" },
                    { title: "Promo", value: "promo" },
                ],
            },
            validation: (r) => r.required(),
        }),

        defineField({
            name: "headshot",
            title: "Headshot",
            type: "image",
            options: { hotspot: true },
            fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        }),
    ],
    preview: {
        select: {
            first: "nameFirst",
            last: "nameLast",
            media: "headshot",
            role: "role",
        },
        prepare({ first, last, media, role }) {
            return {
                title: `${last || ""}${last ? ", " : ""}${first || ""}`.trim() || "Coach",
                subtitle: role,
                media,
            };
        },
    },
});
