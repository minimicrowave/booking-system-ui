import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken } from 'common/utils';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BOOKING_API_BASEURL,
});

instance.interceptors.request.use((req: AxiosRequestConfig) => {
    req!.headers = {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: 'application/json',
    };

    return req;
});

export default instance;
