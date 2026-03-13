import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBookmarkedUsers } from 'reducers/usersReducer';
import UsersTab from 'pages/UsersTab/UsersTab';
import BookmarkedTab from 'pages/BookmarkedTab/BookmarkedTab';

const TABS = [
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'bookmarked', label: 'Bookmarked', icon: '🔖' },
];

const TabLayout = () => {
    const [activeTab, setActiveTab] = useState('users');
    const bookmarkedUsers = useSelector(selectBookmarkedUsers);

    return (
        <div className="flex flex-col h-[100dvh] bg-slate-900 text-slate-100 font-sans overflow-hidden relative before:content-[''] before:fixed before:-top-[200px] before:left-1/2 before:-translate-x-1/2 before:w-[600px] before:h-[600px] before:bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] before:pointer-events-none before:z-0">
            {/* Tab Bar */}
            <nav className="w-full bg-slate-900/92 border-b border-white/[0.07] shrink-0 z-10 relative">
                <div className="flex items-stretch relative max-w-[720px] w-full mx-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-transparent border-none text-[0.9rem] cursor-pointer relative transition-colors duration-200 whitespace-nowrap [font-family:inherit] ${activeTab === tab.id ? 'text-indigo-400 font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-gradient-to-r after:from-indigo-500 after:to-violet-500 after:rounded-t-[2px] after:animate-[slideIn_0.2s_ease]' : 'text-slate-500 font-medium hover:text-slate-400'}`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-label={tab.label}
                        >
                            <span className="text-[1.1rem]">{tab.icon}</span>
                            <span className="tracking-[0.01em]">{tab.label}</span>
                            {tab.id === 'bookmarked' && bookmarkedUsers.length > 0 && (
                                <span className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[0.7rem] font-bold py-[2px] px-[7px] rounded-full min-w-[20px] text-center animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">{bookmarkedUsers.length}</span>
                            )}
                        </button>
                    ))}
                    <div className="hidden" />
                </div>
            </nav>

            {/* Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                <div className={`flex-1 overflow-y-auto md:px-5 px-3 pb-6 transition-[opacity,transform] duration-250 ease-in-out scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent max-w-[720px] w-full mx-auto ${activeTab === 'users' ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-2'}`}>
                    <UsersTab />
                </div>
                <div className={`flex-1 overflow-y-auto md:px-5 px-3 transition-[opacity,transform] duration-250 ease-in-out scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent max-w-[720px] w-full mx-auto ${activeTab === 'bookmarked' ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-2'}`}>
                    <BookmarkedTab />
                </div>
            </main>
        </div>
    );
};

export default TabLayout;
