import React from 'react';

const EmptyState = ({ message, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center py-[60px] px-5 gap-4 opacity-80 animate-[fadeIn_0.4s_ease]">
            <div className="text-5xl grayscale-[0.3]">{icon || '🔍'}</div>
            <p className="text-[0.95rem] text-slate-500 text-center m-0">{message || 'No users found.'}</p>
        </div>
    );
}

export default EmptyState;
