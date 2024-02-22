import { Link } from "react-router-dom";
import SelectedText from "./SelectedText";
import StarGroup from "./StarGroup";

export default function VerticalCard({ id, name, recipeImage }) {
  return (
    <Link to={`/recipe/${id}`}>
      <div className=" flex flex-col w-[350px] h-[500px] border-8 border-black hover:border-primary p-4">
        <img
          src={recipeImage}
          alt="recipe_image"
          className=" w-[100%] h-[210px] object-cover object-center"
        />
        <h5 className=" pt-3 pb-1 text-3xl font-black">{name}</h5>
        {/* <div className="flex gap-2">
          <SelectedText>SALMON</SelectedText>
          <SelectedText>SALT</SelectedText>
        </div> */}
        <StarGroup />
      </div>
    </Link>
  );
}
