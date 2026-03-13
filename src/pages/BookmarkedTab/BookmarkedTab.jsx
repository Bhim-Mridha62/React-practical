import React from 'react';
import { useSelector } from 'react-redux';
import { selectBookmarkedUsers } from 'reducers/usersReducer';
import UserList from 'components/UserList/UserList';
import EmptyState from 'components/EmptyState/EmptyState';
import { BookmarkIcon } from 'assets/icons';

const BookmarkedTab = () => {
    const bookmarkedUsers = useSelector(selectBookmarkedUsers);

    if (bookmarkedUsers.length === 0) {
        return (
            <EmptyState
                icon={<BookmarkIcon />}
                message="No bookmarked users yet. Bookmark users from the Users tab!"
            />
        );
    }

    return (
        <div className="px-1">
            <UserList
                users={bookmarkedUsers}
                showLoadMore={false}
                searchPlaceholder="Search bookmarked users..."
            />
        </div>
    );
};

export default BookmarkedTab;
