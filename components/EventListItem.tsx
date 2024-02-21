import Col from './Col';
import Paragraph from './Paragraph';
import Row from './Row';
import { getFormattedTime, getRoomBySlug } from '../lib/api';

interface Event {
    title: string;
    time: {
      start: string;
      end: string;
    };
    location: string;
    slug: string;
  }

const EventListItem: React.FC<{ event: Event }> = ({ event }) => {
    const { title, time, location, slug } = event;
    const formattedTime = getFormattedTime(time.start, time.end);
    const formattedLocation = getRoomBySlug(location);

    return <Row paddingTop={2} paddingBottom={2} borderBottom={1}>
        <Col xs={12} sm={3}>
            <Paragraph>{formattedTime}</Paragraph>
        </Col>
        <Col xs={12} sm={5}>
            <Paragraph strong>{title}</Paragraph>
        </Col>
        <Col xs={12} sm={4}>
            <Paragraph>{formattedLocation.name}<br />
            {formattedLocation.room ? formattedLocation.room : ''} {formattedLocation.building}
            </Paragraph>
        </Col>
      </Row>
    }
export default EventListItem;