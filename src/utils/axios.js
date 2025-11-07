import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

