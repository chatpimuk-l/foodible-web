import { Link } from "react-router-dom";
import recipe from "../../../assets/recipe.png";
import Button from "../../../components/Button";
import useProfile from "../../profile/hooks/useProfile";

export default function RecipeHero() {
  const {
    userProfile: { id, name, bio, image },
  } = useProfile();
  return (
    <div className="flex bg-black text-white h-[70vh]">
      <div className="w-[58vw] h-100%  flex flex-col gap-10 justify-between items-start px-appWidth py-12">
        <div className="flex gap-3">
          <Link to={`/profile/${id}/edit`}>
            <Button bgColor="white" textColor="black" hoverTextColor="primary">
              EDIT
            </Button>
          </Link>
          <Button bgColor="white" textColor="black" hoverTextColor="primary">
            DELETE
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-black pr-10">
            CHICKEN BOWLS WITH CHILI SAUCE
          </h1>
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
          src={recipe}
          alt="recipe_image"
          className="w-[42vw] h-[100%] object-cover object-center"
        />
      </div>
    </div>
  );
}
