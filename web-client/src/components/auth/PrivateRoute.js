import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Component {...props} /> : <RedirectToSignin />
            }
        />
    );
};

const RedirectToSignin = () => {
    window.location = `${process.env.REACT_APP_API_URL}/auth/twitch`;
    return <></>;
};

export default PrivateRoute;
