import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-grid-system';

function AddTrackBtn({ setCreating }) {
    return (
        <Col xs={12} md={6} lg={3} onClick={() => setCreating(true)}>
            <div className="cupsList__cup">
                <FontAwesomeIcon
                    icon={faPlus}
                    className="cupsList__addCupIcon"
                />
                Ajouter
            </div>
        </Col>
    );
}

export default AddTrackBtn;
