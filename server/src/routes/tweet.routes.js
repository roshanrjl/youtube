import { Router } from "express";
import {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
} from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()
router.use(verifyJWT)

router.route("/").get(createTweet)
router.route("/user/:channelId").get(getUserTweets)
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet)




export default router;