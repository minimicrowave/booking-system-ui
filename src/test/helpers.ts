import { AxiosResponse } from 'axios';

export function createAxiosResponse(data: any) {
    return {
        data,
    } as AxiosResponse;
}
