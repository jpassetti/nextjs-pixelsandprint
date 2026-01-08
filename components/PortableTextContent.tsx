import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ButtonWithLink from "./ButtonWithLink";

const ORANGE = "#f76900";

function childrenToText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (React.isValidElement<{ children?: unknown }>(children)) {
    return childrenToText(children.props.children);
  }
  return "";
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Paragraph color="white" marginBottom={2}>
        {children}
      </Paragraph>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: `4px solid ${ORANGE}`,
          paddingLeft: "1rem",
          marginLeft: 0,
          marginRight: 0,
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Paragraph color="white" marginBottom={0}>
          {children}
        </Paragraph>
      </blockquote>
    ),
    h2: ({ children }) => (
      <Heading level={2} color="white" marginTop={8} marginBottom={2} textAlign="center">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level={3} color="white" marginTop={6} marginBottom={2}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level={4} color="white" marginTop={4} marginBottom={1}>
        {children}
      </Heading>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ color: "white", paddingLeft: "1.25rem", marginTop: 0, marginBottom: "1rem" }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol style={{ color: "white", paddingLeft: "1.25rem", marginTop: 0, marginBottom: "1rem" }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li>
        <Paragraph color="white" marginBottom={1}>
          {children}
        </Paragraph>
      </li>
    ),
    number: ({ children }) => (
      <li>
        <Paragraph color="white" marginBottom={1}>
          {children}
        </Paragraph>
      </li>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          padding: "0.15rem 0.35rem",
          borderRadius: 6,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: "0.95em",
        }}
      >
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href;
      const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          style={{ color: ORANGE }}
        >
          {children}
        </a>
      );
    },
    buttonLink: ({ children, value }) => {
      const v = value as { href?: string; variant?: string; newTab?: boolean } | undefined;
      const href = v?.href;
      if (typeof href !== "string" || href.length === 0) return <>{children}</>;

      const label = childrenToText(children) || "Learn more";
      const variant = v?.variant === "primary" ? "primary" : undefined;

      return (
        <span style={{ display: "inline-block", margin: "0.25rem 0" }}>
          <ButtonWithLink href={href} label={label} type={variant} newTab={v?.newTab !== false} />
        </span>
      );
    },
  },
};

export default function PortableTextContent({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as PortableTextBlock[]} components={components} />;
}
