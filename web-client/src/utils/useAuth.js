import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { signup as _signup, getProfil } from '../services/auth';
import history from '../utils/history';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfil()
            .then((res) => setUser(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

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

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                setUser,
                signup,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
