import React, { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { getParticipationNbPoints } from '../../utils/utils';
import ParticipationPointsForm from './ParticipationPointsForm';

function ParticipationPoints({ participation, canAdd, nbMaxRaces }) {
    const [showForm, setShowForm] = useState(false);
    const nbPoints = getParticipationNbPoints(participation);
    const nbRaces = participation.Races.length;
    const averagePoints = nbRaces ? (nbPoints / nbRaces).toFixed(1) : 0;

    const openForm = () => {
        if (!showForm && canAdd) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <Col xs={12}>
            <div className="tournament__infos">
                {showForm ? (
                    <ParticipationPointsForm
                        closeForm={closeForm}
                        participation={participation}
                        nbMaxRaces={nbMaxRaces}
                    />
                ) : (
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Nombre de points</label>

                                {participation.Races.length ? (
                                    <h4>{nbPoints}</h4>
                                ) : (
                                    <div
                                        className="tournament__setNbPoints"
                                        onClick={openForm}
                                    >
                                        <FontAwesomeIcon
                                            className="tournament__setNbPointsIcon"
                                            icon={
                                                participation.nbPoints
                                                    ? faPencilAlt
                                                    : faPlus
                                            }
                                        />
                                        <span>
                                            {participation.nbPoints || 'Saisir'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Nombre de courses</label>
                                <h4>{nbRaces}</h4>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Moyenne de points</label>
                                <h4>{averagePoints}</h4>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </Col>
    );
}

export default ParticipationPoints;
