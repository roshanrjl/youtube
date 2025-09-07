import React from "react";
import Mycard from "../components/Card";

function LikedVideo() {
  return (
    <div className="min-h-screen bg-white dark:bg-black px-3 py-3">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Your Liked Videos
      </h1>

      {/* Video Item */}
      <div
        className="flex gap-4 mb-6 p-2 rounded-lg cursor-pointer 
        hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
      >
        {/* Thumbnail */}
        <Mycard
          className="w-60 h-36 rounded-xl overflow-hidden 
          group-hover:scale-105 transition-transform duration-200"
          content="thumbnail"
        />

        {/* Video Info */}
        <div className="flex flex-col justify-start">
          {/* Title */}
          <p className="text-base font-medium text-black dark:text-white line-clamp-2 
          group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            Content Title Goes Here Similar to YouTube UI
          </p>

          {/* Channel */}
          <p className="text-sm text-gray-600 dark:text-gray-400 
          group-hover:text-black dark:group-hover:text-white transition-colors">
            Channel Name
          </p>

          {/* Extra (like views & date) */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            120K views • 2 weeks ago
          </p>
        </div>
      </div>
    </div>
  );
}

export default LikedVideo;
