import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../components/login"
import Signup from "../components/signup"
import Video from "../pages/video"
import History from "../pages/history"
import UploadVideo from "../components/uploadVideo";
import CreatePost from "../components/createPost";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"",
        element: <Home />,
      },
      {
        path:"login",
        element:<Login/>

      },
      {
        path:"signup",
        element:<Signup/>
      }
      ,
      {
        path:"video",
        element:<Video/>
      }
      ,
      {
        path:"inbox",
        element:<History/>
      }
      ,
      {
        path:"upload-video",
        element:<UploadVideo/>
      }
      ,
      {
        path:"create-post",
        element:<CreatePost/>
      }
    ],
  },
]);

export default router;
