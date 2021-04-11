import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import {
    NavLink,
    Route,
    Switch,
    useParams,
    useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { getByUsername } from '../../services/users';
import Participations from '../participations/Participations';
import Races from '../races/Races';
import UserStatistics from '../statistics/UserStatistics';
import UserLastParticipation from '../participations/UserLastParticipation';
import UserWrapperSkeleton from './UserWrapperSkeleton';

function UserWrapper() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { username } = useParams();
    const { path } = useRouteMatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getUser()
            .then((res) => setUser(res.data))
            .catch((err) => setError(err.response.data))
            .finally(() => setLoading(false));
    }, [username]);

    const getUser = () => {
        if (username === currentUser?.username) {
            return Promise.resolve({ data: currentUser });
        } else {
            return getByUsername(username);
        }
    };

    return (
        <>
            <Container className="app__container">
                {user && (
                    <Helmet>
                        <title>{user.username}</title>
                    </Helmet>
                )}

                {loading ? (
                    <UserWrapperSkeleton />
                ) : error ? (
                    <Row justify="center">
                        <Col xs="content">
                            <div className="formMessage formMessage__error">
                                {error}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row justify="center">
                        <Col xs={12} lg={8}>
                            <h1 className="userTitle">
                                Profil de {user.username}
                            </h1>

                            <Row className="userMenu__wrapper">
                                <Col
                                    xs={6}
                                    sm="content"
                                    className="userMenu__navListItem"
                                >
                                    <NavLink
                                        exact
                                        to={`/users/${user.username}`}
                                        activeClassName="userMenu__navListItem--active"
                                    >
                                        Dernier tournoi
                                    </NavLink>
                                </Col>
                                <Col
                                    xs={6}
                                    sm="content"
                                    className="userMenu__navListItem"
                                >
                                    <NavLink
                                        exact
                                        to={`/users/${user.username}/history`}
                                        activeClassName="userMenu__navListItem--active"
                                    >
                                        Historique
                                    </NavLink>
                                </Col>
                                <Col
                                    xs={6}
                                    sm="content"
                                    className="userMenu__navListItem"
                                >
                                    <NavLink
                                        exact
                                        to={`/users/${user.username}/races`}
                                        activeClassName="userMenu__navListItem--active"
                                    >
                                        Circuits joués
                                    </NavLink>
                                </Col>
                                <Col
                                    xs={6}
                                    sm="content"
                                    className="userMenu__navListItem"
                                >
                                    <NavLink
                                        exact
                                        to={`/users/${user.username}/statistics`}
                                        activeClassName="userMenu__navListItem--active"
                                    >
                                        Statistiques
                                    </NavLink>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Container>

            {!loading && user && (
                <Switch>
                    <Route
                        exact
                        path={path}
                        render={() => (
                            <UserLastParticipation userId={user.id} />
                        )}
                    />
                    <Route
                        exact
                        path={`${path}/history`}
                        render={() => (
                            <Participations
                                route="getUserParticipations"
                                canAdd={
                                    user.id === currentUser?.id ||
                                    currentUser?.isAdmin
                                }
                                userId={user.id}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={`${path}/races`}
                        render={() => (
                            <Races route="getUserRaces" userId={user.id} />
                        )}
                    />
                    <Route
                        exact
                        path={`${path}/statistics`}
                        render={() => <UserStatistics userId={user.id} />}
                    />
                </Switch>
            )}
        </>
    );
}

export default UserWrapper;
