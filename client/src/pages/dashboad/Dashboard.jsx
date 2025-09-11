import React, { useEffect, useState } from "react";
import { yourvideos, deleteVideo } from "../../api/videosapi/videoapi";
import Mycard from "../../components/Card";
import { Input } from "../../components/components/ui/input";
import { Button } from "../../components/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
  const [myvideo, setMyVideo] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [toast, setToast] = useState(null);

  const yourvideo = async () => {
    try {
      const response = await yourvideos();
      setMyVideo(response.data.data);
    } catch (error) {
      console.log("could not fetch your videos " + error);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await deleteVideo(videoId);
      setToast("Video deleted successfully!");

      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast("Failed to delete video.");
      setTimeout(() => setToast(null), 3000);
    }
  };

  useEffect(() => {
    yourvideo();
  }, [user]);

  return (
    <div>
      <div className="mt-6 border-b border-gray-300 dark:border-gray-700">
        <ul className="flex flex-wrap gap-4 sm:gap-8 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
          <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
            Videos
          </li>
          <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
            Live
          </li>
          <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
            Post
          </li>
          <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
            Playlists
          </li>
          <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
            Analytics
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

      {myvideo.length > 0 &&
        myvideo.map((userObj) =>
          userObj.videos.map((video) => (
            <div
              key={video._id}
              className="flex gap-4 mb-6 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
            >
              <Mycard
                className="w-60 h-36 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-200"
                contentclass="p-0 w-full h-36 -mt-13"
                content={
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                }
              />

              <div className="flex flex-1 justify-between">
                {/* Video Info */}
                <div className="flex flex-col justify-start">
                  <p className="text-base font-medium text-black dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {video.title}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {userObj.username}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {video.views} views • 2 weeks ago
                  </p>
                </div>

                <div className="flex gap-2 justify-start">
                  <Button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                 <Link to={`/update/${video._id}`}>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600">
                      Update
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
    </div>
  );
}

export default Dashboard;
