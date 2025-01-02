module.exports = {
 async redirects() {
  return [
   {
    source: "/",
    destination: "/2025",
    permanent: true, // 301 redirect
   },
  ];
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "via.placeholder.com",
    pathname: "/**", // Allow all paths
   },
   {
    protocol: "https",
    hostname: "unsplash.it",
    pathname: "/**", // Allow all paths
   },
   {
    protocol: "https",
    hostname: "picsum.photos",
    pathname: "/**", // Allow all paths
   },
   {
    protocol: "https",
    hostname: "api.pixelsandprint.newhouse.syr.edu",
    pathname: "/**", // Allow all paths
   },
  ],
 },
};
