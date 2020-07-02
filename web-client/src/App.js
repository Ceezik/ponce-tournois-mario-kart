import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import history from './utils/history';
import { AuthProvider } from './utils/useAuth';
import Header from './components/utils/Header';

function App() {
    return (
        <Router history={history}>
            <AuthProvider>
                <Header />
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
