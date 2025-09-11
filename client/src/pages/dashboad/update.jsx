import React, { useState } from "react";
import { Input } from "../../components/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import { Button } from "../../components/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { updateVideo } from "../../api/videosapi/videoapi";

function Update() {
  const [thumbnail, setThumbnail] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const {id}= useParams()
  const navigate = useNavigate();

  const handelUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("thumbnail", thumbnail);

    try {
      await updateVideo(id,formdata);
      navigate("/yourVideo")
    } catch (error) {
      console.log("could not update data" + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <Card className="w-full max-w-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Update Your Video Details
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Make sure that you write the title and description relevant to your
            video. It will give a better experience to the user.
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter video description"
              />
            </div>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-end gap-3">
          <Button
            onClick={() => {
              navigate("/yourVideo");
            }}
            variant="outline"
            className="rounded-xl px-4 py-2 text-sm font-medium bg-red-500 text-white dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-red-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handelUpdate}
            className="rounded-xl px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Update;
