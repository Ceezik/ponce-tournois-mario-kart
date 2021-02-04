import request from '../utils/request';

export const getAll = () => {
    return request.get('/patch-notes');
};
