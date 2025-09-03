import React from "react";
import { Input } from "@components/ui/input";

function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-60 lg:h-72 bg-gray-300 dark:bg-gray-700 relative">
        <img
          src="https://via.placeholder.com/1200x300"
          alt="coverimage"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16">
          {/* Profile Image */}
          <img
            src="https://via.placeholder.com/150"
            alt="profileimage"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover"
          />

          {/* Channel Info */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Channel Name
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
            <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
              Home
            </li>
            <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
              Videos
            </li>
            <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
              Live
            </li>
            <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
              Playlists
            </li>
            <li className="cursor-pointer pb-2 border-b-2 border-transparent hover:border-red-500 hover:text-red-500">
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
      </div>
    </div>
  );
}

export default Profile;
