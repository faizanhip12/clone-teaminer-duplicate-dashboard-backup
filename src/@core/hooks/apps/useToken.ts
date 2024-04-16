// import { getToken } from 'firebase/messaging';
// import { useEffect } from 'react';
// import useLoadingValue, { LoadingHook } from 'src/@core/hooks/apps/useLoadingValue';
// import { getTokenSafely, messaging } from 'src/services/firebase-messaging'

// export type TokenHook = LoadingHook<string | null, Error>;

// const useToken = (vapidKey?: string): TokenHook => {
//     const { error, loading, setError, setValue, value } = useLoadingValue<
//         string | null,
//         Error
//     >();

//     // useEffect(() => {
//     //     getToken(messaging, { vapidKey }).then(setValue).catch(setError);
//     // }, [messaging]);

//     useEffect(() => {
//         getTokenSafely(vapidKey).then(setValue).catch(setError);
//     }, [vapidKey]);


//     return [value, loading, error];
// };

// export default useToken


import { useEffect } from 'react';
import useLoadingValue, { LoadingHook } from 'src/@core/hooks/apps/useLoadingValue';
import { messaging } from 'src/services/firebase-messaging';

export type TokenHook = LoadingHook<string | null, Error>;

const useToken = (vapidKey?: string): TokenHook => {
    const { error, loading, setError, setValue, value } = useLoadingValue<string | null, Error>();

    useEffect(() => {
        const fetchToken = async () => {
            if (typeof window !== 'undefined') {
                try {
                    const { getToken } = require('firebase/messaging');
                    const token = await getToken(messaging, { vapidKey });
                    setValue(token);
                } catch (getTokenError: any) {
                    setError(getTokenError);
                    console.log('token error');

                }
            } else {
                // Handle the case when running on the server
                setError(new Error('getToken is not supported on the server side.'));
            }
        };

        fetchToken();
    }, [vapidKey]);

    return [value, loading, error];
};

export default useToken;
