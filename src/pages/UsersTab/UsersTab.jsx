import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    loadMoreUsers,
    selectUsers,
    selectUsersLoading,
    selectLoadingMore,
    selectUsersError,
    selectSince,
    selectHasMore,
} from 'reducers/usersReducer';
import UserList from 'components/UserList/UserList';
import PullToRefresh from 'components/PullToRefresh/PullToRefresh';

const SkeletonCard = () => (
    <div className="flex items-center gap-4 py-4 px-5 bg-white/5 border border-white/[0.07] rounded-2xl">
        <div className="w-14 h-14 rounded-full flex-shrink-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]" />
        <div className="flex-1 flex flex-col gap-2">
            <div className="h-3 rounded-[6px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]" style={{ width: '40%' }} />
            <div className="h-3 rounded-[6px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]" style={{ width: '25%' }} />
        </div>
    </div>
);

const UsersTab = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const loading = useSelector(selectUsersLoading);
    const loadingMore = useSelector(selectLoadingMore);
    const error = useSelector(selectUsersError);
    const since = useSelector(selectSince);
    const hasMore = useSelector(selectHasMore);

    // Initial load
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    const handleLoadMore = useCallback(() => {
        dispatch(loadMoreUsers(since));
    }, [dispatch, since]);

    // Pull-to-refresh: re-fetches from beginning
    const handleRefresh = useCallback(async () => {
        await dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col gap-2.5 pt-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-[60px] px-5 gap-4">
                <div className="text-5xl">⚠️</div>
                <p className="text-red-400 text-center text-[0.9rem] m-0 max-w-[300px]">{error}</p>
                <button className="py-2.5 px-6 bg-gradient-to-br from-red-500/15 to-red-600/15 border-[1.5px] border-red-500/40 rounded-[10px] text-red-400 text-[0.9rem] font-semibold cursor-pointer [font-family:inherit] transition-all duration-200 hover:bg-red-500/25 hover:-translate-y-[1px]" onClick={() => dispatch(fetchUsers())}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <div className="px-1">
                <UserList
                    users={users}
                    showLoadMore
                    hasMore={hasMore}
                    loadingMore={loadingMore}
                    onLoadMore={handleLoadMore}
                    searchPlaceholder="Search users..."
                />
            </div>
        </PullToRefresh>
    );
};

export default UsersTab;
