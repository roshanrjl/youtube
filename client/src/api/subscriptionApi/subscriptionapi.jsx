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

export const toggleSubscription = (channelId) => {
  return apiClient.get(`subscription/toggle/${channelId}`);
};

export const getUserChannelSubscribers = (channelId) => {
  return apiClient.get(`subscription/user/${channelId}`);
};

export const getSubscribedChannels = (subscriberId) => {
  return apiClient.get(`subscription/user/${subscriberId}`);
};
