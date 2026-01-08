import Col from './Col';
import Paragraph from './Paragraph';
import Row from './Row';
import { formatTimeRange, getRoomBySlug } from '../lib/schedule';

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

const EventListItem: React.FC<{ event: Event }> = ({ event }) => {
    const { title, time, location } = event;
  const formattedTime = formatTimeRange(time.start, time.end);
    const formattedLocation =
      typeof location === "string"
        ? getRoomBySlug(location)
        : location?.slug
          ? getRoomBySlug(location.slug)
          : undefined;

    const displayLocation =
      typeof location === "string" ? formattedLocation : (location ?? formattedLocation);

    return <Row paddingTop={2} paddingBottom={2} borderBottom={1}>
        <Col xs={12} sm={3}>
            <Paragraph>{formattedTime}</Paragraph>
        </Col>
        <Col xs={12} sm={5}>
            <Paragraph strong>{title}</Paragraph>
        </Col>
        
            {displayLocation && <Col xs={12} sm={4}><Paragraph>{displayLocation.name}<br />
            {displayLocation.room ? displayLocation.room : ''} {displayLocation.building}
            </Paragraph>
            
        </Col>}
      </Row>
    }
export default EventListItem;