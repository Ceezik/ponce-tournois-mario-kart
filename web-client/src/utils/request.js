import axios from 'axios';
import Cookies from 'js-cookie';

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

request.defaults.headers.post['Content-Type'] = 'application/json';

request.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default request;
