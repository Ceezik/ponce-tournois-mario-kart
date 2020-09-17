import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocket } from '../../../utils/useSocket';
import TournamentsListItem from './TournamentsListItem';
import TournamentsSkeleton, {
    TournamentsListSkeleton,
} from './TournamentsSkeleton';

const PAGE_SIZE = 20;

function TournamentsWrapper() {
    const { socket } = useSocket();
    const [tournaments, setTournaments] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('getTournaments').on('getTournaments', (newTournaments) => {
        if (newTournaments.length < PAGE_SIZE) {
            setHasMore(false);
        }
        setTournaments([...tournaments, ...newTournaments]);
        setLoading(false);
    });

    socket.off('refreshTournaments').on('refreshTournaments', () => {
        const pageSize = tournaments.length;
        setTournaments([]);
        fetchTournaments(0, pageSize);
    });

    useEffect(() => {
        fetchTournaments(tournaments.length / PAGE_SIZE, PAGE_SIZE);

        return () => {
            socket.off('getTournaments');
            socket.off('refreshTournaments');
        };
    }, []);

    const loadMoreTournaments = () => {
        fetchTournaments(tournaments.length / PAGE_SIZE, PAGE_SIZE);
    };

    const fetchTournaments = (page, pageSize) => {
        socket.emit('getTournaments', { page, pageSize }, (err) =>
            setError(err)
        );
    };

    return (
        <Container className="app__container">
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

                    <InfiniteScroll
                        style={{ overflow: 'initial' }}
                        dataLength={tournaments.length}
                        next={loadMoreTournaments}
                        hasMore={hasMore}
                        loader={<TournamentsListSkeleton />}
                    >
                        <Row>
                            {tournaments.map((tournament) => (
                                <TournamentsListItem
                                    key={tournament.id}
                                    tournament={tournament}
                                />
                            ))}
                        </Row>
                    </InfiniteScroll>
                </>
            )}
        </Container>
    );
}

export default TournamentsWrapper;
