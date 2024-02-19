import StarGroup from "../../../components/StarGroup";

export default function RecipeInfoTop() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 items-center">
        <StarGroup />
        <small>5 from 12 votes</small>
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-6">
          <div>
            <i className="fa-solid fa-utensils text-5xl text-primary"></i>
          </div>
          <div className="flex flex-col -space-y-0.5">
            <div className=" font-semibold">SERVINGS</div>
            <div className=" font-black">4</div>
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
                <div className=" font-black">20 mins</div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <div className=" font-semibold">COOK</div>
                <div className=" font-black">30 mins</div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <div className=" font-semibold">TOTAL</div>
                <div className=" font-black">50 mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
