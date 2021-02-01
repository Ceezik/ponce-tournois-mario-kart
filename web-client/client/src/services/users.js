import request from '../utils/request';

export const getAll = (page, pageSize, usernameFilter) => {
    return request.get(
        `/users?page=${page}&pageSize=${pageSize}&username=${usernameFilter}`
    );
};

export const getByUsername = (username) => {
    return request.get(`/users/${username}`);
};

export const updateById = (user) => {
    return request.put(`/users/${user.id}`, user);
};
