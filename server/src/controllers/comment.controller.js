import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//controller for getting all the  comments  in particular video
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  let { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(400, "Can't find the video");
  }

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const comment = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        _id: 1,
        content: 1,
        video: 1,
        createdAt: 1,
        updatedAt: 1,
        "owner._id": 1,
        "owner.username": 1,
        "owner.avatar": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comments fetched successfully"));
});

// controller for adding the comment in the videos
const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { videoId } = req.params;
  const userId = req.user._id;
  if (!comment || !videoId) {
    throw new ApiError(400, "comment or videoId is missing");
  }

  //method 1
  //  const newcomment = new Comment({

  //   video:videoId,
  //   content:comment,
  //   user:userId

  //  })
  //  const savecomment = await newcomment.save();

  //method 2
  const newcomment = await Comment.create({
    video: videoId,
    content: comment,
    owner: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newcomment, "comment save successfully"));
});

//contorller for updating the comment
const updateComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!comment || !commentId) {
    throw new ApiError(400, "comment or commentId  is missing");
  }

  const existingComment = await Comment.findById(commentId);
  if (!existingComment) {
    throw new ApiError(400, "comment is not found ");
  }

  if (existingComment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "this user cannot update the comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: comment,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "comment updated successfully"));
});

//controller for delecting the comment from the specific video
const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  const user = req.user._id;

  if (!commentId) {
    throw new ApiError(400, "didn't receve the commentId");
  }
  const existingComment = await Comment.findById(commentId);

  if (!existingComment) {
    throw new ApiError(404, "comment cannot find");
  }

  if (existingComment.owner.toString() !== user.toString()) {
    throw new ApiError(403, "cannot delete the comment");
  }
  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment deleted successfully"));
});

export {
  getVideoComments, 
  addComment,
  updateComment,
  deleteComment 
};
