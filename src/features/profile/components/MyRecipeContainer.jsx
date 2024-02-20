import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import VerticalCard from "../../../components/VerticalCard";
import useRecipe from "../../recipe/hooks/useRecipe";

export default function MyRecipeContainer() {
  const { writerRecipes } = useRecipe();

  const renderWriterRecipes = writerRecipes?.map((el) => (
    <VerticalCard
      key={el.id}
      id={el.id}
      name={el.name}
      recipeImage={el.infos?.[0]?.image}
    />
  ));
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
          <Button>ADD RECIPE</Button>
        </Link>
      </div>
      <div className="flex gap-4">{renderWriterRecipes}</div>
    </div>
  );
}
