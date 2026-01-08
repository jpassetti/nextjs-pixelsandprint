import { createClient, type ClientConfig } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
 throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!dataset) {
 throw new Error("Missing env: NEXT_PUBLIC_SANITY_DATASET");
}

const config: ClientConfig = {
 projectId,
 dataset,
 apiVersion,
 // If we have a token, we should bypass the CDN so results are always fresh.
 useCdn: !token && process.env.NODE_ENV === "production",
 perspective: "published",
 token,
};

export const sanityClient = createClient(config);

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
 return sanityClient.fetch<T>(query, params);
}
