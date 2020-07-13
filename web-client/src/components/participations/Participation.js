import React from 'react';
import { Row, Col, Hidden } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import AddRaceBtn from '../admin/participations/AddRaceBtn';
import ParticipationChart from './ParticipationChart';
import { getPositionColor } from '../../utils/utils';

function Participation({
    participation,
    record = null,
    tournamentName,
    nbMaxRaces,
    canAdd = true,
}) {
    const nbRaces = participation.Races.length;
    const nbPoints = _.sumBy(participation.Races, 'nbPoints');
    const averagePoints = nbRaces ? (nbPoints / nbRaces).toFixed(1) : 0;

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="tournament__infos">
                        <Row justify="between">
                            <Col xs="content">
                                <div className="tournament__info">
                                    <label>Nombre de points</label>
                                    <h4>{nbPoints}</h4>
                                </div>
                            </Col>

                            <Col xs="content">
                                <div className="tournament__info">
                                    <label>Nombre de courses</label>
                                    <h4>{nbRaces}</h4>
                                </div>
                            </Col>

                            <Col xs="content">
                                <div className="tournament__info">
                                    <label>Moyenne de points</label>
                                    <h4>{averagePoints}</h4>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <div className="participation">
                {(participation.Races.length > 0 || record) && (
                    <Hidden xs sm>
                        <ParticipationChart
                            record={record}
                            races={participation.Races}
                            tournamentName={tournamentName}
                            nbMaxRaces={nbMaxRaces}
                        />
                    </Hidden>
                )}

                {participation.Races.length > 0 && (
                    <>
                        <Row className="participation__title">
                            <Col xs={3}>Position</Col>
                            <Col xs={3}>Points</Col>
                            <Col xs={6}>Circuit</Col>
                        </Row>
                    </>
                )}

                {participation.Races.map((race) => (
                    <Row key={race.id}>
                        <Col xs={12}>
                            <div className="participation__race">
                                <Row align="center">
                                    <Col xs={3}>
                                        {race.position <= 3 ? (
                                            <FontAwesomeIcon
                                                icon={faMedal}
                                                color={getPositionColor(
                                                    race.position
                                                )}
                                            />
                                        ) : (
                                            race.position
                                        )}
                                    </Col>
                                    <Col xs={3}>{race.nbPoints}</Col>
                                    <Col xs={6}>{race.Track.name}</Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                ))}

                {canAdd &&
                    [...Array(nbMaxRaces - nbRaces)].map((i, index) => (
                        <AddRaceBtn
                            key={index}
                            participationId={participation.id}
                        />
                    ))}
            </div>
        </>
    );
}

export default Participation;
