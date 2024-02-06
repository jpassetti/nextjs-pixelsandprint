"use client";

import { useState, useEffect } from "react";

import Container from "./Container";
import Section from "./Section";
import { getDays, getEvents } from "../lib/api";
import Filters from "./Filters";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

// Assuming the structure of your events and days
interface Event {
  title: string;
  time: {
    start: Date;
    end: Date;
  };
  location: string;
  slug: string;
}

interface Day {
  time: {
    start: Date;
    end: Date;
  };
}

const Schedule: React.FC = () => {
  //  // const days: Day[] = getDays();
  //   //const events: Event[] = getEvents();
  //   const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  //   const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  //   useEffect(() => {
  //     const filteredEvents = events.filter((event) => {
  //       return (
  //         event.time.start > days[selectedDayIndex].time.start &&
  //         event.time.start < days[selectedDayIndex].time.end
  //       );
  //     });
  //     setFilteredEvents(filteredEvents);
  //   }, [selectedDayIndex, events, days]);

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
      <Paragraph textAlign="center" color="white">
        The schedule will be published soon.
      </Paragraph>
      <Container type="content">
        {/*<Filters
          items={days}
          format="tabs"
          activeCategory={selectedDayIndex}
          setActiveCategory={setSelectedDayIndex}
          filterBy="day"
  />*/}
        {/* Your JSX here */}
      </Container>
    </Section>
  );
};

export default Schedule;
