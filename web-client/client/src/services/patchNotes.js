import request from '../utils/request';

export const getAll = () => {
    return request.get('/patch-notes');
};

export const getLatest = () => {
    return request.get('/patch-notes/latest');
};

export const create = (patchNote) => {
    return request.post('/patch-notes', patchNote);
};

export const getById = (id) => {
    return request.get(`/patch-notes/${id}`);
};

export const updateById = (id, patchNote) => {
    return request.put(`/patch-notes/${id}`, patchNote);
};
