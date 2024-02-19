import SearchBar from "../components/SearchBar";
import AllRecipeContainer from "../features/recipe/components/AllRecipeContainer";

export default function HomePage() {
  return (
    <>
      <div className="px-appWidth">
        <SearchBar />
      </div>
      <div className="px-appWidth py-8">
        <AllRecipeContainer />
      </div>
    </>
  );
}
