import request from '../utils/request';

export const getPonce = () => {
    return request.get('/ponce');
};
