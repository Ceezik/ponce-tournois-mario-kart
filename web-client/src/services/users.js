import request from '../utils/request';

export const getAll = (page, pageSize, usernameFilter) => {
    return request.get(
        `/users?page=${page}&pageSize=${pageSize}&username=${usernameFilter}`
    );
};
