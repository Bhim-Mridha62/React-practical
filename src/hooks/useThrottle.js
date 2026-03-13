import { useState, useEffect, useRef } from 'react';

const useThrottle = (value, delay = 300) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastUpdated = useRef(null);

    useEffect(() => {
        const now = Date.now();
        if (lastUpdated.current === null || now - lastUpdated.current >= delay) {
            setThrottledValue(value);
            lastUpdated.current = now;
        } else {
            const timeout = setTimeout(() => {
                setThrottledValue(value);
                lastUpdated.current = Date.now();
            }, delay - (now - lastUpdated.current));

            return () => clearTimeout(timeout);
        }
    }, [value, delay]);

    return throttledValue;
};

export default useThrottle;
