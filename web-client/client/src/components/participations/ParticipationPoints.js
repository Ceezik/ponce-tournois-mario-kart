import { useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { getParticipationNbPoints } from '../../utils/utils';
import ParticipationPointsForm from './ParticipationPointsForm';

function ParticipationPoints({ participation, canManage, nbMaxRaces }) {
    const [showForm, setShowForm] = useState(false);
    const nbPoints = getParticipationNbPoints(participation);
    const nbRaces = participation.Races.length;
    const averagePoints = nbRaces ? (nbPoints / nbRaces).toFixed(1) : 0;
    const isManual = !!participation.nbPoints;

    const openForm = () => {
        if (!showForm && canManage) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    useEffect(() => {
        if (showForm) closeForm();
    }, [participation.id]);

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
                                <div
                                    className={`tournament__setNbPoints ${
                                        canManage
                                            ? 'tournament__setNbPoints--canAdd'
                                            : ''
                                    }`}
                                    onClick={openForm}
                                >
                                    {canManage && (
                                        <FontAwesomeIcon
                                            className="tournament__setNbPointsIcon"
                                            icon={faPencilAlt}
                                        />
                                    )}
                                    <h4 className="tournament__nbPoints">
                                        {nbPoints}
                                    </h4>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Nombre de courses</label>
                                <h4>{isManual ? '-' : nbRaces}</h4>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Moyenne de points</label>
                                <h4>{isManual ? '-' : averagePoints}</h4>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </Col>
    );
}

export default ParticipationPoints;
