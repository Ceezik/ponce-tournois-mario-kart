import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import PonceParticipation from '../participations/PonceParticipation';
import TournamentInfos from '../../tournaments/TournamentInfos';
import Podium from '../../podiums/Podium';
import useTitle from '../../../utils/useTitle';

function Tournament({ tournament }) {
    useTitle(tournament.name);

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
                <Podium tournamentId={tournament.id} canAdd={true} />
                <PonceParticipation tournament={tournament} />
            </Col>
        </Row>
    );
}

export default Tournament;
