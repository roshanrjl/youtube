import { Router } from "express";
import {toggleSubscription,
     getUserChannelSubscribers, 
     getSubscribedChannels} from "../controllers/subscription.controller.js"

import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.use(verifyJWT)

router.route("/toggle/:channelId").get(toggleSubscription)
router.route("/user/list/:channelId").get(getUserChannelSubscribers)
router.route("/user/:subscriberId").get(getSubscribedChannels)


export default router;