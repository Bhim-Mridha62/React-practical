import { useState, useEffect, useRef } from 'react';
const usePullToRefresh = (onRefresh, threshold = 80) => {
    const [isPulling, setIsPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const startY = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleTouchStart = (e) => {
            if (el.scrollTop === 0) {
                startY.current = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (startY.current === null) return;
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY.current;
            if (diff > 0 && el.scrollTop === 0) {
                setIsPulling(true);
                setPullDistance(Math.min(diff, threshold * 1.5));
                e.preventDefault();
            }
        };

        const handleTouchEnd = async () => {
            if (isPulling && pullDistance >= threshold) {
                setIsRefreshing(true);
                try {
                    await onRefresh();
                } finally {
                    setIsRefreshing(false);
                }
            }
            setIsPulling(false);
            setPullDistance(0);
            startY.current = null;
        };

        el.addEventListener('touchstart', handleTouchStart, { passive: true });
        el.addEventListener('touchmove', handleTouchMove, { passive: false });
        el.addEventListener('touchend', handleTouchEnd);

        return () => {
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchmove', handleTouchMove);
            el.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onRefresh, threshold, isPulling, pullDistance]);

    return { containerRef, isPulling, pullDistance, isRefreshing };
};

export default usePullToRefresh;
