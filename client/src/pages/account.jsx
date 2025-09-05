import React from "react";

function Account() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Account</h1>
          <h3 className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            Choose how you appear and what you see on MyTube
          </h3>
        </div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* MyTube Channel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your MyTube Channel</h2>
          <p className="text-gray-700 dark:text-gray-300">
            This is your public presence on YouTube. You need a channel to
            upload your own videos, comment on videos, or create playlists.
          </p>

          <h2 className="text-xl font-semibold mt-4">Your Channel Details</h2>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Logo</h2>
              <img
                src=""
                alt="Profile picture"
                className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-700"
              />
            </div>

            {/* Channel Info */}
            <div className="flex-1 space-y-2">
              <h2 className="font-semibold">Channel Name</h2>
              <p className="text-gray-700 dark:text-gray-300">Name from backend</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Social Links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Other Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              value="Facebook"
              readOnly
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
            <input
              type="text"
              value="GitHub"
              readOnly
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
            <input
              type="text"
              value="Instagram"
              readOnly
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
            <input
              type="text"
              value="Discord"
              readOnly
              className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
