import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Appslidebar from "../components/AppSidebar";
// import Home from "../pages/home";
// import Mycard from "../components/Card"; 
import Login from "../components/login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);

export default router;
