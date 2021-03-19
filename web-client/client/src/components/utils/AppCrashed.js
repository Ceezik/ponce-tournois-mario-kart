import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import Error from '../utils/Error';

const ErrorBody = () => {
    const reloadPage = () => window.location.reload();

    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs={12} md={10} lg={8}>
                    <h1>Oups, une erreur est survenue ...</h1>
                    <p>
                        Vous pouvez essayer de{' '}
                        <strong onClick={reloadPage}>rafraichir la page</strong>
                        , si le problème persiste veuillez me contacter sur{' '}
                        <a
                            className="primaryLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/ceezik"
                        >
                            Twitter
                        </a>{' '}
                        ou Discord (Ceezik#3881)
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

function AppCrashed() {
    return <Error message={<ErrorBody />} />;
}

export default AppCrashed;
