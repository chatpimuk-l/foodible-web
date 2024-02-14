import recipe from "../assets/recipe.png";
import star from "../assets/star.png";
import SelectedText from "./SelectedText";

export default function VerticalCard() {
  return (
    <div className=" flex flex-col gap-4 w-[350px] h-[500px] border-8 border-black p-3">
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
      <div className="flex -space-x-0.5">
        <img src={star} alt="star" className="h-6" />
        <img src={star} alt="star" className="h-6" />
        <img src={star} alt="star" className="h-6" />
        <img src={star} alt="star" className="h-6" />
        <img src={star} alt="star" className="h-6" />
      </div>
    </div>
  );
}
