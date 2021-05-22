import request from '../utils/request';

export const getAll = (params) => {
    return request.get(`/users`, { params });
};

export const getByUsername = (username) => {
    return request.get(`/users/${username}`);
};

export const updateById = (user) => {
    return request.put(`/users/${user.id}`, user);
};
