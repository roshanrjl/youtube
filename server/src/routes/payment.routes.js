import { Router } from "express";
import {initiatePayment}  from "../controllers/payment.controller.js";
const router = Router();

router.route("/").post(initiatePayment);

export default router;
