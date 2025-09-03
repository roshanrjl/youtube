import apiClient from "../ApiClient/ApiClinet";


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
