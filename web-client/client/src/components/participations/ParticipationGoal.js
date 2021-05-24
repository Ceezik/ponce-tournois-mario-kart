import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { getParticipationNbPoints } from '../../utils/utils';
import ParticipationGoalForm from './ParticipationGoalForm';

function ParticipationGoal({ participation, nbMaxRaces, canManage }) {
    const [showForm, setShowForm] = useState(false);
    const { goal } = participation;
    const diff = getParticipationNbPoints(participation) - goal;

    const openForm = () => {
        if (!showForm && canManage) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <Col xs={12} onClick={openForm}>
            <div
                className={`participation__goal ${
                    !showForm && canManage ? 'participation__addGoal' : ''
                }`}
            >
                {showForm ? (
                    <ParticipationGoalForm
                        closeForm={closeForm}
                        nbMaxRaces={nbMaxRaces}
                        participation={participation}
                    />
                ) : (
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Objectif</label>
                                <h4>{goal || '-'}</h4>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <div className="tournament__info">
                                <label>Écart avec l'objectif</label>
                                <h4
                                    className={
                                        goal
                                            ? diff >= 0
                                                ? 'text--success'
                                                : 'text--error'
                                            : ''
                                    }
                                >
                                    {goal
                                        ? `${diff > 0 ? '+' : ''}${diff} point${
                                              diff < -1 || diff > 1 ? 's' : ''
                                          }`
                                        : '-'}
                                </h4>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </Col>
    );
}

export default ParticipationGoal;
