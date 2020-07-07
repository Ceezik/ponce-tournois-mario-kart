import React from 'react';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddRaceBtn() {
    return (
        <Row className="participation__raceWrapper">
            <Col xs={12}>
                <div className="participation__race">
                    <Row align="center">
                        <Col xs={12}>
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="participation__addRaceBtn"
                            />
                            Ajouter
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default AddRaceBtn;
