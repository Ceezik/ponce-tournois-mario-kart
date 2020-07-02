import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import history from './utils/history';
import { AuthProvider } from './utils/useAuth';
import Header from './components/utils/Header';
import AdminWrapper from './components/admin/AdminWrapper';
import AdminRoute from './components/auth/AdminRoute';

function App() {
    return (
        <Router history={history}>
            <AuthProvider>
                <Header />
                <Switch>
                    <Route exact path="/signup" component={Signup} />

                    <AdminRoute path="/admin" component={AdminWrapper} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
