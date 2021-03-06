import { useEffect, useState } from 'react';
import { Row, Col, Hidden, useScreenClass } from 'react-grid-system';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import Select from '../form/Select';

function ParticipationsButtons({ participations, setParticipation }) {
    const screenClass = useScreenClass();
    const { tournaments } = useSelector((state) => state.tournaments);
    const [index, setIndex] = useState(undefined);
    const [tournament, setTournament] = useState(undefined);
    const { search } = useLocation();

    useEffect(() => {
        if (index === undefined && tournaments.length) {
            const { participationId } = queryString.parse(search);
            if (!participationId) setIndex(0);
            else {
                const participation = participations.find(
                    (p) => p.id === +participationId
                );
                const newIndex = _.findIndex(
                    tournaments,
                    (t) => t.id === participation?.TournamentId
                );
                if (newIndex !== -1) {
                    setIndex(newIndex);
                    if (newIndex === index)
                        setTournament(tournaments[newIndex]);
                }
            }
        } else {
            const newIndex = _.findIndex(
                tournaments,
                (t) => t.id === tournament?.id
            );
            if (newIndex !== -1) {
                setIndex(newIndex);
                if (newIndex === index) setTournament(tournaments[newIndex]);
            }
        }
    }, [tournaments]);

    useEffect(() => {
        const newTournament = tournaments[index];
        if (newTournament) {
            const participation = _.find(participations, {
                TournamentId: newTournament.id,
            });
            if (participation) setParticipation(participation);
            setTournament(newTournament);
        }
    }, [index]);

    useEffect(() => {
        const { participationId } = queryString.parse(search);
        if (!participationId) setIndex(0);
    }, [search]);

    const onTournamentChange = ({ value }) => {
        setIndex(_.findIndex(tournaments, { id: value }));
    };

    return (
        <Row
            justify={screenClass === 'xs' ? 'center' : 'between'}
            align="center"
        >
            <Hidden xs>
                <Col xs="content">
                    <button
                        className="btnPrimary"
                        onClick={() => setIndex(index - 1)}
                        disabled={index <= 0}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </Col>
            </Hidden>

            <Col>
                <Select
                    value={{
                        value: tournament?.id,
                        label: tournament?.name,
                    }}
                    onChange={onTournamentChange}
                    options={tournaments.map((tournament) => ({
                        value: tournament.id,
                        label: tournament.name,
                    }))}
                    isSearchable={false}
                />
            </Col>

            <Hidden xs>
                <Col xs="content">
                    <button
                        className="btnPrimary"
                        onClick={() => setIndex(index + 1)}
                        disabled={index >= tournaments.length - 1}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </Col>
            </Hidden>
        </Row>
    );
}

export default ParticipationsButtons;
