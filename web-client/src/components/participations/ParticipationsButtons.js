import React from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';

function ParticipationsButtons({
    participations,
    participation,
    setParticipation,
}) {
    const index = _.findIndex(participations, { id: participation.id });

    return (
        <Row justify="between">
            {index > 0 ? (
                <Col xs="content">
                    <button
                        className="btnPrimary"
                        onClick={() =>
                            setParticipation(participations[index - 1])
                        }
                    >
                        Précédent
                    </button>
                </Col>
            ) : (
                <Col />
            )}

            {index < participations.length - 1 ? (
                <Col xs="content">
                    <button
                        className="btnPrimary"
                        onClick={() =>
                            setParticipation(participations[index + 1])
                        }
                    >
                        Suivant
                    </button>
                </Col>
            ) : (
                <Col />
            )}
        </Row>
    );
}

export default ParticipationsButtons;
