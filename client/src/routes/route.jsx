import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../components/login";
import Signup from "../components/signup";
import Video from "../pages/video";
import Yourvideo from "../pages/dashboad/Dashboard";
import UploadVideo from "../components/uploadVideo";
import CreatePost from "../components/createPost";
import Profile from "../pages/profile";
import Changepassword from "../pages/passwordpages/Changepassword";
import Account from "../pages/account";
import Premium from "../pages/Premium";
import LikedVideo from "../pages/likedVideo";
import Update from "../pages/dashboad/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "video/:id",
        element: <Video />,
      },
      {
        path: "yourVideo",
        element: <Yourvideo />,
      },
      {
        path: "upload-video",
        element: <UploadVideo />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "/settings/change-password",
        element: <Changepassword />,
      },
      {
        path: "/settings/account",
        element: <Account />,
      },
      {
        path: "/settings/premium",
        element: <Premium />,
      },
      {
        path: "/likeVideo",
        element: <LikedVideo />,
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
    ],
  },
]);

export default router;
