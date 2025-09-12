import apiClient from "../ApiClient/ApiClinet";

export  const initiatePayment=(data)=>{
    return apiClient.post("/payment",data)
}