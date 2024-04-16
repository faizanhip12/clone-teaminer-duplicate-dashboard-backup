// import { getMessaging, getToken } from "firebase/messaging";
// import { app } from 'src/services/firebase-app'
// import 'firebase/messaging';

// // Initialize Firebase Cloud Messaging and get a reference to the service
// export const messaging = getMessaging(app);

// export const requestPermission = async () => {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted') {
//         console.log('Notification permission granted.');
//     } else {
//         console.log('Unable to get permission to notify.');
//     }
// };

// export const getTokenSafely = async (vapidKey?: string) => {
//     if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
//         try {
//             const token = await getToken(messaging, { vapidKey });
//             console.log('Device registration token:', token);
//             return token;
//         } catch (error) {
//             console.log('Error retrieving registration token:', error);
//             return null;
//         }
//     } else {
//         console.log('getTokenSafely called outside of a browser environment.');
//         return null;
//     }
// };

import { getMessaging, getToken } from "firebase/messaging";
import { app } from 'src/services/firebase-app'
import 'firebase/messaging';

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

export const requestPermission = async () => {
    if (typeof window !== 'undefined') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Unable to get permission to notify.');
        }
    } else {
        console.log('requestPermission called outside of a browser environment.');
    }
};

export const getTokenSafely = async (vapidKey?: string) => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        try {
            const token = await getToken(messaging as any, { vapidKey });
            console.log('Device registration token:', token);
            return token;
        } catch (error) {
            console.log('Error retrieving registration token:', error);
            return null;
        }
    } else {
        console.log('getTokenSafely called outside of a browser environment.');
        return null;
    }
};
