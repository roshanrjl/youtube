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
router.route("/user/:userId").get(getUserTweets)
router.route("/:userId").patch(updateTweet).delete(deleteTweet)



export default router;