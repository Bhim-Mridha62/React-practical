import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBookmarkedUsers } from 'reducers/usersReducer';
import UsersTab from 'pages/UsersTab/UsersTab';
import BookmarkedTab from 'pages/BookmarkedTab/BookmarkedTab';
import { UsersIcon, BookmarkIcon } from 'assets/icons';

const TABS = [
    { id: 'users', label: 'Users', icon: <UsersIcon /> },
    { id: 'bookmarked', label: 'Bookmarked', icon: <BookmarkIcon /> },
];

const TabLayout = () => {
    const [activeTab, setActiveTab] = useState('users');
    const bookmarkedUsers = useSelector(selectBookmarkedUsers);

    return (
        <div className="flex flex-col h-[100dvh] bg-slate-900 text-slate-100 font-sans overflow-hidden">
            {/* Tab Bar */}
            <nav className="w-full bg-slate-900 border-b border-slate-700 shrink-0">
                <div className="flex items-stretch max-w-[720px] w-full mx-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-b-2 text-sm font-medium ${activeTab === tab.id ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-label={tab.label}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <span>{tab.label}</span>
                            {tab.id === 'bookmarked' && bookmarkedUsers.length > 0 && (
                                <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{bookmarkedUsers.length}</span>
                            )}
                        </button>
                    ))}
                    <div className="hidden" />
                </div>
            </nav>

            {/* Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                <div className={`flex-1 overflow-y-auto md:px-5 px-3 pb-6 max-w-[720px] w-full mx-auto ${activeTab === 'users' ? 'block' : 'hidden'}`}>
                    <UsersTab />
                </div>
                <div className={`flex-1 overflow-y-auto md:px-5 px-3 pb-6 max-w-[720px] w-full mx-auto ${activeTab === 'bookmarked' ? 'block' : 'hidden'}`}>
                    <BookmarkedTab />
                </div>
            </main>
        </div>
    );
};

export default TabLayout;
