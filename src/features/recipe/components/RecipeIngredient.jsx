import useRecipe from "../hooks/useRecipe";

export default function RecipeIngredient({ recipeIngredients }) {
  const { handleClickIngredientURL } = useRecipe();
  function Ingredients({ ingredient, amount, unit }) {
    return (
      <div className="flex items-center text-xl">
        <div className="w-16 flex justify-center">
          <div className="bg-black w-2 h-2"></div>
        </div>
        <div className="w-14">
          <h5 className="font-black ">{amount}</h5>
        </div>
        <div className="w-24">
          <h5 className="font-black ">{unit}</h5>
        </div>
        <h5
          onClick={() => {
            console.log("clickkkk");
            handleClickIngredientURL(ingredient);
          }}
          className="font-semibold hover:underline"
        >
          {ingredient}
        </h5>
      </div>
    );
  }

  const renderIngredients = recipeIngredients.map((el, index) => (
    <Ingredients
      key={index}
      ingredient={el.ingredient}
      amount={el.amount}
      unit={el.unit}
    />
  ));

  return (
    <div className="flex flex-col gap-6">
      <h1 className=" text-5xl font-black">INGREDIENTS</h1>
      <div className="flex flex-col gap-1">{renderIngredients}</div>
    </div>
  );
}
