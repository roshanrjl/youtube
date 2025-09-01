import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

function UploadVideo() {
  return (
    <div className=" flex justify-center min-h-screen ml-40 mr-40 mt-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <Card
        className="h-full w-full rounded-2xl shadow-2xl overflow-hidden
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          transition-transform duration-300 hover:shadow-3xl flex flex-col"
      >
        <CardContent>
          <form>
            <input
              className="w-[40vh] h-[30vh] bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center ml-70"
              placeholder=" Upload Video"
            />
            <label htmlFor="Title">Title</label>
            <Input/>
            <label htmlFor="Description">Description</label>
            <Input/>
 
            <input
              className="w-[40vh] h-[30vh] bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center ml-70"
              placeholder="Thumnail"
            />

          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UploadVideo;
