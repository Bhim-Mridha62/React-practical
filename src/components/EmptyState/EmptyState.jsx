import React from 'react';

const EmptyState = ({ message, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center py-[60px] px-5 gap-4">
            <div className="text-5xl grayscale-[0.3]">{icon || '🔍'}</div>
            <p className="text-slate-500 text-center">{message || 'No users found.'}</p>
        </div>
    );
}

export default EmptyState;
