import mongoose, { Schema } from "mongoose"
import {Video} from "../models/video.models.js"
import {Subscription} from "../models/subscribition.models.js"
// import {Like} from "../models/like.model.js"
// import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
  const user = req.user._id;

  
  const viewsAgg = await Video.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(user) }
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" }
      }
    }
  ]);
  const totalViews = viewsAgg[0]?.totalViews || 0;

  // Total Subscribers
  const subscribersCount = await Subscription.countDocuments({
    channel: user
  });

  // Total Videos
  const totalVideos = await Video.countDocuments({
    owner: user
  });

  // Total Likes (if you store likes per video)
  const likesAgg = await Video.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(user) }
    },
    {
      $group: {
        _id: null,
        totalLikes: { $sum: "$likes" } // assuming each video has a `likes` field
      }
    }
  ]);
  const totalLikes = likesAgg[0]?.totalLikes || 0;

  // Final Response
  const stats = {
    totalViews,
    totalSubscribers: subscribersCount,
    totalVideos,
    totalLikes
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});


const getChannelVideos = asyncHandler(async (req, res) => {
    const user = req.user._id;
  
    const channelVideos= await Video.aggregate([
       {
        $match:{
            owner:mongoose.Types.ObjectId(user)}
       },
       {
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"owner",
            pipeline:[
                {
                    $project:{
                        username:1,
                        avater:1
                    }
                }
            ]
        }
       },{
         $unwind:"$owner" 
       },{
        $project:{
            title:1,
            thumbnail:1,
            description:1,
            duration:1,
            owner:1,
            views:1,

        }
       }
    ])

    return res
              .status(200)
              .json(new ApiResponse(200 , channelVideos , "video fetched successfully"))

})

export {
    getChannelStats, 
    getChannelVideos
    }