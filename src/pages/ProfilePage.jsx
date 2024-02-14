import SearchBar from "../components/SearchBar";
import MyRecipeContainer from "../features/profile/components/MyRecipeContainer";
import ProfileHero from "../features/profile/components/ProfileHero";

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
