import React, { useState } from 'react';
import UserCard from 'components/UserCard/UserCard';
import SearchBar from 'components/SearchBar/SearchBar';
import EmptyState from 'components/EmptyState/EmptyState';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import useThrottle from 'hooks/useThrottle';
const UserList = ({
    users,
    showLoadMore,
    hasMore,
    loadingMore,
    onLoadMore,
    searchPlaceholder,
}) => {
    const [searchInput, setSearchInput] = useState('');

    // Throttle the search value so filtering runs at most once per 300ms
    const throttledSearch = useThrottle(searchInput, 300);

    const filteredUsers =
        throttledSearch.trim() === ''
            ? users
            : users.filter((user) =>
                user.login.toLowerCase().includes(throttledSearch.toLowerCase()),
            );

    return (
        <div className="flex flex-col h-full gap-0">
            <div className="pt-4 pb-3 flex flex-col gap-2 sticky top-0 z-10 bg-slate-900">
                <SearchBar
                    value={searchInput}
                    onChange={setSearchInput}
                    placeholder={searchPlaceholder || 'Search by username...'}
                />
                {throttledSearch && (
                    <span className="text-[0.78rem] text-indigo-500 pl-1 font-medium">
                        {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {filteredUsers.length === 0 ? (
                <EmptyState
                    message={
                        throttledSearch
                            ? `No users matching "${throttledSearch}"`
                            : 'No users to display.'
                    }
                    icon={throttledSearch ? '🔍' : '👥'}
                />
            ) : (
                <div className="flex flex-col gap-2.5 pb-6">
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}

            {showLoadMore && !throttledSearch && (
                <LoadMoreButton
                    onLoadMore={onLoadMore}
                    loadingMore={loadingMore}
                    hasMore={hasMore}
                />
            )}
        </div>
    );
}

export default UserList;
