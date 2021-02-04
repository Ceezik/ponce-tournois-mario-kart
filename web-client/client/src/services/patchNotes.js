import request from '../utils/request';

export const getAll = () => {
    return request.get('/patch-notes');
};

export const create = (patchNote) => {
    return request.post('/patch-notes', patchNote);
};
