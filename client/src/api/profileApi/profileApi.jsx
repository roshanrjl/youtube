import apiClient from "../ApiClient/ApiClinet";

export const profileData =(userId)=>{
    return apiClient.get(`profile/${userId}`) 
} 