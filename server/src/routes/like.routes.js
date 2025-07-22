import { Router } from "express";

import{
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos
} from "../controllers/like.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT)

router.route("/toggle/comment/:commentId").get(toggleCommentLike)
router.route("/toggle/Tweet/:tweetId").get(toggleTweetLike)
router.route("/toggle/video/:videoId").get(toggleVideoLike)

router.route("/").get(getLikedVideos)



export default router;