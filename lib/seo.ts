export function getSiteUrl(): string {
 const explicit = process.env.NEXT_PUBLIC_SITE_URL;
 if (explicit) return explicit.replace(/\/$/, "");

 // Vercel provides a hostname without protocol.
 const vercelUrl = process.env.VERCEL_URL;
 if (vercelUrl) return `https://${vercelUrl}`;

 return "http://localhost:3000";
}

export function absoluteUrl(pathname: string): string {
 const base = getSiteUrl();
 const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
 return `${base}${path}`;
}
