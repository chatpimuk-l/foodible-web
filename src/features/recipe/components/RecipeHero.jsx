import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import useRecipe from "../hooks/useRecipe";

export default function RecipeHero({ recipeName, recipeImage, recipeId }) {
  const { handleDeleteRecipe } = useRecipe();

  return (
    <div className="flex bg-black text-white h-[70vh]">
      <div className="w-[58vw] h-100%  flex flex-col gap-10 justify-between items-start px-appWidth py-12">
        <div className="flex gap-3">
          <Link to={`/recipe/${recipeId}/edit`}>
            <Button bgColor="white" textColor="black" hoverTextColor="primary">
              EDIT
            </Button>
          </Link>
          <Button
            onClick={handleDeleteRecipe}
            bgColor="white"
            textColor="black"
            hoverTextColor="primary"
          >
            DELETE
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-black pr-10">{recipeName}</h1>
          <div className="flex gap-3">
            <Button
              small
              bgColor="primary"
              textColor="black"
              hoverTextColor="black"
            >
              SALMON
            </Button>
            <Button
              small
              bgColor="primary"
              textColor="black"
              hoverTextColor="black"
            >
              SALT
            </Button>
          </div>
        </div>
      </div>
      <div>
        <img
          src={recipeImage}
          alt="recipe_image"
          className="w-[42vw] h-[100%] object-cover object-center"
        />
      </div>
    </div>
  );
}
