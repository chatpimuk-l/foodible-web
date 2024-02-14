import ProfileHero from "./ProfileHero";
import MyRecipeContainer from "./MyRecipeContainer";
import SearchBar from "../../../components/SearchBar";

export default function ProfilePage() {
  return (
    <>
      <ProfileHero />
      <div className="py-16 px-20">
        <SearchBar />
      </div>
      <div className=" px-20">
        <MyRecipeContainer />
      </div>
    </>
  );
}
