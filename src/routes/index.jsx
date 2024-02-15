// const { createBrowserRouter, RouterProvider } = require("react-router-dom");
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RedirectIfAuthenticated from "../features/auth/components/RedirectIfAuthenticated";
import ProfilePage from "../pages/ProfilePage";
import RecipePage from "../pages/RecipePage";
import EditProfileForm from "../features/profile/components/EditProfileForm";
import Container from "../layouts/Container";

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
    element: <Container />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "recipe", element: <RecipePage /> },
      { path: "profile/:targetUserId", element: <ProfilePage /> },
      { path: "profile/:targetUserId/edit", element: <EditProfileForm /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
