import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Appslidebar from "../components/AppSidebar";
import Home from "../pages/home"; // replace with your actual pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
