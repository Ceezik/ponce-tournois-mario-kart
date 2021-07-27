import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TournamentsListItem from './TournamentsListItem';
import TournamentsSkeleton from './TournamentsSkeleton';

function TournamentsWrapper() {
    const { tournaments, loading, error } = useSelector(
        (state) => state.tournaments
    );

    return (
        <div className="app__container">
            <Helmet>
                <title>Tournois</title>
            </Helmet>

            {loading ? (
                <TournamentsSkeleton />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row justify="end">
                        <Col xs="content">
                            <Link
                                to="/admin/tournaments/create"
                                className="btnPrimary"
                            >
                                Créer un tournoi
                            </Link>
                        </Col>
                    </Row>

                    <h1 className="tournamentsList__title">Tournois</h1>

                    <Row>
                        {tournaments.map((tournament) => (
                            <TournamentsListItem
                                key={tournament.id}
                                tournament={tournament}
                            />
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
}

export default TournamentsWrapper;
