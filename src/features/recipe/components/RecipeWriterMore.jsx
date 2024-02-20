import VerticalCard from "../../../components/VerticalCard";

export default function RecipeWriterMore({
  writerRecipes,
  writerName,
  recipeId,
}) {
  const writerRecipesMore = [...writerRecipes].filter(
    (el) => el.id !== recipeId
  );
  const renderWriterRecipesMore = writerRecipesMore?.map((el, index) => (
    <VerticalCard
      key={el.id}
      id={el.id}
      name={el.name}
      recipeImage={el.infos?.[0]?.image}
    />
  ));
  return (
    <>
      {writerRecipesMore.length !== 0 && (
        <div className="flex flex-col gap-6">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-5xl font-black">MORE RECIPES FROM</h1>
            <h1 className=" text-5xl font-medium">{writerName}</h1>
          </div>
          <div className="flex gap-4">{renderWriterRecipesMore}</div>
        </div>
      )}
    </>
  );
}
