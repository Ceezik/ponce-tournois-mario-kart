import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => state.auth);

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
