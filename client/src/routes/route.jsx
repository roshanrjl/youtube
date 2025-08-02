import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Appslidebar from "../components/AppSidebar"; // replace with your actual pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Appslidebar />,
      },
    ],
  },
]);

export default router;
