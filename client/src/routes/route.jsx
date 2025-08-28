import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../components/login"
import Signup from "../components/signup"
import Video from "../pages/video"
import History from "../pages/history"


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
    ],
  },
]);

export default router;
