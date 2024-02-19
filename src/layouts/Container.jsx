import ProfileContextProvider from "../features/profile/contexts/ProfileContext";
import RecipeContextProvider from "../features/recipe/contexts/RecipeContext";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <>
      <ProfileContextProvider>
        <RecipeContextProvider>
          <Header />
          <Outlet />
        </RecipeContextProvider>
      </ProfileContextProvider>
    </>
  );
}
