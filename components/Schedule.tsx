"use client";

import React, { useState, useEffect, useMemo } from "react";
import Container from "./Container";
import EventListItem from "./EventListItem";
import Section from "./Section";
import { getDaysByYear, getEventsByDay } from "../lib/api";
import Filters from "./Filters";
import Heading from "./Heading";

interface Event {
  title: string;
  time: {
    start: string;
    end: string;
  };
  location: string;
  slug: string;
}

interface Day {
  name: string;
  slug: string;
  time: {
    start: string;
    end: string;
  };
}

// Define props for the Schedule component
interface ScheduleProps {
  year: number;
}

const Schedule: React.FC<ScheduleProps> = ({ year }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [events, setEvents] = useState<Event[]>([]);

  // Memoize `days` to avoid recalculating it on every render
  const days = useMemo(() => getDaysByYear(year) as Day[], [year]);

  useEffect(() => {
    const selectedDay = days[selectedDayIndex];
    if (selectedDay) {
      const fetchedEvents = getEventsByDay(
        selectedDay.time.start,
        selectedDay.time.end
      );
      setEvents(fetchedEvents);
    }
  }, [selectedDayIndex, days]);

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
          items={days}
          format="tabs"
          activeTabIndex={selectedDayIndex}
          setActiveTabIndex={setSelectedDayIndex}
          filterBy="day"
        />
        <div>
          {events.map((event, index) => (
            <EventListItem key={index} event={event} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Schedule;