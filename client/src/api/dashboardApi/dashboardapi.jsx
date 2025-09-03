import apiClient from "../ApiClient/ApiClinet";

 export const getChannelStats= ()=>{
  return apiClient.get("dashboad/stats")
 }


export const getChannelVideos = ()=>{
 return apiClient.get("dashboad/videos")
}
    