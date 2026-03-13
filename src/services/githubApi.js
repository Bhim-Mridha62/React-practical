import axios from 'axios';

const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
});

export const fetchUsersApi = (since = 0, perPage = 20) =>
    githubApi.get(`/users?since=${since}&per_page=${perPage}`);

export const fetchUserProfileApi = (username) =>
    githubApi.get(`/users/${username}`);

export default githubApi;
