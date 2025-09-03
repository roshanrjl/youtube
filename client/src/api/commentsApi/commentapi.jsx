import apiClient from "../ApiClient/ApiClinet";


export const getVideoComments = (videoId)=>{
 return  apiClient.get(`comment/${videoId}`)
}

export const addComment = (videoId)=>{
return apiClient.post(`comment/${videoId}`)
}

export const updateComment = (commentId)=>{
  return apiClient.patch(`comment/${commentId}`)
}

export const deleteComment = (commentId)=>{
  return apiClient.delete(`comment/${commentId}`)
}




















