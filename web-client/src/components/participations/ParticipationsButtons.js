import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Row, Col, Hidden, useScreenClass } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

function ParticipationsButtons({ participations, setParticipation }) {
    const screenClass = useScreenClass();
    const { tournaments } = useSelector((state) => state.tournaments);
    const [index, setIndex] = useState(undefined);
    const [tournament, setTournament] = useState(undefined);

    useEffect(() => {
        if (index === undefined && tournaments.length) setIndex(0);
        else {
            const newIndex = _.findIndex(
                tournaments,
                (t) => t.id === tournament.id
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
                        style={{ visibility: index > 0 ? 'visible' : 'hidden' }}
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
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                            ...theme.colors,
                            primary: '#ff56a9',
                            primary25: '#f3f3f4',
                        },
                    })}
                />
            </Col>

            <Hidden xs>
                <Col xs="content">
                    <button
                        className="btnPrimary"
                        onClick={() => setIndex(index + 1)}
                        style={{
                            visibility:
                                index < tournaments.length - 1
                                    ? 'visible'
                                    : 'hidden',
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </Col>
            </Hidden>
        </Row>
    );
}

export default ParticipationsButtons;
