import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-grid-system';
import LastParticipation from '../participations/LastParticipation';

function Home() {
    const { user } = useSelector((state) => state.auth);
    const [showPonce, setShowPonce] = useState(true);

    useEffect(() => {
        if (!user && !showPonce) setShowPonce(true);
    }, [user]);

    return (
        <Container className="app__container">
            <Helmet>
                <title>Dernier tournoi</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} lg={8}>
                    <div className="formMessage formMessage--center formMessage__info">
                        Rejoignez le tournoi avec le code{' '}
                        {process.env.REACT_APP_TOURNAMENT_CODE} !
                    </div>

                    {user && (
                        <HomeButtons
                            showPonce={showPonce}
                            setShowPonce={setShowPonce}
                        />
                    )}
                </Col>
            </Row>

            <LastParticipation
                route={
                    !showPonce && user
                        ? 'getLastUserParticipation'
                        : 'getLastPonceParticipation'
                }
                userId={showPonce ? undefined : user?.id}
            />
        </Container>
    );
}

function HomeButtons({ showPonce, setShowPonce }) {
    return (
        <Row justify="end" className="home__buttons">
            <Col xs="content">
                <button
                    className={!showPonce ? 'btnPrimary' : 'btnSecondary'}
                    onClick={() => setShowPonce(false)}
                >
                    Moi
                </button>
            </Col>

            <Col xs="content">
                <button
                    className={showPonce ? 'btnPrimary' : 'btnSecondary'}
                    onClick={() => setShowPonce(true)}
                >
                    Ponce
                </button>
            </Col>
        </Row>
    );
}

export default Home;
