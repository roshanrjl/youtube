import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { hideForm } from "../redux/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { publishAVideo } from "../api/videosapi/videoapi";
import { useNavigate } from "react-router-dom";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  const showForm = useSelector((state) => state.form.showForm);
  const dispatch = useDispatch();

  if (!showForm) return null;

  const handleCancel = () => {
    setDescription("");
    setThumbnail(null);
    setTitle("");
    setVideo(null);
    dispatch(hideForm());
    console.log("Data canceled successfully");
  };

  const handleData = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("thumbnail", thumbnail);
    formdata.append("video", video);
    try {
      const response = await publishAVideo(formdata);
      alert("video updated successfully");
      navigate("/");
    } catch (error) {
      console.log("somethig went wrong " + error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen px-6 py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
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
              {/* Video Upload */}
              <label className="flex flex-col items-center justify-center w-[40vh] h-[30vh] bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative overflow-hidden">
                {video ? (
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-300">
                    Upload Video
                  </span>
                )}
                <input
                  onChange={(e) => setVideo(e.target.files[0])}
                  type="file"
                  accept="video/*"
                  className="hidden"
                />
              </label>

              {/* Thumbnail Upload */}
              <label className="flex flex-col items-center justify-center w-[40vh] h-[30vh] bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative overflow-hidden">
                {thumbnail ? (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-300">
                    Upload Thumbnail
                  </span>
                )}
                <input
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  type="file"
                  accept="image/*"
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
                value={title}
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
                value={description}
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
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleData}
                className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg"
              >
                Next
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UploadVideo;
