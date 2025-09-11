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

export const updateVideo = (videoId,formdata) => {
  return apiClient.patch(`video/${videoId}`,formdata);
};

export const deleteVideo = (videoId) => {
  return apiClient.delete(`video/${videoId}`);
};

export const togglePublishStatus = (videoId) => {
  return apiClient.get(`video/${videoId}`);
};

export const addViews = (videoId)=>{
  return apiClient.post(`video/increment-views/${videoId}`)
};
export const yourvideos = ()=>{
  return apiClient.get("video/yourVideo")
};
