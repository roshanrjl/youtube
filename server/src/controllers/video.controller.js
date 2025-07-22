import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { converToHLs } from "../ffmpeg/ffmpegUtils.js";

//controller for getall videos
const getAllVideos = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const skip = (page - 1) * limit;
  const sortDireciton = sortType === "desc" ? -1 : 1;

  const result = await Video.aggregate([
    {
      $match: {
        ...(query && {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        }),
        ...(userId && {
          user: new mongoose.Types.ObjectId(userId),
        }),
      },
    },
    {
      $sort: {
        [sortBy]: sortType === "desc" ? -1 : 1,
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
  ]);
  const videos = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { total, page, limit, videos },
        "All video fetched successfully"
      )
    );
});
//controller for publishing video
const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  if (!req.files || !req.files.video) {
    return res
      .status(400)
      .json({ success: false, message: "No video file uploaded" });
  }
  const thumbnailpath = req.file.thumbnail?.[0].path;

  if(!thumbnailpath){
    throw new ApiError(400, "couldnot found the thumbnail")
  }
  const thumbnailresult = await uploadOnCloudinary(thumbnailpath)
  
  if(!thumbnailresult){
    throw new ApiError(500, "something went wrong while uploading to the cloudinary")
  }
  const videopath = req.files.video?.[0].path;


  if (!videopath) {
    throw new ApiError(400, "videopath didn't found");

  }
  const outputFolder = `uploads/hls/${Date.now()}`

    let hlsPlaylistPath;

  try {
    hlsPlaylistPath = await converToHLs(videopath, outputFolder);
  } catch (error) {
    console.error('HLS conversion error:', error);
    throw new ApiError(500, "Video conversion to HLS failed");
  }
   const coudinaryresult = await uploadOnCloudinary(outputFolder)

  if (!coudinaryresult.url) {
    throw new ApiError(400, "couldn't found the video url from cloudinary");
  }
  const myvideo = await Video.create({
    videoFile: coudinaryresult.url,
    thumbnail:thumbnailresult.url,
    title: title,
    description: description,
    user: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, myvideo, "video created successfully"));
});
//controller for getting video by id
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = req.user._id;
  if (!videoId) {
    throw new ApiError(400, "didn't get video id");
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(403, "vidoeId is not valid");
  }

  const getvideo = await Video.findById(videoId);

  if (!getvideo) {
    throw new ApiError(400, "could get the video");
  }

  if (getvideo.user.toStrng() !== user.toStrng()) {
    throw new ApiError(403, "invalid user cannot access the video");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getvideo, "video by id fetched successfully"));
});

//controller for updating the video
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = req.user._id;
  const { title, description } = req.body;

  // 1. Validate videoId
  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  // 2. Find the video
  const findVideo = await Video.findById(videoId);
  if (!findVideo) {
    throw new ApiError(404, "Video not found");
  }

  // 3. Check ownership (⚠️ Your schema uses 'user', not 'owner'?)
  if (findVideo.user.toString() !== user.toString()) {
    throw new ApiError(403, "Unauthorized: You cannot edit this video");
  }

  // 4. Optional thumbnail upload
  let thumbnailUrl = findVideo.thumbnail;
  const newThumbnail = req.files?.thumbnail?.[0]?.path;

  if (newThumbnail) {
    const uploadThumbnail = await uploadOnCloudinary(newThumbnail);
    if (uploadThumbnail?.url) {
      thumbnailUrl = uploadThumbnail.url;
    }
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnailUrl,
      },
    },
    { new: true }
  );

  // 6. Send response
  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

//controller for deleting video
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = req.user._id;
  if (!videoId) {
    throw new ApiError(400, "could not found videoId");
  }
  const findvideo = await Video.findById(videoId);

  if (!findvideo) {
    throw new ApiError(400, "could not found the video");
  }
  if (findvideo.owner.toString() !== user.toString()) {
    throw new ApiError(
      403,
      "invalid user don't have right to delete the video"
    );
  }

  await Video.findByIdAndDelete(videoId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to toggle publish status");
  }

  video.isPublished = !video.isPublished;
  await video.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      video,
      `Video is now ${video.isPublished ? "published" : "unpublished"}`
    )
  );
});


export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
