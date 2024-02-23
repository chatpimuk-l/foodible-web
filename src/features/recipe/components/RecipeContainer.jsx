import CommentContainer from "../../comment/components/CommentContainer";
import LeaveACommentForm from "../../comment/components/LeaveACommentForm";
import RecipeDescription from "./RecipeDescription";
import RecipeHero from "./RecipeHero";
import RecipeInfoTop from "./RecipeInfoTop";
import RecipeIngredient from "./RecipeIngredient";
import RecipeInstruction from "./RecipeInstruction";
import RecipeTip from "./RecipeTip";
import RecipeWriter from "./RecipeWriter";
import RecipeWriterMore from "./RecipeWriterMore";
import useRecipe from "../hooks/useRecipe";
import { useEffect } from "react";

export default function RecipeContainer() {
  const { recipeObj, writerRecipes, clearStates, isOpenEdit } = useRecipe();

  // useEffect(() => {
  //   return () => {
  //     console.log(1234);
  //     console.log("isOpenEdit", isOpenEdit);
  //     if (!isOpenEdit) {
  //       console.log(5678);
  //       clearStates();
  //     }
  //   };
  // }, []);

  return (
    <>
      {Object.keys(recipeObj).length !== 0 && (
        <>
          <RecipeHero
            recipeName={recipeObj.name}
            recipeImage={recipeObj.infos?.[0]?.image}
            recipeId={recipeObj.id}
          />
          <div className="px-appWidth pt-6 pb-8">
            <RecipeInfoTop
              recipeServing={recipeObj.infos?.[0]?.serving}
              recipePrepTime={recipeObj.infos?.[0]?.prepTime}
              recipeCookTime={recipeObj.infos?.[0]?.cookTime}
            />
          </div>
          {recipeObj.infos?.[0]?.description && (
            <div className="mx-appWidth pb-8">
              <RecipeDescription
                recipeDescription={recipeObj.infos?.[0]?.description}
              />
            </div>
          )}
          <div className="px-appWidth pb-8">
            <RecipeIngredient recipeIngredients={recipeObj.ingredients} />
          </div>
          <div className="px-appWidth pb-8">
            <RecipeInstruction recipeInstructions={recipeObj.instructions} />
          </div>
          {recipeObj.infos?.[0]?.tip && (
            <div className="px-appWidth pb-8">
              <RecipeTip recipeTip={recipeObj.infos?.[0]?.tip} />
            </div>
          )}

          <RecipeWriter
            writerId={recipeObj.userId}
            writerName={recipeObj.user?.name}
            writerImage={recipeObj.user?.image}
            recipeCreatedAt={recipeObj.createdAt}
          />
          <div className="px-appWidth py-8">
            <CommentContainer />
          </div>
          <div>
            <LeaveACommentForm />
          </div>
          <div className="px-appWidth py-8">
            <RecipeWriterMore
              writerRecipes={writerRecipes}
              writerName={recipeObj.user?.name}
              recipeId={recipeObj.id}
            />
          </div>
        </>
      )}
    </>
  );
}
