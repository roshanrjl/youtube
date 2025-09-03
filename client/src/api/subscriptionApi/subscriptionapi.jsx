import apiClient from "../ApiClient/ApiClinet";


export const toggleSubscription = (channelId) => {
  return apiClient.get(`subscription/toggle/${channelId}`);
};

export const getUserChannelSubscribers = (channelId) => {
  return apiClient.get(`subscription/user/${channelId}`);
};

export const getSubscribedChannels = (subscriberId) => {
  return apiClient.get(`subscription/user/${subscriberId}`);
};
