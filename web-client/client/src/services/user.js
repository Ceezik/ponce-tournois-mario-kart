import request from '../utils/request';

export const update = (username) => {
    return request.put('/user', username);
};

export const addEditor = (username) => {
    return request.post('/user/editors', username);
};

export const removeEditor = (editor) => {
    return request.delete(`/user/editors/${editor}`);
};
