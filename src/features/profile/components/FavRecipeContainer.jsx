import VerticalCard from "../../../components/VerticalCard";
import useRecipe from "../../recipe/hooks/useRecipe";

export default function FavRecipeContainer() {
  const { renderFavRecipes } = useRecipe();
  return (
    <div className="flex flex-col gap-6">
      <div className=" flex justify-between">
        <h1 className=" text-5xl font-black">FAV RECIPES</h1>
        <div className=" flex items-end gap-6 text-xl font-black">
          <div>LATEST</div>
          <div className="underline">HIGHEST RATED</div>
        </div>
      </div>
      {renderFavRecipes.length === 0 ? (
        <div className="h-36 border-8 border-black p-6 ">
          <div>There is no fav recipes yet.</div>
        </div>
      ) : (
        <div className="flex gap-4 overflow-auto">{renderFavRecipes}</div>
      )}
    </div>
  );
}
