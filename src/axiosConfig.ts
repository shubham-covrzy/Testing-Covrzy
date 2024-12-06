// This page contains axois config with Authorization

import axios from 'axios';
import Cookies from 'js-cookie';
const apiBaseUrl = process.env.REACT_APP_BASE_URL;
const withAuthInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
withAuthInstance.interceptors.request.use(
    (config: any) => {
        const token = Cookies.get('userToken');

        // Get the sessionId from sessionStorage
        const sessionId = sessionStorage.getItem('sessionId');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // localStorage.clear(); // use this if needed. this will remove all items from localstorage
            delete withAuthInstance.defaults.headers.common.Authorization;
        }

        // If sessionId exists, add it to the headers
        if (sessionId) {
            config.headers['X-Session-ID'] = sessionId;
        }

        if (config?.data instanceof FormData) {
            config.headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                'X-Session-ID': sessionId,
                // ...config?.headers
            };
        }
        return config;
    },
    (error) => console.error(error),
);
withAuthInstance.interceptors.response.use(
    (response) => {
        if (response.status === 401 || response.status === 403) {
            localStorage.clear();
            Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
            localStorage.setItem('showOtp', 'true');
        }
        // Any status code from range of 2xx
        // Do something with response data
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
            console.log(error);

            localStorage.clear();
            Cookies.remove('userToken', { path: '', domain: '.covrzy.com' })
            localStorage.removeItem('persist:root');
            localStorage.setItem('showOtp', 'true');

            window.location.href = '/';
        }
        return Promise.reject(error);
    },
);

export default withAuthInstance;
