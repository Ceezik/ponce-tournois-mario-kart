import { Col } from 'react-grid-system';

function TracksListItem({ track }) {
    return (
        <Col xs={12} md={6} lg={3}>
            <div className="cupsList__track"> {track.name}</div>
        </Col>
    );
}

export default TracksListItem;
