import CommentContextProvider from "../features/comment/contexts/CommentContext";
import ProfileContextProvider from "../features/profile/contexts/ProfileContext";
import RecipeContextProvider from "../features/recipe/contexts/RecipeContext";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <>
      <CommentContextProvider>
        <ProfileContextProvider>
          <RecipeContextProvider>
            <Header />
            <Outlet />
            <Footer />
          </RecipeContextProvider>
        </ProfileContextProvider>
      </CommentContextProvider>
    </>
  );
}
