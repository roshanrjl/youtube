import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { useOutletContext } from "react-router-dom";
import {getAllVideos} from "../api/videosapi/videoapi"
import { useNavigate } from "react-router-dom";

function Mycard() {
  const { isSidebarOpen } = useOutletContext();
  const navigate = useNavigate()
  const {user}= useSelector((state)=>state.auth)
//  console.log("the current user is:",user)
const [ videos , setVideos]= useState([])

 const handleVideo= async()=>{
 const responese= await getAllVideos()
 console.log("The video that came from backend is:",responese.data.data)
 setVideos(responese.data.data.videos)
 }

  useEffect (()=>{
    handleVideo()
  },[user,navigate])


  return (
    <div className="flex flex-wrap gap-x-10 gap-y-8 p-4">
      {videos.map((video, index) => (
        <Card
          key={index}
          className={`
            aspect-square
            basis-[calc(30%-1rem)]
            overflow-hidden
            transition-transform duration-300
            hover:shadow-lg
            ${isSidebarOpen ? "scale-100" : "scale-105"}
          `}
        >
          <CardContent className="text-sm p-4">
            <p>
              <video
               src={video.videoFile }
                controls
              className="w-full h-40 object-cover mt-2 rounded-lg"
               />
             {video.title}
             <p className="text-gray-500 text-xs mt-1">{video.description}</p>
            </p>  
          </CardContent>
          <CardFooter className="text-xs px-4 pb-4 pt-0">
            Profile and video name from backend
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Mycard;
