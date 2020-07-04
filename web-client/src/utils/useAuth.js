import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import socketIo from 'socket.io-client';
import { signup as _signup, getProfil } from '../services/auth';
import history from '../utils/history';
import { useSocket } from './useSocket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setSocket } = useSocket();

    useEffect(() => {
        getProfil()
            .then((res) => setUser(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const url = user
            ? `${process.env.REACT_APP_API_URL}?userId=${user.id}&isAdmin=${user.isAdmin}`
            : process.env.REACT_APP_API_URL;
        setSocket(socketIo(url));
    }, [user, setSocket]);

    const signup = (user, setError, setLoading) => {
        setLoading(true);
        _signup(user)
            .then((res) => {
                setUser(res.data.user);
                Cookies.set('token', res.data.token, { expires: 365 });
                history.push('/');
            })
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            });
    };

    const signout = () => {
        Cookies.remove('token');
        setUser(null);
        history.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                setUser,
                signup,
                signout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
