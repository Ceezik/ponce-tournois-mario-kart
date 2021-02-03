import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { signin } from '../../redux/actions/auth';

function Signin() {
    const dispatch = useDispatch();

    useEffect(() => {
        const { token } = queryString.parse(window.location.search);
        console.log(token);
        dispatch(signin(token));
    }, []);

    return <></>;
}

export default Signin;
