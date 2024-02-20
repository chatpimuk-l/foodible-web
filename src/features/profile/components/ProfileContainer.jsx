import ProfileHero from "./ProfileHero";
import MyRecipeContainer from "./MyRecipeContainer";
import SearchBar from "../../../components/SearchBar";
import FavRecipeContainer from "./FavRecipeContainer";

export default function ProfilePage() {
  return (
    <>
      <ProfileHero />
      <div className="py-8 px-appWidth">
        <SearchBar />
      </div>
      <div className=" px-appWidth">
        <MyRecipeContainer />
      </div>
      <div className="py-16 px-appWidth">
        <FavRecipeContainer />
      </div>
    </>
  );
}
