import { Fragment } from "react";

import Col from "@/components/Col";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Link from "next/link";
import Paragraph from "@/components/Paragraph";
import Row from "@/components/Row";

import { sanityFetch } from "@/lib/sanity.client";
import { yearPageQuery } from "@/lib/sanity.queries";
import type { WorkshopYearPage } from "@/lib/sanity.types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export async function generateMetadata({
 params,
}: {
 params: { year: string } | Promise<{ year: string }>;
}): Promise<Metadata> {
 const resolvedParams = await Promise.resolve(params);
 const yearSlug = resolvedParams.year;
 const canonical = absoluteUrl(`/${yearSlug}/register`);
 const siteUrl = getSiteUrl();

 return {
  metadataBase: new URL(siteUrl),
  title: `Register ${yearSlug} | Pixels & Print`,
  description: `Registration for Pixels & Print ${yearSlug}.`,
  alternates: { canonical },
  robots: { index: false, follow: true },
 };
}

const RegisterPage = async ({
 params,
}: {
 params: { year: string } | Promise<{ year: string }>;
}) => {
 const resolvedParams = await Promise.resolve(params);
 const yearSlug = resolvedParams.year;

 const data = await sanityFetch<WorkshopYearPage>(yearPageQuery, {
  year: yearSlug,
 });
 if (!data?._id) notFound();

 const registerSection = data.pageSections?.find(
  (s) => s._type === "registerSection",
 ) as | { formUrl?: string; height?: number } | undefined;

 const formUrl =
  registerSection?.formUrl ||
  data.registrationFormUrl ||
  "https://docs.google.com/forms/d/e/1FAIpQLScb53d4l8dp-rSpLwotZRsPlSgPKkWQ1-MZq7cl7CBLVtmZ-A/viewform?embedded=true";
 const height =
  typeof registerSection?.height === "number" ? registerSection.height : 3000;

 return (
  <Fragment>
   <Container>
    <main>
     <Row>
      <Col xs={12} sm={12} paddingLeft={3}>
       <Paragraph marginTop={8} textAlign="center">
        <Link href={`/${yearSlug}`} style={{ color: "#f76900" }}>
         &laquo; Back to homepage
        </Link>
       </Paragraph>
       <Heading level={1} textAlign="center" color="white" marginTop={2} marginBottom={3}>
        Register
       </Heading>
       <Paragraph marginBottom={4} textAlign="center">
        To register for the workshop, please fill out the following form.
       </Paragraph>
       {
        <iframe
         src={formUrl}
         width="100%"
         height={height}
         style={{ border: 0 }}
         loading="lazy"
        >
         Loading…
        </iframe>
       }
      </Col>
     </Row>
    </main>
   </Container>
  </Fragment>
 );
};
export default RegisterPage;

export const dynamic = "force-dynamic";
