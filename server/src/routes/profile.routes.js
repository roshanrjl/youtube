import { Router } from "express";
import {profileData}  from "../controllers/profile.controller.js";
const router = Router();

router.route("/:userId").get(profileData);

export default router;
