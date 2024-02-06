"use client";

import { useState, useEffect } from "react";
import Heading from "./Heading";
import Container from "./Container";
import Paragraph from "./Paragraph";
import Section from "./Section";

import { getCoaches, getCoachCategories } from "../lib/api";

const Coaches = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [posts, setPosts] = useState(getCoaches());
  const [filteredPosts, setFilteredPosts] = useState(posts);
  let coachCategories = [{ name: "All", slug: "all" }, ...getCoachCategories()];

  useEffect(() => {
    if (activeCategoryIndex === 0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter(
          (post) => post.role.slug === coachCategories[activeCategoryIndex].slug
        )
      );
    }
  }, [activeCategoryIndex]);

  return (
    <Section id="coaches">
      <Heading
        level={2}
        textAlign="center"
        marginTop={8}
        marginBottom={2}
        color="white"
      >
        Coaches
      </Heading>
      <Container type="content">
        <Paragraph textAlign="center" color="white">
          The list of coaches will be published soon.
        </Paragraph>
      </Container>
    </Section>
  );
};
export default Coaches;
