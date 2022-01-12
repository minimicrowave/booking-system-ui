import React, { ReactElement } from 'react';

import { AxiosResponse } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function createAxiosResponse(data: any) {
    return {
        data,
    } as AxiosResponse;
}

export function wrapper(children: ReactElement) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
