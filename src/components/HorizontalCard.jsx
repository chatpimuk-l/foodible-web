import recipe from "../assets/recipe.png";
import SelectedText from "./SelectedText";
import StarGroup from "./StarGroup";

export default function VerticalCard() {
  return (
    <div className=" flex gap-4 h-[300px] border-8 border-black hover:border-primary p-4">
      <div className=" flex flex-col gap-3 py-6 pl-6 pr-20">
        <h5 className=" text-3xl font-black">
          SMOKY ROASTED SAUSAGE AND VEGETABLES
        </h5>
        <div className="flex gap-2">
          <SelectedText>SALMON</SelectedText>
          <SelectedText>SALT</SelectedText>
        </div>
        <StarGroup />
      </div>
      <div>
        <img
          src={recipe}
          alt="recipe_image"
          className="w-[50vw] h-[100%] object-cover object-center"
        />
      </div>
    </div>
  );
}
