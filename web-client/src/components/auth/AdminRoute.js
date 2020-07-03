import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import Error from '../utils/Error';

const AdminRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                user && user.isAdmin ? (
                    <Component {...props} />
                ) : (
                    <Error message="Vous n'êtes pas une fleur assez haut gradée pour accéder à cette page." />
                )
            }
        />
    );
};

export default AdminRoute;
