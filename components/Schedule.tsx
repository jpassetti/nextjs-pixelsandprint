"use client";

import { useState, useEffect } from "react";

import Container from "./Container";
import EventListItem from "./EventListItem";
import Section from "./Section";
import { getDays, getEvents, getDaysByYear, getEventsByDay } from "../lib/api";
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
  name: string;
  slug: string;
  time: {
    start: Date;
    end: Date;
  };
}

const Schedule: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [events, setEvents] = useState([]);
  
  const days: Day[] = getDaysByYear(2024);
    
    useEffect(() => {
      console.log('selectedDayIndex', selectedDayIndex);
      const events = getEventsByDay(days[selectedDayIndex].time.start, days[selectedDayIndex].time.end);
      setEvents(events);
    }, [selectedDayIndex]);

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
              return <EventListItem event={event} />
            })}
          </div>
      </Container>
    </Section>
  );
};

export default Schedule;
