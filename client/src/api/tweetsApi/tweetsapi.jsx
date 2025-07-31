import axios from "axios";
import { Localstorage } from "../../utils";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = Localstorage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const createTweet = () => {
  return apiClient.get("tweet/");
};

export const getUserTweets = (channelId) => {
  return apiClient.get(`tweet/user/${channelId}`);
};

export const updateTweet = (tweetId) => {
  return apiClient.patch(`tweet/${tweetId}`);
};

export const deleteTweet = (tweetId) => {
  return apiClient.delete(`tweet/${tweetId}`);
};
