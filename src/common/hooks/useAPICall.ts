import React, { useState } from 'react';
import errorNotifcation from 'components/ErrorNotification';
import errorMessages from 'common/constants/errorMessages';

function useAPICall(toShowErrorNotification: boolean = true) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>();
    const [hasError, setHasError] = useState(false);

    async function executeApiCall(apiCall: Function) {
        try {
            setHasError(false);
            setIsLoading(true);
            const { data } = await apiCall();
            setResponse(data);
        } catch (error: any) {
            console.log('erri', error.response.status);
            setHasError(true);
            if (toShowErrorNotification)
                errorNotifcation(
                    errorMessages[error.response.status as number]
                );
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, hasError, response, executeApiCall };
}

export default useAPICall;
