import apiClient from "../ApiClient/ApiClinet";


export const createPlaylist = () => {
  return apiClient.get();
};

export const getUserPlaylists = (userId) => {
  return apiClient.get(`playlist/user/${userId}`);
};

export const getPlaylistById = (playlistId) => {
  return apiClient.get(`playlist/${playlistId}`);
};

export const addVideoToPlaylist = (videoId, playlistId) => {
  return apiClient.patch(`playlist/add/${videoId}/${playlistId}`);
};

export const removeVideoFromPlaylist = (videoId, playlistId) => {
  return apiClient.delete(`playlist/remove/${videoId}/${playlistId}`);
};

export const deletePlaylist = (playlistId) => {
  return apiClient.delete(`playlist/${playlistId}`);
};

export const updatePlaylist = (playlistId) => {
  return apiClient.patch(`playlist/${playlistId}`);
};
