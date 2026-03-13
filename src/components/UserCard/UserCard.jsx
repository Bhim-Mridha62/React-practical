import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark, selectIsBookmarked } from 'reducers/usersReducer';
import { BookmarkIcon } from 'assets/icons';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const isBookmarked = useSelector(selectIsBookmarked(user.id));

    const handleBookmark = (e) => {
        e.stopPropagation();
        dispatch(toggleBookmark(user));
    };

    return (
        <div className="flex flex-row items-center gap-4 md:py-4 md:px-5 py-3 px-3 bg-white/5 border border-white/10 md:rounded-2xl rounded-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)] hover:bg-white/10 animate-[slideIn_0.3s_ease_both]">
            <div className="relative shrink-0">
                <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="md:w-14 md:h-14 w-10 h-10 rounded-full object-cover border-2 border-indigo-500/60 block"
                    loading="lazy"
                />
                {isBookmarked && <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(245,158,11,0.5)]">★</span>}
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
                <span className="text-base font-semibold text-slate-100 tracking-[0.01em] whitespace-nowrap overflow-hidden text-ellipsis">{user.login}</span>
                <Link
                    to={`/user/${user.login}`}
                    className="text-[0.75rem] text-indigo-400 no-underline transition-colors duration-200 hover:text-indigo-300 hover:underline"
                >
                    View Profile
                </Link>
            </div>
            <button
                className={`flex items-center gap-1.5 py-2 px-3.5 rounded-[10px] border-[1.5px] text-sm font-medium cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0 ${isBookmarked ? 'bg-amber-500/15 border-amber-500 text-amber-400 hover:bg-amber-500/25 hover:text-amber-200' : 'border-indigo-500/50 bg-transparent text-indigo-400 hover:bg-indigo-500/15 hover:border-indigo-400 hover:text-indigo-300'}`}
                onClick={handleBookmark}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark user'}
            >
                <BookmarkIcon filled={isBookmarked} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
        </div>
    );
}
export default UserCard;
