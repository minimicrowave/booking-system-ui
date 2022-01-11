import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

instance.interceptors.response.use((res: AxiosResponse) => {
    return res.data;
});

export default instance;
