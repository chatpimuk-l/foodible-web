import { Link } from "react-router-dom";
import SelectedText from "./SelectedText";
import StarGroup from "./StarGroup";

export default function HorizontalCard({ id, name, recipeImage }) {
  return (
    <Link to={`/recipe/${id}`}>
      <div className=" flex justify-between gap-4 h-[300px] border-8 border-black hover:border-primary p-4">
        <div className=" flex flex-col gap-3 py-6 pl-6 pr-20">
          <h5 className=" text-3xl font-black">{name}</h5>
          <div className="flex gap-2">
            <SelectedText>SALMON</SelectedText>
            <SelectedText>SALT</SelectedText>
          </div>
          <StarGroup />
        </div>
        <div>
          <img
            src={recipeImage}
            alt="recipe_image"
            className="w-[50vw] h-[100%] object-cover object-center"
          />
        </div>
      </div>
    </Link>
  );
}
