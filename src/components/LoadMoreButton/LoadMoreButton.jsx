import React from 'react';
const LoadMoreButton = ({ onLoadMore, loadingMore, hasMore }) => {
    if (!hasMore) {
        return (
            <div className="flex justify-center p-6 text-slate-600 text-[0.85rem] gap-1.5">
                <span>✓ All users loaded</span>
            </div>
        );
    }

    return (
        <div className="flex justify-center pt-6 pb-2">
            <button
                className="group flex items-center gap-2 py-3 px-8 bg-gradient-to-br from-indigo-500/15 to-violet-500/15 border-[1.5px] border-indigo-500/40 rounded-xl text-indigo-400 text-sm font-semibold disabled:cursor-not-allowed"
                onClick={onLoadMore}
                disabled={loadingMore}
                aria-label="Load more users"
            >
                {loadingMore ? (
                    <>
                        <span className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin inline-block shrink-0" />
                        Loading...
                    </>
                ) : (
                    <>
                        <span className="text-base transition-transform duration-200 group-hover:translate-y-[2px]">↓</span>
                        Load More
                    </>
                )}
            </button>
        </div>
    );
}

export default LoadMoreButton;
