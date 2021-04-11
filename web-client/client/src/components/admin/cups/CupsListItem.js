import { Col } from 'react-grid-system';

function CupsListItem({ cup, setSelectedCup, isSelected }) {
    return (
        <Col xs={6} md={4} lg={2}>
            <div
                className={`cupsList__cup ${
                    isSelected ? 'cupsList__cup--selected' : ''
                }`}
                onClick={() => setSelectedCup(cup)}
            >
                {cup.name}
            </div>
        </Col>
    );
}

export default CupsListItem;
