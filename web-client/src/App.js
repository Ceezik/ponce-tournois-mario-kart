import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Signup from './components/auth/Signup';
import history from './utils/history';
import Header from './components/utils/Header';
import AdminWrapper from './components/admin/AdminWrapper';
import AdminRoute from './components/auth/AdminRoute';
import PonceParticipations from './components/participations/PonceParticipations';
import UserParticipations from './components/participations/UserParticipations';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './components/utils/Home';
import PonceRaces from './components/races/PonceRaces';
import UserRaces from './components/races/UserRaces';
import Profile from './components/user/Profile';
import UserStatistics from './components/statistics/UserStatistics';
import PonceStatistics from './components/statistics/PonceStatistics';
import Footer from './components/utils/Footer';
import Analytics from './components/utils/Analytics';
import { fetchTracks } from './redux/actions/tracks';
import { fetchUser } from './redux/actions/auth';
import { setSocket } from './redux/actions/socket';

function App() {
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchTracks());
    }, []);

    useEffect(() => {
        dispatch(setSocket(user));
    }, [user]);

    return loading ? (
        <></>
    ) : (
        <Router history={history}>
            <Helmet
                titleTemplate="%s - Tournoi des fleurs"
                defaultTitle="Tournoi des fleurs"
            />

            <div className="container">
                <Header />
                <Analytics />
                <Switch>
                    <Route exact path="/signup" component={Signup} />

                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/history"
                        component={PonceParticipations}
                    />
                    <Route exact path="/races" component={PonceRaces} />
                    <Route
                        exact
                        path="/statistics"
                        component={PonceStatistics}
                    />

                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute
                        exact
                        path="/my-history"
                        component={UserParticipations}
                    />
                    <PrivateRoute
                        exact
                        path="/my-races"
                        component={UserRaces}
                    />
                    <PrivateRoute
                        exact
                        path="/my-statistics"
                        component={UserStatistics}
                    />

                    <AdminRoute path="/admin" component={AdminWrapper} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
