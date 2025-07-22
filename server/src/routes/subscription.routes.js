import { Router } from "express";
import {toggleSubscription,
     getUserChannelSubscribers, 
     getSubscribedChannels} from "../controllers/subscription.controller.js"

import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.use(verifyJWT)

router.route("/toggle/:channelId/:subscriberId").get(toggleSubscription)
router.route("/user/channelId").get(getUserChannelSubscribers)
router.route("/user/:subscriberId").get(getSubscribedChannels)


export default router;