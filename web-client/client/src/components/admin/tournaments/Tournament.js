import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import PonceParticipation from '../participations/PonceParticipation';
import TournamentInfos from '../../tournaments/TournamentInfos';
import Podium from '../../podiums/Podium';

function Tournament({ tournament }) {
    return (
        <Row justify="center">
            <Helmet>
                <title>{tournament.name}</title>
            </Helmet>

            <Col xs={12} lg={10} xxl={8}>
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

                <TournamentInfos defaultTournament={tournament} />
                <Podium tournamentId={tournament.id} canManage={true} />
                <PonceParticipation tournament={tournament} />
            </Col>
        </Row>
    );
}

export default Tournament;
