"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "./Container";
import EventListItem from "./EventListItem";
import Section from "./Section";
import Filters from "./Filters";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

import type { ScheduleDay, ScheduleEvent } from "@/lib/sanity.types";

interface Event {
  title: string;
  time: {
    start: string;
    end: string;
  };
  location:
    | {
        name?: string;
        slug?: string;
        building?: string | null;
        room?: string | null;
      }
    | string;
  slug: string;
}

// Define props for the Schedule component
interface ScheduleProps {
  days?: ScheduleDay[];
  events?: ScheduleEvent[];
  updatedAt?: string;
}

const Schedule: React.FC<ScheduleProps> = ({ days = [], events = [], updatedAt }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const reducedMotion = useReducedMotion();

  const lastUpdatedLabel = useMemo(() => {
    if (!updatedAt) return null;
    const ms = new Date(updatedAt).getTime();
    if (!Number.isFinite(ms)) return null;
    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(ms));
    return `Last updated ${formatted}`;
  }, [updatedAt]);

  const sortedDays = useMemo(() => {
    return [...days].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [days]);

  const eventsByDaySlug = useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>();
    for (const event of events) {
      const key = event.daySlug;
      map.set(key, [...(map.get(key) || []), event]);
    }
    map.forEach((list, key) => {
      list.sort((a, b) => {
        const aTime = new Date(a.start).getTime();
        const bTime = new Date(b.start).getTime();

        const aValid = Number.isFinite(aTime);
        const bValid = Number.isFinite(bTime);

        if (aValid && bValid && aTime !== bTime) return aTime - bTime;
        if (aValid && !bValid) return -1;
        if (!aValid && bValid) return 1;

        return (a.title || "").localeCompare(b.title || "");
      });
      map.set(key, list);
    });
    return map;
  }, [events]);

  const visibleEvents = useMemo<Event[]>(() => {
    const selectedDay = sortedDays[selectedDayIndex];
    if (!selectedDay) return [];

    const dayEvents = eventsByDaySlug.get(selectedDay.slug) || [];
    return dayEvents.map((event) => ({
      title: event.title,
      slug: event.slug,
      location: event.location ?? event.locationSlug ?? "tba",
      time: {
        start: event.start,
        end: event.end || "",
      },
    }));
  }, [eventsByDaySlug, selectedDayIndex, sortedDays]);

  const selectedDaySlug = sortedDays[selectedDayIndex]?.slug;

  const listVariants = reducedMotion
    ? undefined
    : {
        closed: { opacity: 1 },
        open: {
          opacity: 1,
          transition: { staggerChildren: 0.045, delayChildren: 0.02 },
        },
      };

  const itemVariants = reducedMotion
    ? undefined
    : {
        closed: { opacity: 0, x: -12 },
        open: { opacity: 1, x: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const } },
      };

  return (
    <Section id="schedule">
      <Heading
        level={2}
        textAlign="center"
        marginTop={8}
        marginBottom={2}
        color="white"
      >
        Schedule
      </Heading>

      {lastUpdatedLabel ? (
        <Paragraph textAlign="center" color="tan" caps condensed marginBottom={2}>
          {lastUpdatedLabel}
        </Paragraph>
      ) : null}

      <Container type="content">
        <Filters
          items={sortedDays.map((d) => ({
            name: d.title,
            slug: d.slug,
            time: { start: d.start, end: d.end },
          }))}
          format="tabs"
          activeTabIndex={selectedDayIndex}
          setActiveTabIndex={setSelectedDayIndex}
          filterBy="day"
        />

        {reducedMotion ? (
          <div>
            {visibleEvents.map((event) => (
              <EventListItem key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedDaySlug || "no-day"}
              variants={listVariants}
              initial="closed"
              animate="open"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            >
              {visibleEvents.map((event) => (
                <motion.div key={event.slug} variants={itemVariants}>
                  <EventListItem event={event} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </Container>
    </Section>
  );
};

export default Schedule;