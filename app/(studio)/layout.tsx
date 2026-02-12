import React from "react";
import { Roboto_Condensed } from "next/font/google";

import "@/sass/global.scss";

const robotoCondensed = Roboto_Condensed({
 subsets: ["latin"],
 weight: ["400", "700"],
 variable: "--font-roboto-condensed",
});

export default function StudioRootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en" className={robotoCondensed.variable}>
   <head>
    <link
     rel="apple-touch-icon"
     href="https://assets.cdn.syr.edu/common/imgs/apple-touch-icon.png"
    />
    <link
     rel="mask-icon"
     href="https://assets.cdn.syr.edu/common/imgs/favicon-16.svg"
     color="#d44500"
    />
    <link
     rel="icon"
     type="image/png"
     sizes="16x16"
     href="https://assets.cdn.syr.edu/common/imgs/favicon-16.png"
    />
    <link
     rel="icon"
     type="image/png"
     sizes="32x32"
     href="https://assets.cdn.syr.edu/common/imgs/favicon-32.png"
    />
    <link
     rel="icon"
     type="image/png"
     sizes="192x192"
     href="https://assets.cdn.syr.edu/common/imgs/favicon-192.png"
    />
    <link
     rel="icon"
     type="image/png"
     sizes="96x96"
     href="https://assets.cdn.syr.edu/common/imgs/favicon-96.png"
    />
    <link
     rel="icon"
     type="image/png"
     sizes="144x144"
     href="https://assets.cdn.syr.edu/common/imgs/favicon-144.png"
    />
   </head>
   <body>
    <main style={{ height: "100vh", overflow: "hidden" }}>{children}</main>
   </body>
  </html>
 );
}
