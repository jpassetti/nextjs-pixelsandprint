"use client";

import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function BackToTopLink({ className, children }: Props) {
  return (
    <a
      href="#top"
      className={className}
      onClick={(e) => {
        // Keep href for no-JS / fallback, but smooth-scroll when JS is available.
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children ?? "Back to top"}
    </a>
  );
}
