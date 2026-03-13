import React from 'react';
const SearchBar = ({ value, onChange, placeholder }) => {
    return (
        <div className="relative flex items-center w-full">
            <span className="absolute left-[14px] flex items-center text-indigo-500 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[18px] h-[18px]"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </span>
            <input
                type="text"
                className="w-full py-3 px-11 bg-white/5 border-[1.5px] border-indigo-500/30 rounded-xl text-slate-100 text-[0.95rem] outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-indigo-500/10 focus:ring-[3px] focus:ring-indigo-500/15 [font-family:inherit]"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Search users...'}
                aria-label="Search users"
                autoComplete="off"
                spellCheck={false}
            />
            {value && (
                <button
                    className="absolute right-3 bg-transparent border-none text-slate-500 cursor-pointer text-[0.85rem] p-1 flex items-center justify-center rounded-full w-6 h-6 transition-colors duration-200 hover:bg-white/10 hover:text-slate-100"
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SearchBar;
