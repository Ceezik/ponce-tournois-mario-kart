import { Col, Row } from 'react-grid-system';

function RacesListItem({ cup }) {
    return (
        <>
            <h1 className="races__cup">Coupe {cup.name}</h1>

            <Row>
                <Col xs={12}>
                    <div className="races__titleWrapper">
                        <Row align="center" className="races__title">
                            <Col xs={3} lg={4}>
                                Circuit
                            </Col>
                            <Col xs={3}>Nombre de fois joué</Col>
                            <Col xs={3}>Moyenne de points</Col>
                            <Col xs={3} lg={2}>
                                Position moyenne
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            {cup.Tracks.map((track) => (
                <TracksListItem key={track.id} track={track} />
            ))}
        </>
    );
}

function TracksListItem({ track }) {
    const { nbPoints, nbPlayed, position } = track.statistics;
    const averagePoints = nbPlayed ? (nbPoints / nbPlayed).toFixed(1) : 0;
    const averagePosition = nbPlayed ? (position / nbPlayed).toFixed(1) : 0;

    return (
        <Row>
            <Col xs={12}>
                <div className="races__trackWrapper">
                    <Row className="races__track" align="center">
                        <Col xs={3} lg={4}>
                            {track.name}
                        </Col>
                        <Col xs={3}>{nbPlayed}</Col>
                        <Col xs={3}>{averagePoints}</Col>
                        <Col xs={3} lg={2}>
                            {averagePosition}
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default RacesListItem;
