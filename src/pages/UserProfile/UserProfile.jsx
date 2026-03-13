import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserProfile,
    selectUserProfile,
    selectProfileLoading,
    selectProfileError,
} from 'reducers/usersReducer';
import { ArrowLeftIcon, BriefcaseIcon, GithubIcon, LinkIcon, LocationIcon, RepoIcon, UsersIcon } from 'assets/icons';

const UserProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(selectUserProfile);
    const loading = useSelector(selectProfileLoading);
    const error = useSelector(selectProfileError);

    useEffect(() => {
        if (username) {
            dispatch(fetchUserProfile(username));
        }
    }, [dispatch, username]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex bg-slate-900 h-[100dvh] items-center justify-center">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col h-[100dvh] bg-slate-900 text-slate-100 items-center justify-center p-6">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-red-400 text-center mb-6">{error}</p>
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 py-2 px-5 bg-indigo-500/10 text-indigo-400 rounded-xl hover:bg-indigo-500/20 transition-colors border border-indigo-500/30 font-medium"
                >
                    <ArrowLeftIcon /> GO BACK
                </button>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="flex flex-col h-[100dvh] bg-slate-900 text-slate-100 font-sans overflow-x-hidden overflow-y-auto">
            <div className="max-w-[800px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6 pt-6">
                {/* Header Actions */}
                <div className="flex justify-between items-center w-full">
                    <button
                        onClick={handleBack}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-200"
                        title="Go Back"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                    >
                        <GithubIcon />
                        View on GitHub
                    </a>
                </div>

                {/* Main Profile Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Column */}
                    <div className="flex flex-col items-center gap-4 shrink-0 mx-auto md:mx-0">
                        <img
                            src={profile.avatar_url}
                            alt={profile.login}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-700"
                        />
                        <div className="flex items-center gap-2 bg-slate-700 rounded-full px-4 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-medium text-slate-300 capitalize">{profile.type || 'User'}</span>
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="flex-1 flex flex-col gap-4 z-10 w-full text-center md:text-left">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-0">
                                {profile.name || profile.login}
                            </h1>
                            <span className="text-lg text-indigo-400 font-medium tracking-wide">@{profile.login}</span>
                        </div>

                        {profile.bio && (
                            <p className="text-slate-300 text-base mt-2 p-4 bg-slate-700/50 rounded-xl border border-slate-700">
                                {profile.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                            <div className="flex items-center gap-2 text-slate-200 bg-slate-700/50 py-2 px-4 rounded-lg border border-slate-700">
                                <UsersIcon />
                                <span className="font-semibold text-lg">{profile.followers}</span>
                                <span className="text-slate-400 text-sm">Followers</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-200 bg-slate-700/50 py-2 px-4 rounded-lg border border-slate-700">
                                <UsersIcon />
                                <span className="font-semibold text-lg">{profile.following}</span>
                                <span className="text-slate-400 text-sm">Following</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-200 bg-slate-700/50 py-2 px-4 rounded-lg border border-slate-700">
                                <RepoIcon />
                                <span className="font-semibold text-lg">{profile.public_repos}</span>
                                <span className="text-slate-400 text-sm">Repos</span>
                            </div>
                        </div>

                        {/* Meta Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mt-6 pt-6 border-t border-slate-700 text-sm text-slate-300">
                            {profile.company && (
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <span className="text-slate-500"><BriefcaseIcon /></span>
                                    <span className="truncate">{profile.company}</span>
                                </div>
                            )}
                            {profile.location && (
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <span className="text-slate-500"><LocationIcon /></span>
                                    <span className="truncate">{profile.location}</span>
                                </div>
                            )}
                            {profile.blog && (
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <span className="text-slate-500"><LinkIcon /></span>
                                    <a
                                        href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300 hover:underline truncate"
                                    >
                                        {profile.blog}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;