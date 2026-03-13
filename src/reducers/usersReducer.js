import { fetchUsersApi, fetchUserProfileApi } from 'services/githubApi';

// Action Types
export const USERS_ACTION_TYPES = {
    FETCH_USERS_REQUEST: 'users/fetchUsersRequest',
    FETCH_USERS_SUCCESS: 'users/fetchUsersSuccess',
    FETCH_USERS_FAILURE: 'users/fetchUsersFailure',
    LOAD_MORE_REQUEST: 'users/loadMoreRequest',
    LOAD_MORE_SUCCESS: 'users/loadMoreSuccess',
    LOAD_MORE_FAILURE: 'users/loadMoreFailure',
    TOGGLE_BOOKMARK: 'users/toggleBookmark',
    RESET_USERS: 'users/resetUsers',
    FETCH_USER_PROFILE_REQUEST: 'users/fetchUserProfileRequest',
    FETCH_USER_PROFILE_SUCCESS: 'users/fetchUserProfileSuccess',
    FETCH_USER_PROFILE_FAILURE: 'users/fetchUserProfileFailure',
};

// localStorage helpers
const BOOKMARKS_KEY = 'github_bookmarked_users';

export const loadBookmarksFromStorage = () => {
    try {
        const data = localStorage.getItem(BOOKMARKS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveBookmarksToStorage = (bookmarks) => {
    try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
        // ignore
    }
};

// Initial State
const initialState = {
    users: [],
    bookmarkedUsers: loadBookmarksFromStorage(), // loaded from localStorage on init
    loading: false,
    loadingMore: false,
    error: null,
    since: 0,          // last user id for pagination
    hasMore: true,
    userProfile: null,
    profileLoading: false,
    profileError: null,
};

// Reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_ACTION_TYPES.FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };

        case USERS_ACTION_TYPES.FETCH_USERS_SUCCESS: {
            const { users, since } = action.payload;
            return {
                ...state,
                loading: false,
                users,
                since,
                hasMore: users.length === 20,
            };
        }

        case USERS_ACTION_TYPES.FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case USERS_ACTION_TYPES.LOAD_MORE_REQUEST:
            return { ...state, loadingMore: true, error: null };

        case USERS_ACTION_TYPES.LOAD_MORE_SUCCESS: {
            const { users, since } = action.payload;
            return {
                ...state,
                loadingMore: false,
                users: [...state.users, ...users],
                since,
                hasMore: users.length === 20,
            };
        }

        case USERS_ACTION_TYPES.LOAD_MORE_FAILURE:
            return { ...state, loadingMore: false, error: action.payload };

        case USERS_ACTION_TYPES.TOGGLE_BOOKMARK: {
            const user = action.payload;
            const isBookmarked = state.bookmarkedUsers.some((u) => u.id === user.id);
            const bookmarkedUsers = isBookmarked
                ? state.bookmarkedUsers.filter((u) => u.id !== user.id)
                : [...state.bookmarkedUsers, user];
            saveBookmarksToStorage(bookmarkedUsers);
            return { ...state, bookmarkedUsers };
        }

        case USERS_ACTION_TYPES.RESET_USERS:
            return { ...state, users: [], since: 0, hasMore: true };

        case USERS_ACTION_TYPES.FETCH_USER_PROFILE_REQUEST:
            return { ...state, profileLoading: true, profileError: null };

        case USERS_ACTION_TYPES.FETCH_USER_PROFILE_SUCCESS:
            return { ...state, profileLoading: false, userProfile: action.payload };

        case USERS_ACTION_TYPES.FETCH_USER_PROFILE_FAILURE:
            return { ...state, profileLoading: false, profileError: action.payload };

        default:
            return state;
    }
};

// Action Creators
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: USERS_ACTION_TYPES.FETCH_USERS_REQUEST });
    try {
        const response = await fetchUsersApi(0);
        const users = response.data;
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        dispatch({
            type: USERS_ACTION_TYPES.FETCH_USERS_SUCCESS,
            payload: { users, since: lastId },
        });
    } catch (error) {
        dispatch({
            type: USERS_ACTION_TYPES.FETCH_USERS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const loadMoreUsers = (since) => async (dispatch) => {
    dispatch({ type: USERS_ACTION_TYPES.LOAD_MORE_REQUEST });
    try {
        const response = await fetchUsersApi(since);
        const users = response.data;
        const lastId = users.length > 0 ? users[users.length - 1].id : since;
        dispatch({
            type: USERS_ACTION_TYPES.LOAD_MORE_SUCCESS,
            payload: { users, since: lastId },
        });
    } catch (error) {
        dispatch({
            type: USERS_ACTION_TYPES.LOAD_MORE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const toggleBookmark = (user) => ({
    type: USERS_ACTION_TYPES.TOGGLE_BOOKMARK,
    payload: user,
});

export const resetUsers = () => ({ type: USERS_ACTION_TYPES.RESET_USERS });

export const fetchUserProfile = (username) => async (dispatch) => {
    dispatch({ type: USERS_ACTION_TYPES.FETCH_USER_PROFILE_REQUEST });
    try {
        const response = await fetchUserProfileApi(username);
        dispatch({
            type: USERS_ACTION_TYPES.FETCH_USER_PROFILE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: USERS_ACTION_TYPES.FETCH_USER_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectBookmarkedUsers = (state) => state.users.bookmarkedUsers;
export const selectUsersLoading = (state) => state.users.loading;
export const selectLoadingMore = (state) => state.users.loadingMore;
export const selectUsersError = (state) => state.users.error;
export const selectSince = (state) => state.users.since;
export const selectHasMore = (state) => state.users.hasMore;
export const selectIsBookmarked = (userId) => (state) =>
    state.users.bookmarkedUsers.some((u) => u.id === userId);
export const selectUserProfile = (state) => state.users.userProfile;
export const selectProfileLoading = (state) => state.users.profileLoading;
export const selectProfileError = (state) => state.users.profileError;

export default usersReducer;
