import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  addViews,
  yourVideos,
} from "../controllers/video.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.use(verifyJWT)

router.route("/")
       .get(getAllVideos)
       .post(
           upload.fields([
            {
                name:"video",
                maxCount:1,
            },{
                name:"thumbnail",
                maxCount:1
            }
           ]),
           publishAVideo 
       )
router.route("/yourVideo").get(yourVideos) 
router.route("/:videoId")
      .get(getVideoById)
      .patch(updateVideo)
      .delete(deleteVideo)


router.route("/toggle/publish/:videoId").patch(togglePublishStatus) 
router.route("/increment-views/:videoId").post(addViews) 
  


export default router;