import mongoose, { isValidObjectId } from "mongoose";
// import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscribition.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleSubscription = asyncHandler(async (req, res) => {
  
  const { channelId } = req.params;
  const subscriberId = req.user._id;

  if (!channelId) {
    throw new ApiError(400, "channel ID is required");
  }

  const existingsubscription = await Subscription.findOne({
    channel: channelId,
    subscriber: subscriberId,
  });
  if (existingsubscription) {
    await Subscription.findByIdAndDelete(existingsubscription._id);
    return res.status(200).json(200, {}, "unsubscripted successfully");
  } else {
    const newsubscribtion = await Subscription.create({
      channel: channelId,
      subscriber: subscriberId,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, newsubscribtion, "channel subscribed successfully")
      );
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  console.log("the channelId is:",channelId)

  if (!channelId) {
    throw new ApiError(400, "channelId is required");
  }

  const subscriberList = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
      },
    },
    {
      $unwind: "$subscriber", // Convert array to single object
    },
    {
      $project: {
        _id: 1,
        "subscriber._id": 1,
        "subscriber.username": 1,
        "subscriber.avatar": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, subscriberList, "List of subscribers fetched"));
});


// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!subscriberId) {
    throw new ApiError(400, "Subscriber ID is missing");
  }

  const channelList = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
      },
    },
    {
      $unwind: "$channel", // Convert array to object
    },
    {
      $project: {
        _id: 0,
        "channel._id": 1,
        "channel.username": 1,
        "channel.avatar": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, channelList, "Subscribed channels fetched"));
});


export { 
     toggleSubscription,
     getUserChannelSubscribers, 
     getSubscribedChannels
     };
