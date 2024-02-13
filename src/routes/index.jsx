// const { createBrowserRouter, RouterProvider } = require("react-router-dom");
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>go</h1>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
