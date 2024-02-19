import recipe from "../assets/recipe.png";
import SelectedText from "./SelectedText";
import StarGroup from "./StarGroup";

export default function VerticalCard() {
  return (
    <div className=" flex flex-col gap-4 w-[350px] h-[500px] border-8 border-black hover:border-primary p-4">
      <img
        src={recipe}
        alt="recipe_image"
        className="w-[100%] h-[210px] object-cover object-center"
      />
      <h5 className=" text-3xl font-black">
        SMOKY ROASTED SAUSAGE AND VEGETABLES
      </h5>
      <div className="flex gap-2">
        <SelectedText>SALMON</SelectedText>
        <SelectedText>SALT</SelectedText>
      </div>
      <StarGroup />
    </div>
  );
}
