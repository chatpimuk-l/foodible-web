import StarGroup from "../../../components/StarGroup";

export default function RecipeInfoTop({
  recipeServing,
  recipePrepTime,
  recipeCookTime,
  ratingsValue,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 items-center">
        {!!ratingsValue._count?.rating && (
          <>
            <StarGroup />
            <small>
              {Math.round(ratingsValue._avg?.rating * 100) / 100} from{" "}
              {ratingsValue._count?.rating} votes
            </small>
          </>
        )}
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-6">
          <div>
            <i className="fa-solid fa-utensils text-5xl text-primary"></i>
          </div>
          <div className="flex flex-col -space-y-0.5">
            <div className=" font-semibold">SERVINGS</div>
            <div className=" font-black">{recipeServing}</div>
          </div>
        </div>
        <div>
          <div className="flex gap-6">
            <div>
              <i className="fa-solid fa-clock  text-5xl text-primary"></i>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col -space-y-0.5">
                <div className=" font-semibold">PREP</div>
                <div className=" font-black">{recipePrepTime} mins</div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <div className=" font-semibold">COOK</div>
                <div className=" font-black">{recipeCookTime} mins</div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <div className=" font-semibold">TOTAL</div>
                <div className=" font-black">
                  {recipePrepTime + recipeCookTime} mins
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
