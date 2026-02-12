import React from "react";
import { Roboto_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyNav from "@/components/StickyNav";

import "@/sass/global.scss";

export const metadata = {
 title: "Pixels & Print Workshop | Newhouse School at Syracuse University",
 description:
  "Pixels & Print is a design workshop for social impact. The workshop is limited to students in the graphic design program at the Newhouse School.",
};

const robotoCondensed = Roboto_Condensed({
 subsets: ["latin"],
 weight: ["400", "700"],
 variable: "--font-roboto-condensed",
});

export default function SiteRootLayout({
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
    <Header />
    <StickyNav />
    <main>{children}</main>
    <Footer />
   </body>
  </html>
 );
}
