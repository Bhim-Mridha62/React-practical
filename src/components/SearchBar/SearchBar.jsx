import React from 'react';
import { SearchIcon } from 'assets/icons';
const SearchBar = ({ value, onChange, placeholder }) => {
    return (
        <div className="relative flex items-center w-full">
            <span className="absolute left-[14px] flex items-center text-indigo-500 pointer-events-none">
                <SearchIcon />
            </span>
            <input
                type="text"
                className="w-full py-3 px-11 bg-white/5 border-[1.5px] border-indigo-500/30 rounded-xl text-slate-100 text-[0.95rem] outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-indigo-500/10 focus:ring-[3px] focus:ring-indigo-500/15"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Search users...'}
                aria-label="Search users"
                autoComplete="off"
                spellCheck={false}
            />
            {value && (
                <button
                    className="absolute right-3 bg-transparent border-none text-slate-500 cursor-pointer text-[0.85rem] p-1 flex items-center justify-center rounded-full w-6 h-6 duration-200 hover:bg-white/10 hover:text-slate-100"
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
