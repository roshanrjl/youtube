import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";

function UploadVideo() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [Thumbnail, setThumbnail] = useState();
  const [video, setVideo] = useState();
  

  const handlecancel = () => {
    setDescription("");
    setThumbnail("");
    setTitle("");
    setVideo("");
    setShowForm(false);

    console.log("datacancled successfully");
  };
  const handledata = (e) => {
    e.preventDefault();
    console.log("title:", title);
    console.log("description:", description);
    console.log("data received successfully");
  };

  return (
    <div className="flex justify-center min-h-screen px-6 py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {showForm && (
        <Card className="w-full max-w-4xl rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Upload Your Video
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-6">
              {/* Upload Section */}
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <label className="flex flex-col items-center justify-center w-[40vh] h-[30vh] bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-gray-600 dark:text-gray-300">
                    Upload Video
                  </span>
                  <input
                    onChange={(e) => setVideo(e.target.files[0])}
                    type="file"
                    className="hidden"
                  />
                </label>

                <label className="flex flex-col items-center justify-center w-[40vh] h-[30vh] bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  <span className="text-gray-600 dark:text-gray-300">
                    Upload Thumbnail
                  </span>
                  <input
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  type="text"
                  placeholder="Enter video title"
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  placeholder="Enter video description"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={handlecancel}
                  className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  // type="submit"
                  onClick={handledata}
                  className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UploadVideo;
