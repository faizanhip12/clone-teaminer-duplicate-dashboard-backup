import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useAuth } from "src/hooks/useAuth";
import { UserService } from "src/services";

export const useIdleTimerOnApplication = () => {
    // Hooks
    const [state, setState] = useState<'Active' | 'Idle'>('Active');
    const [count, setCount] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const { user } = useAuth()

    // Functions
    const onIdle = () => {
        setState('Idle');
    };

    const onActive = () => {
        setState('Active');
    };

    const onAction = () => {
        setCount(count + 1);
    };

    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 10_000,
        throttle: 500,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            getRemainingTime();
        }, 500);

        const totalActiveSecs = setInterval(() => {
            if (state === "Active") {
                setSeconds(seconds + 1);
            }
        }, 1000);

        if (seconds % 10 === 0 && state === "Active" && user?.role?.code === "TEACHER" && seconds > 0) {
            UserService.activeTimeOfAUser({
                activeTime: 10
            })
        }

        return () => {
            clearInterval(interval);
            clearInterval(totalActiveSecs);
        };
    }, [seconds, state]);

    return {
        state,
        count,
        seconds,
    };
};
