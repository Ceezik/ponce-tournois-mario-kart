import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddRaceForm from './AddRaceForm';

function AddRaceBtn({ participationId }) {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <Row className="participation__raceWrapper">
            <Col xs={12} onClick={openForm}>
                <div
                    className={`participation__race ${
                        !showForm ? 'participation__addRace' : ''
                    }`}
                >
                    <Row justify="center" align="center">
                        {showForm ? (
                            <AddRaceForm
                                closeForm={closeForm}
                                participationId={participationId}
                            />
                        ) : (
                            <Col xs={12}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="participation__addRaceBtn"
                                />
                                Ajouter une course
                            </Col>
                        )}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default AddRaceBtn;
