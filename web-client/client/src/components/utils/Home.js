import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-grid-system';
import LastParticipation from '../participations/LastParticipation';
import Tabs from './Tabs';

const { Tab, TabsList } = Tabs;

function Home() {
    const { user } = useSelector((state) => state.auth);
    const { ponce } = useSelector((state) => state.ponce);
    const [showPonce, setShowPonce] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleShowPonceChange = (val) => {
        setLoading(true);
        setShowPonce(val);
    };

    useEffect(() => {
        if (!user && !showPonce) handleShowPonceChange(true);
    }, [user]);

    useEffect(() => {
        setLoading(false);
    }, [showPonce]);

    return (
        <div className="app__container">
            <Helmet>
                <title>Dernier tournoi</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} lg={10} xxl={8}>
                    <div className="formMessage formMessage--center formMessage__info">
                        Rejoignez le tournoi avec le code{' '}
                        {process.env.REACT_APP_TOURNAMENT_CODE} !
                    </div>
                </Col>
            </Row>

            {user ? (
                <Tabs
                    defaultTab="ponce"
                    onTabChange={(tab) => setShowPonce(tab === 'ponce')}
                    align="end"
                >
                    <Row justify="center" className="home__buttons">
                        <Col xs={12} lg={10} xxl={8}>
                            <TabsList
                                tabs={[
                                    { label: 'Moi', value: 'me' },
                                    { label: 'Ponce', value: 'ponce' },
                                ]}
                            />
                        </Col>
                    </Row>

                    <Tab value="me">
                        <LastParticipation
                            route="getLastUserParticipation"
                            user={user}
                            parentLoading={loading}
                        />
                    </Tab>
                    <Tab value="ponce">
                        <LastParticipation
                            route="getLastPonceParticipation"
                            user={ponce}
                            parentLoading={loading}
                        />
                    </Tab>
                </Tabs>
            ) : (
                <LastParticipation
                    route="getLastPonceParticipation"
                    user={ponce}
                    parentLoading={loading}
                />
            )}
        </div>
    );
}

export default Home;
