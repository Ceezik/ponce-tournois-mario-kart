import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import PonceParticipation from '../participations/PonceParticipation';
import TournamentInfos from '../../tournaments/TournamentInfos';

function Tournament({ tournament }) {
    return (
        <Row justify="center">
            <Col xs={12} lg={8}>
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

                <TournamentInfos tournament={tournament} />

                <PonceParticipation tournament={tournament} />
            </Col>
        </Row>
    );
}

export default Tournament;
