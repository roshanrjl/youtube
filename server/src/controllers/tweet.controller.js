import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//controller for creating the tweets
const createTweet = asyncHandler(async (req, res) => {
  const { contents } = req.body;
  const user = req.user._id;
  if (!contents) {
    throw new ApiError(400, "didn't get the tweet");
  }

  const checkuser = await User.findById(user);

  if (!checkuser) {
    throw new ApiError(400, "user didn't find");
  }

  const tweets = await Tweet.create({
    content: contents,
    owner: user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "tweets created successfully"));
});

//controller for  getting all the user tweets
const getUserTweets = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  if (!channelId) {
    throw new ApiError(400, "Couldn't get the channel Id");
  }

  const checkChannel = await User.findById(channelId);
  if (!checkChannel) {
    throw new ApiError(400, "Channel not found");
  }

  const userTweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        owner: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, userTweets, "User tweets fetched successfully"));
});

//controller for updating the tweets
const updateTweet = asyncHandler(async (req, res) => {
  const { newcontent } = req.body;
  const { tweetId } = req.params;
  const user = req.user._id;
  console.log("tweet id is :", tweetId);
  console.log("the new condtents is:", newcontent);
  if (!tweetId) {
    throw new ApiError(400, "couldn't found the tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "couldn't found the tweet");
  }
  if (tweet.owner.toString() !== user.toString()) {
    throw new ApiError(403, "invalid user! cannot update the tweets");
  }
  const updateTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: newcontent,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateTweet, "tweets updated successfully"));
});

//controller for deleting the tweets
const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const user = req.user._id;
  if (!tweetId) {
    throw new ApiError(400, "couldn't found tweetId");
  }
  const checkTweet = await Tweet.findById(tweetId);
  if (!checkTweet) {
    throw new ApiError(400, "couldn't found the tweet");
  }
  if (checkTweet.owner.toString() !== user.toString()) {
    throw new ApiError(
      403,
      "invalid user !does not have right to delete the tweets "
    );
  }
  await Tweet.findByIdAndDelete(checkTweet._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "tweets deletes successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
