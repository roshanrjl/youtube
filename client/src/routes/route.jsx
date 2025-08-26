import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../components/login"
import Signup from "../components/signup"


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
    ],
  },
]);

export default router;
