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
    <div className="flex items-center gap-4 py-4 px-5 bg-slate-800 border border-slate-700 rounded-xl animate-pulse">
        <div className="w-12 h-12 rounded-full flex-shrink-0 bg-slate-700" />
        <div className="flex-1 flex flex-col gap-2.5">
            <div className="h-3 rounded flex-shrink-0 bg-slate-700 w-2/5" />
            <div className="h-3 rounded flex-shrink-0 bg-slate-700 w-1/4" />
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
                <p className="text-red-400 text-center max-w-[300px]">{error}</p>
                <button className="py-2 px-4 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors" onClick={() => dispatch(fetchUsers())}>
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
