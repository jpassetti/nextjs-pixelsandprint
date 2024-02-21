"use client"

import React, { useState, useEffect } from "react";
import Container from "./Container";
import EventListItem from "./EventListItem";
import Section from "./Section";
import { getDaysByYear, getEventsByDay } from "../lib/api";
import Filters from "./Filters";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

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
    start: string; // Assuming start and end are string representations of date-time
    end: string;
  };
}

const Schedule: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [events, setEvents] = useState<Event[]>([]); // Explicitly typed as an array of Event

  const days = getDaysByYear(2024) as Day[];

  useEffect(() => {
    const events = getEventsByDay(
      days[selectedDayIndex].time.start,
      days[selectedDayIndex].time.end
    );
    setEvents(events);
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
          {events?.map((event, index) => {
            return <EventListItem key={index} event={event} />;
          })}
        </div>
      </Container>
    </Section>
  );
};

export default Schedule;