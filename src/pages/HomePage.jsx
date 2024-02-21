import AllRecipeContainer from "../features/recipe/components/AllRecipeContainer";
import SearchBar from "../features/recipe/components/SearchBar";

export default function HomePage() {
  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div className="px-appWidth py-8">
        <AllRecipeContainer />
      </div>
    </>
  );
}
