import { useEffect, useState } from 'react'
import { messaging, } from 'src/services/firebase-messaging'

interface Notifcation {
    title: string;
    description: string
}

const useMessaging = () => {

    const [notifications, setnNotifications] = useState<Notifcation[]>([])

    // console.log(messaging);
    useEffect(() => {

        // const unsubscribe = await messaging?.onMessage((payload): any => {
        //     console.log("Foreground Message:", payload);
        // })
        // console.log(unsubscribe)
        // const sssss = messaging();

        // messaging.onMessage((payload) => {
        //     console.log('Message received:', payload);
        //     // You can display the notification using a UI component
        //     // For example, show the notification using a toast library like react-toastify
        // });
    }, []);

    return {
        notifications
    }
}

export default useMessaging