import apiClient from "../ApiClient/ApiClinet";


export const getAllVideos = () => {
  return apiClient.get("video/");
};

export const publishAVideo = (formdata) => {
  return apiClient.post("video/",formdata);
};

export const getVideoById = (videoId) => {
  return apiClient.get(`video/${videoId}`);
};

export const updateVideo = (videoId) => {
  return apiClient.patch(`video/${videoId}`);
};

export const deleteVideo = () => {
  return apiClient.delete();
};

export const togglePublishStatus = (videoId) => {
  return apiClient.get(`video/${videoId}`);
};

export const addViews = (videoId)=>{
  return apiClient.post(`video/increment-views/${videoId}`)
}
