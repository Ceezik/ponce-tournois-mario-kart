import { useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';

function TournamentInfos({ defaultTournament }) {
    const { socket } = useSelector((state) => state.socket);
    const [tournament, setTournament] = useState(defaultTournament);

    useEffect(() => {
        socket.on('updateTournament', (newTournament) => {
            setTournament((currentTournament) =>
                newTournament.id === currentTournament.id
                    ? newTournament
                    : currentTournament
            );
        });
    }, []);

    useEffect(() => setTournament(defaultTournament), [defaultTournament]);

    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY à HH:mm');
    };

    return (
        <>
            <h1 className="tournament__title">{tournament.name}</h1>

            <Row>
                <Col xs={12}>
                    <div className="tournament__infos">
                        <Row>
                            <Col xs={12} sm={6} md={4}>
                                <div className="tournament__info">
                                    <label>Date de début</label>
                                    <h4>{formatDate(tournament.startDate)}</h4>
                                </div>
                            </Col>

                            <Col xs={12} sm={6} md={4}>
                                <div className="tournament__info">
                                    <label>Date de fin</label>
                                    <h4>{formatDate(tournament.endDate)}</h4>
                                </div>
                            </Col>

                            <Col xs={12} sm={6} md={4}>
                                <div className="tournament__info">
                                    <label>Nombre de fleurs</label>
                                    <h4>{tournament.nbParticipants || '-'}</h4>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default TournamentInfos;
