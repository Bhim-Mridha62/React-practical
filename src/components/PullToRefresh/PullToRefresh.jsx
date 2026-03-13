import React from 'react';
import usePullToRefresh from 'hooks/usePullToRefresh';

const PullToRefresh = ({ onRefresh, children }) => {
    const { containerRef, isPulling, pullDistance, isRefreshing } =
        usePullToRefresh(onRefresh, 80);

    const progress = Math.min(pullDistance / 80, 1);

    return (
        <div ref={containerRef} className="h-full overflow-y-auto relative overscroll-y-contain [-webkit-overflow-scrolling:touch]">
            {(isPulling || isRefreshing) && (
                <div
                    className="flex items-center justify-center gap-2.5 overflow-hidden transition-[height] duration-100 ease-in-out text-indigo-400 text-[0.85rem]"
                    style={{ height: isPulling ? `${pullDistance * 0.5}px` : '48px' }}
                >
                    {isRefreshing ? (
                        <span className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin inline-block shrink-0" />
                    ) : (
                        <span
                            className="text-[1.2rem] transition-transform duration-150 ease-in-out inline-block"
                            style={{ transform: `rotate(${progress * 180}deg)`, opacity: progress }}
                        >
                            ↓
                        </span>
                    )}
                    <span className="text-[0.8rem] text-slate-500">
                        {isRefreshing ? 'Refreshing...' : progress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
                    </span>
                </div>
            )}
            {children}
        </div>
    );
}

export default PullToRefresh;
