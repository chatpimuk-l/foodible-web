// const { createBrowserRouter, RouterProvider } = require("react-router-dom");
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RedirectIfAuthenticated from "../features/auth/components/RedirectIfAuthenticated";
import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import RecipePage from "../pages/RecipePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LoginPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectIfAuthenticated>
        <RegisterPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "recipe", element: <RecipePage /> },
      { path: "profile/:targetUserId", element: <ProfilePage /> },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
