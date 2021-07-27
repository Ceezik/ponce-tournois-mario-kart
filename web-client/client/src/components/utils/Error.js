import { Row, Col } from 'react-grid-system';

function Error({ message }) {
    return (
        <div className="app__container">
            <Row justify="center">
                <Col xs="content">{message}</Col>
            </Row>
        </div>
    );
}

export default Error;
