import coreWebVitals from "eslint-config-next/core-web-vitals";
import tsRecommended from "eslint-config-next/typescript";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "coverage/**",
      "old-pages/**",
    ],
  },
  ...coreWebVitals,
  ...tsRecommended,
];

export default config;
