import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyNav from "@/components/StickyNav";

import "@/sass/global.scss";

export const metadata = {
  title: "Pixels & Print Workshop | Newhouse School at Syracuse University",
  description:
    "Pixels & Print is a design workshop for social impact. The workshop is limited to students in the graphic design program at the Newhouse School.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <StickyNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}