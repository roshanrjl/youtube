import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRoute from "./routes/user.routes.js";
import commentRoute from "./routes/comment.routes.js"
import dashboadRoute from "./routes/dashboad.routes.js"
import likeRoute from "./routes/like.routes.js"
import playlistRoute from "./routes/playlist.route.js"
import subscriptionRoute from "./routes/subscription.routes.js"
import tweetRoute from "./routes/tweet.routes.js"
import videoRoute from "./routes/video.routes.js"
import paymentRoute from "./routes/payment.routes.js"
import profileRoute from "./routes/profile.routes.js"
import "./config/password.config.js";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js"

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("combined"));
//middlewaire start vayo and middlewaire garauda .use garne
//frontend bataaayako json data lai linw ko lagi ra limit is a option i.e 16kb samma data json format ma linw milxa yo aafi set garne ho {yo middlewaire ho}
app.use(express.json({ limit: "16kb" }));

//url ko through bata data aayo vane  recieve garnw ko lagi banayako middlewaire ho
//extended la garda object vitra pani object linw milxa
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// image , file ,folder huru lai store garnw
app.use(express.static("public"));

//user ko browser ma vayako cookeies lai access garnw ra crud operation garnw ko lagi
app.use(cookieParser());

//router import
app.use("/api/v1/users", userRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/dashboad", dashboadRoute);
app.use("/api/v1/like", likeRoute);
app.use("/api/v1/playlist", playlistRoute);
app.use("/api/v1/tweet", tweetRoute);
app.use("/api/v1/video", videoRoute);
app.use("/api/v1/subscription", subscriptionRoute); 
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/profile",profileRoute)

//route declaration
app.get("/", (req, res) => {
  res.send("Hello, Morgan!");
});
app.use(errorHandler);
export default app;
