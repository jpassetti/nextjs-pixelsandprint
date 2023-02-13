import { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import Col from './Col';
import Label from './Label';
import Paragraph from './Paragraph';
import Section from './Section';
import {getDays, getEvents, getRoomBySlug, getFormattedTime} from '../lib/api';
import Filters from './Filters';
import Row from './Row';

const Schedule = () => {
    const days = getDays();
    const events = getEvents();
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(() => {
        const filteredEvents = events.filter((event) => {
            return event.time.start > days[selectedDayIndex].time.start && event.time.end < days[selectedDayIndex].time.end;
        });
        setFilteredEvents(filteredEvents);
    }, [selectedDayIndex]);

    const parentVariants = {
        open: {
          transition: { staggerChildren: 0.05, delayChildren: 0.6 }
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
      };

    let variants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
              y: { stiffness: 1000, velocity: -100 }
            }
          },
          closed: {
            x: 35,
            opacity: 0,
            transition: {
              y: { stiffness: 1000 }
            }
          }
    }

    return <Section>
        <Filters 
            items={days} 
            format="tabs" 
            activeCategory={selectedDayIndex}
            setActiveCategory={setSelectedDayIndex} 
            filterBy="day"
        />
        <Row hideOnMobile>
        <Col xs={4} sm={3}>
        <Label caps fontColor="orange">Time</Label>
                </Col>
                <Col xs={8} sm={9}>
                    <Row>
                        <Col xs={12} sm={6}>
                        <Label caps fontColor="orange">Event title</Label>
                        </Col>
                        <Col xs={12} sm={6}>
                        <Label caps fontColor="orange">Location</Label>
                        </Col>
                    </Row>
                </Col>
        </Row>
        <motion.div variants={parentVariants}>
        {filteredEvents?.map((event, index) => {
            const {title, time, location, slug} = event;
            const formattedTime = getFormattedTime(time.start, time.end);
            const hours = moment(time.start).format("h");
            const room = getRoomBySlug(location);
            const { name, building, room: roomNumber } = room;
            return <motion.div variants={variants} key={`${slug}_${index}_${hours}`}>
                    <Row borderBottom={1} borderBottomColor="lightblue" paddingTop={2} paddingBottom={2}>
                <Col xs={4} sm={3}>
                    <Paragraph>{formattedTime}</Paragraph>
                </Col>
                <Col xs={8} sm={9}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Paragraph strong marginBottom={1}>{title}</Paragraph>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Paragraph condensed caps>{name}<br />
                                {roomNumber} {building}
                         </Paragraph>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </motion.div>
        })}
        </motion.div>
    </Section>
}
export default Schedule;