import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddPlayerForm from './AddPlayerForm';

function AddPlayerBtn({ tournamentId }) {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <Row>
            <Col xs={12} onClick={openForm}>
                <div
                    className={`podium__player ${
                        !showForm ? 'podium__addPlayer' : ''
                    }`}
                >
                    <Row justify="center" align="center">
                        {showForm ? (
                            <AddPlayerForm
                                closeForm={closeForm}
                                tournamentId={tournamentId}
                            />
                        ) : (
                            <Col xs={12} className="podium__addPlayerWrapper">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="podium__addPlayerBtn"
                                />
                                Ajouter au podium
                            </Col>
                        )}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default AddPlayerBtn;
