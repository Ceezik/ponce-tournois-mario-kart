import request from '../utils/request';

export const getAll = () => {
    return request.get('/cups');
};

export const create = (cup) => {
    return request.post('/cups', cup);
};
