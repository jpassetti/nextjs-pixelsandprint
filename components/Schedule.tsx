"use client";

import React, { useMemo, useState } from "react";
import Container from "./Container";
import EventListItem from "./EventListItem";
import Section from "./Section";
import Filters from "./Filters";
import Heading from "./Heading";

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
}

const Schedule: React.FC<ScheduleProps> = ({ days = [], events = [] }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

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
        <div>
          {visibleEvents.map((event, index) => (
            <EventListItem key={index} event={event} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Schedule;