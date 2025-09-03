import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/components/ui/card";
import { useOutletContext } from "react-router-dom";
import { getAllVideos } from "../api/videosapi/videoapi";

function Home() {
  const { isSidebarOpen } = useOutletContext();
  const { user } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);

  const handleVideo = async () => {
    try {
      const response = await getAllVideos();
      setVideos(response.data.data.videos);

    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };
  console.log("response from backend:",videos)

  useEffect(() => {
    handleVideo();
  }, [user]);

  return (
    <div className="pt-8 flex flex-wrap gap-6 ">
      {videos.map((video, index) => (
        <Card
          key={index}
            className={`
            
            
            basis-full sm:basis-[48%] md:basis-[32%]
            overflow-hidden
            transition-transform duration-300
            hover:shadow-lg
            ${isSidebarOpen ? "scale-100" : "scale-105"}
          `}
        >
          {/* Card content: 80% height */}
          <CardContent className="flex-[4]">
            
            <Link to={`/video/${video._id}`} className="block h-full">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full  rounded-t-2xl"
              />
            </Link>
          </CardContent>

          {/* Card footer: 20% height */}
          <CardFooter className="flex   gap-2 -mt-4 ">
            {/* Top row: logo + title */}
            <div className="flex items-start gap-3">
              <img
                src={video.channelLogo || "https://dummyimage.com/40x40/000/fff"}
                alt={video.owner}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-2">
                {video.title}
               
              </span>
            </div>

            <div className="text-x   text-gray-500 dark:text-gray-400">
              
            </div>
              
            {/* Bottom row: views + upload date */}
            <div className="text-x   text-gray-500 dark:text-gray-400">
              {video.views} views •{" "}
              {new Date(video.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Home;
