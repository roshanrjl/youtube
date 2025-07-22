import mongoose, { isValidObjectId, Schema } from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//controller for creating the playlist
const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(400, "name or description is missing");
  }
  const owner = req.user._id;
  const videopath = req.files.video?.[0].path;

  if (!videopath) {
    throw new ApiError(400, "videopath doesnot found");
  }

  const video = await uploadOnCloudinary(videopath);

  if (!video) {
    throw new ApiError(400, "video didn't found");
  }

  const playlist = await Playlist.create({
    name: name,
    description: description,
    videos: video,
    owner: owner,
  });

  if (!playlist) {
    throw new ApiError(400, "something went wrong while making playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist created successfully"));
});

// controller for getting all the playlist of user
// channel me vayako sabi playlist huru lai dasplay garxa
const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "didnot get channel ID");
  }
  const playlist = await Playlist.find({ owner: userId });
  if (!playlist) {
    throw new ApiError(400, "didnot found playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist feched successfully"));
});

//controller for getting the playlist according to the id
// user la kunai playlist lai click gara paxi teo playlist ko id ko adahar ma videos ko list huru lai dakhauxa
const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiError(400, "didn't get playlist Id");
  }

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "invalid playlist Id");
  }
  const playList = await Playlist.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(playlistId) },
    },
    {
      lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerArr",
      },
    },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$ownerArr", 0] },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
    { $unwind: "$videos" },
    {
      $project: {
        owner: { username: 1, avatar: 1 },
        name: 1,
        description: 1,
        videos: {
          thumbnail: 1,
          title: 1,
          description: 1,
          views: 1,
          duration: 1,
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, playList, "playList fetched successfully"));
});

//controller for adding the new video to the existing playlist
const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const user = req.user._id;

  if (!playlistId || !videoId) {
    throw new ApiError(400, "playlistId or videoId is not found");
  }

  ownerId = await Playlist.findById( playlistId );
  if(!ownerId){
    throw new ApiError(400,"playlist doesnot exist")
  }

  if (ownerId.owner.toString() !== user.toString()) {
    throw new ApiError(403, "invalid user are not allowed to add the videos");
  }
   ownerId.videos.push(videoId)
   await ownerId.save()
  return res
    .status(200)
    .json(new ApiResponse(200, ownerId, "video added successfully"));
});

//controller for removing the video from playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const user = req.user._id;

  if(!playlistId ||!videoId){
    throw new ApiError(400, "playlist Id or video Id not found")
  }
  const findPlaylist= await Playlist.findById(playlistId)
  if(!findPlaylist){
    throw new ApiError(400, "playlist doesnot exist")
  }

  if(findPlaylist.videos.includes(videoId)){
    throw new ApiError(400, "video doesnot exist with that videoId")
  }
  
  if(!findPlaylist.owner.toString()!== user.toString() ){
    throw new ApiError(400 , "invalid user ! does not permission to delete the video")
  }

   const updated = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: videoId } },
    { new: true }
  );

return res 
          .status(200)
          .json(new ApiResponse(200, updated, "video deleted successfully"))


  
});

//deleting the entire playlist
const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const user = req.user._id;

  if(!playlistId ){
    throw new ApiError(400, "playlist Id is not found")
  }
  const findPlaylist= await Playlist.findById(playlistId)
  if(!findPlaylist){
    throw new (400, "playlist doesnot exist")
  }
  
  if(findPlaylist.owner.toString()!== user.toString() ){
    throw new ApiError(400 , "invalid user ! does not permission to delete the playList")
  }

  await Playlist.findByIdAndDelete(playlistId)

return res 
          .status(200)
          .json(new ApiResponse(200, {}, "playlist deleted successfully"))
});

//controller for updating the playlist
const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  const user= req.user._id
  
  if(!playlistId){
    throw new ApiError( 400 , "playlistId didn't found")
  }

  if(!name ||!description){
    throw new ApiError( 400 , "name or description didn't found")
  }
 
  const findPlaylist= await Playlist.findById(playlistId)
  if(!findPlaylist){
    throw new (400, "playlist doesnot exist")
  }
  
  if(findPlaylist.owner.toString()!== user.toString() ){
    throw new ApiError(400 , "invalid user ! does not permission to update the playlist")
  }
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
            $set: {
                    name:name,
                    description:description
            }
        },
        {new: true}
  )
  return res 
            .status(200)
            .json(new ApiResponse(200, updatedPlaylist , "playlist updated successfully"))

});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
