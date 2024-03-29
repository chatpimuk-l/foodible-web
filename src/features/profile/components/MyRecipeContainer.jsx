import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import VerticalCard from "../../../components/VerticalCard";
import useRecipe from "../../recipe/hooks/useRecipe";

export default function MyRecipeContainer() {
  const { renderWriterRecipes } = useRecipe();

  return (
    <div className="flex flex-col gap-6">
      <div className=" flex justify-between">
        <h1 className=" text-5xl font-black">MY RECIPES</h1>
        <div className=" flex items-end gap-6 text-xl font-black">
          <div>LATEST</div>
          <div className="underline">HIGHEST RATED</div>
        </div>
      </div>
      <div>
        <Link to="/recipe/create">
          <Button
            small
            bgColor="primary"
            textColor="black"
            hoverTextColor="white"
          >
            ADD RECIPE
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 overflow-auto">{renderWriterRecipes}</div>
    </div>
  );
}
