import { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { getPositionColor } from '../../utils/utils';
import EditRaceForm from '../admin/participations/EditRaceForm';
import { ReactComponent as NoWifiIcon } from '../../assets/icons/wifiSlash.svg';

function ParticipationRace({ race, canAdd }) {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm && canAdd) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <Row key={race.id}>
            <Col xs={12} onClick={openForm}>
                <div
                    className={`participation__race ${
                        !showForm && canAdd ? 'participation__addRace' : ''
                    }`}
                >
                    <Row align="center">
                        {showForm ? (
                            <EditRaceForm closeForm={closeForm} race={race} />
                        ) : (
                            <>
                                {race.disconnected && (
                                    <div className="participation__disconnectedRace">
                                        <NoWifiIcon />
                                    </div>
                                )}
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
                            </>
                        )}
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default ParticipationRace;
