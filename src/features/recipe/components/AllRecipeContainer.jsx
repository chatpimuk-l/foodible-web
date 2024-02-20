import HorizontalCard from "../../../components/HorizontalCard";
import useRecipe from "../hooks/useRecipe";

export default function AllRecipeContainer() {
  const { renderRecipes } = useRecipe();
  return (
    <div className="flex flex-col gap-6">
      <div className=" flex justify-between">
        <h1 className=" text-5xl font-black">ALL RECIPES</h1>
        <div className=" flex items-end gap-6 text-xl font-black">
          <div>LATEST</div>
          <div className="underline">HIGHEST RATED</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">{renderRecipes}</div>
    </div>
  );
}
