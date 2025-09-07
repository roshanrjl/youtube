import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/components/ui/card";
import Mycard from "../components/Card";
import { Link, useParams , useLocation } from "react-router-dom";
import {
  getVideoById,
  getAllVideos,
  addViews,
} from "../api/videosapi/videoapi";

function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allvideo, setAllVideo] = useState(null);
  const [views, setViews] = useState();
    const location = useLocation();
  const fromHome = location.state?.fromHome || false;


 useEffect(() => {
  const lastViewedVideo = sessionStorage.getItem("lastViewedVideo");

  const incrementViews = async () => {
    try {
      
      if (lastViewedVideo !== id) {
        const response = await addViews(id);
        setViews(response.data.data); 
        sessionStorage.setItem("lastViewedVideo", id); 
      } else {
        
        const response = await getVideoById(id);
        setViews(response.data.data.views);
      }
    } catch (error) {
      console.error("Error handling views:", error);
    }
  };

  incrementViews();
}, [id]);





  console.log("views from backend is:", views);

  // Fetch video by ID
  const fetchVideo = async () => {
    try {
      const response = await getVideoById(id);
      setVideo(response.data.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };
  //featch all video
  const fetchAllVideo = async () => {
    try {
      const response = await getAllVideos();

      setAllVideo(response.data.data.videos);
    } catch (error) {
      console.log("something went wrong" + error);
    }
  };
  useEffect(() => {
    fetchVideo();
    fetchAllVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Video not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 p-4 lg:p-8 gap-6">
      {/* Left Side: Video Player */}
      <div className="flex-1 flex flex-col gap-4">
        <Card className="rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Video Player */}
          <CardContent className="flex-1 bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <video
              src={video.videoFile}
              controls
              poster={video.thumbnail}
              className="w-full h-[60vh] object-contain rounded-xl"
            />
          </CardContent>

          {/* Video Title & Description */}
          <CardFooter className="flex flex-col gap-2 p-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {video.title}
            </h1>
          </CardFooter>

          {/* Channel info + Like/Subscribe */}
          <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-200 dark:border-gray-700 p-4 gap-4">
            {/* Profile & Subscribe */}
            <div className="flex items-center gap-3">
              <img
                src="https://via.placeholder.com/40"
                alt="channel"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Channel Name
              </span>
              <button className="ml-3 px-4 py-2 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 transition">
                Subscribe
              </button>
            </div>

            {/* Like & Comment */}
            <div className="flex gap-3">
              <button className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                👍 Like
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                💬 Comment
              </button>
            </div>
          </CardFooter>
        </Card>

        <div>
          <textarea
            placeholder="your description"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
            value={video.description}
            readOnly
          />
        </div>
      </div>

      {/* Right Side: Related Videos / Sidebar */}
      <div className="w-full lg:w-[35%] h-auto flex flex-col gap-2 ">
        {allvideo?.map((video) =>
          video._id !== id ? (
            <Link to={`/video/${video._id}`}>
              <img
                key={video._id}
                src={video.thumbnail}
                alt={video.title}
                className="w-60 h-40 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}

export default Video;
