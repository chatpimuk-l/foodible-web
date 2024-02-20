import recipe from "../../../assets/recipe.png";

export default function RecipeInstruction({ recipeInstructions }) {
  function Instructions({ index, instruction, image }) {
    return (
      <div className="flex flex-col gap-3 border-8 border-black py-8 px-16">
        <h5 className=" text-center text-[36px] font-black w-16 bg-primary self-start">
          {index + 1}
        </h5>
        <h5 className="font-semibold text-xl">{instruction}</h5>
        <img src={image} alt="instruction_image" />
      </div>
    );
  }

  const renderInstructions = recipeInstructions?.map((el, index) => (
    <Instructions
      key={index}
      index={index}
      instruction={el.instruction}
      image={el.image}
    />
  ));

  return (
    <div className="flex flex-col gap-6">
      <h1 className=" text-5xl font-black">INSTRUCTIONS</h1>
      <div className="flex flex-col gap-4">{renderInstructions}</div>
    </div>
  );
}
