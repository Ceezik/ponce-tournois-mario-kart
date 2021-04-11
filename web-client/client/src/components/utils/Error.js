import { Container, Row, Col } from 'react-grid-system';

function Error({ message }) {
    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs="content">{message}</Col>
            </Row>
        </Container>
    );
}

export default Error;
