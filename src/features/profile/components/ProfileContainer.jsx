import ProfileHero from "./ProfileHero";
import MyRecipeContainer from "./MyRecipeContainer";
// import SearchBar from "../../../components/SearchBar";
import FavRecipeContainer from "./FavRecipeContainer";
import useRecipe from "../../recipe/hooks/useRecipe";
import { useEffect } from "react";

export default function ProfilePage() {
  const { clearStates } = useRecipe();

  useEffect(() => {
    clearStates();
    console.log("clear");
  }, []);

  return (
    <>
      <div className=" pb-8 ">
        <ProfileHero />
      </div>
      {/* <div className="pb-8 px-appWidth">
        <SearchBar />
      </div> */}
      <div className="px-appWidth">
        <MyRecipeContainer />
      </div>
      <div className="py-16 px-appWidth">
        <FavRecipeContainer />
      </div>
    </>
  );
}
