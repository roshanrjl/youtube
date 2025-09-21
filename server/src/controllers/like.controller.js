import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js";
import e from "express";

//contrller for toggleing the video like
//i.e if video is like then do unlike the video and if the video is unlike then like the video
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = req.user._id;

  if (!videoId) {
    throw new ApiError(400, "videoId not found");
  }

  // Find the video
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "video not found");
  }

  // Check if user already liked the video
  const existingLike = await Like.findOne({ video: videoId, likedBy: user });

  if (existingLike) {
    // User wants to unlike
    await Like.findByIdAndDelete(existingLike._id);

    // Decrement like count in Video
    video.likesCount = Math.max((video.likesCount || 1) - 1, 0); // prevent negative
    await video.save();

    return res.status(200).json(
      new ApiResponse(200, { likesCount: video.likesCount }, "Video unliked successfully")
    );
  } else {
    // User wants to like
    await Like.create({ video: videoId, likedBy: user });

    // Increment like count in Video
    video.likesCount = (video.likesCount || 0) + 1;
    await video.save();

    return res.status(200).json(
      new ApiResponse(200, { likesCount: video.likesCount }, "Video liked successfully")
    );
  }
});


//controller for loggleing the comment like
//similar to vido i.e if there is like in the comment then remove it and if there is no like do like the commnets
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = req.user._id;
  if (!commentId) {
    throw new ApiError(400, "commentId is not found");
  }
  const findComment = await Comment.findById(commentId);

  if (!findComment) {
    throw new ApiError(400, "comment is not found");
  }
  const existingCommentLike = await Like.findOne({
    comment: commentId,
    likedBy: user,
  });
  if (existingCommentLike) {
    await Like.findByIdAndDelete(existingCommentLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "comment unliked successfully"));
  } else {
    const newlikedComment = await Like.create({
      comment: commentId,
      likedBy: user,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "comment liked successfully"));
  }
});

//controller for toggleing the tweet
//similar as video and comment i.e if there is tweet which is like make it unlike and viceversa
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const user = req.user._id;
  if (!tweetId) {
    throw new ApiError(400, "tweetId is not found");
  }

  const findTweet = await Tweet.findById(tweetId);

  if (!findTweet) {
    throw new ApiError(400, "Tweet is not found");
  }

  const existingLikeTweet = await Like.findOne({
    tweet: tweetId,
    likedBy: user,
  });
  if (existingLikeTweet) {
    await Like.findByIdAndDelete(existingLikeTweet._id);

    return res.status(200).json(200, {}, "tweet is unlike successfully");
  } else {
    const newlikeTweet = Like.create({
      tweet: tweetId,
      likedBy: user,
    });
  }
  return res.status(200).json(200, newlikeTweet, "tweet liked successfully");
});

//controller for getting all the like videos of currentuser
const getLikedVideos = asyncHandler(async (req, res) => {
  const user = req.user._id;
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: user,
        video: { $ne: null }, // only video likes
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
        pipeline: [
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
          { $unwind: "$owner" },
          {
            $project: {
              title: 1,
              thumbnail: 1,
              description: 1,
              duration: 1,
              views: 1,
              owner: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$video" },
    {
      $project: {
        video: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos
};
