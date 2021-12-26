import { useState } from 'react';

import { errorMessages } from 'common/constants';
import { ErrorNotification as errorNotification } from 'components';
import { useNavigate } from 'react-router';

function useAPICall(toShowErrorNotification: boolean = true) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>();
    const [hasError, setHasError] = useState(false);
    const [executionCount, setExecutionCount] = useState(0);

    async function executeApiCall(apiCall: Function) {
        try {
            setHasError(false);
            setIsLoading(true);
            const { data } = await apiCall();
            setResponse(data);
        } catch (error: any) {
            setHasError(true);
            const errorCode = error?.response?.status;
            if (toShowErrorNotification)
                errorNotification(
                    errorCode
                        ? errorMessages[errorCode as number]
                        : 'Oh no, an unexpected error occurred.'
                );

            if (error?.response?.status === 401) navigate('/login');
        } finally {
            setIsLoading(false);
            setExecutionCount((val) => val + 1);
        }
    }

    return { isLoading, hasError, response, executeApiCall, executionCount };
}

export default useAPICall;
