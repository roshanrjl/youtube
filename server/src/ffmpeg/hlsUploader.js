import fs from "fs"
import path  from "path"
import { uploadOnCloudinary } from "../utils/cloudinary"
import { ApiError } from "../utils/ApiError"

export const uploadHLSFolder = (folderpath)=>{
    const files= fs.readdirSync(folderpath)
    const segmentUrlMap = {}

    let playlistUrl = null
     for (const file of files){
        const filepath= path.join(folderpath , file)
     }
}