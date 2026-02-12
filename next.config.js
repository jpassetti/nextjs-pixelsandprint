module.exports = {
 trailingSlash: false,
 images: {
  remotePatterns: [
    {
     protocol: "https",
     hostname: "cdn.sanity.io",
     pathname: "/**",
    },
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
