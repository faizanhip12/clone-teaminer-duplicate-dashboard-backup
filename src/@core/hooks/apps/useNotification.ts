import { useEffect, useState } from "react"
import { notificationService } from "src/services"

export const useNotification = () => {

    const [notification, setNotification] = useState([])

    const [isOpen, setIsOpen] = useState(false)

    const [notificationStatus, setNotificationStatus] = useState<'pending' | 'success' | 'error' | 'idle'>('idle')

    async function getNotifications() {
        setNotificationStatus('pending')
        const { data } = await notificationService.getAll()
        if (data.statusCode === '10000') {
            setNotificationStatus('success')
            setNotification(data?.data?.entities)
        } else {
            setNotificationStatus('error')
        }
    }

    useEffect(() => {
        if (isOpen) {
            getNotifications()
        }
    }, [isOpen])

    return {
        notification,
        setNotification,
        notificationStatus,
        setIsOpen,
    }
}