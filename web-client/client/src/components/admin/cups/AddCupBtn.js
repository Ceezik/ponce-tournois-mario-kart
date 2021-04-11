import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-grid-system';

function AddCupBtn({ setCreating }) {
    return (
        <Col xs={6} md={4} lg={2} onClick={() => setCreating(true)}>
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

export default AddCupBtn;
