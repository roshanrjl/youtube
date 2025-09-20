import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
  updateAccountDetails,
  OAuthCallback,
  requestOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/register.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userRegisterValidator } from "../validators/user.validators.js";
import { validate } from "../middlewares/validation.middleware.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userRegisterValidator(),
  validate,
  registerUser
);

router.route("/login").post(loginUser);

//sign up with google
//when user hit this endpoint passport will redirect them to google sing up page
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//this is redirect URL google will call after login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  OAuthCallback
);

//sign up github
//redirect to github login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
//github redirect to this url after the login
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  OAuthCallback
);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/requestOtp").get(requestOtp)
router.route("/verifyOtp").post(verifyOtp)
router.route("/resetpassword").post(resetPassword)

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
