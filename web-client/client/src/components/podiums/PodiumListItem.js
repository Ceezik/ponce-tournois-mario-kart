import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { getPositionColor } from '../../utils/utils';
import { Col } from 'react-grid-system';
import EditPlayerForm from './EditPlayerForm';

function PodiumListItem({ podium, canManage }) {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        if (!showForm && canManage) setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <Col xs={12} lg={showForm ? 12 : 4} onClick={openForm}>
            <div
                className={`podium__player ${
                    !showForm && canManage ? 'podium__addPlayer' : ''
                }`}
            >
                {showForm ? (
                    <EditPlayerForm closeForm={closeForm} podium={podium} />
                ) : (
                    <>
                        <FontAwesomeIcon
                            icon={faTrophy}
                            className="podium__playerTrophy"
                            color={getPositionColor(podium.position)}
                        />
                        {podium.player}
                    </>
                )}
            </div>
        </Col>
    );
}

export default PodiumListItem;
