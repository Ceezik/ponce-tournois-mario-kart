import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import moment from 'moment';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Header from './components/utils/Header';
import ScrollToTop from './components/utils/ScrollToTop';
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
import {
    fetchLatestPatchNote,
    fetchPatchNotes,
} from './redux/actions/patchNotes';
import LatestPatchNote from './components/patchNotes/LatestPatchNote';
import CGU from './components/utils/CGU';
import { fetchTheme } from './redux/actions/settings';
import { CSSTheme } from './utils/style';
import { fetchPonce } from './redux/actions/ponce';

function App() {
    const [showLatestPatchNote, setShowLatestPatchNote] = useState(false);

    const dispatch = useDispatch();
    const { loading: loadingUser, user } = useSelector((state) => state.auth);
    const { loading: loadingPonce } = useSelector((state) => state.ponce);
    const { theme } = useSelector((state) => state.settings);
    const { socket } = useSelector((state) => state.socket);
    const { latest: latestPatchNote } = useSelector(
        (state) => state.patchNotes
    );

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPonce());
        dispatch(fetchTracks());
        dispatch(fetchLatestPatchNote());
        dispatch(fetchTheme());
    }, []);

    useEffect(() => {
        dispatch(setSocket(user));
        if (user?.isAdmin) dispatch(fetchPatchNotes());
    }, [user]);

    useEffect(() => {
        if (latestPatchNote) {
            const previousPatchNote = localStorage.getItem('latestPatchNote');

            if (
                !previousPatchNote ||
                moment(previousPatchNote).isBefore(latestPatchNote.createdAt)
            )
                setShowLatestPatchNote(true);
        }
    }, [latestPatchNote]);

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

    const closePatchNote = () => {
        setShowLatestPatchNote(false);
        localStorage.setItem('latestPatchNote', latestPatchNote.createdAt);
    };

    const fetchTournaments = () => {
        socket.emit('getTournaments', {}, (err) =>
            dispatch(setTournamentsError(err))
        );
    };

    return loadingUser || loadingPonce ? (
        <></>
    ) : (
        <Router>
            <Helmet
                titleTemplate="%s - Tournoi des fleurs"
                defaultTitle="Tournoi des fleurs"
            />

            <ScrollToTop />

            <div className="container">
                <SkeletonTheme
                    color={CSSTheme[theme].secondaryBackgroundColor}
                    highlightColor={CSSTheme[theme].borderColor}
                >
                    <AnimatePresence>
                        {showLatestPatchNote && (
                            <LatestPatchNote
                                patchNote={latestPatchNote}
                                onClose={closePatchNote}
                            />
                        )}
                    </AnimatePresence>

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

                        <Route
                            path="/users/:username"
                            component={UserWrapper}
                        />

                        <PrivateRoute
                            exact
                            path="/settings"
                            component={Settings}
                        />

                        <AdminRoute path="/admin" component={AdminWrapper} />

                        <Route exact path="/cgu" component={CGU} />
                    </Switch>
                </SkeletonTheme>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
