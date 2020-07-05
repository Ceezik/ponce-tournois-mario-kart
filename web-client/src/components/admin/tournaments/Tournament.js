import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Tournament({ tournament }) {
    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY à HH:mm');
    };

    return (
        <Row justify="center">
            <Col xs={12} lg={6}>
                <Row justify="end">
                    <Col xs="content">
                        <Link
                            to={`/admin/tournaments/${tournament.id}/edit`}
                            className="btnPrimary"
                        >
                            Modifier
                        </Link>
                    </Col>
                </Row>

                <h1 className="tournament__title">{tournament.name}</h1>

                <div className="tournament__infos">
                    <p>
                        <strong>Date :</strong> Du{' '}
                        {formatDate(tournament.startDate)} au{' '}
                        {formatDate(tournament.endDate)}
                    </p>
                    <p>
                        <strong>Nombre de fleurs :</strong>{' '}
                        {tournament.nbParticipants || 'N/A'}
                    </p>
                </div>
            </Col>
        </Row>
    );
}

export default Tournament;
