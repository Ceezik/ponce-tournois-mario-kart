import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { signin } from '../../redux/actions/auth';

function Signin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();

    const onSignin = () => history.push('/');

    useEffect(() => {
        const { token } = queryString.parse(search);
        dispatch(signin(token, onSignin));
    }, []);

    return <></>;
}

export default Signin;
