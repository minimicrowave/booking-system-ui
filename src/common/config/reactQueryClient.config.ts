import { errorMessages } from 'common/constants';
import { ErrorNotification as errorNotification } from 'components';
import { QueryCache, QueryClient } from 'react-query';
import { NavigateFunction } from 'react-router';

function getQueryClient(navigate: NavigateFunction) {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
        queryCache: new QueryCache({
            onError: (error: any) => {
                const errorCode = error?.response?.status;
                errorNotification(
                    errorCode
                        ? errorMessages[errorCode as number]
                        : 'Oh no, an unexpected error occurred.'
                );
                if (errorCode === 401) navigate('/login');
            },
        }),
    });
}

export default getQueryClient;
