import request from '../utils/request';

export const getByCup = (cupId) => {
    return request.get(`/cups/${cupId}/tracks`);
};

export const create = (track, cupId) => {
    return request.post(`/cups/${cupId}/tracks`, track);
};
