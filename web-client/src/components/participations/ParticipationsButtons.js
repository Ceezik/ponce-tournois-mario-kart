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

    useEffect(() => {
        if (index === undefined) setIndex(0);
    }, [tournaments]);

    useEffect(() => {
        const tournament = tournaments[index];
        if (tournament) {
            const participation = _.find(participations, {
                TournamentId: tournament.id,
            });
            if (participation) setParticipation(participation);
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
                        value: tournaments[index]?.id,
                        label: tournaments[index]?.name,
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
