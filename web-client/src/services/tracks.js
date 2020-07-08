import request from '../utils/request';

export const getAll = () => {
    return request.get('/tracks');
};

export const create = (track, cupId) => {
    return request.post(`/cups/${cupId}/tracks`, track);
};
