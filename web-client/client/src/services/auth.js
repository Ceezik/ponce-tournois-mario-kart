import request from '../utils/request';

export const signup = (user) => {
    return request.post('/signup', user);
};

export const getProfil = () => {
    return request.get('/user');
};
