import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";

//controller for featching data like profileimage , channelname, subscribercount, coverimage etc

const profileData = asyncHandler(async (req , res)=>{
const {userId}= req.params;
if(!userId){
    throw new ApiError(400 , "didnot get the userId")
}

const user = await User.findById(userId)
if(!user){
    throw new ApiError(400, "user with that user id doesn't exist")
}

const result = await User.aggregate([
    {
        $match:{
            _id:new mongoose.Types.ObjectId(userId)
        }
    },
    {
        $lookup:{
            from:"videos",
            localField:"_id",
            foreignField:"owner",
            as:"myvideo",
            pipeline:[
                {
                    $project:{
                        title:1,
                        thumbnail:1,
                        views:1,
                        createdAt:1
                    }
                }
            ]
        }
    },{
        $project:{
           username:1,
           email:1,
           avatar:1,
           coverImage:1,
           myvideo:1
        }
    }
])

return res .status(200)
           .json(new ApiResponse(200, result,"information fetched successfully"))


})


export{
      profileData
}