import apiClient from "../ApiClient/ApiClinet";


export const toggleCommentLike= (commentId)=>{
  return apiClient.get(`like/toggle/comment/${commentId}`)
}
export const toggleTweetLike= (tweetId)=>{
  return apiClient.get(`like/toggle/Tweet/${tweetId}`)
}
export const toggleVideoLike= (videoId)=>{
  return apiClient.get(`like/toggle/video/${videoId}`)
}
export const getLikedVideos= ()=>{
  return apiClient.get("like/")
}
