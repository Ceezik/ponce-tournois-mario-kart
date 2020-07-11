import request from '../utils/request';

export const update = (username) => {
    return request.put('/user', username);
};
