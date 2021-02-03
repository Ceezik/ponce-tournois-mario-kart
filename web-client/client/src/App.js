import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import history from './utils/history';
import Header from './components/utils/Header';
import AdminWrapper from './components/admin/AdminWrapper';
import AdminRoute from './components/auth/AdminRoute';
import PonceParticipations from './components/participations/PonceParticipations';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './components/utils/Home';
import PonceRaces from './components/races/PonceRaces';
import Settings from './components/user/Settings';
import PonceStatistics from './components/statistics/PonceStatistics';
import Footer from './components/utils/Footer';
import Analytics from './components/utils/Analytics';
import { fetchTracks } from './redux/actions/tracks';
import { fetchUser } from './redux/actions/auth';
import { setSocket } from './redux/actions/socket';
import {
    editTournament,
    addTournament,
    setTournaments,
    setTournamentsError,
} from './redux/actions/tournaments';
import UserWrapper from './components/user/UserWrapper';

function App() {
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);
    const { socket } = useSelector((state) => state.socket);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchTracks());
    }, []);

    useEffect(() => {
        dispatch(setSocket(user));
    }, [user]);

    useEffect(() => {
        if (socket) {
            socket.on('getTournaments', (tournaments) =>
                dispatch(setTournaments(tournaments))
            );
            socket.on('createTournament', (tournament) => {
                dispatch(addTournament(tournament));
            });
            socket.on('updateTournament', (tournament) =>
                dispatch(editTournament(tournament))
            );

            fetchTournaments();
        }

        return () => {
            if (socket) {
                socket.off('getTournaments');
                socket.off('createTournament');
                socket.off('updateTournament');
            }
        };
    }, [socket]);

    const fetchTournaments = () => {
        socket.emit('getTournaments', {}, (err) =>
            dispatch(setTournamentsError(err))
        );
    };

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
                    <Route exact path="/signin" component={Signin} />

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

                    <Route path="/users/:username" component={UserWrapper} />

                    <PrivateRoute exact path="/settings" component={Settings} />

                    <AdminRoute path="/admin" component={AdminWrapper} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
