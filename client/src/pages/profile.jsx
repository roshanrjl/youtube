import React, { useEffect } from "react";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { profileData } from "../api/profileApi/profileApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Mycard from "../components/Card";
import { formatDistanceToNow } from "date-fns";

function Profile() {
  const [profileDatas, setProfileDatas] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState(true);
  const [post, setPost] = useState(false);
  const [live, setLive] = useState(false);

  const { id } = useParams();

  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleData = async () => {
    try {
      const response = await profileData(id);
      setProfileDatas(response.data.data);
    } catch (error) {}
  };

  console.log("response from backend:", profileDatas);

  useEffect(() => {
    handleData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-60 lg:h-72 bg-gray-300 dark:bg-gray-700 relative">
        <img
          src={profileDatas[0]?.coverImage}
          alt="coverimage"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end  sm:mt-2">
          {/* Profile Image */}
          <img
            src={profileDatas[0]?.avatar}
            alt="profileimage"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover"
          />

          {/* Channel Info */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {profileDatas[0]?.username}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              1.2M subscribers • 120 videos
            </p>
            <p className="text-blue-600 dark:text-blue-400 cursor-pointer text-sm mt-1">
              Other social media links
            </p>
          </div>
        </div>

        {/* Navbar */}
        <div className="mt-6 border-b border-gray-300 dark:border-gray-700">
          <ul className="flex flex-wrap gap-4 sm:gap-8 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
            <li
              className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500"
              onClick={() => {
                setVideos(true);
                setLive(false);
                setPost(false);
              }}
            >
              Videos
            </li>
            <li
              className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500"
              onClick={() => {
                setVideos(false);
                setLive(true);
                setPost(false);
              }}
            >
              Live
            </li>
            <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
              Playlists
            </li>
            <li
              className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500"
              onClick={() => {
                setVideos(false);
                setLive(false);
                setPost(true);
              }}
            >
              post
            </li>
            <li className="ml-auto flex items-center">
              <Input
                type="text"
                placeholder="Search"
                className="w-32 sm:w-48 md:w-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md"
              />
            </li>
          </ul>
        </div>

        {/* card for videos */}
        {videos && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {profileDatas[0]?.myvideo?.map((video, index) => (
              <Mycard
                key={index}
                className="w-full h-80  bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg transition-colors duration-300"
                content={
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                }
                footer={
                  <div className="flex flex-col text-gray-700 dark:text-gray-300 text-sm ">
                    <span className="font-semibold">{video.title}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {video.views || 0} views • {timeAgo(video.createdAt)}
                    </span>
                  </div>
                }
              />
            ))}
          </div>
        )}

        {/* card for live video */}
        {live && (
          <div>
            <Mycard />
          </div>
        )}

        {post && <div>{/* place for showing post */}</div>}
      </div>
    </div>
  );
}

export default Profile;
